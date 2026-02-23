package com.petzy.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * Entidad que representa al dueño de la mascota.
 */
@Entity
@Table(name = "Owners")
public class Owner extends PanacheEntity {

    @Column(nullable = false)
    public String fullName;

    @Column(nullable = false, unique = true)
    public String dni;

    @Column(nullable = false)
    public String email;

    @Column(nullable = false)
    public String phone;

    public String address;
}
