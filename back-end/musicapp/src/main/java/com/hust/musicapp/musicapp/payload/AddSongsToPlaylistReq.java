package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;
import java.util.List;

public class AddSongsToPlaylistReq implements Serializable {

    private List<Long> playlistIds;
    private List<Long> songId;
    private Long userId;

    public List<Long> getPlaylistIds() {
        return playlistIds;
    }

    public void setPlaylistIds(List<Long> playlistIds) {
        this.playlistIds = playlistIds;
    }

    public List<Long> getSongId() {
        return songId;
    }

    public void setSongId(List<Long> songId) {
        this.songId = songId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
