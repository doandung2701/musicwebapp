package com.hust.musicapp.musicapp.payload;
import java.io.Serializable;
import java.util.Date;

public interface TrendingSong {

    public Long getSong_id() ;
    public String getBrief_description();
    public String getSong_name();
    public String getSong_src();
    public String getThumbnail();
    public Date getUpload_date();
    public Long getListen_count() ;
    public Long getRate_count();
    public Long getRate_value();


}
