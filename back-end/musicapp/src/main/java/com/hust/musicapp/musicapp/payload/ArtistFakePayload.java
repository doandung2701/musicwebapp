package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;

public class  ArtistFakePayload implements Serializable {
    private Long id;
    private String name;
    private String picture;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
