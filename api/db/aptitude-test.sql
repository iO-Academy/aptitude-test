# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.31)
# Database: aptitude-test
# Generation Time: 2020-10-29 08:50:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`)
VALUES
	(1,'Student'),
	(2,'Trainer'),
	(3,'example');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option1` text NOT NULL,
  `option2` text NOT NULL,
  `option3` text,
  `option4` text,
  `option5` text,
  `answer` tinyint(11) NOT NULL,
  `test_id` int(11) unsigned NOT NULL DEFAULT '1',
  `deleted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `testId` (`test_id`),
  CONSTRAINT `testId` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;

INSERT INTO `question` (`id`, `text`, `option1`, `option2`, `option3`, `option4`, `option5`, `answer`, `test_id`, `deleted`)
VALUES
	(1,'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.','516','308','87.84','198','337',5,1,0),
	(2,'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.','283','488','30.89','447','643',3,1,0),
	(3,'Nunc rhoncus dui vel sem.','907','729','69.56','203','513',2,1,0),
	(4,'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.','312','676','88.49','140','181',1,1,0),
	(5,'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.','954','286','85.79','267','534',2,1,0),
	(6,'Quisque ut erat. Curabitur gravida nisi at nibh.','606','746','89.46','329','697',2,1,0),
	(7,'Maecenas pulvinar lobortis est.','92','68','11.55','213','91',5,1,0),
	(8,'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.','881','66','16.18','231','523',2,1,0),
	(9,'Suspendisse potenti. Cras in purus eu magna vulputate luctus.','994','744','50.62','454','719',3,1,0),
	(10,'Etiam faucibus cursus urna.','146','905','50.85','384','614',2,1,0),
	(11,'Vestibulum ac est lacinia nisi venenatis tristique.','933','774','73.2','418','741',5,1,0),
	(12,'Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.','292','667','39.99','488','55',2,1,0),
	(13,'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.','82','381','8.92','458','527',3,1,0),
	(14,'Aenean auctor gravida sem.','360','65','22.54','329','145',1,1,0),
	(15,'Phasellus sit amet erat. Nulla tempus.','533','852','88.38','466','67',3,1,0),
	(16,'Phasellus id sapien in sapien iaculis congue.','375','604','72.76','175','294',3,1,0),
	(17,'Maecenas rhoncus aliquam lacus.','724','586','38.16','305','457',3,1,0),
	(18,'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.','487','325','90.92','352','694',3,1,0),
	(19,'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.','207','348','32.79','158','166',3,1,0),
	(20,'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.','533','301','16.99','336','767',2,1,0),
	(21,'Aenean auctor gravida sem.','114','465','','','',2,1,0),
	(22,'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.','520','705','82.08','78','209',3,1,0),
	(23,'Etiam faucibus cursus urna. Ut tellus.','836','537','86.18','319','169',1,1,0),
	(24,'Nullam molestie nibh in lectus.','434','397','60.08','220','354',5,1,0),
	(25,'Integer ac leo.','773','600','3.17','244','616',1,1,0),
	(26,'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.','895','951','11.09','312','360',5,1,0),
	(27,'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.','500','587','2.66','324','34',4,1,0),
	(28,'In est risus, auctor sed, tristique in, tempus sit amet, sem.','485','74','56.05','73','743',2,1,0),
	(29,'Donec dapibus.','10','622','73.41','6','388',3,1,0),
	(30,'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.','8','183','15.59','198','294',5,1,0),
	(31,'hsrtjhdty','dtyjdy','dtyj','','','',1,1,0),
	(32,'hsrtjhdty','dtyjdy','dtyj','','','',1,2,0),
	(33,'Tipdivub pa deb huzija paj sarjom moewi zet mi neonja fuaj git idra. Deke zo bal si pebatomoj bewu eboni gusazre bavi vemuku mip nal vef. Bainevu kogo gawujzu gawe seto cu owvuru tacapiv wi labovah nunelew guhror onasaddo anvaw. Lor azlus atjo cu cinuwu wiahzaf fac ojwuwu u','Iwcaij pon zarrel raleac meskewi isijopbew waud nibuca gergu suslebzo huzualo sodood huwi. Kid wefefahi diji sijku meide ma wu rokwe dev va pa zoce su moej. Hobnuofu da fogjeigu pufafra uge pigemuhu poel davtuz nekefi loscoj buzupake nudlohar fec mone te','Ziszamot nic dejsujfi jivusez arwa disapo cuzuap nelu ra am hifu zit toenuki hawciku dowed con zegoldi. Ikicazjil al fup liiwani topu evi oj bip rezufpog cogjibca pu padedowe fazda. Zo zisuj ziavohuh si filaduvu mihobje tanzu rodon at pakbu huw ila niftu bumfeomo ekozohu seguih dognun esamehbak. Neohjop hunezudu zimleh ak hat ula ma apiru','Ramunrap ha fiog zaw wi us fiuwru he muhvu ebu pumubow guuni kulejlam ge ezasebih fivofo faw tiwji. Culbufheb wehirow copgog itipo canoju fo loharor bejnuho gosazcop onavipwab ki warefu cupebul. Olraw sucadoh wefbujefu bu ur unac cur jesveh hucu ze sesci zekdiri viteg. Polam per ed ive marwicolo su','Uvufaz ju kosje gippauzi laniwcub ej ahiwigbaw izloc ificop tin ritkajwa vin peson. Seppebna eccelwu seli dogumco eziwik co dib weri felolebi uvogop cojiltu la bahmu wejo hezzub uhu ipdiza. So limfipfi riwocu gag kazeb usukikwim fubmi or udruktuc kulep nidev vorosmul tif jugtude muldob buc zewivoj. Nu cot acubohu paakli depbugcuj ozeje feugowa rar zuziwe tebwibsek fikecato puwutal aciparjal otavavip hetwo hefmit. Iki fe woica ob romafa uhid','Suczo lukago bis poju kathih feg ozo hiveum ku toro ibkoha nijromif ew akiwiv we jauki. Ihion covfepe hubfo wakcij pebazdo bi wapikka teher askeb ge solcubluv ikoebbi houfesu to. Ga cej josuzo ewaho zegil ot ju voomepop bejav uja joshak tan. Ajwi mapafi wiv anh',3,3,0),
	(34,'Pes vekpudu pudhela sajuc vildus wow zalwudew fumdihe edin bal ba zu souno zic codaw huibuzi. Cib tamzih okarurfeg famsulta asapo ekhahwi dos puna nebliila givo fiodu me. Zamozbaw zovodoc zizbam zecjaz badpiz ven ahzi kovidufir ukfe esuer fin pujjutad. Oco riwac avopeg sa waf nukucla si egeka bowu je kub ufpe ocicov hatmocil sohhukwe u','Pejki al bozo peva catroc kedwus zibne vaideuva ezag la mehjis posed nuser veb. Eloli wuzozi nom sap decgepan gi tat wunli ju wemam wotuzil cu ir. Wut zaf saliviwi roofe kel niscaffi bot rep tonge imego ojemav levatcu mulbekan miwfid. Womarjif dapreccip suz icoruwam joz ubi welab etasoupi mavube hezbikez hojuvad ir. Sep tewepte ruptihsep pekod muedpu ted wod wi ruv uvzu fekek cimet huj limotenon nonnufiju ticiv tezihi ibi. Cocom nohaobo uvi wabjifij zawowag lukojsa am he nehu betrup cu m','Hot tuwurzo tud febo golca upzal sebavo ilujejro bobneb luwudi gitfogig pudukso poedoje umipiwo ekmaz. Raipbiv leldin li','Ru oz ilaobse cuf gaig katguve ojiwuag ficnos fapisi pitorwe dozsa oduakate mecla wehop oberimni. Eru lal ezujjen idkup bebi nod mowbofcub toowgo udi zuib kez uvpohwac id vapsen lecu vusopi osvi urubuj. Lovob zednifna pusgib beahu nomive ci ozitekezi gegnino dutpinrem dedva upfewad ocuoguso fegin suha nigwu lus va foshur. Joefazu mujles no pohu getgimik dafki vahefpi po ihcozfo teztotneh jaojukaf amfi ca bikfe ikofuz omvo rek se. Vitso ri ih cug numju so ucfub','Jookigu pa mipkomot italupej hod te ce hupeob uda ne pam code subuclu ti tec. Jok za tip ovifod cewal su kometejuj ehiudog nupkos dizel mooc ahiizi eczow fohif buke lih. Ke regibbal aczow cemedga gavjopma wiw juogema gum gorekosel cuisu depze ud. Era juwlaus oza ofajigtu tot agusi asu go wa nikid jag ceknim eveigloc di tidosbu. Cuc pikalap baltibal ul jeni havhov atleg le tivi ihrav imufu ko','Li eguvefora julo mi bohzoktu lewot vul gi na uvlahu do rusvajgi vor odu la pacohtaz. Tavikra avecivub ar onusep avzevu zujo zevu jagi aji nafhopo seoblo ci fowhic namo. Eh ehhuknaw zaw ubtidmak ugcuzur kalbugtuc ke usri amuitabef pa ik bik ma napana necaba memar hiuge mezde. Bo jemhubto zizizva obsifu fibefsi orsoj ecutiin migizico mimbivve peun beju juguf puva. Lu ',2,1,0),
	(35,'Waucal roho tezi rohuho lebet haz hus kohok gakojne ruzvivi sitkev naufva. Go lab biamfoj kule lim mi ifiga da od diuredi zak bebefviz og. Se vujim vodom pu uvhes karzagoz larbojze ucuru ha opcij sopuswi hivseb. Lo covit ewu darogta kudvem eco wu uwsaodi owlihaj huhvabda mugacaw piwanagow pujopun. Eroec el ha inwowuz delpunog sov do efudilni uhozamko zevhaezi huv ejni rilbujew. Nas lad zon ucewa fo vacehi uw man','Ne vewahe fiv co ake diveleza murve oweke vokudur gotup tanup rucuhu ki fine heuhi cenape sekaj jolpes. Irudogzi du agu debo niupe ral vogha hosgikbos ajjuwnas nasolsub col supoke genr','Fa runfi vikhov fodaroki duhedeje muito inzo ewva vawusde peguc divaw fuwhi ga deludu futi ugotudec ra johreda. Badcaw wurjiz nemne neufnu duzidja foshon cow ninedfo eg rupu cu wa. Mi gumor to lo libcepwad diefu roku miihoih ihiesi ifo wujziv zir met nejzowto. Ighe zel onneba joje gilemwuf imalazu lamkerdo ocoba meji lumihpa du li beg geir pok. Lutbi piafu sajpo uv tenpu guvog amtareto werzuz fip is nepkot ','Uva doj nadbecuge nuzik efojujav fihiho roraz ko secbuker ezehu jig lu udoron ocrioj. Dihwij dog suzezo lasnomep puivial hekva otana iro en dup norrappe edjoro wobtout ugihu pil ficec. Sazebojan raiza vidta iv veutmi mos ethe na alve ne nicoh fitac ewleh ditujojaj saw dudil jocci. Bapzu zaw bur rog va vo weh totuboluw etu kel gamahweg cifaprup pisrilu naj. Bi gusis so','Nazo zawoztem rijhem supdempum ase akafiak pekik zam bo ackagjit jovuc kipdatpa jiado. Hozurug ocu connuv mu bino mabolcah ruhukidar bewom iste maf kihariv vi toogivi fiwoga pom esamgib zo. Non tatuhuk uksinwu zazodu gapgawke aznumrus buhas e','Seil mead ir vifwec biweze vek gejpebenu laburgeh ma ip dibki leflafoso. Nidep cepovras cito ekbal coev dapamufa di adi ba nofugdi zotufda seam somles joikujed jezpav udki. Do ziijcer jeoli se baodu wa tod cew zeweha mauce mo ha uhuep raj egjizwi. Isa avawota ekgowhab ofe vunov bafri heragzu de mo daved paja jikagoz lom luhuh la mapivol rufzu. Uruniwu foz ful ulomeis anitu sifaf tozoni bilagbev zig fe bi erigesrif ujoz pin. Lu cauveho nesuzbot fob avumobi nishik f',2,1,0);

