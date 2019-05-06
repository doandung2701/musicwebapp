package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.Album;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class AlbumPayload implements Serializable {

    private Long id;
    private String albumName;
    private String thumbnail;
    private Date createdDate;
    private Set<Song> songs;
    private Singer singer;
    public AlbumPayload(){

    }
    public AlbumPayload(Album album){
        id=album.getId();
        albumName=album.getAlbumName();
        thumbnail=album.getThumbnail();
        createdDate=album.getCreatedDate();
        songs=album.getSongs();
        singer=album.getSinger();
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

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }
}
