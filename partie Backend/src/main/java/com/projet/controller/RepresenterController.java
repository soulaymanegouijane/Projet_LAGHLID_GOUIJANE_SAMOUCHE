package com.projet.controller;


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
import com.projet.service.RepresenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/representer")
@CrossOrigin("*")
public class RepresenterController {

    @Autowired
    RepresenterService representerService;


    @PostMapping("/offers")
    public ResponseEntity<ResponseMessage> addOffer(@RequestBody OfferRequestModel offer) throws MaterialNotFoundException, CategoryNotFoundException {
        System.out.println("offer = " + offer);
        return representerService.persistOffer(offer);
    }

    @GetMapping("/offers")
    public List<Offer> getAllOffers() {
        return representerService.retreiveAllAssociationOffers();
    }

    @PutMapping("/demands/{id}/reject")
    public ResponseEntity<ResponseMessage> rejectDemand(@PathVariable Long id, @RequestBody String comment) throws MaterialNotFoundException, CategoryNotFoundException {
        return representerService.RefuseDemand(id, comment);
    }
    @PutMapping("/demands/{id}/accept")
    public ResponseEntity<ResponseMessage> acceptDemand(@PathVariable Long id) throws MaterialNotFoundException, CategoryNotFoundException {
        return representerService.acceptDemand(id);
    }

    @GetMapping("/demands")
    public Set<DemandsModel> getAllDemands() throws OfferNotFoundException {
        return representerService.retreiveAllAssociationDemands();
    }

    @PutMapping("/demands/{id}/transfer")
    public ResponseEntity<MessageResponse> transferDemand(@PathVariable long id) throws DemandNotFoundException {
        return representerService.transferDemand(id);

    }
@DeleteMapping("/offers/{id}")
    public ResponseEntity<ResponseMessage> deleteOffer(@PathVariable Long id) throws MaterialNotFoundException, CategoryNotFoundException, OfferNotFoundException {
        return representerService.deleteOffer(id);
    }
}




