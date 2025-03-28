/**
 * Script to fix Sass import paths in your project
 *
 * This script:
 * 1. Updates the import paths in all .scss files
 * 2. Creates missing .scss files for components that need them
 *
 * How to use:
 * 1. Save this file as fix-sass.js in your project root
 * 2. Run with: node fix-sass.js
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get current directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all .scss files in the project
const scssFiles = glob.sync('src/**/*.scss');

// Update import paths in existing files
scssFiles.forEach(file => {
    let content = readFileSync(file, 'utf8');

    // Replace absolute path imports with alias imports
    content = content.replace(
        /@import ['"]\.\/src\/styles\/([^'"]+)['"]/g,
        '@import \'@/styles/$1\''
    );

    // Replace relative path imports (e.g., '../../../styles/variables')
    content = content.replace(
        /@import ['"]\.\.\/\.\.\/\.\.\/styles\/([^'"]+)['"]/g,
        '@import \'@/styles/$1\''
    );

    writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
});

// Create missing component scss files
const componentsWithMissingStyles = [
    'src/components/sections/Experience/Experience.scss',
    'src/components/sections/Projects/Projects.scss',
    'src/components/sections/Contact/Contact.scss',
    'src/components/sections/VideoGallery/VideoGallery.scss'
];

componentsWithMissingStyles.forEach(file => {
    const dir = dirname(file);

    // Create directory if it doesn't exist
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    // Create the file with basic imports if it doesn't exist
    if (!existsSync(file)) {
        const content = `@import '@/styles/variables';
@import '@/styles/mixins';

.${basename(file, '.scss').toLowerCase()} {
  padding: 6rem 0;
  
  &__container {
    @include container;
  }
  
  &__header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  &__title {
    font-size: $text-4xl;
    margin-bottom: 1rem;
    
    @include respond-to('md') {
      font-size: $text-5xl;
    }
  }
  
  &__subtitle {
    color: $color-gray-600;
    max-width: 600px;
    margin: 0 auto;
  }
}
`;
        writeFileSync(file, content, 'utf8');
        console.log(`Created ${file}`);
    }
});

// Update vite.config.ts
const viteConfigPath = 'vite.config.ts';
if (existsSync(viteConfigPath)) {
    let viteConfig = readFileSync(viteConfigPath, 'utf8');

    // Check if the CSS section needs updating
    if (!viteConfig.includes('includePaths')) {
        const cssConfigPattern = /css:\s*{([^}]*)}/;
        const updatedCssConfig = `css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'src')],
        additionalData: \`
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        \`,
      },
    },
  }`;

        if (viteConfig.match(cssConfigPattern)) {
            viteConfig = viteConfig.replace(cssConfigPattern, updatedCssConfig);
        } else {
            // If css config doesn't exist, add it before the closing bracket of defineConfig
            viteConfig = viteConfig.replace(
                /}\s*\)\s*$/,
                ',\n  ' + updatedCssConfig + '\n})'
            );
        }

        writeFileSync(viteConfigPath, viteConfig, 'utf8');
        console.log(`Updated ${viteConfigPath}`);
    }
}

console.log('Sass import paths fixed successfully!');