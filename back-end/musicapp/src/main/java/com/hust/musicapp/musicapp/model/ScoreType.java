package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "score_type")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "scoreId")
public class ScoreType implements Serializable {

    @Id
    @Column(name="score_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scoreId;

    @Column(name="score_value")
    private Double scoreValue;

    @OneToMany(mappedBy = "scoreType",cascade = CascadeType.ALL)
    private Set<Rate> rates;

    public ScoreType(Double scoreValue, Set<Rate> rates) {
        this.scoreValue = scoreValue;
        this.rates = rates;
    }

    public ScoreType() {
    }

    public Long getScoreId() {
        return scoreId;
    }

    public void setScoreId(Long scoreId) {
        this.scoreId = scoreId;
    }

    public Double getScoreValue() {
        return scoreValue;
    }

    public void setScoreValue(Double scoreValue) {
        this.scoreValue = scoreValue;
    }

    public Set<Rate> getRates() {
        return rates;
    }

    public void setRates(Set<Rate> rates) {
        this.rates = rates;
    }
}
