package com.projet.model.response;

import com.projet.entity.Category;
import com.projet.entity.Offer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OfferResponseModel {
    private long id;
    private String name;
    private String description;
    private Set<Long> categoryIds;

    private boolean isArchived;

    public OfferResponseModel(Offer offer) {
            this.id = offer.getId();
            this.isArchived = offer.isArchived();
            this.name = offer.getTitle();
            this.description = offer.getDescription();
            this.categoryIds = offer.getCategories().stream().map(Category::getId).collect(Collectors.toSet());
    }
}
