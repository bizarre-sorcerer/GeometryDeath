package com.GeometryDeath.GeometryDeathBE.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "generator")
    @SequenceGenerator(name = "generator", sequenceName = "id_sequence", allocationSize = 1)
    private Long id;

    @Column(name="role", unique = true, nullable = false)
    public String name;

}
