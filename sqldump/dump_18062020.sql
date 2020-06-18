CREATE DATABASE  IF NOT EXISTS `grabbit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grabbit`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: grabbit
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `type` int unsigned NOT NULL,
  `store_id` int unsigned NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product__store_id_fk_idx` (`store_id`),
  KEY `product__type_fk_idx` (`type`),
  CONSTRAINT `product__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `product__type_fk` FOREIGN KEY (`type`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Sandwich m. skinke ost',25.00,3,1,'Skinke ost sandwich fyldt med lækker grønt.','2020-05-31 13:20:35','2020-06-17 19:34:28'),(2,'Pastasalat m. kylling bacon',20.00,4,1,'Frisk hjemmelavet pastasalat med tandoori kylling og bacon.','2020-05-31 14:31:32','2020-06-17 17:59:03'),(3,'Granola bar m. chokolade',10.00,5,1,'Perfekt snack til at oplade din energi på en sen eftermiddag.','2020-05-31 14:39:43','2020-06-17 18:17:52'),(4,'Kildevand',19.00,1,1,'Aqua d\'Or, 50 Cl. uden brus.','2020-05-31 14:43:27','2020-06-17 19:58:34'),(5,'Kartoffelsalat',25.00,4,2,'Klassisk kold kartoffelsalat med friskklippet purløg.','2020-05-31 15:15:11','2020-06-17 17:59:03'),(6,'Flæskestegssandwich',30.00,3,2,'Varm flæskesteg med rødkål og argukesalat i foccaciabolle.','2020-05-31 15:17:53','2020-06-17 19:31:24'),(7,'Granola bar',10.00,5,1,'Med peanut og chokolade.','2020-06-17 18:00:43','2020-06-17 19:31:24'),(8,'Coca-Cola',20.00,1,1,'50 Cl.','2020-06-17 18:01:33','2020-06-17 19:31:24'),(9,'Kaffe',15.00,1,1,'60 Cl.','2020-06-17 18:04:32','2020-06-17 19:48:16'),(10,'Sandwich m. kylling',25.00,3,1,'Tandoori kylling med frisk grønt og chili dressing.','2020-06-17 19:34:12',NULL),(11,'Pepsi Max',10.00,1,1,'33 Cl.','2020-06-17 19:38:45',NULL),(12,'Banan',5.00,10,1,'Økologisk banan fra den dominikanske republik.','2020-06-17 19:40:11',NULL),(13,'Æble',6.00,10,1,'Pinova æble fra Italien.','2020-06-17 19:42:40',NULL),(14,'Club Sandwich',30.00,3,1,'Grillet kylling med sprød bacon, salat, tomat, mayo og karrydressing.','2020-06-17 19:44:35',NULL),(15,'Sandwich m. roastbeef',25.00,3,1,'Roastbeef med frisk agurk, ristede løg, salat, pickets og mayo.','2020-06-17 19:46:07',NULL),(16,'Muffin chokolade',15.00,5,1,'Chokolade muffin, med stykker af chokolade.','2020-06-17 19:47:40',NULL),(17,'Muffin blåbær',15.00,5,1,'Vanilje muffin, med dejlige blåbær.','2020-06-17 19:47:40',NULL),(18,'Græsk salat',20.00,4,1,'Oliven, rødløg, peberfrugt, feta og','2020-06-17 19:55:05',NULL),(19,'Tunsalat',20.00,4,1,'Hjemmelavet tunsalat, majs, rødløg og','2020-06-17 19:55:05',NULL),(21,'Mineralvand',19.00,1,1,'Aqua d\'Or, 50 Cl. med brus.','2020-06-17 19:58:34',NULL),(22,'Mineralvand m. citrus',19.00,1,1,'Aqua d\'Or, 50 Cl. med brus og citrus','2020-06-17 19:58:34','2020-06-17 19:58:59');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'Beverages'),(2,'Burgers'),(3,'Sandwiches'),(4,'Salads'),(5,'Snacks'),(6,'Pizzas'),(7,'Others'),(8,'Alcoholic Beverages'),(9,'Vegetables'),(10,'Fruits'),(11,'Soups'),(12,'Stews'),(13,'Noodles'),(14,'Pies'),(15,'Burritos'),(16,'Tacos');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `review` tinytext,
  `rating` tinyint unsigned NOT NULL,
  `author_id` int unsigned NOT NULL,
  `store_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `review__store_id_fk_idx` (`store_id`),
  KEY `review__author_id_fk_idx` (`author_id`),
  CONSTRAINT `review__author_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,'Fint men deres sandwich er lidt tørre.',3,1,1),(3,'Deres buffet er god!',4,1,2),(5,'Fantastisk oplevelse bestiller helt sikkert der fra igen ',6,9,3),(6,NULL,5,12,5),(7,'Super lækkert mad, og ekstrem hurtig levering. ',5,1,6);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'KEA 37 Kantinen','Kantine for KEA datamatikere på Lygten 37','2020-05-31 13:19:20','2020-05-31 15:07:21'),(2,'KEA 16 Kantinen','Kantine for KEA Lygten 16','2020-05-31 15:07:21',NULL),(3,'BIG BENS PIZZA',NULL,'2020-06-14 17:28:28',NULL),(4,'Golden Pizza',NULL,'2020-06-14 17:29:26',NULL),(5,'Alanya Pizza & Kebab',NULL,'2020-06-14 17:29:26',NULL),(6,'Hoshi',NULL,'2020-06-14 17:29:26',NULL),(7,'WOOWOK',NULL,'2020-06-14 17:29:26',NULL),(8,'New Delhi',NULL,'2020-06-14 17:29:26',NULL),(9,'Cowboy Burger',NULL,'2020-06-14 17:29:26',NULL);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_address`
--

DROP TABLE IF EXISTS `store_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_address` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `country` varchar(45) NOT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city_name` varchar(45) NOT NULL,
  `postal_code` int NOT NULL,
  `street_name` varchar(45) NOT NULL,
  `street_number` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `store_id_UNIQUE` (`store_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `store_address__store_id_fk_idx` (`store_id`),
  CONSTRAINT `store_address__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_address`
--

LOCK TABLES `store_address` WRITE;
/*!40000 ALTER TABLE `store_address` DISABLE KEYS */;
INSERT INTO `store_address` VALUES (1,1,'Denmark',NULL,'København NV',2400,'Lygten','37'),(2,2,'Denmark',NULL,'København NV',2400,'Lygten','16'),(3,3,'Denmark',NULL,'København NV',2400,'Tomgårdsvej','4'),(4,4,'Denmark',NULL,'København NV',2400,'Smedetoften','21'),(5,5,'Denmark',NULL,'København NV',2400,'Frederikssundsvej','40'),(6,6,'Denmark',NULL,'København NV',2400,'H. C. Ørsteds Vej','50A'),(7,7,'Denmark',NULL,'København NV',2400,'Nordre Fasanvej ','267'),(8,8,'Denmark',NULL,'København NV',2400,'Tomsgårdsvej','36'),(9,9,'Denmark',NULL,'København NV',2400,'Frederikssundsvej','111');
/*!40000 ALTER TABLE `store_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_admin`
--

DROP TABLE IF EXISTS `store_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_admin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `admin_id` int unsigned NOT NULL,
  `admin_type` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `store_admin__store_id_fk_idx` (`store_id`),
  KEY `store_admin__admin_id_fk_idx` (`admin_id`),
  KEY `store_admin__admin_type_fk_idx` (`admin_type`),
  CONSTRAINT `store_admin__admin_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`),
  CONSTRAINT `store_admin__admin_type_fk` FOREIGN KEY (`admin_type`) REFERENCES `store_admin_type` (`id`),
  CONSTRAINT `store_admin__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_admin`
