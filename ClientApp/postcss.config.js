const dotenv = require('dotenv').config();
const colors = require('tailwindcss/colors')

let tailwindcss;

tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss('./website-css-config.js'),
        require('autoprefixer')
    ],
};
