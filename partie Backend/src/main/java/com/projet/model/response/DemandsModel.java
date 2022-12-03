package com.projet.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DemandsModel {
    private long id;
    private String offerTitle;
    private String demanderUsername;
    private String  status;
    private boolean isArchived;
}
