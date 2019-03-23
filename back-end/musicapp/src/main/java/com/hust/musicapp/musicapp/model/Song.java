package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="song")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "songId")
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
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "song",orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Rate> rates;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Song() {
    }

    public Set<Singer> getSingers() {
        return singers;
    }

    public void setUpdateSong(Song s){
        this.songName = s.getSongName();
        this.categories = s.getCategories();
        this.comments =s.getComments();
        this.songSrc =s.getSongSrc();
        this.authors =s.getAuthors();
        this.playLists = s.getPlayLists();
        this.rates = s.getRates();
        this.singers = s.getSingers();
        this.briefDesciption =s.getBriefDesciption();
        this.thumbnail = s.getThumbnail();
    }

    public void setSingers(Set<Singer> singers) {
        this.singers = singers;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
