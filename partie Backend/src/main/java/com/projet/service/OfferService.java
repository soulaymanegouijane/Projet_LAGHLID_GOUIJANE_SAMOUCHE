package com.projet.service;

import com.projet.exception.MemberNotFoundException;
import com.projet.model.response.OfferResponseModel;

import java.util.List;

public interface OfferService {
   List<OfferResponseModel> retreiveOffers() throws MemberNotFoundException;

   List<OfferResponseModel> retreiveMyOffers() throws MemberNotFoundException;
}
