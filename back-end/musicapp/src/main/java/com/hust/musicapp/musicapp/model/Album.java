package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.musicapp.musicapp.payload.AlbumPayload;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "album")
public class Album implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String albumName;
    @Column(nullable = true)
    private String thumbnail;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @OneToMany(mappedBy = "album")
//    @JsonIgnore
    private Set<Song> songs;

    @ManyToOne
    @JoinColumn(name = "singer_id")
//    @JsonIgnore
    private Singer singer;
    public Album(AlbumPayload albumPayload){
    id=albumPayload.getId()!=null?albumPayload.getId():null;
    albumName=albumPayload.getAlbumName();
    thumbnail=albumPayload.getThumbnail();
    createdDate=albumPayload.getCreatedDate();
    songs=albumPayload.getSongs();
    singer=albumPayload.getSinger();
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }


    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    public Album(){

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Album album = (Album) o;
        return Objects.equals(id, album.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
