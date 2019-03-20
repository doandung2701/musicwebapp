package com.hust.musicapp.musicapp.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageableUtil {

    public static Pageable getPageable(Integer page, Integer rows, String order, String direction){
        Pageable pageable = null;
        Sort sort = null;
        if (order == null && direction == null) {
            pageable = PageRequest.of(page - 1, rows);
        } else if (order != null && direction != null) {
            if (direction.equalsIgnoreCase("desc")) {
                sort = new Sort(Sort.Direction.DESC, order);
            } else {
                sort = new Sort(Sort.Direction.ASC, order);
            }
            pageable = PageRequest.of(page - 1, rows, sort);
        } else {
            pageable = PageRequest.of(page - 1, rows);
        }
        return pageable;
    }

}
