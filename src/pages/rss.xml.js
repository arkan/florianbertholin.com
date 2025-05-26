import rss from '@astrojs/rss';

import { formatBlogPosts } from "../js/utils"

const postImportResult = import.meta.glob('./posts/**/*.md', { eager: true });
const posts = formatBlogPosts(Object.values(postImportResult));

export const GET = () => rss({
    title: 'Florian Bertholin',
    description: 'A humble software engineer & leader blog',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.date,
        description: post.frontmatter.description,
        customData: `
      <author>Florian Bertholin</author>
    `
    }))
});