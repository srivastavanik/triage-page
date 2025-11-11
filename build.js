const fs = require('fs');
const path = require('path');

// Build script for Vercel static output
try {
  // Create Vercel output structure
  const outputDir = path.join(__dirname, '.vercel/output');
  const staticDir = path.join(outputDir, 'static');
  
  // Create directories
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }
  
  // Create config.json
  const config = {
    version: 3
  };
  fs.writeFileSync(path.join(outputDir, 'config.json'), JSON.stringify(config, null, 2));
  
  // Copy all files to static directory
  const filesToCopy = [
    'index.html',
    'FullLogo_Transparent_NoBuffer (2).png',
    'Black White Minimal Simple Modern Letter A Arts Gallery Logo (3).png',
    'Nyu_short_black.svg (1).png'
  ];
  
  filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(staticDir, file));
    }
  });
  
  // Copy public directory recursively
  const copyRecursive = (src, dest) => {
    if (!fs.existsSync(src)) return;
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  copyRecursive(path.join(__dirname, 'public'), path.join(staticDir, 'public'));
  
  console.log('✅ Build completed successfully');
  console.log(`📁 Output directory: ${outputDir}`);
} catch (error) {
  console.error('❌ Error during build:', error);
  process.exit(1);
}
