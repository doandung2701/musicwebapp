package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "category")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "categoryId")
public class Category implements Serializable {

    @Id
    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name="categoryDes")
    private String categoryDes;

    @ManyToMany
    @JoinTable(name = "category_song",joinColumns = @JoinColumn(name = "category_id"),inverseJoinColumns =
    @JoinColumn(name = "song_id"))
    @JsonIgnore
    private Set<Song> songs;

    public Category(String categoryId, String categoryName, String categoryDes, Set<Song> songs) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDes = categoryDes;
        this.songs = songs;
    }

    public Category(String categoryId, String categoryName, String categoryDes) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDes = categoryDes;
    }

    public Category() {
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDes() {
        return categoryDes;
    }

    public void setCategoryDes(String categoryDes) {
        this.categoryDes = categoryDes;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }
}
