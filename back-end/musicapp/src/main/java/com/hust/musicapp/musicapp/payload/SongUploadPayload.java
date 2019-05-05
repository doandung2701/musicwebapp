package com.hust.musicapp.musicapp.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.musicapp.musicapp.model.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

public class SongUploadPayload implements Serializable {
    private String songName;
    private String briefDesciption;
    private boolean checked;
    private Set<Author> authors;
    private Set<Singer> singers;
    private Set<Category> categories;
    private User user;

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getBriefDesciption() {
        return briefDesciption;
    }

    public void setBriefDesciption(String briefDesciption) {
        this.briefDesciption = briefDesciption;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Set<Singer> getSingers() {
        return singers;
    }

    public void setSingers(Set<Singer> singers) {
        this.singers = singers;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
