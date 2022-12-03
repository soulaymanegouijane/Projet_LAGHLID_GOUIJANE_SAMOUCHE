package com.projet.controller;

import com.projet.entity.Offer;
import com.projet.exception.MemberNotFoundException;
import com.projet.model.response.OfferResponseModel;
import com.projet.repository.OfferRepository;
import com.projet.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/offers")
public class OfferController {
    @Autowired
    OfferService offerService;

    @GetMapping
    public List<OfferResponseModel> retreiveOffers() throws MemberNotFoundException {
        return offerService.retreiveOffers();
    }

    @GetMapping("/myOffers")
    public List<OfferResponseModel> retreiveMyOffers() throws MemberNotFoundException {
        return offerService.retreiveMyOffers();
    }
}
