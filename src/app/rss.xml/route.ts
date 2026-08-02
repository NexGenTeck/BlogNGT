import { POSTS } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://blog.nexgenteck.com';

  const itemsXml = POSTS.map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author><![CDATA[${post.author.name}]]></author>
      <category><![CDATA[${post.category}]]></category>
    </item>
  `
  ).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NexGenTeck Blog</title>
    <link>${baseUrl}</link>
    <description>Your Digital Growth Partner - Engineering &amp; Growth Insights</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
