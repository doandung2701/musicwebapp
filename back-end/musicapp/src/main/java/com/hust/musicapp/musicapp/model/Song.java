package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.*;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="song")

public class Song implements Serializable {
    @ManyToMany
    @JoinTable(name = "user_like_song",inverseJoinColumns = @JoinColumn(name = "user_id"),
            joinColumns = @JoinColumn(name = "song_id"))
    @JsonIgnore
    private Set<User> likeUsers;

    public Set<User> getLikeUsers() {
        return likeUsers;
    }

    public void setLikeUsers(Set<User> likeUsers) {
        this.likeUsers = likeUsers;
    }

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

    @Column(name="listen_count",columnDefinition = "BIGINT default 0")
    private Long listenCount;

    @Column(name = "checked",nullable = false,columnDefinition = "TINYINT",length = 1)
    private boolean checked;

    @ManyToMany
    @JoinTable(name = "author_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "author_id"))
    @JsonIgnore
    private Set<Author> authors;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "singer_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "singer_id"))
    @JsonIgnore
    private Set<Singer> singers;

    @ManyToMany
    @JoinTable(name = "category_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "category_id"))
   @JsonIgnore
    private Set<Category> categories;

    @ManyToMany
    @JoinTable(name = "playlist_song",joinColumns = @JoinColumn(name = "song_id"),inverseJoinColumns =
    @JoinColumn(name = "playlist_id",referencedColumnName = "playlist_id"))
    @JsonIgnore
    private Set<PlayList> playLists;


    @OneToMany(mappedBy = "song",cascade = CascadeType.ALL,orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIgnore
    private Set<Comment> comments;

    @OneToMany(mappedBy = "song",orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIgnore
    private Set<Rate> rates;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "album_id")
    @JsonIgnore
    private Album album;

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    @Column(name = "like_count",columnDefinition = "BIGINT default 0")
    private Long likeCount;

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

    public Long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Long getListenCount() {
        return listenCount;
    }

    public void setListenCount(Long listenCount) {
        this.listenCount = listenCount;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Song song = (Song) o;
        return Objects.equals(songId, song.songId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(songId);
    }
}
