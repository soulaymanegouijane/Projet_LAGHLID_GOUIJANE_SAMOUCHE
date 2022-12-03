package com.projet.repository;

import com.projet.entity.Demand;
import com.projet.utils.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DemandRepository extends JpaRepository<Demand, Long> {
    Demand findFirstByOrderByDateDesc();

    @Query("select count(d) from Demand d where d.member.association.id = ?1")
    Long countByAssociationId(long id);

    @Query("select count(d) from Demand d where d.member.association.id = ?1 and d.status = ?2")
    Long countByAssociationIdAndDecision(long id, Decision decision);

    @Query("select d from Demand d where d.member.association.id = ?1")
    List<Demand> findByOfferAssociationId(long id);
}
