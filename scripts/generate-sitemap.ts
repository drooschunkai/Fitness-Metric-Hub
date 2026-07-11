import fs from 'fs';
import path from 'path';
import { CALCULATORS } from '../src/data/calculators';
import { GUIDES } from '../src/data/guides';

const BASE_URL = 'https://fitmetricshub.com';

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const corePages = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/sitemap',
    '/calculators',
    '/guides'
  ];

  const calculatorPages = CALCULATORS.map(c => `/calculators/${c.slug}`);
  const guidePages = GUIDES.map(g => `/guides/${g.slug}`);

  const allPages = Array.from(new Set([...corePages, ...calculatorPages, ...guidePages]));

  // Format today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allPages.forEach(pagePath => {
    // Standardize URL formatting
    const url = `${BASE_URL}${pagePath}`;
    
    // Assign higher priority to core pages and calculators
    let priority = '0.6';
    let changefreq = 'weekly';

    if (pagePath === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (pagePath === '/calculators' || pagePath === '/guides') {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (pagePath.startsWith('/calculators/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (pagePath.startsWith('/guides/')) {
      priority = '0.7';
      changefreq = 'weekly';
    }

    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');

  console.log(`Sitemap successfully generated at ${outputPath} with ${allPages.length} URLs!`);
}

generateSitemap();
