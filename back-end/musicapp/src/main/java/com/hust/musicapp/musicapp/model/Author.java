package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name="author")
public class Author  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "author_name")
    private String authorName;

    @Column(name="brief_description")
    private String briefDescription;

    @ManyToMany
    @JoinTable(name = "author_song",joinColumns = @JoinColumn(name = "author_id"),inverseJoinColumns =
    @JoinColumn(name = "song_id"))
   // @JsonIgnore
    @JsonBackReference
    private Set<Song> songs;

    public Author(String authorName, String briefDescription, Set<Song> songs) {
        this.authorName = authorName;
        this.briefDescription = briefDescription;
        this.songs = songs;
    }


    public Author() {
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }
}
