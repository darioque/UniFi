DROP DATABASE IF EXISTS unifi_db;
CREATE DATABASE unifi_db;
USE unifi_db;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ticker` varchar(10) NOT NULL,
  `price` decimal(24,12) DEFAULT NULL,
  `price_change_24` float DEFAULT NULL,
  `supply` bigint(20) DEFAULT NULL,
  `mcap` bigint(20) DEFAULT NULL,
  `logo` varchar(255) NOT NULL DEFAULT '/img/assets/default_logo.svg',
  `type_id` int(10) unsigned NOT NULL,
  `state_id` int(10) unsigned NOT NULL,
  `description` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assets_type_id_foreign` (`type_id`),
  KEY `states_id_foreign` (`state_id`),
  CONSTRAINT `assets_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`),
  CONSTRAINT `states_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `address` char(42) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '/img/users/default_avatar.svg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `assets_users`
--

DROP TABLE IF EXISTS `assets_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `asset_id` int(10) unsigned NOT NULL,
  `amount` decimal(24,12) NOT NULL DEFAULT 0.000000000000,
  PRIMARY KEY (`id`),
  KEY `assets_users_user_id_foreign` (`user_id`),
  KEY `assets_users_asset_id_foreign` (`asset_id`),
  CONSTRAINT `assets_users_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`),
  CONSTRAINT `assets_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `amount` decimal(24,12) NOT NULL,
  `price` decimal(24,12) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `input_asset_id` int(10) unsigned NOT NULL,
  `output_asset_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `input_asset_id` (`input_asset_id`),
  KEY `output_asset_id` (`output_asset_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`input_asset_id`) REFERENCES `assets` (`id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`output_asset_id`) REFERENCES `assets` (`id`),
  CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;




