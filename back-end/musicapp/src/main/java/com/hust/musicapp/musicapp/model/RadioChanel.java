package com.hust.musicapp.musicapp.model;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "radio_chanel")
@Entity
public class RadioChanel implements Serializable {

    @Column(name="chanel_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long songId;

    @Column(name = "chanel_name")
    private String songName;

    @Column(name = "chanel_src")
    private String songSrc;

    @Column(name = "thumbnail")
    private String thumbnail;

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getSongSrc() {
        return songSrc;
    }

    public void setSongSrc(String songSrc) {
        this.songSrc = songSrc;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}