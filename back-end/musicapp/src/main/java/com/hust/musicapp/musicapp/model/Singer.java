package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "singer")
public class Singer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="singer_id")
    private Long id;

    @Column(name="singer_name")
    private String name;

    @Column(name="brief_description")
    private String description;

    @Column(name = "thumbnail")
    @Basic(fetch = FetchType.EAGER)
    private String thumbnail;

    @ManyToMany
    @JoinTable(name = "singer_song",joinColumns = @JoinColumn(name = "singer_id"),inverseJoinColumns =
    @JoinColumn(name = "song_id"))
//    @JsonBackReference
    @JsonIgnore
    private Set<Song> songs;

    @OneToMany(mappedBy = "singer",orphanRemoval = true,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Album> albums;

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }

    public Singer(String name, String description, Set<Song> songs, Set<Album> albums) {
        this.name = name;
        this.description = description;
        this.songs = songs;
        this.albums = albums;
    }

    public Singer(String name, String description, Set<Song> songs) {
        this.name = name;
        this.description = description;
        this.songs = songs;
    }

    public Singer(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Singer() {
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
}
