import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
    return function (tree, { data }) {
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        // readingTime.text will give us minutes read as a friendly string,
        // i.e. "3 min read"
        data.astro.frontmatter.minutesRead = readingTime.text;
    };
}

export function remarkFillDescription() {
    return function (tree, { data }) {
        if (!data.astro.frontmatter.description || data.astro.frontmatter.description.length === 0) {
            const textOnPage = toString(tree);
            data.astro.frontmatter.description = textOnPage.slice(0, 500) + "...";
        }
    };
}