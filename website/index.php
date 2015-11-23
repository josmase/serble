<?php

error_reporting(E_ALL);

require_once 'stdlib.php';

// Defines the site path
$site_path = realpath(dirname(__FILE__));
define('__SITE_PATH', $site_path);

// Initialization
require_once __SITE_PATH . '/application/base/Controller.php';
require_once __SITE_PATH . '/application/base/Model.php';
require_once __SITE_PATH . '/application/base/View.php';
