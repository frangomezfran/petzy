package com.petzy.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * Entidad que representa las vacunas disponibles.
 */
@Entity
@Table(name = "Vaccines")
public class Vaccine extends PanacheEntity {

    @Column(nullable = false, unique = true)
    public String name;

    @Column(nullable = false)
    public String description;

    @Column(nullable = false)
    public Integer recommendedAgeWeeks; // Edad recomendada en semanas
}
