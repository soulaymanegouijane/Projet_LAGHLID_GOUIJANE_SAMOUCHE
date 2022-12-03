package com.projet.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class Statistics {

    private Map<String, Long> statistics;

}
