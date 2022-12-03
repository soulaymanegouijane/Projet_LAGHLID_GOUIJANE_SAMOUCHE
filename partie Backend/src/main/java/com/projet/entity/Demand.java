package com.projet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projet.utils.Decision;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private boolean isArchived;

    @Enumerated(EnumType.STRING)
    private Decision status; // PENDING, ACCEPTED, REFUSED

    private String comment;

    private int rank;

    @ManyToOne
    private Member member;

    @ManyToOne
    private Offer offer;

    public void reduceRank(){
        this.rank = this.rank - 1;
    }
}
