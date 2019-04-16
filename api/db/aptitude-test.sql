# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.43)
# Database: aptitude-test
# Generation Time: 2019-04-16 09:42:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option1` text NOT NULL,
  `option2` text NOT NULL,
  `option3` text NOT NULL,
  `option4` text NOT NULL,
  `option5` text NOT NULL,
  `answer` tinyint(11) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;

INSERT INTO `question` (`id`, `text`, `option1`, `option2`, `option3`, `option4`, `option5`, `answer`, `deleted`)
VALUES
	(1,'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.','516','308','87.84','198','337',5,0),
	(2,'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.','283','488','30.89','447','643',3,0),
	(3,'Nunc rhoncus dui vel sem.','907','729','69.56','203','513',2,0),
	(4,'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.','312','676','88.49','140','181',1,0),
	(5,'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.','954','286','85.79','267','534',2,0),
	(6,'Quisque ut erat. Curabitur gravida nisi at nibh.','606','746','89.46','329','697',2,0),
	(7,'Maecenas pulvinar lobortis est.','92','68','11.55','213','91',5,0),
	(8,'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.','881','66','16.18','231','523',2,0),
	(9,'Suspendisse potenti. Cras in purus eu magna vulputate luctus.','994','744','50.62','454','719',3,0),
	(10,'Etiam faucibus cursus urna.','146','905','50.85','384','614',2,0),
	(11,'Vestibulum ac est lacinia nisi venenatis tristique.','933','774','73.2','418','741',5,0),
	(12,'Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.','292','667','39.99','488','55',2,0),
	(13,'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.','82','381','8.92','458','527',3,0),
	(14,'Aenean auctor gravida sem.','360','65','22.54','329','145',1,0),
	(15,'Phasellus sit amet erat. Nulla tempus.','533','852','88.38','466','67',3,0),
	(16,'Phasellus id sapien in sapien iaculis congue.','375','604','72.76','175','294',3,0),
	(17,'Maecenas rhoncus aliquam lacus.','724','586','38.16','305','457',3,0),
	(18,'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.','487','325','90.92','352','694',3,0),
	(19,'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.','207','348','32.79','158','166',3,0),
	(20,'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.','533','301','16.99','336','767',2,0),
	(21,'Aenean auctor gravida sem.','114','465','','','',2,0),
	(22,'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.','520','705','82.08','78','209',3,0),
	(23,'Etiam faucibus cursus urna. Ut tellus.','836','537','86.18','319','169',1,0),
	(24,'Nullam molestie nibh in lectus.','434','397','60.08','220','354',5,0),
	(25,'Integer ac leo.','773','600','3.17','244','616',1,0),
	(26,'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.','895','951','11.09','312','360',5,0),
	(27,'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.','500','587','2.66','324','34',4,0),
	(28,'In est risus, auctor sed, tristique in, tempus sit amet, sem.','485','74','56.05','73','743',2,0),
	(29,'Donec dapibus.','10','622','73.41','6','388',3,0),
	(30,'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.','8','183','15.59','198','294',5,0);

/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table result
# ------------------------------------------------------------

DROP TABLE IF EXISTS `result`;

CREATE TABLE `result` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `answers` text NOT NULL,
  `score` int(11) NOT NULL,
  `time` float(4,2) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;

INSERT INTO `result` (`id`, `uid`, `answers`, `score`, `time`, `dateCreated`)
VALUES
	(10,2,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,30.02,'2018-11-01 17:01:39'),
	(11,4,'\"{\\\"1\\\":\\\"2\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',1,4.13,'2019-04-15 08:59:06'),
	(12,5,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,6.29,'2019-04-15 09:56:07'),
	(13,2,'\"{\\\"1\\\":\\\"3\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"3\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.58,'2019-04-16 08:39:50'),
	(14,2,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"5\\\"}\"',1,1.47,'2019-04-16 08:40:40'),
	(15,2,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"5\\\"}\"',1,2.42,'2019-04-16 08:41:35'),
	(16,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.08,'2019-04-16 08:49:29'),
	(17,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,1.13,'2019-04-16 08:50:34'),
	(18,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,1.57,'2019-04-16 09:01:16'),
	(19,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.06,'2019-04-16 09:04:13'),
	(20,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.09,'2019-04-16 09:14:41'),
	(21,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.09,'2019-04-16 09:15:32'),
	(22,9,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.06,'2019-04-16 09:30:58'),
	(23,9,'\"{\\\"1\\\":\\\"2\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"5\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',1,0.11,'2019-04-16 09:36:12'),
	(24,2,'\"{\\\"1\\\":\\\"3\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"5\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,0.10,'2019-04-16 09:38:02'),
	(25,2,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,1.06,'2019-04-16 09:38:58');

/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isAdmin` tinyint(1) DEFAULT '0',
  `canRetake` tinyint(1) NOT NULL DEFAULT '1',
  `time` int(11) DEFAULT '1800',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `name`, `dateCreated`, `isAdmin`, `canRetake`, `time`, `deleted`)
VALUES
	(1,'emailme@mikeoram.co.uk','Mike','2019-04-01 13:51:00',1,0,NULL,0),
	(2,'test@test.co.uk','test223','2019-04-16 09:41:59',0,1,1800,0),
	(3,'test2@test.com','test2','2019-04-16 09:42:11',0,0,1800,1),
	(4,'op@op.com','opopo','2019-04-15 08:59:20',0,1,1800,0),
	(5,'rtst@rtgs.com','test','2019-04-15 09:56:07',0,0,1800,0),
	(6,'rtst@rtgs.com','test','2019-04-15 09:22:28',0,1,1800,0),
	(7,'rtst@rtgs.com','test','2019-04-15 09:23:20',0,1,1809,0),
	(8,'rtst@rtgs.com','test','2019-04-15 09:23:43',0,1,1800,0),
	(9,'test6@test.com','danny','2019-04-16 09:36:12',0,0,1800,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
