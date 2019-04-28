package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class FakeDataResponse implements Serializable {
    private Long total;
    private String next;
    private List<SongFakePayload> data;

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public List<SongFakePayload> getData() {
        return data;
    }

    public void setData(List<SongFakePayload> data) {
        this.data = data;
    }
}
