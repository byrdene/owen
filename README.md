# Custom Install

This Custom Install allows us to quickly configure new Drupal projects
with our default installation settings and local development files.

## Installation Instructions

1. Move the provided files and directories into the project root:
    * `config/` (config/sync should start empty)
    * `scripts/`
    * `profiles/zaldomoh_profile/`
    * `modules/custom/`
    * `themes/custom/zaldomoh/`
    * `composer.json`
    * `README.md`
2. (Optional) If a web root other than `web/` is required (for example,
  Acquia uses `docroot/`), change all instances of `web` in `composer.json` to
  the web root desired.
3. Delete composer.lock and re-run `composer install` to install all projects for our custom distribution, and to set up
  the initial project state with our defaults.
    * During install `settings.php`, `settings.local.php`, `services.yml` and
      `local.services.yml` will be created in `sites/default` and patched to
      our default settings.
    * A `.gitignore` will be created in the project root.
4. Replace all instances of `zaldomoh` in
  `sites/default/settings.local.php` with the correct local values. These values need updating:
    * Trusted host patterns.
    * Database name, username, and password.
5. Rename the custom profile (the rename utility is required and can be downloaded with homebrew: `brew install rename`):
    * From the root directory run `scripts/custom-profile.sh zaldomoh NEWNAME`. No spaces or dashes are allowed in NEWNAME
6. Create a local database and database user with credentials based on `sites/default/settings.local.php`. 
7. If necessary, create the remote database and database user and update `sites/default/settings.php` accordingly. 
It may also be necessary to add any host-specific settings to `sites/default/settings.php`.    
8. If working with GitHub, finish setting up the local and remote repositories:
    * `git init`
    * `git add .`
    * `git commit -m "Initial Commit"`
    * `git remote add origin https://github.com/byrdene/d9-sandbox.git`
    * `git push --set-upstream origin master`
9. Run the Drupal installer, ideally from the remote server to create any database tables necessary to the host.
10. First importing a copy of the remote database into the local database, 
    * export the shared configuration (`drush cex`)
    * import the local config split settings: `drush cim`  
11. Bring in any relevant custom modules (paragraphs, content types, etc), and enable
    * In the UI, set up workflows for the desired content types (most likely all)
    * Export and commit the updated config: `drush cex`
12. Set up the project's custom theme (the rename utility is required and can be downloaded with homebrew: `brew install rename`):
    * From the root directory, run `scripts/custom-theme.sh zaldomoh NEWNAME`
    * Enable the new theme in the UI
    * cd into the the custom theme directory
    * Run `npm install` to set up gulp and generate starting dist/ files
    * Export and commit the updated config: `drush cex`
      
## Updating Drupal Core

When updating Drupal, use the following Composer commands to update core and
scaffold files to their current versions, and core dependencies to the official
distribution versions: 
1. `composer update drupal/core "drupal/core-*" --with-all-dependencies`
2. Or if composer is low on memory, `COMPOSER_MEMORY_LIMIT=-1 composer update drupal/core "drupal/core-*" --with-all-dependencies` 


