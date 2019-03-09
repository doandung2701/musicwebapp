

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255)  NOT NULL,
  `last_name` varchar(255)  NOT NULL,
  `user_email` varchar(255)  NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `create_date` date NOT NULL,
  `address` varchar(255)  DEFAULT NULL,
  `gender` varchar(10)  DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `avartar` varchar(1024)  DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  enabled tinyint(1) default 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
);

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
);

CREATE TABLE `rolesuser` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `FK_RU_USER` (`user_id`),
  CONSTRAINT `FK_RU_ROLE` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_RU_USER` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

create table verificationtoken(
	token_id bigint auto_increment primary key,
    token nvarchar(1024) not null unique,
    expire_date timestamp not null,
    user_id int not null ,
    constraint FK_VT_USER foreign key (user_id) references users(user_id)
);

CREATE TABLE `category` (
  `category_id` varchar(10) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_des` longtext,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ;

create table song(
	song_id bigint auto_increment primary key,
    song_name nvarchar(512) not null,
    upload_date timestamp not null,
    song_src nvarchar(2048) not null,
    brief_description mediumtext default null,
    thumbnail nvarchar(2048) default null,
    checked tinyint(1) not null
);

CREATE TABLE `comments` (
  `cmt_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `song_id` bigint NOT NULL,
  `user_id` int(11) NOT NULL,
  `cmt_cnt` longtext  NOT NULL,
  `cmt_date` timestamp NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `FK_CMT_USER` (`user_id`),
  KEY `FK_CMT_PROD` (`song_id`),
  CONSTRAINT `FK_CMT_SONG` FOREIGN KEY (song_id) REFERENCES song(song_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_CMT_USER` FOREIGN KEY (`user_id`) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table playlist (
	playlist_id bigint auto_increment primary key,
    playlist_name nvarchar(512) not null,
    thumbnail nvarchar(2048) default null,
    playlist_description mediumtext default null
)

