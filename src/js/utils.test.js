import assert from "node:assert/strict";
import test from "node:test";

import {
    formatBlogPosts,
    formatDate,
    formatDateAttribute,
    getDateAtSiteMidnight,
    getSiteYear,
} from "./utils.js";

function createPost(date) {
    return {
        frontmatter: {
            date: new Date(date),
            draft: false,
            tags: [],
        },
        url: "/posts/time-zone-regression/",
    };
}

test("publishes a post at midnight in Paris before midnight UTC", () => {
    const post = createPost("2026-09-01T00:00:00.000Z");
    const now = new Date("2026-08-31T22:30:00.000Z");

    assert.deepEqual(formatBlogPosts([post], { now }), [post]);
});

test("keeps a post hidden until midnight in Paris", () => {
    const post = createPost("2026-09-01T00:00:00.000Z");
    const now = new Date("2026-08-31T21:59:00.000Z");

    assert.deepEqual(formatBlogPosts([post], { now }), []);
});

test("formats dates and years in the Paris time zone", () => {
    const date = new Date("2098-12-31T23:30:00.000Z");

    assert.equal(formatDate(date), "January 1, 2099");
    assert.equal(formatDateAttribute(date), "2099-01-01");
    assert.equal(getSiteYear(date), 2099);
});

test("converts publication dates to midnight in Paris for feeds", () => {
    assert.equal(
        getDateAtSiteMidnight("2026-09-01").toISOString(),
        "2026-08-31T22:00:00.000Z",
    );
    assert.equal(
        getDateAtSiteMidnight("2099-01-01").toISOString(),
        "2098-12-31T23:00:00.000Z",
    );
});
