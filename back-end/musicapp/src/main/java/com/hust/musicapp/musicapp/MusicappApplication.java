package com.hust.musicapp.musicapp;

import com.hust.musicapp.musicapp.config.AppProperties;
import com.hust.musicapp.musicapp.config.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppProperties.class, FileStorageProperties.class})
public class MusicappApplication {


    public static void main(String[] args) {
        SpringApplication.run(MusicappApplication.class, args);
    }

}
