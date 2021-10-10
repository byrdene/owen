<?php

// @codingStandardsIgnoreFile

/**
 * Trusted host patterns.
 */
$settings['trusted_host_patterns'] = [
//  'zaldomoh.test',
//  'local.*'
];

/**
 * Databases.
 */
$databases['default']['default'] = [
  'database' => 'zaldomoh',
  'username' => 'zaldomoh',
  'password' => 'zaldomoh',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

$settings['hash_salt'] = 'N7UpZmvLUHP9l2ddbGkJSb5bKDR6t3exLorb/hv1IbI=';
$settings["file_temp_path"] = $_SERVER['HOME'] . '/tmp';
$settings['file_private_path'] = 'sites/default/files/private';

/**
 * Error and memory.
 */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
ini_set('memory_limit', '512M');

/**
 * Show all error messages, with backtrace information.
 *
 * In case the error level could not be fetched from the database, as for
 * example the database connection failed, we rely only on this value.
 */
$config['system.logging']['error_level'] = 'verbose';

/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Environment indicator.
 */
$config['environment_indicator.indicator']['name'] = 'Local';
$config['environment_indicator.indicator']['bg_color'] = '#594367'; // Eggplant

/**
 * Stage File Proxy Settings domain override.
 */
# $config['stage_file_proxy.settings']['origin'] = 'http://admin:ohosite1100@example.domain';

/**
 * Config split.
 */
$config['config_split.config_split.local']['status'] = TRUE;
// Comment out the previous line + un-comment following line
// when running drush cex -y to get changes from prod/live
//$config['config_split.config_split.live']['status'] = TRUE;

/**
 * Uncomment the following lines to disable all caches (Render Cache, Internal Page Cache, Dynamic Page Cache)
 *
 * This is useful in the early stages of development.
 * Make sure to test the site pre-launch with caching enabled again.
 *
 * Make sure the site is installed first before disabling the caches.
 * Make sure that you have a development.services.yml in your "/sites/" directory before you do.
 *
 */

$settings['container_yamls'][] = __DIR__ . '/local.services.yml';
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

/**
 * Assertions.
 *
 * The Drupal project primarily uses runtime assertions to enforce the
 * expectations of the API by failing when incorrect calls are made by code
 * under development.
 *
 * @see http://php.net/assert
 * @see https://www.drupal.org/node/2492225
 *
 * If you are using PHP 7.0 it is strongly recommended that you set
 * zend.assertions=1 in the PHP.ini file (It cannot be changed from .htaccess
 * or runtime) on development machines and to 0 in production.
 *
 * @see https://wiki.php.net/rfc/expectations
 */
assert_options(ASSERT_ACTIVE, TRUE);
\Drupal\Component\Assertion\Handle::register();



/**
 * Disable caching for migrations.
 *
 * Uncomment the code below to only store migrations in memory and not in the
 * database. This makes it easier to develop custom migrations.
 */
# $settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';


/**
 * Allow test modules and themes to be installed.
 *
 * Drupal ignores test modules and themes by default for performance reasons.
 * During development it can be useful to install test extensions for debugging
 * purposes.
 */
# $settings['extension_discovery_scan_tests'] = TRUE;

/**
 * Enable access to rebuild.php.
 *
 * This setting can be enabled to allow Drupal's php and database cached
 * storage to be cleared via the rebuild.php page. Access to this page can also
 * be gained by generating a query string from rebuild_token_calculator.sh and
 * using these parameters in a request to rebuild.php.
 */
$settings['rebuild_access'] = TRUE;

/**
 * Skip file system permissions hardening.
 *
 * The system module will periodically check the permissions of your site's
 * site directory to ensure that it is not writable by the website user. For
 * sites that are managed with a version control system, this can cause problems
 * when files in that directory such as settings.php are updated, because the
 * user pulling in the changes won't have permissions to modify files in the
 * directory.
 */
$settings['skip_permissions_hardening'] = TRUE;


