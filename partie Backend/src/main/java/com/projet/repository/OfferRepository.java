package com.projet.repository;

import com.projet.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query("select o from Offer o where o.association.id = ?1")
    List<Offer> findByAssociationId(long id);

    @Query("select count(o) from Offer o where o.association.id = ?1")
    Long countByAssociationId(long id);

    @Query("SELECT count(o) FROM Offer o WHERE o.association.id = ?1 and o.isArchived = ?2")
    Long countByAssociationIdAndArchived(long id, boolean isArchived);


}