--

LOCK TABLES `store_admin` WRITE;
/*!40000 ALTER TABLE `store_admin` DISABLE KEYS */;
INSERT INTO `store_admin` VALUES (1,1,1,1,'2020-06-03 22:07:21'),(2,2,1,1,'2020-06-03 22:07:21'),(5,1,8,2,'2020-06-03 22:56:41'),(6,2,10,2,'2020-06-03 22:57:10'),(7,3,1,1,'2020-06-14 20:09:49'),(8,4,1,1,'2020-06-14 20:09:49'),(9,5,1,1,'2020-06-14 20:09:49'),(10,6,1,1,'2020-06-14 20:09:49'),(11,7,1,1,'2020-06-14 20:09:49'),(12,8,1,1,'2020-06-14 20:09:49'),(13,9,1,1,'2020-06-14 20:09:49');
/*!40000 ALTER TABLE `store_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_admin_type`
--

DROP TABLE IF EXISTS `store_admin_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_admin_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_admin_type`
--

LOCK TABLES `store_admin_type` WRITE;
/*!40000 ALTER TABLE `store_admin_type` DISABLE KEYS */;
INSERT INTO `store_admin_type` VALUES (1,'owner'),(2,'full_access'),(3,'read_only_access');
/*!40000 ALTER TABLE `store_admin_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_food_type`
--

DROP TABLE IF EXISTS `store_food_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_food_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `food_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_food_type__store_id_fk_idx` (`store_id`),
  CONSTRAINT `store_food_type__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_food_type`
--

LOCK TABLES `store_food_type` WRITE;
/*!40000 ALTER TABLE `store_food_type` DISABLE KEYS */;
INSERT INTO `store_food_type` VALUES (1,1,'Cafeteria'),(2,2,'Cafeteria'),(3,2,'Buffet'),(4,3,'Pizza'),(5,4,'Pizza'),(6,4,'Grill'),(7,5,'Turkish'),(8,5,'Grill'),(9,6,'Sushi'),(10,7,'Thai'),(11,7,'Vegan'),(15,8,'Indian'),(16,9,'Burger'),(17,9,'Grill');
/*!40000 ALTER TABLE `store_food_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_opening_hours`
--

DROP TABLE IF EXISTS `store_opening_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_opening_hours` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `day` int NOT NULL,
  `opens_at` time DEFAULT NULL,
  `closes_at` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_opening_hours__store_id_fk_idx` (`store_id`),
  CONSTRAINT `store_opening_hours__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_opening_hours`
--

LOCK TABLES `store_opening_hours` WRITE;
/*!40000 ALTER TABLE `store_opening_hours` DISABLE KEYS */;
INSERT INTO `store_opening_hours` VALUES (15,1,0,NULL,NULL),(16,1,1,'08:00:00','16:00:00'),(17,1,2,'08:00:00','16:00:00'),(18,1,3,NULL,NULL),(19,1,4,'08:00:00','16:00:00'),(20,1,5,'08:00:00','16:00:00'),(21,1,6,NULL,NULL),(22,2,0,NULL,NULL),(23,2,1,'08:00:00','16:00:00'),(24,2,2,'08:00:00','16:00:00'),(25,2,3,'08:00:00','16:00:00'),(26,2,4,'08:00:00','16:00:00'),(27,2,5,'08:00:00','16:00:00'),(28,2,6,NULL,NULL),(29,3,0,'12:00:00','21:00:00'),(30,3,1,'12:00:00','21:00:00'),(31,3,2,'12:00:00','21:00:00'),(32,3,3,'12:00:00','21:00:00'),(33,3,4,'12:00:00','21:00:00'),(34,3,5,'12:00:00','21:00:00'),(35,3,6,'12:00:00','21:00:00'),(36,4,0,'12:00:00','22:00:00'),(37,4,1,'11:00:00','22:00:00'),(38,4,2,'11:00:00','22:00:00'),(39,4,3,'11:00:00','22:00:00'),(40,4,4,'11:00:00','22:00:00'),(41,4,5,'12:00:00','22:00:00'),(42,4,6,'12:00:00','22:00:00'),(43,5,0,'15:50:00','01:30:00'),(44,5,1,'15:50:00','01:30:00'),(45,5,2,'15:50:00','01:30:00'),(46,5,3,'15:50:00','01:30:00'),(47,5,4,'15:50:00','01:30:00'),(48,5,5,'15:50:00','03:00:00'),(49,5,6,'15:50:00','01:30:00'),(50,6,0,'12:30:00','22:30:00'),(51,6,1,'15:00:00','22:00:00'),(52,6,2,'15:00:00','22:00:00'),(53,6,3,'15:00:00','22:00:00'),(54,6,4,'15:00:00','22:00:00'),(55,6,5,'13:00:00','22:30:00'),(56,6,6,'12:30:00','22:30:00'),(57,7,0,'11:30:00','21:55:00'),(58,7,1,'13:00:00','21:55:00'),(59,7,2,'13:00:00','21:55:00'),(60,7,3,'13:00:00','21:55:00'),(61,7,4,'13:00:00','21:55:00'),(62,7,5,'13:00:00','21:55:00'),(63,7,6,'11:30:00','21:55:00'),(64,8,0,'11:00:00','22:00:00'),(65,8,1,'15:00:00','22:00:00'),(66,8,2,'15:00:00','22:00:00'),(67,8,3,'15:00:00','22:00:00'),(68,8,4,'15:00:00','22:00:00'),(69,8,5,'15:00:00','22:00:00'),(70,8,6,'11:00:00','23:00:00'),(71,9,0,'12:00:00','21:00:00'),(72,9,1,'11:00:00','21:00:00'),(73,9,2,'11:00:00','21:00:00'),(74,9,3,'11:00:00','21:00:00'),(75,9,4,'11:00:00','21:00:00'),(76,9,5,'11:00:00','21:00:00'),(77,9,6,'11:00:00','21:00:00');
/*!40000 ALTER TABLE `store_opening_hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_profile_image`
--

DROP TABLE IF EXISTS `store_profile_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_profile_image` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `image_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_profile_image__store_id_fk_idx` (`store_id`),
  CONSTRAINT `store_profile_image__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_profile_image`
--

LOCK TABLES `store_profile_image` WRITE;
/*!40000 ALTER TABLE `store_profile_image` DISABLE KEYS */;
INSERT INTO `store_profile_image` VALUES (1,1,'kea37logo.jpg'),(2,2,'kea16logo.jpg'),(3,3,'big_bens_pizza.jpg'),(4,4,'golden_pizza.jpg'),(5,5,'alanya.jpg'),(6,6,'hoshi.jpg'),(7,7,'woowok.jpg'),(8,8,'new_delhi.jpg'),(9,9,'cowboy_burger.jpg');
/*!40000 ALTER TABLE `store_profile_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_rating`
--

DROP TABLE IF EXISTS `store_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_rating` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_rating__store_id_fk_idx` (`store_id`),
  CONSTRAINT `store_rating__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_rating`
--

LOCK TABLES `store_rating` WRITE;
/*!40000 ALTER TABLE `store_rating` DISABLE KEYS */;
INSERT INTO `store_rating` VALUES (1,1,3),(2,2,4),(3,3,5),(4,4,4),(5,5,5),(6,6,6),(7,7,5),(8,8,4),(9,9,6);
/*!40000 ALTER TABLE `store_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `role_id` int unsigned NOT NULL DEFAULT '2',
  `user_information_id` int unsigned NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `user_information_fk_idx` (`user_information_id`),
  KEY `user_role_fk_idx` (`role_id`),
  CONSTRAINT `user_information_fk` FOREIGN KEY (`user_information_id`) REFERENCES `user_information` (`id`),
  CONSTRAINT `user_role_fk` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Fliipzy','$2b$12$QW2lIdmxVMsmZoFY1EOA7uP1eV/PIwRcgKFpBMdBHwJ35gPvCzI6O',1,1,1,'2020-05-20 10:28:35','2020-06-16 22:13:33'),(8,'1337H4cK3r','$2b$12$A24hoihKQFSHlxlExNvZbeQqIEEmtL7d4g318SsGbcna2wt3/HeP6',2,2,1,'2020-05-20 15:36:22','2020-06-02 12:55:31'),(9,'bob92','$2b$12$CFu5TuSWL8o02WafYnp2LOQVpQ4OqnP5ywNr.OyS9UPGFEYctwj9m',2,4,1,'2020-05-21 14:27:25','2020-06-02 12:55:31'),(10,'test','$2b$12$cKbyjS5rseVg9rYqvIDQXOl5z72EGWgRS.OvvAdQ0unwUV7S4bnNG',1,4,1,'2020-06-02 21:00:57','2020-06-02 21:08:55'),(11,'admin','$2b$12$il10bGvcFonKqh/gP4quceKuV63R61MYt.dFLNb6pWyTTX.tNC3Ki',1,5,1,'2020-06-04 07:36:35','2020-06-04 07:37:14'),(12,'user','$2b$12$il10bGvcFonKqh/gP4quceKuV63R61MYt.dFLNb6pWyTTX.tNC3Ki',2,6,1,'2020-06-04 07:39:08','2020-06-04 07:39:30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_information`
--

DROP TABLE IF EXISTS `user_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_information` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_information`
--

LOCK TABLES `user_information` WRITE;
/*!40000 ALTER TABLE `user_information` DISABLE KEYS */;
INSERT INTO `user_information` VALUES (1,'Frederik','Lundbeck Jørgensen','Frederiklundbeck@live.dk','2020-05-20 10:28:26','2020-06-16 13:33:09'),(2,'Mario','Pescé','Mario@nintendo.com','2020-05-20 15:36:16',NULL),(4,'bobby','fischer','bobfischer@gmail.com','2020-05-21 14:27:25',NULL),(5,'admin','admin','admin@grabbit.com','2020-06-04 07:37:03',NULL),(6,'user','user','user@grabbit.com','2020-06-04 07:39:24',NULL);
/*!40000 ALTER TABLE `user_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_reset`
--

DROP TABLE IF EXISTS `user_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_reset` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `used` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_reset__user_id_fk_idx` (`user_id`),
  CONSTRAINT `user_reset__user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_reset`
--

LOCK TABLES `user_reset` WRITE;
/*!40000 ALTER TABLE `user_reset` DISABLE KEYS */;
INSERT INTO `user_reset` VALUES (57,1,'718b0152-6fec-46f6-9611-936bf6f69489',0,'2020-06-02 15:11:45'),(58,1,'db74bee4-dcc6-4c0a-8f07-afbe8fdd803e',0,'2020-06-02 15:12:28'),(59,1,'755a552c-4282-4f9d-9436-2761ba40b7ee',0,'2020-06-02 15:12:29'),(60,1,'62530bcd-816a-4507-b4b0-42b4ba80d914',0,'2020-06-02 15:12:30'),(61,1,'c60554bf-99f6-41c2-8c65-8ec85cd0d7cc',0,'2020-06-02 15:12:31'),(62,1,'49c9f966-d700-4144-b202-0d710400dcb0',0,'2020-06-02 15:12:32');
/*!40000 ALTER TABLE `user_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 15:10:12
