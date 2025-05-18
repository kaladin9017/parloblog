const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES, MARKS } = require('@contentful/rich-text-types');

// Custom HTML renderer options
const options = {
  renderNode: {
    // Handle paragraphs
    [BLOCKS.PARAGRAPH]: (node, next) => {
      return `<p>${next(node.content)}</p>`;
    },
    // Handle headings
    [BLOCKS.HEADING_1]: (node, next) => {
      return `<h1>${next(node.content)}</h1>`;
    },
    [BLOCKS.HEADING_2]: (node, next) => {
      return `<h2>${next(node.content)}</h2>`;
    },
    [BLOCKS.HEADING_3]: (node, next) => {
      return `<h3>${next(node.content)}</h3>`;
    },
    [BLOCKS.HEADING_4]: (node, next) => {
      return `<h4>${next(node.content)}</h4>`;
    },
    [BLOCKS.HEADING_5]: (node, next) => {
      return `<h5>${next(node.content)}</h5>`;
    },
    [BLOCKS.HEADING_6]: (node, next) => {
      return `<h6>${next(node.content)}</h6>`;
    },
    // Handle lists
    [BLOCKS.UL_LIST]: (node, next) => {
      return `<ul>${next(node.content)}</ul>`;
    },
    [BLOCKS.OL_LIST]: (node, next) => {
      return `<ol>${next(node.content)}</ol>`;
    },
    [BLOCKS.LIST_ITEM]: (node, next) => {
      return `<li>${next(node.content)}</li>`;
    },
    // Handle blockquotes
    [BLOCKS.QUOTE]: (node, next) => {
      return `<blockquote>${next(node.content)}</blockquote>`;
    },
    // Handle horizontal rule
    [BLOCKS.HR]: () => {
      return `<hr>`;
    },
    // Handle embedded entries and assets
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (node.data && node.data.target && node.data.target.fields) {
        const asset = node.data.target.fields;
        const url = asset.file && asset.file.url ? `https:${asset.file.url}` : '';
        const alt = asset.title || 'Embedded Asset';
        return `<img src="${url}" alt="${alt}">`;
      }
      return '';
    },
    // Handle hyperlinks
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${node.data.uri}">${next(node.content)}</a>`;
    },
    // Handle embedded entries inline
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      if (node.data && node.data.target && node.data.target.fields) {
        const entry = node.data.target.fields;
        return `<em>${entry.title || 'Embedded Entry'}</em>`;
      }
      return '';
    }
  },
  renderMark: {
    // Handle text formatting
    [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
    [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
    [MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
    [MARKS.CODE]: (text) => `<code>${text}</code>`,
  }
};

/**
 * Simple HTML to Markdown-like conversion
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  let markdown = html;
  
  // Convert headers
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
  markdown = markdown.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n');
  markdown = markdown.replace(/<h5>(.*?)<\/h5>/g, '##### $1\n\n');
  markdown = markdown.replace(/<h6>(.*?)<\/h6>/g, '###### $1\n\n');
  
  // Convert paragraphs
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
  
  // Convert code
  markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`');
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n\n');
  
  // Convert links
  markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
  
  // Convert images
  markdown = markdown.replace(/<img src="(.*?)" alt="(.*?)">/g, '![$2]($1)\n\n');
  
  // Convert horizontal rules
  markdown = markdown.replace(/<hr>/g, '---\n\n');
  
  // Convert lists (simple conversion)
  markdown = markdown.replace(/<ul>(.*?)<\/ul>/gs, '$1\n');
  markdown = markdown.replace(/<ol>(.*?)<\/ol>/gs, '$1\n');
  markdown = markdown.replace(/<li>(.*?)<\/li>/g, '- $1\n');
  
  // Clean up any remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Fix multiple newlines
  markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return markdown;
}

/**
 * Convert Contentful Rich Text to Markdown
 * 
 * @param {Object} richText - Contentful Rich Text document
 * @returns {String} - Markdown string
 */
function richTextToMarkdown(richText) {
  try {
    if (!richText) return '';
    
    // For simple cases where we already have markdown
    if (typeof richText === 'string') {
      return richText;
    }
    
    // Convert rich text to HTML first
    const html = documentToHtmlString(richText, options);
    
    // Then convert HTML to Markdown
    return htmlToMarkdown(html);
  } catch (error) {
    console.error('Error converting rich text to markdown:', error);
    // Fall back to empty string or original content if possible
    return typeof richText === 'string' ? richText : '';
  }
}

module.exports = richTextToMarkdown; 