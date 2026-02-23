package com.petzy.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * Entidad que representa la raza de una mascota.
 */
@Entity
@Table(name = "Breeds")
public class Breed extends PanacheEntity {

    @Column(nullable = false, unique = true)
    public String name;

    @Column(nullable = false)
    public String species; // "DOG" or "CAT"
}
