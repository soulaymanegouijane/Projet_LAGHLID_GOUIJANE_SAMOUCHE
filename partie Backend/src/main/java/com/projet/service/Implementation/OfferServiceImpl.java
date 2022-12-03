package com.projet.service.Implementation;

import com.projet.entity.Member;
import com.projet.entity.Offer;
import com.projet.entity.Role;
import com.projet.exception.MemberNotFoundException;
import com.projet.model.response.OfferResponseModel;
import com.projet.repository.MemberRepository;
import com.projet.repository.OfferRepository;
import com.projet.security.services.UserDetailsImpl;
import com.projet.service.OfferService;
import com.projet.utils.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public List<OfferResponseModel> retreiveOffers() throws MemberNotFoundException {
            return offerRepository.findAll().stream()
                    .map(offer -> new OfferResponseModel(offer))
                    .collect(Collectors.toList());
    }

    @Override
    public List<OfferResponseModel> retreiveMyOffers() throws MemberNotFoundException {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member connectedMember = memberRepository.findById(userDetails.getId()).orElseThrow(() -> new MemberNotFoundException("Member not found"));
        return offerRepository.findAll().stream()
                .filter(offer -> offer.getAssociation().getId() == connectedMember.getAssociation().getId())
                .map(offer -> new OfferResponseModel(offer))
                .collect(Collectors.toList());
    }

}
