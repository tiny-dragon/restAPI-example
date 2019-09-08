-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2019 at 10:26 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `koalabeds-coupon`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(255) DEFAULT NULL,
  `status` tinyint(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastModifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `company_name`, `password`, `is_admin`, `status`, `createdAt`, `lastModifiedAt`) VALUES
(2, 'wangjin8855@hotmail.com', 'Jin', 'Wang', 'MY COMPANY', '2020cf67b6c99ca3de6724e6c01fe5c687fdb6af1abe03be87', 1, 0, '2019-08-19 02:45:55', '2019-08-28 22:13:37'),
(3, 'wony@hotmail.com', 'Wo', 'ny', 'TEST COMPANY', '31cdcd245ee4ca52d0a881520308bb90ccb789b762e03c72ee', 1, 0, '2019-08-19 02:45:55', '2019-09-02 01:16:35'),
(4, 'songa@hotmail.com', 'son', 'ga', 'TEST COMPANY', '7e69fb18a17d382b602b498674a8b1116fa359affb3f6698de', 0, 0, '2019-08-19 02:45:55', '2019-08-28 22:10:00'),
(5, 'piao@hotmail.com', 'piao', 'cheng', 'PIAO Company', '7e69fb18a17d382b602b498674a8b1116fa359affb3f6698de', 0, 0, '2019-08-19 02:45:55', '2019-09-02 00:38:13'),
(6, 'aaaa@hotmail.com', 'aa', 'aa', 'TEST COMPANY', '10cc475e4b37f40b56689926df0794f7c6805f24b83f9f06e4', 0, 0, '2019-08-23 10:39:11', '2019-08-28 22:10:02'),
(7, 'wonyy1988@outlook.com', 'wony', 'shen', 'TEST COMPANY', '982e5a4bf66b4c47af7c4b73a1a89ae70b584f0c524d156d8090af9cfe5c', 0, 0, '2019-08-23 10:58:42', '2019-08-28 22:10:01'),
(10, 'wonyy@outlook.com', 'Wony', 'Shen', 'Wony Co.Ltd,', '1316af3a4d8528b842cb1b2dbe6eb6ff9a1daa824f9895d4b8', 0, 0, '2019-09-02 10:36:37', '2019-09-02 10:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int(11) NOT NULL,
  `voucher_type_id` int(11) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) DEFAULT NULL,
  `unique_key` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `expire_date` date NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `delivery_method` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `redeemedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastModifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `voucher_type_id`, `customer_email`, `customer_phone_number`, `unique_key`, `start_date`, `expire_date`, `price`, `quantity`, `delivery_method`, `status`, `redeemedAt`, `createdAt`, `lastModifiedAt`) VALUES
(77, 25, 'wonyy1988@outlook.com', NULL, 'sz34yufk01c6ela1', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, NULL, '2019-08-20 01:36:19', '2019-09-05 02:53:18'),
(79, 25, 'wonyy1988@outlook.com', NULL, 'sz34yufk01cethn7', '2019-09-01', '2019-09-02', '2.00', 2, 1, 0, NULL, '2019-08-21 01:36:19', '2019-09-05 02:53:26'),
(80, 27, 'wonyy1988@outlook.com', NULL, 'sz34y10ak01snwqa1', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, NULL, '2019-08-22 01:36:19', '2019-09-05 02:53:02'),
(81, 28, 'wonyy1988@outlook.com', NULL, 'sz34y10ak01ssfif1', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, NULL, '2019-08-23 01:36:19', '2019-09-05 02:53:11'),
(82, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01cethn8', '2019-09-01', '2019-09-02', '2.00', 2, 1, 0, NULL, '2019-08-25 01:36:19', '2019-09-05 02:53:27'),
(83, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01c6ela2', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, NULL, '2019-08-24 01:36:19', '2019-09-05 02:53:20'),
(84, 27, 'wonyy1988@outlook.com', '', 'sz34y10ak01snwqa2', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, NULL, '2019-08-26 01:36:19', '2019-09-05 02:53:05'),
(85, 28, 'wonyy1988@outlook.com', '', 'sz34y10ak01ssfif2', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, NULL, '2019-08-27 01:36:19', '2019-09-05 02:53:13'),
(86, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01c6ela3', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, NULL, '2019-08-28 01:36:19', '2019-09-05 02:53:20'),
(87, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01cethn9', '2019-09-01', '2019-09-02', '2.00', 2, 1, 0, NULL, '2019-08-29 01:36:19', '2019-09-05 02:53:28'),
(88, 27, 'wonyy1988@outlook.com', '', 'sz34y10ak01snwqa3', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, '2019-08-20 01:36:19', '2019-08-20 01:36:19', '2019-09-05 02:53:06'),
(89, 28, 'wonyy1988@outlook.com', '', 'sz34y10ak01ssfif3', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, '2019-08-21 01:36:19', '2019-08-21 01:36:19', '2019-09-05 02:53:14'),
(90, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01c6ela4', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, '2019-08-22 01:36:19', '2019-08-22 01:36:19', '2019-09-05 02:53:21'),
(91, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01cethn0', '2019-09-01', '2019-09-02', '2.00', 2, 1, 0, '2019-08-23 01:36:19', '2019-08-23 01:36:19', '2019-09-05 02:53:30'),
(92, 27, 'wonyy1988@outlook.com', '', 'sz34y10ak01snwqa4', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, '2019-08-24 01:36:19', '2019-08-24 01:36:19', '2019-09-05 02:53:08'),
(93, 28, 'wonyy1988@outlook.com', '', 'sz34y10ak01ssfif4', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, '2019-08-25 01:36:19', '2019-08-25 01:36:19', '2019-09-05 02:53:14'),
(94, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01c6ela5', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, '2019-08-26 01:36:19', '2019-08-26 01:36:19', '2019-09-05 02:53:23'),
(95, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01cethna', '2019-09-01', '2019-09-02', '2.00', 2, 1, 0, '2019-08-27 01:36:19', '2019-08-27 01:36:19', '2019-09-05 02:53:33'),
(96, 27, 'wonyy1988@outlook.com', '', 'sz34y10ak01snwqa5', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, '2019-08-28 01:36:19', '2019-08-28 01:36:19', '2019-09-05 02:53:09'),
(97, 28, 'wonyy1988@outlook.com', '', 'sz34y10ak01ssfif5', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, '2019-08-29 01:36:19', '2019-08-29 01:36:19', '2019-09-05 02:53:15'),
(98, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01c6ela6', '2019-09-01', '2019-09-02', '100.00', 1, 1, 0, '2019-09-05 01:19:56', '2019-09-02 02:56:42', '2019-09-05 02:53:24'),
(99, 25, 'wonyy1988@outlook.com', '', 'sz34yufk01cethn', '2019-09-01', '2019-09-08', '2.00', 2, 1, 1, '2019-09-05 02:54:46', '2019-09-02 03:03:14', '2019-09-05 02:54:46'),
(100, 27, 'wonyy1988@outlook.com', '', 'sz34y10ak01snwqa6', '2019-09-02', '2019-09-03', '100.00', 1, 1, 0, '2019-09-05 01:19:56', '2019-09-02 10:38:12', '2019-09-05 02:53:10'),
(101, 28, 'wonyy1988@outlook.com', '', 'sz34y10ak01ssfif6', '2019-09-02', '2019-09-03', '1.00', 1, 1, 0, NULL, '2019-09-02 10:41:43', '2019-09-05 02:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `voucher_type`
--

CREATE TABLE `voucher_type` (
  `id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `voucher_type_name` varchar(255) NOT NULL,
  `expires_in` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastModifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voucher_type`
--

INSERT INTO `voucher_type` (`id`, `merchant_id`, `voucher_type_name`, `expires_in`, `status`, `createdAt`, `lastModifiedAt`) VALUES
(22, 4, '123444', 1, 0, '2019-09-02 02:03:55', '2019-09-02 02:03:55'),
(23, 5, '2222', 2, 0, '2019-09-02 02:23:35', '2019-09-02 02:23:35'),
(25, 7, 'Wony Ticket1', 1, 0, '2019-09-02 02:54:25', '2019-09-02 02:54:25'),
(27, 10, 'Lunch at Wony Restaurant', 1, 0, '2019-09-02 10:37:51', '2019-09-02 10:37:51'),
(28, 7, 'Lunch set2 at Wony Test Company', 1, 0, '2019-09-02 10:41:26', '2019-09-02 10:41:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher_type`
--
ALTER TABLE `voucher_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT for table `voucher_type`
--
ALTER TABLE `voucher_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
