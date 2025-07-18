import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};
// This configuration file sets up PostCSS with Tailwind CSS and Autoprefixer.
// It allows you to use Tailwind's utility-first CSS framework and automatically adds vendor prefixes to your CSS rules for better browser compatibility.