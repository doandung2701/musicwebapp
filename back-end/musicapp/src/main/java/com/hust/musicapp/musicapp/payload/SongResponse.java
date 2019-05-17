package com.hust.musicapp.musicapp.payload;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class SongResponse implements Serializable {

    private Long songId;

    private String songName;

    private Date uploadDate;

    private String songSrc;

    private String briefDesciption;

    private String thumbnail;

    private Long listenCount;

    private boolean checked;

    private Set<Author> authors;

    private Set<Singer> singers;

    private Set<Category> categories;

    private Long likeCount;

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

    Set<Long> likeUserIds;

    public String getSongSrc() {
        return songSrc;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
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

    public Long getListenCount() {
        return listenCount;
    }

    public void setListenCount(Long listenCount) {
        this.listenCount = listenCount;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Set<Singer> getSingers() {
        return singers;
    }

    public void setSingers(Set<Singer> singers) {
        this.singers = singers;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Set<Long> getLikeUserIds() {
        return likeUserIds;
    }

    public void setLikeUserIds(Set<Long> likeUserIds) {
        this.likeUserIds = likeUserIds;
    }

    public SongResponse(Song song
    ){
        songId=song.getSongId();
        songName=song.getSongName();
        songSrc=song.getSongSrc();
        thumbnail=song.getThumbnail();
        briefDesciption=song.getBriefDesciption();
        categories=song.getCategories();
        authors= song.getAuthors();
        uploadDate = song.getUploadDate();
        checked=song.isChecked();
        singers=song.getSingers();
        listenCount=song.getListenCount();
        likeUserIds = new HashSet<>();
        song.getLikeUsers().stream().forEach(user -> {
            likeUserIds.add(user.getId());
        });
        likeCount= Long.valueOf(song.getLikeUsers().size());
    }

}
