/**
 * Lightweight, safe, and robust Markdown to HTML compiler
 * designed for FitMetricsHub's educational guides.
 */
export function parseMarkdownToHtml(markdown: string): string {
  // Normalize windows newlines
  let html = markdown.replace(/\r\n/g, '\n');

  // Escaping simple bold indicators
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Escaping simple italics
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links parsing: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold underline decoration-dotted decoration-emerald-500/50 hover:decoration-solid transition-colors">$1</a>');

  // Standard inline code ticks
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 font-mono text-xs rounded-md border border-slate-200/50 dark:border-gray-800">$1</code>');

  // Headers parsing with automatic HTML id tagging for Table of Contents mapping
  html = html.replace(/^### (.*?)$/gm, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h3 id="${id}" class="text-base font-bold mt-5 mb-2.5 text-gray-900 dark:text-white scroll-mt-24">${p1}</h3>`;
  });
  html = html.replace(/^## (.*?)$/gm, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h2 id="${id}" class="text-xl font-bold mt-7 mb-3 text-gray-900 dark:text-white border-b border-slate-150 pb-1.5 dark:border-gray-850 scroll-mt-24">${p1}</h2>`;
  });
  html = html.replace(/^# (.*?)$/gm, (match, p1) => {
    const id = p1.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h1 id="${id}" class="text-2xl font-extrabold mt-8 mb-4 text-gray-950 dark:text-white scroll-mt-24">${p1}</h1>`;
  });

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-emerald-500 pl-4 py-1 italic my-4 text-slate-500 dark:text-gray-400 bg-slate-50/50 dark:bg-slate-950/20 pr-2">$1</blockquote>');

  // Bullet Lists
  const lines = html.split('\n');
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const content = line.substring(2);
      if (!inList) {
        lines[i] = `<ul class="list-disc pl-5 mb-4 space-y-1.5 text-gray-650 dark:text-gray-300">\n  <li>${content}</li>`;
        inList = true;
      } else {
        lines[i] = `  <li>${content}</li>`;
      }
    } else {
      if (inList) {
        lines[i - 1] += '\n</ul>';
        inList = false;
      }
    }
  }
  if (inList) {
    lines[lines.length - 1] += '\n</ul>';
  }
  html = lines.join('\n');

  // Standard Paragraph tags wrapping for double-spacing separation
  const blocks = html.split(/\n\n+/);
  const resultBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // If it starts with an HTML block element, do not wrap in p tags
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('<ol')
    ) {
      return trimmed;
    }
    return `<p class="mb-4 text-gray-650 dark:text-gray-300 leading-relaxed text-justify">${trimmed.replace(/\n/g, ' ')}</p>`;
  });

  return resultBlocks.join('\n\n');
}
