package com.projet.service.Implementation;

import com.projet.entity.Association;
import com.projet.entity.Member;
import com.projet.repository.DemandRepository;
import com.projet.repository.OfferRepository;
import com.projet.service.StatisticsService;
import com.projet.model.response.Statistics;
import com.projet.utils.Decision;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    DemandRepository demandRepository;


    @Override
    @PreAuthorize("hasRole('REPRESENTATIVE')")
    public ResponseEntity<Statistics> retreiveDemandStatistics() {
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Statistics statistics = new Statistics();
        Association association = member.getAssociation();
        Map<String, Long> demandStatistics = new HashMap<>();
        demandStatistics.put("total", demandRepository.countByAssociationId(association.getId()));
        demandStatistics.put("accepted", demandRepository.countByAssociationIdAndDecision(association.getId(), Decision.ACCEPTED));
        demandStatistics.put("refused", demandRepository.countByAssociationIdAndDecision(association.getId(), Decision.REFUSED));
        demandStatistics.put("pending", demandRepository.countByAssociationIdAndDecision(association.getId(), Decision.WAITING));
        demandStatistics.put("transfered", demandRepository.countByAssociationIdAndDecision(association.getId(), Decision.TRANSEFERED));
        demandStatistics.put("cancelled", demandRepository.countByAssociationIdAndDecision(association.getId(), Decision.CANCELLED));
        statistics.setStatistics(demandStatistics);
        return ResponseEntity.ok(statistics);
    }

    @Override
    @PreAuthorize("hasRole('REPRESENTATIVE')")
    public ResponseEntity<Statistics> retreiveOfferStatistics() {
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Statistics statistics = new Statistics();
        Association association = member.getAssociation();
        Map<String, Long> offerStatistics = new HashMap<>();
        offerStatistics.put("total", offerRepository.countByAssociationId(association.getId()));
        offerStatistics.put("archived", offerRepository.countByAssociationIdAndArchived(association.getId(), true));
        offerStatistics.put("active", offerRepository.countByAssociationIdAndArchived(association.getId(), false));
        statistics.setStatistics(offerStatistics);
        return ResponseEntity.ok(statistics);
    }
}
