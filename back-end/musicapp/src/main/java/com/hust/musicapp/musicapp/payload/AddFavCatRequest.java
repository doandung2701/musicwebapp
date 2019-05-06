package com.hust.musicapp.musicapp.payload;

import java.io.Serializable;
import java.util.List;

public class AddFavCatRequest implements Serializable {

    private Long userId;
    private List<String> categoryIds;

    public AddFavCatRequest() {
    }

    public AddFavCatRequest(Long userId, List<String> categoryIds) {
        this.userId = userId;
        this.categoryIds = categoryIds;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<String> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<String> categoryIds) {
        this.categoryIds = categoryIds;
    }
}
