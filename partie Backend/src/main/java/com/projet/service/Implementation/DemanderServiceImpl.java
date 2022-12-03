package com.projet.service.Implementation;


import com.projet.entity.Demand;
import com.projet.entity.Member;
import com.projet.entity.Offer;
import com.projet.exception.MemberNotFoundException;
import com.projet.exception.OfferNotFoundException;
import com.projet.model.response.ResponseMessage;
import com.projet.repository.DemandRepository;
import com.projet.repository.MemberRepository;
import com.projet.repository.OfferRepository;
import com.projet.security.services.UserDetailsImpl;
import com.projet.service.DemanderService;
import com.projet.utils.Decision;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Objects;

@Service
public class DemanderServiceImpl implements DemanderService {

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    DemandRepository demandRepository;

    @Override
    @PreAuthorize("hasRole('MEMBER')")
    public Offer getOfferById(Long id) throws OfferNotFoundException {
        return offerRepository.findById(id)
                .orElseThrow(() -> new OfferNotFoundException("Cette Offre n'existe pas"));
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('MEMBER')")
    public ResponseEntity<ResponseMessage> persistDemand(long offerId) throws OfferNotFoundException, MemberNotFoundException {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberRepository.findById(userDetails.getId())
                .orElseThrow(() -> new MemberNotFoundException("Ce membre n'existe pas"));

        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new OfferNotFoundException("Cette offre n'existe pas"));
        int rank = calculateRank();
        Demand newDemand = Demand.builder()
                .member(member)
                .offer(offer)
                .date(new Date(System.currentTimeMillis()))
                .rank(rank)
                .comment(null)
                .status(Decision.WAITING)
                .isArchived(false)
                .build();
        demandRepository.save(newDemand);
        return ResponseEntity.ok(new ResponseMessage(HttpStatus.CREATED,"Demande enregistrée avec succès"));
    }

    private int calculateRank() {
        Demand lastDemand = demandRepository.findFirstByOrderByDateDesc();
        if (Objects.isNull(lastDemand)) return 1;
        return lastDemand.getRank()+ 1;
    }
}
