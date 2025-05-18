require('dotenv').config();
const contentful = require('contentful');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const richTextToMarkdown = require('./richTextToMarkdown');

const writeFileAsync = promisify(fs.writeFile);

// Initialize Contentful client
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Create content directories if they don't exist
const postsDir = path.join(__dirname, 'content', 'posts');
mkdirp.sync(postsDir);

async function fetchBlogPosts() {
  try {
    // Get all blog posts
    const entries = await client.getEntries({
      content_type: 'article',
      order: '-fields.date',
      include: 10, // Include references up to 10 levels deep
    });

    console.log(`Found ${entries.items.length} blog posts`);

    // Process each blog post
    for (const entry of entries.items) {
      const { fields } = entry;
      
      // Format categories
      const categories = fields.categories || [];
      
      // Get featured image URL if it exists
      let imageUrl = '';
      if (fields.featured_image && fields.featured_image.fields && fields.featured_image.fields.file) {
        imageUrl = `https:${fields.featured_image.fields.file.url}`;
      }

      // Create frontmatter
      const frontmatter = `+++
title = "${fields.title.replace(/"/g, '\\"')}"
date = "${fields.date || new Date().toISOString()}"
slug = "${fields.slug}"
categories = [${categories.map(cat => `"${cat}"`).join(', ')}]
author = "Parlo Team"
featured_image = "${imageUrl}"
isFeatured = ${fields.isFeatured || false}
+++

`;

      // Convert Contentful rich text to Markdown
      const content = await richTextToMarkdown(fields.body);
      
      // Write the file
      const filePath = path.join(postsDir, `${fields.slug}.md`);
      await writeFileAsync(filePath, frontmatter + content);
      console.log(`Created: ${filePath}`);
    }

    console.log('Content import complete!');
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

// Run the fetch function
fetchBlogPosts(); 