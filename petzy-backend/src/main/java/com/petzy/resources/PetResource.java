package com.petzy.resources;

import com.petzy.entities.Breed;
import com.petzy.entities.Owner;
import com.petzy.entities.Pet;
import com.petzy.services.FileStorageService;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;

/**
 * Recurso REST para la gestión de mascotas y dueños.
 */
@Path("/pets")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.MULTIPART_FORM_DATA)
public class PetResource {

    @Inject
    FileStorageService fileStorageService;

    /**
     * Endpoint para registrar una mascota junto con su dueño y la imagen de su libreta sanitaria.
     */
    @POST
    @Path("/register")
    @Transactional
    public Response registerPet(
            @RestForm String ownerName,
            @RestForm String ownerDni,
            @RestForm String ownerEmail,
            @RestForm String ownerPhone,
            @RestForm String petName,
            @RestForm String petSpecies,
            @RestForm Long breedId,
            @RestForm String birthDate,
            @RestForm String gender,
            @RestForm String color,
            @RestForm FileUpload healthRecordImage) {

        try {
            // Buscamos o creamos el dueño
            Owner owner = Owner.find("dni", ownerDni).firstResult();
            if (owner == null) {
                owner = new Owner();
                owner.fullName = ownerName;
                owner.dni = ownerDni;
                owner.email = ownerEmail;
                owner.phone = ownerPhone;
                owner.persist();
            }

            Breed breed = Breed.findById(breedId);
            if (breed == null) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Raza no encontrada").build();
            }

            // Procesamos la imagen si existe
            String imagePath = null;
            if (healthRecordImage != null) {
                imagePath = fileStorageService.storeFile(healthRecordImage.fileName(), Files.newInputStream(healthRecordImage.filePath()));
            }

            // Creamos la mascota
            Pet pet = new Pet();
            pet.name = petName;
            pet.species = petSpecies;
            pet.breed = breed;
            pet.birthDate = LocalDate.parse(birthDate);
            pet.gender = gender;
            pet.color = color;
            pet.owner = owner;
            pet.healthRecordImagePath = imagePath;
            pet.persist();

            return Response.ok(pet).status(Response.Status.CREATED).build();

        } catch (IOException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al guardar la imagen").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Error en los datos del formulario: " + e.getMessage()).build();
        }
    }

    /**
     * Endpoint para obtener el catálogo de razas.
     */
    @GET
    @Path("/breeds")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBreeds(@QueryParam("species") String species) {
        if (species != null) {
            return Response.ok(Breed.find("species", species).list()).build();
        }
        return Response.ok(Breed.listAll()).build();
    }
}
