package com.hust.musicapp.musicapp.payload;

import java.util.Date;

public interface SongPayload {
    public Long getSong_id() ;
    public String getBrief_description();
    public String getSong_name();
    public String getSong_src();
    public String getThumbnail();
    public Date getUpload_date();
    public Long getListen_count() ;
}
