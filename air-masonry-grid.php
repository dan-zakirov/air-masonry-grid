<?php
/**
 * Plugin Name: Air Masonry Grid Blocks
 * Description: Adds a custom block category and a masonry grid block to the Gutenberg editor.
 * Version: 1.0.0
 * Author: Dan Zakirov
 * Author URI: https://example.com/
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: air-masonry-grid
 * Domain Path: /languages/
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function air_masonry_grid_load_plugin_textdomain() {
    load_plugin_textdomain( 'air-masonry-grid', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}

add_action( 'plugins_loaded', 'air_masonry_grid_load_plugin_textdomain' );

// Register block scripts and styles
function air_masonry_grid_enqueue_block_assets() {
    wp_enqueue_script(
        'air-masonry-grid-block-js',
        plugin_dir_url(__FILE__) . 'assets/js/block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/block.js')
    );
}

function air_masonry_grid_enqueue_block_assets_frontend() {
    wp_enqueue_style(
        'air-masonry-grid-block-css',
        plugin_dir_url(__FILE__) . 'assets/css/block.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/block.css')
    );
}

add_action( 'enqueue_block_editor_assets', 'air_masonry_grid_enqueue_block_assets' );
add_action( 'enqueue_block_assets', 'air_masonry_grid_enqueue_block_assets_frontend' );

// Register custom block category
function air_masonry_grid_register_block_category( $categories, $post ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'air-masonry-grid',
                'title' => __( 'Air Masonry Grid', 'air-masonry-grid' ),
            ),
        )
    );
}

add_filter( 'block_categories', 'air_masonry_grid_register_block_category', 10, 2 );