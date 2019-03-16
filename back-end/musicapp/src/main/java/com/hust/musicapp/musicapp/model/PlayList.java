package com.hust.musicapp.musicapp.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name="playlist")
public class PlayList implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "playlist_id")
    private Long id;

    @Column(name="playlist_name")
    private String name;

    @Column(name="thumbnail")
    private String thumbnail;

    @Column(name="playlist_description")
    private String description;

    @ManyToMany
    @JoinTable(name = "playlist_song",joinColumns = @JoinColumn(name="playlist_id"),
    inverseJoinColumns = @JoinColumn(name = "song_id"))
    private Set<Song> songs;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public PlayList(String name, String thumbnail, String description) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.description = description;
    }

    public PlayList() {
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

    public User getUsers() {
        return user;
    }

    public void setUsers(User users) {
        this.user = users;
    }
}
