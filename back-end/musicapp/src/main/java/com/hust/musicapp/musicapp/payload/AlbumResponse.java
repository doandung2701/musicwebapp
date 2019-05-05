package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.Album;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;

import java.io.Serializable;
import java.util.Date;
import java.util.Iterator;

public class AlbumResponse implements Serializable {

    private Long id;
    private String albumName;
    private String thumbnail;
    private Date createdDate;
    private Integer songsCount;
    private Singer singer;
    private Integer likeCount = 0;
    private Long listenCount = 0l;

    public AlbumResponse(Album a) {

        id = a.getId();
        albumName = a.getAlbumName();
        thumbnail = a.getThumbnail();
        createdDate = a.getCreatedDate();
        songsCount = a.getSongs().size();
        singer = a.getSinger();
        Iterator<Song> iterator = a.getSongs().iterator();
        while (iterator.hasNext()){
            Song s = iterator.next();
            likeCount+=s.getLikeUsers().size();
            listenCount+=s.getListenCount();
        }
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Long getListenCount() {
        return listenCount;
    }

    public void setListenCount(Long listenCount) {
        this.listenCount = listenCount;
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

    public Integer getSongsCount() {
        return songsCount;
    }

    public void setSongsCount(Integer songsCount) {
        this.songsCount = songsCount;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }
}
