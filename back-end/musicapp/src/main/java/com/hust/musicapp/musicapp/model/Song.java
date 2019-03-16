package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="song")
public class Song implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private Long songId;

    @Column(name = "song_name")
    private String songName;

    @Column(name = "upload_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Column(name = "song_src")
    private String songSrc;

    @Column(name = "brief_description")
    private String briefDesciption;

    @Column(name="thumbnail")
    private String thumbnail;

    @Column(name = "checked",nullable = false,columnDefinition = "TINYINT",length = 1)
    private boolean checked;

    @ManyToMany
    @JoinTable(name = "author_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "author_id"))
    private Set<Author> authors;


    @ManyToMany
    @JoinTable(name = "singer_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "singer_id"))
    private Set<Singer> singers;

    @ManyToMany
    @JoinTable(name = "category_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "category_id"))
    private Set<Category> categories;

    @ManyToMany
    @JoinTable(name = "playlist_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "playlist_id",referencedColumnName = "playlist_id"))
    private Set<PlayList> playLists;

    @OneToMany(mappedBy = "song",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private Set<Comment> comments;

    @OneToMany(mappedBy = "song",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private Set<Rate> rates;

    public Song() {
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getSongSrc() {
        return songSrc;
    }

    public void setSongSrc(String songSrc) {
        this.songSrc = songSrc;
    }

    public String getBriefDesciption() {
        return briefDesciption;
    }

    public void setBriefDesciption(String briefDesciption) {
        this.briefDesciption = briefDesciption;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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

    public Set<Singer> getSinger() {
        return singers;
    }

    public void setSinger(Set<Singer> singers) {
        this.singers = singers;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(Set<PlayList> playLists) {
        this.playLists = playLists;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Rate> getRates() {
        return rates;
    }

    public void setRates(Set<Rate> rates) {
        this.rates = rates;
    }
}
