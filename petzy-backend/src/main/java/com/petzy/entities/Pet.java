package com.petzy.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

/**
 * Entidad que representa a la mascota.
 */
@Entity
@Table(name = "Pets")
public class Pet extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String species; // "DOG" or "CAT"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breed_id", nullable = false)
    public Breed breed;

    @Column(nullable = false)
    public LocalDate birthDate;

    public String gender; // "M" or "F"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    public Owner owner;

    public String healthRecordImagePath; // Ruta local a la imagen de la libreta sanitaria

    @Column(nullable = false)
    public String color;
}
