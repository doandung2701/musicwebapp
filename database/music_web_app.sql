-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema music_web_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema music_web_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `music_web_app` DEFAULT CHARACTER SET utf8 ;
USE `music_web_app` ;

-- -----------------------------------------------------
-- Table `music_web_app`.`author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`author` (
  `author_id` INT(11) NOT NULL AUTO_INCREMENT,
  `author_name` VARCHAR(255) NOT NULL,
  `brief_description` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`author_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`song` (
  `song_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `song_name` VARCHAR(512) NOT NULL,
  `upload_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `song_src` VARCHAR(2048) NOT NULL,
  `brief_description` MEDIUMTEXT NULL DEFAULT NULL,
  `thumbnail` VARCHAR(2048) NULL DEFAULT NULL,
  `checked` TINYINT(1) NOT NULL,
  PRIMARY KEY (`song_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`author_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`author_song` (
  `author_id` INT(11) NOT NULL,
  `song_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`author_id`, `song_id`),
  INDEX `fk_author_has_song_song1_idx` (`song_id` ASC),
  INDEX `fk_author_has_song_author1_idx` (`author_id` ASC),
  CONSTRAINT `fk_author_has_song_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `music_web_app`.`author` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_author_has_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`category` (
  `category_id` VARCHAR(10) NOT NULL,
  `category_name` VARCHAR(255) NOT NULL,
  `category_des` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_name` (`category_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`category_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`category_song` (
  `category_id` VARCHAR(10) NOT NULL,
  `song_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`category_id`, `song_id`),
  INDEX `fk_category_has_song_song1_idx` (`song_id` ASC),
  INDEX `fk_category_has_song_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_category_has_song_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `music_web_app`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_has_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_password` VARCHAR(255) NOT NULL,
  `create_date` DATE NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `gender` VARCHAR(10) NULL DEFAULT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `avartar` VARCHAR(1024) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `enabled` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email` (`user_email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`comments` (
  `cmt_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `song_id` BIGINT(20) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `cmt_cnt` LONGTEXT NOT NULL,
  `cmt_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parent_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`cmt_id`),
  INDEX `FK_CMT_USER` (`user_id` ASC),
  INDEX `FK_CMT_PROD` (`song_id` ASC),
  CONSTRAINT `FK_CMT_SONG`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_CMT_USER`
    FOREIGN KEY (`user_id`)
    REFERENCES `music_web_app`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`playlist` (
  `playlist_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `playlist_name` VARCHAR(512) NOT NULL,
  `thumbnail` VARCHAR(2048) NULL DEFAULT NULL,
  `playlist_description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`playlist_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`playlist_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`playlist_song` (
  `playlist_id` BIGINT(20) NOT NULL,
  `song_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`playlist_id`, `song_id`),
  INDEX `fk_playlist_has_song_song1_idx` (`song_id` ASC),
  INDEX `fk_playlist_has_song_playlist1_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_playlist_has_song_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music_web_app`.`playlist` (`playlist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`playlist_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`playlist_users` (
  `playlist_id` BIGINT(20) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `fk_playlist_has_users_users1_idx` (`user_id` ASC),
  INDEX `fk_playlist_has_users_playlist1_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_playlist_has_users_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music_web_app`.`playlist` (`playlist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `music_web_app`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`score_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`score_type` (
  `score_id` INT UNSIGNED NOT NULL,
  `score_value` DECIMAL NOT NULL,
  PRIMARY KEY (`score_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music_web_app`.`rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`rate` (
  `user_id` INT(11) NOT NULL,
  `song_id` BIGINT(20) NOT NULL,
  `score_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `song_id`, `score_id`),
  INDEX `fk_users_has_song_song1_idx` (`song_id` ASC),
  INDEX `fk_users_has_song_users1_idx` (`user_id` ASC),
  INDEX `fk_rate_score_type1_idx` (`score_id` ASC),
  CONSTRAINT `fk_users_has_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_song_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `music_web_app`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rate_score_type1`
    FOREIGN KEY (`score_id`)
    REFERENCES `music_web_app`.`score_type` (`score_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`roles` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name` (`role_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`rolesuser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`rolesuser` (
  `role_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  INDEX `FK_RU_USER` (`user_id` ASC),
  CONSTRAINT `FK_RU_ROLE`
    FOREIGN KEY (`role_id`)
    REFERENCES `music_web_app`.`roles` (`role_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_RU_USER`
    FOREIGN KEY (`user_id`)
    REFERENCES `music_web_app`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`singer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`singer` (
  `singer_id` INT(11) NOT NULL,
  `singer_name` VARCHAR(255) NOT NULL,
  `brief_description` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`singer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`singer_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`singer_song` (
  `singer_id` INT(11) NOT NULL,
  `song_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`singer_id`, `song_id`),
  INDEX `fk_singer_has_song_song1_idx` (`song_id` ASC),
  INDEX `fk_singer_has_song_singer1_idx` (`singer_id` ASC),
  CONSTRAINT `fk_singer_has_song_singer1`
    FOREIGN KEY (`singer_id`)
    REFERENCES `music_web_app`.`singer` (`singer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_singer_has_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `music_web_app`.`song` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `music_web_app`.`verificationtoken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music_web_app`.`verificationtoken` (
  `token_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(1024) NOT NULL,
  `expire_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE INDEX `token` (`token` ASC),
  INDEX `FK_VT_USER` (`user_id` ASC),
  CONSTRAINT `FK_VT_USER`
    FOREIGN KEY (`user_id`)
    REFERENCES `music_web_app`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
