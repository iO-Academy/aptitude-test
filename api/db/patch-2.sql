ALTER TABLE `user` ADD `showTimer` TINYINT(1) NULL DEFAULT '1' AFTER `category_id`;

UPDATE `user` SET `showTimer` = 1;

ALTER TABLE `user` CHANGE `showTimer` `showTimer` TINYINT(1)  NOT NULL  DEFAULT '1';