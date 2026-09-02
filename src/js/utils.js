const SITE_TIME_ZONE = "Europe/Paris";

const siteDatePartsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

const siteDateDisplayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
});

const siteDateTimePartsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
});

function getDateParts(date, formatter) {
    return Object.fromEntries(
        formatter
            .formatToParts(date)
            .filter(({ type }) => type !== "literal")
            .map(({ type, value }) => [type, value]),
    );
}

function getSiteDateParts(date) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new TypeError(`Invalid date: ${date}`);
    }

    return getDateParts(parsedDate, siteDatePartsFormatter);
}

function getSiteDateKey(date) {
    const { year, month, day } = getSiteDateParts(date);
    return `${year}-${month}-${day}`;
}

export function formatDate(date) {
    return siteDateDisplayFormatter.format(new Date(date));
}

export function formatDateAttribute(date) {
    return getSiteDateKey(date);
}

export function getSiteYear(date = new Date()) {
    return Number(getSiteDateParts(date).year);
}

export function getDateAtSiteMidnight(date) {
    const { year, month, day } = getSiteDateParts(date);
    const utcMidnight = new Date(Date.UTC(year, Number(month) - 1, day));
    const siteParts = getDateParts(
        utcMidnight,
        siteDateTimePartsFormatter,
    );
    const siteTimeAsUtc = Date.UTC(
        siteParts.year,
        Number(siteParts.month) - 1,
        siteParts.day,
        siteParts.hour,
        siteParts.minute,
        siteParts.second,
    );
    const siteOffset = siteTimeAsUtc - utcMidnight.getTime();

    return new Date(utcMidnight.getTime() - siteOffset);
}

export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
    tag = undefined,
    now = new Date(),
} = {}) {
    const currentDateKey = filterOutFuturePosts
        ? getSiteDateKey(now)
        : undefined;
    const filteredPosts = posts.reduce((acc, post) => {
        const { date, draft } = post.frontmatter;
        // filterOutDrafts if true
        if (filterOutDrafts && draft) return acc;

        // filterOutFuturePosts if true
        if (filterOutFuturePosts && getSiteDateKey(date) > currentDateKey) {
            return acc;
        }

        // filter by tag if provided
        if (tag && !post.frontmatter.tags.map((t) => slugify(t)).includes(tag)) return acc;

        // add post to acc
        acc.push(post)

        return acc;
    }, [])

    // sortByDate or randomize
    if (sortByDate) {
        filteredPosts.sort((a, b) =>
            getSiteDateKey(b.frontmatter.date).localeCompare(
                getSiteDateKey(a.frontmatter.date),
            ),
        )
    } else {
        filteredPosts.sort(() => Math.random() - 0.5)
    }

    // limit if number is passed
    if (typeof limit === "number") {
        return filteredPosts.slice(0, limit);
    }
    return filteredPosts;
}

export function getTags(posts) {
    return posts.map((post) => post.frontmatter.tags).flat().map((tag) => slugify(tag)).flat();
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
