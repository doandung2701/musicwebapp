package com.hust.musicapp.musicapp.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="rate")
public class Rate implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name="score_id")
    private ScoreType scoreType;

    @Id
    @ManyToOne
    @JoinColumn(name="song_id")
    private Song song;

    public Rate(User user, ScoreType scoreType, Song song) {
        this.user = user;
        this.scoreType = scoreType;
        this.song = song;
    }

    public Rate() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScoreType getScoreType() {
        return scoreType;
    }

    public void setScoreType(ScoreType scoreType) {
        this.scoreType = scoreType;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }
}