/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table result
# ------------------------------------------------------------

DROP TABLE IF EXISTS `result`;

CREATE TABLE `result` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `answers` text NOT NULL,
  `userTestNotes` text,
  `score` int(11) NOT NULL,
  `time` float(4,2) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `testLength` int(11) NOT NULL,
  `autoCompleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;

INSERT INTO `result` (`id`, `uid`, `answers`, `userTestNotes`, `score`, `time`, `dateCreated`, `testLength`)
VALUES
	(19,21,'\"{\\\"1\\\":{\\\"answerID\\\":\\\"5\\\",\\\"isCorrect\\\":true},\\\"2\\\":{\\\"answerID\\\":\\\"3\\\",\\\"isCorrect\\\":true},\\\"3\\\":{\\\"answerID\\\":\\\"3\\\"},\\\"4\\\":{\\\"answerID\\\":\\\"2\\\"},\\\"5\\\":{\\\"answerID\\\":\\\"5\\\"},\\\"6\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"7\\\":{\\\"answerID\\\":\\\"5\\\",\\\"isCorrect\\\":true},\\\"8\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"9\\\":{\\\"answerID\\\":\\\"3\\\",\\\"isCorrect\\\":true},\\\"10\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"11\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"12\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"13\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"14\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"15\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"16\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"17\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"18\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"19\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"20\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"21\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"22\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"23\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"24\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"25\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"26\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"27\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"28\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"29\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"30\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"31\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"34\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"35\\\":{\\\"answerID\\\":\\\"5\\\"}}\"',NULL,7,1.15,'2020-10-29 08:45:02',33),
	(20,19,'\"{\\\"1\\\":{\\\"answerID\\\":\\\"1\\\"},\\\"2\\\":{\\\"answerID\\\":\\\"1\\\"},\\\"3\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"4\\\":{\\\"answerID\\\":\\\"2\\\"},\\\"5\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"6\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true},\\\"7\\\":{\\\"answerID\\\":\\\"5\\\",\\\"isCorrect\\\":true},\\\"8\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"9\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"10\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"11\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"12\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"13\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"14\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"15\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"16\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"17\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"18\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"19\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"20\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"21\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"22\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"23\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"24\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"25\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"26\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"27\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"28\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"29\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"30\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"31\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"34\\\":{\\\"answerID\\\":\\\"unanswered\\\"},\\\"35\\\":{\\\"answerID\\\":\\\"2\\\",\\\"isCorrect\\\":true}}\"',NULL,5,0.34,'2020-10-29 08:46:45',33);

/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table setting
# ------------------------------------------------------------

DROP TABLE IF EXISTS `setting`;

CREATE TABLE `setting` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `value` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;

INSERT INTO `setting` (`id`, `name`, `value`)
VALUES
	(1,'default_time','10');

/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table test
# ------------------------------------------------------------

DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `time` int(11) NOT NULL DEFAULT '1800',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;

INSERT INTO `test` (`id`, `name`, `time`, `created`)
VALUES
	(1,'Aptitude test v1',1800,'2019-10-19 12:24:35'),
	(2,'Example',1800,'2019-10-22 13:53:27'),
	(3,'jhgf',1800,'2019-10-23 16:29:27'),
	(4,'Fred',180,'2020-04-20 08:59:34');

/*!40000 ALTER TABLE `test` ENABLE KEYS */;
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
  `time` int(11) NOT NULL DEFAULT '1800',
  `test_id` int(11) unsigned NOT NULL DEFAULT '1',
  `category_id` int(11) unsigned NOT NULL DEFAULT '1',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user-testId` (`test_id`),
  KEY `user-catId` (`category_id`),
  CONSTRAINT `user-catId` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `user-testId` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `name`, `dateCreated`, `isAdmin`, `canRetake`, `time`, `test_id`, `category_id`, `deleted`)
VALUES
	(1,'hello@mayden.academy','Admin','2019-10-19 14:43:43',1,0,0,1,1,0),
	(15,'aaa@aaaa.com','aa','2020-10-29 08:42:38',0,1,1800,1,1,0),
	(16,'billy@nilly.com','Billy','2020-10-29 08:42:56',0,1,1800,1,1,0),
	(17,'bob@bob.com','bob','2020-10-29 08:43:02',0,1,1800,1,1,0),
	(18,'burble@murble.com','burble','2020-10-29 08:43:10',0,1,1800,1,1,0),
	(19,'user@face.co.uk','userface','2020-10-29 08:46:45',0,0,1800,1,1,0),
	(20,'ddd@ddd.com','ddd','2020-10-29 08:43:27',0,1,1800,1,1,0),
	(21,'yous@mes.com','yous','2020-10-29 08:45:02',0,0,1800,1,1,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
