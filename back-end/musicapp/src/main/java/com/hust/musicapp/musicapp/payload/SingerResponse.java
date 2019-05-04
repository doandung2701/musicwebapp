package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.Singer;

import java.io.Serializable;

public class SingerResponse implements Serializable {

    private Long id;

    private String name;

    private Long songCount;

    private String description;

    private String thumbnail;

    public SingerResponse(Singer s) {
        id = s.getId();
        name = s.getName();
        description = s.getDescription();
        thumbnail = s.getThumbnail();
    }

    public SingerResponse() {
    }

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

    public Long getSongCount() {
        return songCount;
    }

    public void setSongCount(Long songCount) {
        this.songCount = songCount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
