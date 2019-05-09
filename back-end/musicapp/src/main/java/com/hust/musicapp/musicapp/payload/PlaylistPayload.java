package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class PlaylistPayload implements Serializable {

    private Long id;

    private String name;

    private String thumbnail;

    private String description;

    private Set<Song> songs;

    private User user;

    private Date createdDate;

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PlaylistPayload(PlayList playList) {
        this.id=playList.getId();
        this.description=playList.getDescription();
        this.name=playList.getName();
        this.songs=playList.getSongs();
        this.user=playList.getUser();
        this.thumbnail=playList.getThumbnail();
        this.createdDate = playList.getCreatedDate();
    }
}
