const fs = require('fs');
const path = require('path');

// Define temporary PNG files to remove
const tempFiles = [
  path.join('public', 'favicon-16x16.png'),
  path.join('public', 'favicon-32x32.png'),
  path.join('public', 'favicon-48x48.png'),
  path.join('public', 'favicon-64x64.png')
];

// Remove each temporary file
tempFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Removed temporary file: ${file}`);
    }
  } catch (error) {
    console.error(`Error removing file ${file}:`, error);
  }
});

console.log('Cleanup completed.');

