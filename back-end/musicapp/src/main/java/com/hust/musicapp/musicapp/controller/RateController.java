package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Rate;
import com.hust.musicapp.musicapp.repository.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rate")
public class RateController {
    @Autowired
    private RateRepository rateRepository;

    @GetMapping
    List<Rate> getAllRate(){
        return rateRepository.findAll();
    }
    //se viet them api lien quan toi thong ke. rate cua 1 bai hat, xep top cac bai hat rate cao
}
