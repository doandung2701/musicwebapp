package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "comments")
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cmt_id")
    private Long commentId;

    @Column(name = "cmt_cnt")
    private String commentCnt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="cmt_date")
    private Date commentDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private Comment parentCmt;

    @OneToMany(mappedBy = "parentCmt",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Comment> replies;

    @ManyToOne
    @JoinColumn(name = "song_id")
    @JsonIgnore
    private Song song;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Comment(String commentCnt, Date commentDate, Comment parentCmt, Set<Comment> replies) {
        this.commentCnt = commentCnt;
        this.commentDate = commentDate;
        this.parentCmt = parentCmt;
        this.replies = replies;
    }

    public Comment(String commentCnt, Date commentDate) {
        this.commentCnt = commentCnt;
        this.commentDate = commentDate;
    }

    public Comment() {
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getCommentCnt() {
        return commentCnt;
    }

    public void setCommentCnt(String commentCnt) {
        this.commentCnt = commentCnt;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public Comment getParentCmt() {
        return parentCmt;
    }

    public void setParentCmt(Comment parentCmt) {
        this.parentCmt = parentCmt;
    }

    public Set<Comment> getReplies() {
        return replies;
    }

    public void setReplies(Set<Comment> replies) {
        this.replies = replies;
    }
}
