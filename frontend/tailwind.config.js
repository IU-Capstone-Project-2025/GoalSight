/**
 * Tailwind CSS configuration
 * 
 * - content: specifies files to scan for class names
 * - theme.extend: place to add custom theme modifications
 * - plugins: array for Tailwind plugins (empty here)
 * - corePlugins.preflight: enables Tailwind's base CSS reset styles
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: true,
    },
}