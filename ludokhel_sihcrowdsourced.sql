-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 08, 2025 at 02:18 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ludokhel_sihcrowdsourced`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(7) DEFAULT '#3B82F6',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `color`, `created_at`) VALUES
(1, 'Roads & Infrastructure', 'Issues related to roads, bridges, and infrastructure', 'road', '#EF4444', '2025-09-05 03:31:06'),
(2, 'Water & Sanitation', 'Water supply, drainage, and sanitation issues', 'water', '#3B82F6', '2025-09-05 03:31:06'),
(3, 'Electricity', 'Power supply and electrical infrastructure', 'bolt', '#F59E0B', '2025-09-05 03:31:06'),
(4, 'Waste Management', 'Garbage collection and waste disposal', 'trash', '#10B981', '2025-09-05 03:31:06'),
(5, 'Public Safety', 'Safety concerns and security issues', 'shield', '#8B5CF6', '2025-09-05 03:31:06'),
(6, 'Environment', 'Environmental concerns and pollution', 'leaf', '#059669', '2025-09-05 03:31:06'),
(7, 'Transportation', 'Public transport and traffic issues', 'bus', '#DC2626', '2025-09-05 03:31:06'),
(8, 'Healthcare', 'Health facilities and medical services', 'heart', '#EC4899', '2025-09-05 03:31:06'),
(9, 'Education', 'Schools and educational facilities', 'book', '#7C3AED', '2025-09-05 03:31:06'),
(10, 'Other', 'Other civic issues not covered above', 'more', '#6B7280', '2025-09-05 03:31:06');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `issue_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `is_internal` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `issue_id`, `user_id`, `comment`, `is_internal`, `created_at`) VALUES
(5, 49, 14, 'That is the big issue in our area', 0, '2025-09-07 05:58:10'),
(6, 53, 17, 'Test', 0, '2025-09-07 10:00:28'),
(7, 53, 17, 'Hi', 0, '2025-09-07 10:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int NOT NULL,
  `ticket_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` int NOT NULL,
  `reporter_id` int NOT NULL,
  `status` enum('pending','in_progress','resolved','rejected') DEFAULT 'pending',
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `location_address` text,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `nearby_landmark` varchar(255) DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `resolution_notes` text,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`id`, `ticket_id`, `title`, `description`, `category_id`, `reporter_id`, `status`, `priority`, `location_address`, `latitude`, `longitude`, `city`, `state`, `pincode`, `street_name`, `nearby_landmark`, `assigned_to`, `resolution_notes`, `resolved_at`, `created_at`, `updated_at`) VALUES
(31, '', 'Water logging in the streets of my area', 'We face a lot of issue while travelling through the streets\r\nit also looks very dull after each rain.', 1, 6, 'pending', 'high', 'Location not specified', 27.29322090, 88.35306530, 'Gaya', 'Bihar', '824234', '12', 'Shiv mandir', NULL, NULL, NULL, '2025-09-07 05:49:05', '2025-09-07 05:49:05'),
(49, 'NAGARSETU-250907-420', 'Water supply issues', 'We are facing several issues regarding the proper supply of water in our localities and its causing a lot of problems....', 2, 10, 'resolved', 'high', 'Location not specified', 27.29322090, 88.35306530, 'Ravangla', 'Sikkim', '737109', 'Market', 'Near NIT Sikkim', NULL, 'Fixed by the Jal Nigam', '2025-09-07 06:23:37', '2025-09-07 05:57:04', '2025-09-07 06:23:37'),
(50, 'NAGARSETU-250907-818', 'Electricity shortage', 'In my locality we face severe scarcity of electricity \r\neven sometime the electricity is absent for days making \r\nour life difficult in night.', 3, 6, 'resolved', 'urgent', 'Location not specified', 27.29322090, 88.35306530, 'Ravangla', 'Sikkim', '737139', 'boufong', 'Near NIT sikkim', NULL, 'Solved by the electricity department', '2025-09-07 06:25:16', '2025-09-07 05:57:08', '2025-09-07 06:25:16'),
(51, 'NAGARSETU-250907-475', 'Flood problem', 'their is heavy flood problem in our state .please give a solution of this problem we are facing..', 2, 15, 'pending', 'urgent', 'Location not specified', 0.00000000, 0.00000000, 'sangroor', 'Punjab', '160001', 'near delivery office', 'sangrur clock tower', NULL, NULL, NULL, '2025-09-07 05:58:05', '2025-09-07 05:58:05'),
(52, 'NAGARSETU-250907-800', 'Pipe Leaking', 'There’s a water pipe leaking on Main Street near the bus stop. It’s been dripping constantly for a week, and now the road is muddy and slippery. People are wasting clean water, and bikers are finding it hard to ride through that stretch.', 2, 8, 'pending', 'urgent', 'Location not specified', 0.00000000, 0.00000000, 'Ravangla', 'Sikkim', '737139', 'Ravangla', 'NIT SIKKIM', NULL, NULL, NULL, '2025-09-07 05:58:28', '2025-09-07 05:58:28'),
(53, 'NAGARSETU-250907-268', 'Unavailability of garbage dumping area', 'Many people just throw their garbage wastes on the roads\r\ndue to no proper garbage dumping site or landfill\r\nthis cause to spread many deseases', 6, 6, 'resolved', 'medium', 'Location not specified', 27.29322090, 88.35306530, 'Dobhi', 'Bihar', '824220', '32', 'Dobhi block', NULL, 'Fixed by the team', '2025-09-07 06:21:21', '2025-09-07 05:59:13', '2025-09-07 06:21:21'),
(54, 'NAGARSETU-250907-734', 'Landslides Affect traffic', 'due to heavy rain', 1, 9, 'in_progress', 'urgent', 'Location not specified', 27.29824596, 88.35718028, 'Ravangla', 'Sikkim', '737139', 'Near ravangla -damthang', 'temple', NULL, 'Work in progress by the NDMA', NULL, '2025-09-07 05:59:27', '2025-09-07 06:24:30'),
(55, 'NAGARSETU-250907-441', 'Poor Health Care facilities in our area', 'We dont have proper health care facilities in our area which puts our lives at risk... Please do something about it', 8, 10, 'pending', 'urgent', 'Location not specified', 27.29322090, 88.35306530, 'Islampur', 'West Bengal', '733202', 'Khudirampally', 'Near Court Math', NULL, NULL, NULL, '2025-09-07 06:00:34', '2025-09-07 06:00:34'),
(56, 'NAGARSETU-250907-649', 'Improper management of roads', 'We have a lot of potholes on the roads of our area \r\nthis causes a lot of problem and it also maximizes the time \r\ntaken to travel a particular distance.', 1, 6, 'in_progress', 'medium', 'Location not specified', 27.29322090, 88.35306530, 'Patna', 'Bihar', '800007', 'bajarang gali', 'Bata factory', NULL, 'Worked is started', NULL, '2025-09-07 06:02:26', '2025-09-07 06:20:37'),
(57, 'NAGARSETU-250907-269', 'Drain blockage', 'The drains of our localities gets blocked every now and then which creates a lot of problems .... Please fix this asap', 1, 10, 'pending', 'high', 'Location not specified', 27.29322090, 88.35306530, 'Ravangla', 'Sikkim', '737139', 'Street No 1', 'Near NIT Sikkim', NULL, NULL, NULL, '2025-09-07 06:03:23', '2025-09-07 06:03:23'),
(58, 'NAGARSETU-250907-423', 'lack of facility in hospital', 'xyz hospital near xyz', 8, 9, 'pending', 'high', 'Location not specified', 0.00000000, 0.00000000, 'Ravangla', 'Sikkim', '737139', 'Near ravangla -damthang', 'hospital', NULL, NULL, NULL, '2025-09-07 06:07:45', '2025-09-07 06:07:45'),
(60, 'NAGARSETU-250907-817', 'illegal parking blocking roads', 'Cars are parked illegally on both sides of Market Road near the hospital entrance. It’s blocking the road so badly that ambulances and school buses can’t pass smoothly. Traffic jams happen every evening, and pedestrians are forced to walk on the road itself.', 1, 8, 'pending', 'urgent', 'Location not specified', 0.00000000, 0.00000000, 'Kolkata', 'West Bengal', '700001', 'Salt lake sector-3', 'Salt lake', NULL, NULL, NULL, '2025-09-07 06:10:28', '2025-09-07 06:10:28'),
(61, 'NAGARSETU-250907-594', 'Potholes in the roads', 'There are potholes in the localities near my area which causes a lot of problems and our lives r at risk as well', 1, 10, 'in_progress', 'high', 'Location not specified', 27.29322090, 88.35306530, 'Ravangla', 'Sikkim', '737139', 'Street no 2', 'Near NIT Sikkim', NULL, 'Working on this issue', NULL, '2025-09-07 06:13:36', '2025-09-07 06:20:04'),
(64, 'NAGARSETU-250907-554', 'Electricity Infrastructure Damage caused by Cyclone', 'Electricity Infrastructure Damage caused by Cyclone on road this caused traffic', 3, 9, 'pending', 'medium', 'Location not specified', 27.29826022, 88.35718380, 'Jhanjarpur', 'Bihar', '847211', 'near DAV Public school', 'school', NULL, NULL, NULL, '2025-09-07 06:24:35', '2025-09-07 06:24:35'),
(65, 'NAGARSETU-250907-861', 'Sparking Transformer', 'The tranr near Green Park Colony has been sparking every night for the past two days. It’s making loud cracking sounds, and people in the area are scared it might catch fire. The street gets completely dark whenever the sparks happen, which is unsafe for children and elders.', 3, 8, 'pending', 'urgent', 'Location not specified', 27.29322090, 88.35306530, 'Kolkata', 'West Bengal', '700001', 'Salt lake sector-3', 'Green Park Colony', NULL, NULL, NULL, '2025-09-07 06:26:58', '2025-09-07 06:26:58'),
(66, 'NAGARSETU-250907-352', 'lack of green spaces', 'populated areas with few natural element like grass trees often replaced by buildings.', 6, 15, 'pending', 'low', 'Location not specified', 0.00000000, 0.00000000, 'jaipur', 'Rajasthan', '302001', '28,palam court', 'Jagatpura', NULL, NULL, NULL, '2025-09-07 06:31:33', '2025-09-07 06:31:33');

