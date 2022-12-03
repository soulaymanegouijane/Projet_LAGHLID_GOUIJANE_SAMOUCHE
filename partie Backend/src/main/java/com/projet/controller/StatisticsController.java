package com.projet.controller;

import com.projet.service.StatisticsService;
import com.projet.model.response.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin("*")
public class StatisticsController {

        @Autowired
        StatisticsService statisticsService;

        @GetMapping("/demands")
        public ResponseEntity<Statistics> retreiveDemandStatistics(){
            return statisticsService.retreiveDemandStatistics();
        }

        @GetMapping("/offers")
        public ResponseEntity<Statistics> retreiveOfferStatistics(){
                return statisticsService.retreiveOfferStatistics();
        }

}
