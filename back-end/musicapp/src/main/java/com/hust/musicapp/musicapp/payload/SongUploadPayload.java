package com.hust.musicapp.musicapp.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.musicapp.musicapp.model.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public class SongUploadPayload implements Serializable {
    private String songName;
    private String briefDesciption;
    private boolean checked;
    private List<Author> authors;
    private List<Singer> singers;
    private List<Category> categories;
    private Long user;

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

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public List<Singer> getSingers() {
        return singers;
    }

    public void setSingers(List<Singer> singers) {
        this.singers = singers;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }
}
