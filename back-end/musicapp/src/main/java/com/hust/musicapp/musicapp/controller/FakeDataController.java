//package com.hust.musicapp.musicapp.controller;
//
//import com.hust.musicapp.musicapp.model.Author;
//import com.hust.musicapp.musicapp.model.PlayList;
//import com.hust.musicapp.musicapp.model.Song;
//import com.hust.musicapp.musicapp.payload.AlbumFakeData;
//import com.hust.musicapp.musicapp.payload.ArtistFakePayload;
//import com.hust.musicapp.musicapp.payload.FakeDataResponse;
//import com.hust.musicapp.musicapp.repository.AuthorRepo;
//import com.hust.musicapp.musicapp.service.AuthorService;
//import com.hust.musicapp.musicapp.service.PlayListService;
//import com.hust.musicapp.musicapp.service.SongService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("fakedata")
//@CrossOrigin("*")
//public class FakeDataController {
//    @Autowired
//    AuthorService authorService;
//    @Autowired
//    SongService songService;
//    @Autowired
//    PlayListService playListService;
//    @Autowired
//    AuthorRepo authorRepo;
//    @GetMapping
//    public String fakeData(@RequestParam String name){
//        RestTemplate restTemplate=new RestTemplate();
//        HttpHeaders httpHeaders=new HttpHeaders();
//        httpHeaders.add("X-RapidAPI-Host","deezerdevs-deezer.p.rapidapi.com");
//        httpHeaders.add("X-RapidAPI-Key","59ed400286msh144aa86b8df0086p1380dejsnaf5dfc0840d5");
//        HttpEntity<String> entity = new HttpEntity<String>("parameters", httpHeaders);
//        ResponseEntity<FakeDataResponse>response= restTemplate.exchange("https://deezerdevs-deezer.p.rapidapi.com/search?q="+name, HttpMethod.GET,
//                entity,FakeDataResponse.class);
//        FakeDataResponse fakeDataResponse=response.getBody();
//        Author author=new Author();
//        ArtistFakePayload artistFakePayload=fakeDataResponse.getData().get(0).getArtist();
//        author.setAuthorName(artistFakePayload.getName());
//        author.setThumbnai(artistFakePayload.getPicture());
//        Set<Song> songs =new HashSet<>();
//        fakeDataResponse.getData().forEach(data->{
//            Song song=new Song();
//            song.setSongName(data.getTitle());
//            song.setUploadDate(new Date());
//            song.setSongSrc(data.getPreview());
//            song.setBriefDesciption(data.getTitle());
//            song.setThumbnail("https://e-cdns-images.dzcdn.net/images/cover/893e13cdeefdea7b1ea046de70014dd6/330x330-000000-80-0-0.jpg");
//            song.setListenCount(0L);
//            song.setChecked(true);
//            Song songSaved=songService.save(song);
//            songs.add(songSaved);
//        });
//            author.setSongs(songs);
//        authorService.save(author);
////        AlbumFakeData albumFakeData=fakeDataResponse.getData().get(0).getAlbum();
//
//
//
//        return "OK";
//    }
//}
