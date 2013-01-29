-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 12, 2012 at 03:46 PM
-- Server version: 5.5.20
-- PHP Version: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(20) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `text`, `title`, `author`, `ts`) VALUES
(1, 'Paolo Nutine', 'Sunny Side Up', '', '0000-00-00 00:00:00'),
(2, 'Florence + The Machine', 'Lungs', '', '0000-00-00 00:00:00'),
(3, 'Massive Attack', 'Heligoland', '', '0000-00-00 00:00:00'),
(4, 'Andre Rieu', 'Forever Vienna', '', '0000-00-00 00:00:00'),
(5, 'Sade', 'Soldier of Love', '', '0000-00-00 00:00:00'),
(6, 'test', 'test', '', '0000-00-00 00:00:00'),
(7, 'test', 'test', '', '0000-00-00 00:00:00'),
(8, 'test', 'test', '', '0000-00-00 00:00:00'),
(9, 'test', 'test', '', '0000-00-00 00:00:00'),
(10, 't', 't', '', '2012-04-27 08:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
