<?php
//error_reporting(0);
ini_set('max_execution_time', 0);
set_time_limit(0);
ini_set('memory_limit', '2G');
$base_url="C:/work/dev/crawler/";
require_once($base_url."lib/common.php");

$deamon_php_location="C:/xampp/php/php.exe";
$email_file=$base_url."output/email.txt";
$error_logs_file=$base_url."logs/error_logs.txt";
$jobportal_link_logs=$base_url."logs/jobportal_link_logs.txt";
$jobportal_links_file = $base_url."lib/jobportal_links.txt";
$spam_file=$base_url."lib/spam.txt";
$exclude_file=$base_url."lib/exclude.txt";
$crawling_cycle=1;//default 1, max 10
$update_jobportal_links_cycle=1;//default 1, max 20
?>