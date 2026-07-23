# Cache Docs

A small, static, FastAPI-docs-styled site that teaches caching two ways:

- **Learn** — eight short lessons that build every core idea up from zero, one at a time — cache
  stores, keys, TTL, eviction, invalidation, HTTP caching — with every line of code explained, in
  plain Node.js (Express). No prior caching knowledge assumed.
- **Guides** — seven practical, production-grade references for developers who already know that
  vocabulary: a deep-dive on Redis itself and on using it from Node.js (node-redis), a real caching
  library (apicache), standard pattern names, and the trade-offs a professional team weighs when
  caching ships to production. Every example is real, runnable Node.js/Express code.

Plain HTML/CSS/JS, no build step, no framework — just open it or host it as static files.

## Structure

```
index.html                          Home page

learn/index.html                     Learn hub — links to all eight lessons
learn/what-is-caching.html            1. Introduction (no code, analogies + vocabulary)
learn/your-first-cache.html           2. Your first cache (a plain object, hit/miss)
learn/cache-keys.html                 3. Cache keys (a real bug, then the fix)
learn/ttl.html                        4. TTL & expiration (Date.now(), shelf life)
learn/eviction.html                   5. Eviction (hand-built LRU with a JS Map)
learn/invalidation.html               6. Invalidation (clearing a cache entry on write)
learn/http-caching.html                7. HTTP caching (the Cache-Control header)
learn/putting-it-together.html         8. Full combined example + lesson map

guides/index.html                    Guides hub — links to all seven guides
guides/patterns.html                   Cache-Aside, Read-Through, Write-Through, Write-Behind
guides/redis-concepts.html              Redis fundamentals: data structures, persistence, eviction, TTL
guides/redis-nodejs.html                 node-redis in depth: commands, transactions, pub/sub, patterns
guides/caching-libraries.html            Middleware-based read-through caching with apicache
guides/http-caching-advanced.html        ETag/304, Vary, stale-while-revalidate, CDN edge caching
guides/invalidation-at-scale.html        Pub/sub invalidation, distributed locks, XFetch
guides/testing-observability.html        testcontainers, fake timers, hit-rate metrics

css/style.css                        Dark theme design system
js/main.js                           Copy buttons, mobile nav, on-page TOC, code tabs
```

## Viewing it locally

Because the page uses only static assets, you can open `index.html` directly in a browser. For
the smoothest experience (and to match how it'll behave on GitHub Pages), serve it with any static
file server, for example:

```bash
npx serve .
# then visit the URL it prints
```

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick your default
   branch (e.g. `main`) and the `/ (root)` folder.
4. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

Update the `GitHub ↗` link in each page's header (search for `your-username/cache-docs`) to point
at your actual repository.

## Notes

- Syntax highlighting uses [Prism.js](https://prismjs.com/) loaded from a CDN — an internet
  connection is needed for highlighted code when viewing the page.
- The site is Node.js/Express-only throughout — no framework tab switcher, no Python.
