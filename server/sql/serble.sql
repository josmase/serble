CREATE DATABASE IF NOT EXISTS `serble`;
USE `serble`;
CREATE TABLE IF NOT EXISTS `settings` (
    `key`   VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`key`)
);

CREATE TABLE IF NOT EXISTS `group` (
    `group_id`       INT          NOT NULL AUTO_INCREMENT,
    `inheritance_id` INT          NULL,
    `title`          VARCHAR(45)  NOT NULL,
    `description`    VARCHAR(255) NOT NULL,
    `groupcol`       VARCHAR(45)  NULL,
    PRIMARY KEY (`group_id`),
    UNIQUE INDEX `group_title` (`title` ASC),
    INDEX `inheritance_id` (`inheritance_id` ASC),
    CONSTRAINT `inheritance_id`
    FOREIGN KEY (`inheritance_id`)
    REFERENCES `group` (`group_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `account` (
    `user_id`    INT         NOT NULL AUTO_INCREMENT,
    `group_id`   INT         NOT NULL,
    `username`   VARCHAR(45) NOT NULL,
    `password`   VARCHAR(61) NOT NULL,
    `email`      VARCHAR(45) NOT NULL,
    `ssn`        VARCHAR(45) NOT NULL,
    `accountcol` VARCHAR(45) NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `username` (`username` ASC),
    INDEX `group_id` (`group_id` ASC),
    CONSTRAINT `group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`group_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `profile` (
    `profile_id`   INT           NOT NULL AUTO_INCREMENT,
    `user_id`      INT           NULL,
    `firstname`    VARCHAR(45)   NULL,
    `lastname`     VARCHAR(45)   NULL,
    `city`         VARCHAR(45)   NULL,
    `email`        VARCHAR(45)   NULL,
    `phone`        VARCHAR(45)   NULL,
    `address`      VARCHAR(45)   NULL,
    `description`  VARCHAR(2048) NULL,
    `avatar_url`   VARCHAR(45)            DEFAULT '/img/avatars/default.png',
    `show_city`    TINYINT(1)    NOT NULL DEFAULT 1,
    `show_address` TINYINT(1)    NOT NULL DEFAULT 0,
    `show_age`     TINYINT(1)    NOT NULL DEFAULT 0,
    `show_email`   TINYINT(1)    NOT NULL DEFAULT 1,
    `show_phone`   TINYINT(1)    NOT NULL DEFAULT 0,
    `show_avatar`  TINYINT(1)    NOT NULL DEFAULT 1,
    PRIMARY KEY (`profile_id`),
    UNIQUE INDEX `user_id` (`user_id` ASC),
    CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `account` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `profile_rating` (
    `ratings_id` INT          NOT NULL AUTO_INCREMENT,
    `profile_id` INT          NOT NULL,
    `author_id`  INT          NULL,
    `rating`     INT          NULL,
    `comment`    VARCHAR(255) NULL,
    PRIMARY KEY (`ratings_id`),
    INDEX `profile_id` (`profile_id` ASC),
    INDEX `author_id` (`author_id` ASC),
    CONSTRAINT `profile_id`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `author_id`
    FOREIGN KEY (`author_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `profile_contact` (
    `contact_id`  INT NOT NULL AUTO_INCREMENT,
    `profile1_id` INT NOT NULL,
    `profile2_id` INT NOT NULL,
    PRIMARY KEY (`contact_id`),
    CONSTRAINT `profile1_id`
    FOREIGN KEY (`profile1_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `profile2_id`
    FOREIGN KEY (`profile2_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `advertisement` (
    `advert_id`       INT           NOT NULL AUTO_INCREMENT,
    `author_id`       INT           NOT NULL,
    `title`           VARCHAR(45)   NULL,
    `description`     VARCHAR(2048) NULL,
    `price`           INT           NULL,
    `category`        VARCHAR(45)   NULL,
    `contact`         VARCHAR(45)   NULL,
    `latitude`        DOUBLE        NULL,
    `longitude`       DOUBLE        NULL,
    `zipcode`         INT           NOT NULL,
    `neighborhood`    VARCHAR(45)   NULL,
    `city`            VARCHAR(45)   NULL,
    `date_creation`   DATETIME(6)   NULL,
    `date_expiration` DATETIME(6)   NULL,
    `archived`        TINYINT(1)    NOT NULL DEFAULT 0,
    `type`            TINYINT(1)    NOT NULL DEFAULT 0,
    `stage`           TINYINT(4)    NOT NULL DEFAULT 0,
    `file`            VARCHAR(50)   NULL DEFAULT "avatars/default.png",
    PRIMARY KEY (`advert_id`),
    CONSTRAINT `fk_author_id`
    FOREIGN KEY (`author_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `advertisement_participant` (
    `participation_id` INT        NOT NULL AUTO_INCREMENT,
    `participant_id`   INT        NOT NULL,
    `advert_id`        INT        NOT NULL,
    `is_active`        TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`participation_id`),
    INDEX `participant_id` (`participant_id` ASC),
    INDEX `advert_id` (`advert_id` ASC),
    CONSTRAINT `fk_participant_id`
    FOREIGN KEY (`participant_id`)
    REFERENCES `profile` (`profile_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `advert_id`
    FOREIGN KEY (`advert_id`)
    REFERENCES `advertisement` (`advert_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `group_privileges` (
    `privilege_id` INT          NOT NULL AUTO_INCREMENT,
    `group_id`     INT          NOT NULL,
    `title`        VARCHAR(255) NULL,
    `level`        TINYINT(4)   NULL,
    PRIMARY KEY (`privilege_id`),
    INDEX `group_id` (`group_id` ASC),
    CONSTRAINT `privilege_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`group_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
