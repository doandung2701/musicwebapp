package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;
import java.util.Date;

public class PostReplyRequest implements Serializable {

    private Long parentId;

    private Long songId;

    private String cmtCnt;

    private Date repDate;

    private Long userId;

    public PostReplyRequest(Long parentId, Long songId, String cmtCnt, Date repDate, Long userId) {
        this.parentId = parentId;
        this.songId = songId;
        this.cmtCnt = cmtCnt;
        this.repDate = repDate;
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public PostReplyRequest(Long parentId, Long songId, String cmtCnt, Date repDate) {
        this.parentId = parentId;
        this.songId = songId;
        this.cmtCnt = cmtCnt;
        this.repDate = repDate;
    }

    public PostReplyRequest() {
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }

    public String getCmtCnt() {
        return cmtCnt;
    }

    public void setCmtCnt(String cmtCnt) {
        this.cmtCnt = cmtCnt;
    }

    public Date getRepDate() {
        return repDate;
    }

    public void setRepDate(Date repDate) {
        this.repDate = repDate;
    }
}
