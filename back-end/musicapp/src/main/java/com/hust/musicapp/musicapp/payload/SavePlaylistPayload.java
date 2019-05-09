package com.hust.musicapp.musicapp.payload;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

public class SavePlaylistPayload implements Serializable {

    private Long userId;

    private String name;

    private String description;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
