package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;

import java.io.Serializable;
import java.util.Set;

public class UserResponse implements Serializable {

    private Long id;

    private String name;

    private String email;

    private String imageUrl;

    private Set<Song> likeSongs;

    private Set<PlayList> playLists;

    private Integer songCount;

    private Set<Category> favoriteCategory;

    public UserResponse(User u) {
        id = u.getId();
        name = u.getName();
        email = u.getEmail();
        imageUrl = u.getImageUrl();
        likeSongs = u.getLikeSongs();
        playLists = u.getPlayLists();
        favoriteCategory = u.getFavoriteCategory();
        songCount = u.getSongs().size();
    }

    public UserResponse() {
    }

    public Long getId() {
        return id;
    }

    public Set<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(Set<PlayList> playLists) {
        this.playLists = playLists;
    }

    public Integer getSongCount() {
        return songCount;
    }

    public void setSongCount(Integer songCount) {
        this.songCount = songCount;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<Song> getLikeSongs() {
        return likeSongs;
    }

    public void setLikeSongs(Set<Song> likeSongs) {
        this.likeSongs = likeSongs;
    }

    public Set<Category> getFavoriteCategory() {
        return favoriteCategory;
    }

    public void setFavoriteCategory(Set<Category> favoriteCategory) {
        this.favoriteCategory = favoriteCategory;
    }
}
