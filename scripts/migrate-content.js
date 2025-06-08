const fs = require('fs')
const path = require('path')

const HUGO_CONTENT_DIR = path.join(__dirname, '../../parloblog/content/posts')
const NEXT_CONTENT_DIR = path.join(__dirname, '../content/posts')

// Ensure the target directory exists
if (!fs.existsSync(NEXT_CONTENT_DIR)) {
  fs.mkdirSync(NEXT_CONTENT_DIR, { recursive: true })
}

// Get all markdown files from Hugo content
const files = fs.readdirSync(HUGO_CONTENT_DIR).filter(file => file.endsWith('.md'))

// Process each file
files.forEach(file => {
  const sourcePath = path.join(HUGO_CONTENT_DIR, file)
  const targetPath = path.join(NEXT_CONTENT_DIR, file)
  
  // Read the content
  const content = fs.readFileSync(sourcePath, 'utf8')
  
  // Write to the new location
  fs.writeFileSync(targetPath, content)
  
  console.log(`Migrated: ${file}`)
})

// Copy images
const HUGO_STATIC_DIR = path.join(__dirname, '../../parloblog/static')
const NEXT_PUBLIC_DIR = path.join(__dirname, '../public')

if (fs.existsSync(HUGO_STATIC_DIR)) {
  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        copyDir(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
        console.log(`Copied: ${entry.name}`)
      }
    }
  }

  copyDir(HUGO_STATIC_DIR, NEXT_PUBLIC_DIR)
}

console.log('Migration completed successfully!') 