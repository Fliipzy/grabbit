CREATE DATABASE  IF NOT EXISTS `grabbit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
  `price` float NOT NULL,
  `store_id` int unsigned NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product__store_id_fk_idx` (`store_id`),
  CONSTRAINT `product__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Sandwich m. skinke ost',25,1,'Skinke ost sandwich fyldt med lækker grønt.','2020-05-31 13:20:35','2020-05-31 14:37:24'),(2,'Pastasalat m. kylling bacon',20,1,'Frisk hjemmelavet pastasalat med tandoori kylling og bacon.','2020-05-31 14:31:32','2020-05-31 14:36:50'),(3,'Granola bar m. chokolade',10,1,'Perfekt snack til at oplade din energi på en sen eftermiddag.','2020-05-31 14:39:43','2020-05-31 14:40:27'),(4,'Vand, 50 Cl, Uden Brus',7,1,'','2020-05-31 14:43:27',NULL),(5,'Kartoffelsalat',25,2,'Klassisk kold kartoffelsalat med friskklippet purløg.','2020-05-31 15:15:11',NULL),(6,'Flæskestegssandwich',30,2,'Varm flæskesteg med rødkål og argukesalat i foccaciabolle','2020-05-31 15:17:53',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `review` varchar(300) NOT NULL,
  `author_user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_user_id_fk_idx` (`author_user_id`),
  CONSTRAINT `author_user_id_fk` FOREIGN KEY (`author_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'KEA 37 Kantinen','Kantine for KEA datamatikere på Lygten 37','2020-05-31 13:19:20','2020-05-31 15:07:21'),(2,'KEA 16 Kantinen','Kantine for KEA Lygten 16','2020-05-31 15:07:21',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_address`
--

LOCK TABLES `store_address` WRITE;
/*!40000 ALTER TABLE `store_address` DISABLE KEYS */;
INSERT INTO `store_address` VALUES (1,1,'Denmark',NULL,'Copenhagen',2400,'Lygten','37'),(2,2,'Denmark',NULL,'Copenhagen',2400,'Lygten','16');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_admin`
--

LOCK TABLES `store_admin` WRITE;
/*!40000 ALTER TABLE `store_admin` DISABLE KEYS */;
INSERT INTO `store_admin` VALUES (1,1,1,1,'2020-06-03 22:07:21'),(2,2,1,1,'2020-06-03 22:07:21'),(5,1,8,2,'2020-06-03 22:56:41'),(6,2,10,2,'2020-06-03 22:57:10');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `store_review`
--

DROP TABLE IF EXISTS `store_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_review` (
  `id` int unsigned NOT NULL,
  `store_id` int unsigned NOT NULL,
  `review_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_review__store_id_fk_idx` (`store_id`),
  KEY `store_review__review_id_fk_idx` (`review_id`),
  CONSTRAINT `store_review__review_id_fk` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`),
  CONSTRAINT `store_review__store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_review`
--

LOCK TABLES `store_review` WRITE;
/*!40000 ALTER TABLE `store_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_review` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Fliipzy','$2b$12$QW2lIdmxVMsmZoFY1EOA7uP1eV/PIwRcgKFpBMdBHwJ35gPvCzI6O',1,1,1,'2020-05-20 10:28:35','2020-06-02 12:55:31'),(8,'1337H4cK3r','$2b$12$A24hoihKQFSHlxlExNvZbeQqIEEmtL7d4g318SsGbcna2wt3/HeP6',2,2,1,'2020-05-20 15:36:22','2020-06-02 12:55:31'),(9,'bob92','$2b$12$CFu5TuSWL8o02WafYnp2LOQVpQ4OqnP5ywNr.OyS9UPGFEYctwj9m',2,4,1,'2020-05-21 14:27:25','2020-06-02 12:55:31'),(10,'test','$2b$12$cKbyjS5rseVg9rYqvIDQXOl5z72EGWgRS.OvvAdQ0unwUV7S4bnNG',1,4,1,'2020-06-02 21:00:57','2020-06-02 21:08:55'),(11,'admin','$2b$12$il10bGvcFonKqh/gP4quceKuV63R61MYt.dFLNb6pWyTTX.tNC3Ki',1,5,1,'2020-06-04 07:36:35','2020-06-04 07:37:14'),(12,'user','$2b$12$il10bGvcFonKqh/gP4quceKuV63R61MYt.dFLNb6pWyTTX.tNC3Ki',2,6,1,'2020-06-04 07:39:08','2020-06-04 07:39:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_information`
--

LOCK TABLES `user_information` WRITE;
/*!40000 ALTER TABLE `user_information` DISABLE KEYS */;
INSERT INTO `user_information` VALUES (1,'Frederik','Lundbeck Jørgensen','Frederiklundbeck@live.dk','2020-05-20 10:28:26',NULL),(2,'Mario','Pescé','Mario@nintendo.com','2020-05-20 15:36:16',NULL),(4,'bobby','fischer','bobfischer@gmail.com','2020-05-21 14:27:25',NULL),(5,'admin','admin','admin@grabbit.com','2020-06-04 07:37:03',NULL),(6,'user','user','user@grabbit.com','2020-06-04 07:39:24',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2020-06-05 10:06:40
