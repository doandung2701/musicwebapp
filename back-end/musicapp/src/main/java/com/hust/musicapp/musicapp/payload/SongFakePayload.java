package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;
import java.util.List;

public class SongFakePayload implements Serializable {
    private Long id;
    private Boolean readable;
    private String title;
    private String link;
    private Long duration;
    private Long rank;
    private String preview;
   ArtistFakePayload artist;
    AlbumFakeData album;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isReadable() {
        return readable;
    }

    public void setReadable(boolean readable) {
        this.readable = readable;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public Boolean getReadable() {
        return readable;
    }

    public void setReadable(Boolean readable) {
        this.readable = readable;
    }

    public ArtistFakePayload getArtist() {
        return artist;
    }

    public void setArtist(ArtistFakePayload artist) {
        this.artist = artist;
    }

    public AlbumFakeData getAlbum() {
        return album;
    }

    public void setAlbum(AlbumFakeData album) {
        this.album = album;
    }
}