-- --------------------------------------------------------

--
-- Table structure for table `issue_images`
--

CREATE TABLE `issue_images` (
  `id` int NOT NULL,
  `issue_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issue_images`
--

INSERT INTO `issue_images` (`id`, `issue_id`, `image_url`, `caption`, `uploaded_at`) VALUES
(28, 31, '/uploads/images-1757224145550-160914216.jpeg', 'wateerlogging.jpeg', '2025-09-07 05:49:06'),
(29, 49, '/uploads/images-1757224624199-758335396.jpg', 'water prob.jpg', '2025-09-07 05:57:05'),
(30, 49, '/uploads/images-1757224624199-275391691.jpg', 'wat.jpg', '2025-09-07 05:57:05'),
(31, 50, '/uploads/images-1757224628177-970524488.jpg', 'electricity shortage.jpg', '2025-09-07 05:57:08'),
(32, 50, '/uploads/images-1757224628177-934382596.png', 'electricity scarcity2.png', '2025-09-07 05:57:08'),
(33, 51, '/uploads/images-1757224684752-74983480.webp', '3500.webp', '2025-09-07 05:58:05'),
(34, 52, '/uploads/images-1757224707998-226011368.jpg', 'leaking water pipes nj1.jpg', '2025-09-07 05:58:29'),
(35, 52, '/uploads/images-1757224708000-8784671.jpg', 'a-burst-watermain-or-pipe-underneath-the-road-surface-pushing-up-and-splitting-the-tarmac-and-leaking-water-into-the-road-TBN270.jpg', '2025-09-07 05:58:29'),
(36, 53, '/uploads/images-1757224752681-604028300.webp', 'improper garbage dumpingq.webp', '2025-09-07 05:59:13'),
(37, 53, '/uploads/images-1757224752681-27671888.jpg', 'improper garbage dumping2.jpg', '2025-09-07 05:59:13'),
(38, 54, '/uploads/images-1757224767338-519508254.jpeg', 'WhatsApp Image 2025-09-07 at 11.17.13 AM.jpeg', '2025-09-07 05:59:28'),
(39, 55, '/uploads/images-1757224834417-284058427.jpg', 'ok2.jpg', '2025-09-07 06:00:35'),
(40, 55, '/uploads/images-1757224834417-565573378.jpg', 'poot.jpg', '2025-09-07 06:00:35'),
(41, 56, '/uploads/images-1757224946495-727693961.jpg', 'improper road management.jpg', '2025-09-07 06:02:27'),
(42, 56, '/uploads/images-1757224946496-908253402.jpg', 'improper road management2.jpg', '2025-09-07 06:02:27'),
(43, 57, '/uploads/images-1757225002691-546632153.jpg', 'd2.jpg', '2025-09-07 06:03:23'),
(44, 57, '/uploads/images-1757225002692-830231037.jpg', 'drain.jpg', '2025-09-07 06:03:23'),
(45, 58, '/uploads/images-1757225264236-639996646.webp', 'OIP.webp', '2025-09-07 06:07:45'),
(47, 60, '/uploads/images-1757225426185-132929841.jpg', 'illegal-parking-ava-63fa.jpg', '2025-09-07 06:10:28'),
(48, 60, '/uploads/images-1757225426640-255261981.jpg', 'FoPy7YtaMAAqt_H.jpg', '2025-09-07 06:10:28'),
(49, 60, '/uploads/images-1757225428171-701218941.jpeg', 'OIP.jpeg', '2025-09-07 06:10:28'),
(50, 61, '/uploads/images-1757225615826-505960399.jpg', 'ooolp.jpg', '2025-09-07 06:13:36'),
(51, 61, '/uploads/images-1757225615826-19298460.jpg', 'oool.jpg', '2025-09-07 06:13:36'),
(54, 64, '/uploads/images-1757226275535-686894595.jpg', 'unnamed.jpg', '2025-09-07 06:24:36'),
(55, 65, '/uploads/images-1757226418613-589350946.webp', 'OIP (1).webp', '2025-09-07 06:26:59'),
(56, 66, '/uploads/images-1757226693522-673651884.jpeg', 'IMG_9818.jpeg', '2025-09-07 06:31:34');

-- --------------------------------------------------------

--
-- Table structure for table `issue_status_history`
--

CREATE TABLE `issue_status_history` (
  `id` int NOT NULL,
  `issue_id` int NOT NULL,
  `old_status` varchar(20) DEFAULT NULL,
  `new_status` varchar(20) NOT NULL,
  `changed_by` int NOT NULL,
  `reason` text,
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issue_status_history`
--

INSERT INTO `issue_status_history` (`id`, `issue_id`, `old_status`, `new_status`, `changed_by`, `reason`, `changed_at`) VALUES
(42, 31, NULL, 'pending', 6, 'Issue created', '2025-09-07 05:49:06'),
(44, 49, NULL, 'pending', 10, 'Issue created', '2025-09-07 05:57:05'),
(45, 50, NULL, 'pending', 6, 'Issue created', '2025-09-07 05:57:08'),
(46, 51, NULL, 'pending', 15, 'Issue created', '2025-09-07 05:58:05'),
(47, 52, NULL, 'pending', 8, 'Issue created', '2025-09-07 05:58:29'),
(48, 53, NULL, 'pending', 6, 'Issue created', '2025-09-07 05:59:13'),
(49, 54, NULL, 'pending', 9, 'Issue created', '2025-09-07 05:59:28'),
(50, 55, NULL, 'pending', 10, 'Issue created', '2025-09-07 06:00:35'),
(51, 56, NULL, 'pending', 6, 'Issue created', '2025-09-07 06:02:27'),
(52, 57, NULL, 'pending', 10, 'Issue created', '2025-09-07 06:03:23'),
(53, 58, NULL, 'pending', 9, 'Issue created', '2025-09-07 06:07:46'),
(55, 60, NULL, 'pending', 8, 'Issue created', '2025-09-07 06:10:29'),
(56, 61, NULL, 'pending', 10, 'Issue created', '2025-09-07 06:13:36'),
(59, 61, 'pending', 'in_progress', 1, 'Work is started by team', '2025-09-07 06:20:04'),
(60, 56, 'pending', 'in_progress', 1, 'Work is started by the team', '2025-09-07 06:20:37'),
(61, 53, 'pending', 'resolved', 1, 'Fixed by the team', '2025-09-07 06:21:21'),
(62, 49, 'pending', 'resolved', 1, 'Fixed by the Jal Nigam', '2025-09-07 06:23:37'),
(63, 54, 'pending', 'in_progress', 1, 'Work started', '2025-09-07 06:24:30'),
(64, 64, NULL, 'pending', 9, 'Issue created', '2025-09-07 06:24:36'),
(65, 50, 'pending', 'resolved', 1, 'Issue solved', '2025-09-07 06:25:16'),
(66, 65, NULL, 'pending', 8, 'Issue created', '2025-09-07 06:26:59'),
(67, 66, NULL, 'pending', 15, 'Issue created', '2025-09-07 06:31:34');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `issue_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('issue_update','status_change','comment','assignment') NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `issue_id`, `title`, `message`, `type`, `is_read`, `created_at`) VALUES
(15, 10, 49, 'New Comment Added', 'A new comment has been added to your issue', 'comment', 0, '2025-09-07 05:58:11'),
(16, 10, 61, 'Issue Status Updated', 'Your issue status has been changed to in_progress', 'status_change', 0, '2025-09-07 06:20:05'),
(17, 6, 56, 'Issue Status Updated', 'Your issue status has been changed to in_progress', 'status_change', 0, '2025-09-07 06:20:38'),
(18, 6, 53, 'Issue Status Updated', 'Your issue status has been changed to resolved', 'status_change', 0, '2025-09-07 06:21:22'),
(19, 10, 49, 'Issue Status Updated', 'Your issue status has been changed to resolved', 'status_change', 0, '2025-09-07 06:23:38'),
(20, 9, 54, 'Issue Status Updated', 'Your issue status has been changed to in_progress', 'status_change', 1, '2025-09-07 06:24:30'),
(21, 6, 50, 'Issue Status Updated', 'Your issue status has been changed to resolved', 'status_change', 0, '2025-09-07 06:25:16'),
(24, 6, 53, 'New Comment Added', 'A new comment has been added to your issue', 'comment', 0, '2025-09-07 10:00:29'),
(25, 6, 53, 'New Comment Added', 'A new comment has been added to your issue', 'comment', 0, '2025-09-07 10:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('citizen','admin','moderator') DEFAULT 'citizen',
  `is_verified` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `role`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, 'admin@civicissues.com', '$2a$12$wtDcicCKd66ydo0zdVGlnOOnYtH1Y/Fhsbj0e0Ei/bwaauxP86dJC', 'Admin', 'User', NULL, 'admin', 1, '2025-09-05 03:31:12', '2025-09-05 03:31:12'),
(2, 'princetechways@gmail.com', '$2a$12$O4YOJaLSHEr5O2cGbbizOuFIQ9NFbZoBZO4JMBcm8w7Z0/56JYlJq', 'Prince', 'Gaur', '6387358568', 'citizen', 1, '2025-09-05 03:43:41', '2025-09-05 14:50:36'),
(3, '111111@gmail.com', '$2a$12$YyCp.CLFxfFaPqalMdR.IO1ba3t0QPY4Jh7EqWbQ4GlezoPSSSBTm', 'Prince', 'Gaur', '111111111', 'citizen', 1, '2025-09-05 03:45:38', '2025-09-05 14:50:40'),
(4, 'princet33echways@gmail.com', '$2a$12$UyAi15I5OL0pj8MCegqAoO//JwSjEB69RIDbIPIVGS7LYsYCr42vy', 'Prince', 'Gaur', '111111111', 'citizen', 1, '2025-09-05 04:50:01', '2025-09-05 14:50:43'),
(5, 'rj@gmail.com', '$2a$12$lAiU0cbNAdWgUyq/TXt3xO6cJXOQOAUmgabxNQwMiZ3v/XF4.Uip2', 'jjj', 'jjj', '0987654321', 'citizen', 1, '2025-09-05 16:51:59', '2025-09-05 16:51:59'),
(6, 'krvinay1851@gmail.com', '$2a$12$mzgyhi6ceVXJTVOBkUx4NuMJiUIJ64MtN0DmltIoueQ/gVRu8acsS', 'Ankit', 'kumar', '8789661198', 'citizen', 1, '2025-09-05 16:53:09', '2025-09-05 16:53:09'),
(7, 'abbahv@gmail.com', '$2a$12$gdJqm2rr2ek5PRYiIaw3M.nmsDUb7MQj3G.o5E9MkpqFZPw9TDJf.', 'dip', 'dutt', '9339970153', 'citizen', 1, '2025-09-05 16:53:19', '2025-09-05 16:53:19'),
(8, 'shibankarroy019@gmail.com', '$2a$12$n3CmGkO593pK/piyLtN5VeoOrMjRqaxEXFYea1clv22w730S7UU6.', 'Shibankar', 'Roy', '8159046416', 'citizen', 1, '2025-09-06 07:29:09', '2025-09-06 07:29:09'),
(9, 'aditya16122005@gmail.com', '$2a$12$IIdvXlAvYKPsoxoEklGAcOwrlJVVfmtzVfxQg12K.a2uavDeqUeJG', 'Aditya', 'kumar', '9546661150', 'citizen', 1, '2025-09-06 07:29:15', '2025-09-06 07:29:15'),
(10, 'dipankar@gmail.com', '$2a$12$D7ILzZVSLZywVvF7uLCR9O4pxmA/uUnz/cNzCLBYSEO/Vk/roRh3i', 'Dipankar', 'Dutta', '9339970153', 'citizen', 1, '2025-09-06 07:29:27', '2025-09-06 07:29:27'),
(11, 'aarubrar7@gmail.com', '$2a$12$pXm8KO11t1Zd68tXAyUyguBBED.JqfxDuZo7.vddWXGWfkDGKofVq', 'Aarti', 'Singh', '8168539062', 'citizen', 1, '2025-09-06 07:31:09', '2025-09-06 07:31:09'),
(12, 'uchihareaper696@gmail.com', '$2a$12$7wWcMrmK2q9skj0Y85Tt7.45Xp8EYB.EnCXAUHChNsFLyCDAGjaqe', 'Ayush', 'Shankar', NULL, 'citizen', 1, '2025-09-06 09:22:34', '2025-09-06 09:22:34'),
(13, 'finish@gmail.com', '$2a$12$PDYdW6PhZ1H3bAsLgP3HYunvtcAwzllrQPHnvyUKJnT/2sMFPrco6', 'anubhav', 'chaudhary', '9090909090', 'citizen', 1, '2025-09-06 10:43:24', '2025-09-06 10:43:24'),
(14, 'princetechways11@gmail.com', '$2a$12$JxD54ZDAsvV8c6WkeWB6HeiNVqN02mrKm2MOOHZWnUin8GRDNL9/e', 'Prince', 'Gaur', '1234567890', 'citizen', 1, '2025-09-06 11:51:52', '2025-09-07 06:26:17'),
(15, 'aartibrar78@gmail.com', '$2a$12$Qb6Ez8DGklYp/MbzU9VmHeTjkEFSVDCIGlnkeka2n6H4P3MVmfpoy', 'Suman', 'brar', '8168539062', 'citizen', 1, '2025-09-07 05:51:29', '2025-09-07 05:51:29'),
(16, 'neeleshgaur63@gmail.com', '$2a$12$Nq2xAYOOkUB5R4WXeEsmTeM1LXNwz0l7Mygl.TAwAEuHQ8ilXhwnu', 'Neelesh', 'Gaur', '6387358568', 'citizen', 1, '2025-09-07 06:01:03', '2025-09-07 06:01:03'),
(17, 'amankumar@gmail.com', '$2a$12$clfA0R7qXFu0v8DCt0QgpumQ5oYHTYACJUTByyLRjDAqPfxIg2Xhe', 'Aman', 'Kumar', '1234567890', 'citizen', 1, '2025-09-07 08:46:33', '2025-09-07 08:46:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_comments_issue` (`issue_id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_ticket_id` (`ticket_id`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `idx_issues_status` (`status`),
  ADD KEY `idx_issues_category` (`category_id`),
  ADD KEY `idx_issues_reporter` (`reporter_id`),
  ADD KEY `idx_issues_location` (`latitude`,`longitude`),
  ADD KEY `idx_issues_created` (`created_at`),
  ADD KEY `idx_issues_ticket_id` (`ticket_id`),
  ADD KEY `idx_ticket_id` (`ticket_id`);

--
-- Indexes for table `issue_images`
--
ALTER TABLE `issue_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`);

--
-- Indexes for table `issue_status_history`
--
ALTER TABLE `issue_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `changed_by` (`changed_by`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_id` (`issue_id`),
  ADD KEY `idx_notifications_user` (`user_id`),
  ADD KEY `idx_notifications_read` (`is_read`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `issue_images`
--
ALTER TABLE `issue_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `issue_status_history`
--
ALTER TABLE `issue_status_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `issues_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`);

--
-- Constraints for table `issue_images`
--
ALTER TABLE `issue_images`
  ADD CONSTRAINT `issue_images_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `issue_status_history`
--
ALTER TABLE `issue_status_history`
  ADD CONSTRAINT `issue_status_history_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `issue_status_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
