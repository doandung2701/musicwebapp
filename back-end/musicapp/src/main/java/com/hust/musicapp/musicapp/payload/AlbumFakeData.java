package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;

public class  AlbumFakeData implements Serializable {
    private Long id;
    private String title;
    private String cover;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }
}