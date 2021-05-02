CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `vip` tinyint(4) NOT NULL,
  `steam_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='User and privileges';


CREATE TABLE `server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `typ` varchar(100) NOT NULL,
  `port` int(11) NOT NULL,
  `gotv_port` int(11) DEFAULT NULL,
  `rcon_pw` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `port_UNIQUE` (`port`),
  UNIQUE KEY `gotv_port_UNIQUE` (`gotv_port`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;