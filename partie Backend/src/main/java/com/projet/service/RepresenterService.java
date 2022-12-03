package com.projet.service;

import com.projet.entity.Demand;
import com.projet.entity.Offer;
import com.projet.exception.CategoryNotFoundException;
import com.projet.exception.DemandNotFoundException;
import com.projet.exception.MaterialNotFoundException;
import com.projet.exception.OfferNotFoundException;
import com.projet.model.request.OfferRequestModel;
import com.projet.model.response.DemandsModel;
import com.projet.model.response.MessageResponse;
import com.projet.model.response.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface RepresenterService {
    List<Offer> retreiveAllAssociationOffers();

    ResponseEntity<ResponseMessage> persistOffer(OfferRequestModel offer) throws MaterialNotFoundException, CategoryNotFoundException;


    @Transactional
    @PreAuthorize("hasRole('REPRESENTATIVE')")
    ResponseEntity<ResponseMessage> RefuseDemand(Long id, String comment);


    @PreAuthorize("hasRole('REPRESENTATIVE')")
    Set<DemandsModel> retreiveAllAssociationDemands() throws OfferNotFoundException;

    ResponseEntity<MessageResponse> transferDemand(long id) throws DemandNotFoundException;

    ResponseEntity<ResponseMessage> acceptDemand(Long id);

    ResponseEntity<ResponseMessage> deleteOffer(Long id) throws OfferNotFoundException;
}
