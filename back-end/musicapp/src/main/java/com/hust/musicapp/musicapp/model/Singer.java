package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "singer")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Singer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="singer_id")
    private Long id;

    @Column(name="singer_name")
    private String name;

    @Column(name="brief_description")
    private String description;

    @ManyToMany
    @JoinTable(name = "singer_song",joinColumns = @JoinColumn(name = "singer_id"),inverseJoinColumns =
    @JoinColumn(name = "song_id"))
    @JsonIgnore
    private Set<Song> songs;

    public Singer(String name, String description, Set<Song> songs) {
        this.name = name;
        this.description = description;
        this.songs = songs;
    }

    public Singer(String name, String description) {
        this.name = name;
        this.description = description;
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
