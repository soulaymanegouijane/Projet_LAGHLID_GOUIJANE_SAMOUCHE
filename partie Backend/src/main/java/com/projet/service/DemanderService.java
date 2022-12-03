package com.projet.service;

import com.projet.entity.Offer;
import com.projet.exception.MemberNotFoundException;
import com.projet.exception.OfferNotFoundException;
import com.projet.model.response.ResponseMessage;
import org.springframework.http.ResponseEntity;

public interface DemanderService {

    Offer getOfferById(Long id) throws OfferNotFoundException;

    ResponseEntity<ResponseMessage> persistDemand(long demand) throws MemberNotFoundException, OfferNotFoundException;
}
