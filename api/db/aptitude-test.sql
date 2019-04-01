# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.38)
# Database: aptitude-test
# Generation Time: 2019-04-01 14:37:43 +0000
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
	(1,'John thought of a number, added 8, multiplied by 4, took away 11, and divided by 9 to get 5. What was the number John thought of?','5','6','7','8','9',2,0),
	(2,'What is 1/2 of 1/10 of 1/4 of 480?','5','6','7','8','9',2,0),
	(3,'What is the obtuse angle between the hands of a clock at 10:30?','115','120','125','130','135',5,0),
	(4,'Bicycle is to handlebars as car is to _____.','transmission','steering wheel','rear-view mirror','tire','engine',2,0),
	(5,'22 is to 555 as 55 is to ____.','777','999','888','333','1000',3,0),
	(6,'Green is to yellow as purple is to ____.','orange','yellow','black','green','red',5,0),
	(7,'MEAT is to TEAM as 3521 is to ____.','1523','5312','2135','3251','1235',1,0),
	(8,'He is to she as him is to ____.','hers','her','them','they','his',2,0),
	(9,'Nineteenth','incorrect','correct','','','',1,0),
	(10,'July2001','incorrect','correct','','','',2,0),
	(11,'WareZ','incorrect','correct','','','',1,0),
	(12,'zone5','incorrect','correct','','','',1,0),
	(13,'2cat3','incorrect','correct','','','',2,0),
	(14,'An animal in A _____','is a mammal or a bird','is most likely a mammal','is most likely not a mammal','cannot be a bird','could be any kind of animal',5,0),
	(15,'An animal in D _____','does not lay eggs','is a reptile','is either an amphibian or a fish','is discarded','could be a mammal',3,0),
	(16,'The instructions in E are _____','Add to fish list','Is it a bird?','Take another animal','Add to reptile list','Count animals',1,0),
	(17,'An animal in C ____','is discarded','is either a reptile or a fish','is an amphibian','is not a mammal','does not lay eggs',4,0),
	(18,'The instructions in B are _____','Does it have fur?','Add to fish list','Does it have feathers?','Does it have scales?','Can it swim',3,0),
	(19,'Mario has a better grade in a class than Luigi. Bowser has a worse grade than Mario. Which of the following must be true?','Bowser has a worse grade than Luigi','Bowser and Luigi have equally good grades','It is impossible to tell from this information whether Luigi or Bowser has a better grade','Luigi has a better grade than Bowswer','Bowser has a better grade than Luigi',3,0),
	(20,'If A < B and B + C = 10, then which of the following must be true? (A, B & C are all positive integers)','A < 10','A + B = 10','A > C','A = C','B < C',1,0),
	(21,'It takes 5 window-washers 7 hours to wash one office building.  How many hours would it take if only 4 window-washers had to wash the building?','11','10 1/2','8 3/4','14','9',3,0),
	(22,'Making enough stew to feed 4 people requires 9 carrots. You want to make enough stew to feed 16 people. How many carrots do you need?','40 carrots','81 carrots','36 carrots','18 carrots','45 carrots',3,0),
	(23,'Tanya is older than Eric. Cliff is older than Tanya. Which of the following statements do we know is true?','John is younger than Tanya','Tanya is older than Cliff','Cliff is older than Eric','Eric and Cliff are the same age','Eric is older than Cliff',3,0),
	(24,'4, 16, 36, 64, _____. What comes next?','144','81','72','128','100',5,0),
	(25,'D, D, F, D, F, S, D, F, S, L, D, _____. What comes next?','D','B','F','L','S',3,0),
	(26,'121, 212, 221, 112, 1212, _____. What comes next?','2121','1211','2211','1222','1221',1,0),
	(27,'A, K, C, M, E, O, G, Q, I, _____. What comes next?','A','K','T','O','S',5,0),
	(28,'1, 180, 2, 90, 3, 60, 4, 45, 5, _____. What comes next?','30','36','40','6','25',2,0),
	(29,'What is the missing letter in this series:  y     d     j     w     f     l     u     h     ?\n','m','o','n','s','j',3,0),
	(30,'If the code for FORTRAN is GMUPWUU what is the code for PASCAL?','QYVYFG','QCVGFR','QCPGVR','GMPGFR','None of these',5,0);

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
	(10,2,'\"{\\\"1\\\":\\\"unanswered\\\",\\\"2\\\":\\\"unanswered\\\",\\\"3\\\":\\\"unanswered\\\",\\\"4\\\":\\\"unanswered\\\",\\\"5\\\":\\\"unanswered\\\",\\\"6\\\":\\\"unanswered\\\",\\\"7\\\":\\\"unanswered\\\",\\\"8\\\":\\\"unanswered\\\",\\\"9\\\":\\\"unanswered\\\",\\\"10\\\":\\\"unanswered\\\",\\\"11\\\":\\\"unanswered\\\",\\\"12\\\":\\\"unanswered\\\",\\\"13\\\":\\\"unanswered\\\",\\\"14\\\":\\\"unanswered\\\",\\\"15\\\":\\\"unanswered\\\",\\\"16\\\":\\\"unanswered\\\",\\\"17\\\":\\\"unanswered\\\",\\\"18\\\":\\\"unanswered\\\",\\\"19\\\":\\\"unanswered\\\",\\\"20\\\":\\\"unanswered\\\",\\\"21\\\":\\\"unanswered\\\",\\\"22\\\":\\\"unanswered\\\",\\\"23\\\":\\\"unanswered\\\",\\\"24\\\":\\\"unanswered\\\",\\\"25\\\":\\\"unanswered\\\",\\\"26\\\":\\\"unanswered\\\",\\\"27\\\":\\\"unanswered\\\",\\\"28\\\":\\\"unanswered\\\",\\\"29\\\":\\\"unanswered\\\",\\\"30\\\":\\\"unanswered\\\"}\"',0,30.02,'2018-11-01 17:01:39');

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
  `canRetake` tinyint(1) NOT NULL DEFAULT '0',
  `time` int(11) DEFAULT '1800',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `name`, `dateCreated`, `isAdmin`, `canRetake`, `time`, `deleted`)
VALUES
	(1,'emailme@mikeoram.co.uk','Mike','2019-04-01 13:51:00',1,0,NULL,0),
	(2,'test@test.co.uk','test223','2018-11-01 16:29:20',0,0,NULL,0),
	(3,'test2@test.com','test2','2019-04-01 13:51:00',0,0,NULL,1);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
