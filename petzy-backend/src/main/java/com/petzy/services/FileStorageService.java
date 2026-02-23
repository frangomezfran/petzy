package com.petzy.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

/**
 * Servicio encargado de la gestión de archivos multimedia.
 */
@ApplicationScoped
public class FileStorageService {

    @ConfigProperty(name = "petzy.uploads.directory", defaultValue = "src/main/resources/uploads")
    String uploadDir;

    /**
     * Guarda un archivo en el sistema de archivos local.
     * @param fileName El nombre original del archivo.
     * @param inputStream El flujo de datos del archivo.
     * @return String con el nombre único asignado al archivo guardado.
     * @throws IOException Si ocurre un error al escribir el archivo.
     */
    public String storeFile(String fileName, InputStream inputStream) throws IOException {
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        Path root = Paths.get(uploadDir);
        
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }

        Files.copy(inputStream, root.resolve(uniqueFileName));
        return uniqueFileName;
    }

    /**
     * Recupera el contenido de un archivo almacenado.
     * @param fileName El nombre único del archivo.
     * @return byte[] con el contenido del archivo.
     * @throws IOException Si el archivo no se encuentra.
     */
    public byte[] getFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        return Files.readAllBytes(filePath);
    }
}
