-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2019 at 05:25 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gotravel`
--
CREATE DATABASE IF NOT EXISTS `gotravel` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `gotravel`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userID`, `vacationID`) VALUES
(27, 70),
(27, 77),
(29, 73),
(29, 74),
(27, 78),
(25, 73),
(30, 71),
(30, 73),
(30, 70);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username`, `password`) VALUES
(1, 'Daphne', 'Levy', 'Daph87', '12345T'),
(2, 'Erez', 'Yosepov', 'Erez96', '678686'),
(3, 'david', 'cool', 'cooldavid', 'cooldavid'),
(11, 'erzzre', 'rrz', 'zzrz', 'zrrzrz'),
(13, 'fsff', 'sdfsf', 'Daffy Duck', 'Yooo'),
(14, 'Betty', 'Zalalichin', 'Betty83', 'hello'),
(15, 'Nicole', 'Zalalichin', 'Nicole2019', 'nicknick'),
(16, 'qdqs', 'qsdq', 'dqdq', 'dqdq'),
(17, 'dddd', 'dddd', 'dddd', 'dddd'),
(18, 'aaaa', 'aaaa', 'aaaa', 'aaaa'),
(19, 'Nicole', 'Zalalichin', 'Nick19', 'nick19'),
(20, 'Nicolas', 'Levy', 'Nicolas', 'nicolas'),
(21, 'Bertha', 'Levy', 'Bertha83', 'bertha'),
(22, 'eee', 'Levy', 'Daphe', 'eeeeee'),
(23, 'dqdqsqdsd', 'dqqdsdsds', 'Daph1987', 'dqdssqddqs'),
(24, 'erez', 'erez', 'erez', 'erez'),
(25, 'fr', 'fr', 'frfr', 'frfr'),
(26, 'admin', 'admin', 'admin', 'admin'),
(27, 'betty', 'zalalichin', 'Bett', 'ytteb'),
(28, 'dsd', 'sd', 'dsdd', 'sddsd'),
(29, 'Xavier', 'Van Der Smissen', 'xaxa', 'xaxa'),
(30, 'rtrt', 'rtrt', 'rtrt', 'rtrt');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `startDate` varchar(50) NOT NULL,
  `endDate` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `startDate`, `endDate`, `image`, `price`) VALUES
(70, 'Guided Tour in the south of the country  -  Exclusive Discount', 'South Vietnam ', '2019-07-04', '2019-07-18', 'myImage-1571341512659.JPG', 540),
(71, 'Go live with a laos family and learn about their culture - All included', 'Laos', '2019-10-15', '2019-10-31', 'myImage-1571341551422.JPG', 400),
(73, 'Cherry Blossoms Season - All included Hotel in Tokyo with amazing onsen for 2 ', 'Japan', '2020-04-16', '2019-10-31', 'myImage-1571406546481.JPG', 2530),
(74, 'Visit the Angkor Site and its beautiful remains for 5 days - Transportation included', 'Angkor - Cambodia', '2020-03-19', '2019-10-24', 'myImage-1571406724434.JPG', 720),
(75, '1 month trip in the south island -  Accommodation and guided tour included', 'New-Zealand ', '2020-01-01', '2020-01-31', 'myImage-1571406887274.JPG', 2500),
(76, 'Go for a trip on the legendary road 66 - All hotels and food included', 'USA', '2020-03-20', '2020-04-17', 'myImage-1571407203821.JPG', 1800),
(77, 'Nice typical hotel in the middle next to the market - Discount not to miss', 'USA - Santa Fe', '2019-10-09', '2019-10-25', 'myImage-1571407295359.JPG', 550),
(78, 'rent a vehicle to discover the white sands during 2 days - Accommodation included', 'White Sands - Usa', '2020-04-24', '2020-04-26', 'myImage-1571407907881.JPG', 400);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
