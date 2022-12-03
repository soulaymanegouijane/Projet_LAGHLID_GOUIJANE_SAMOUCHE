package com.projet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String description;

    private boolean isArchived;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date creationDate;

    @ManyToMany
    Set<Category> categories;

    @OneToMany
    private Set<Demand> demands;


    @ManyToOne
    Association association;
}
