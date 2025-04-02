import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Find all .scss files in the project
const scssFiles = glob.sync('src/**/*.scss');

// Remove all import statements
scssFiles.forEach(file => {
    let content = readFileSync(file, 'utf8');

    // Replace any line starting with @import followed by anything until end of line
    content = content.replace(/@import\s+(['"]).*?\1;?\n/g, '');

    writeFileSync(file, content, 'utf8');
    console.log(`Cleaned imports in ${file}`);
});

console.log('All SCSS files cleaned successfully!');