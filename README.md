# Cache Docs

A small, static, FastAPI-docs-styled site that teaches caching two ways:

- **Learn** — eight short lessons that build every core idea up from zero, one at a time — cache
  stores, keys, TTL, eviction, invalidation, HTTP caching — with every line of code explained, in
  plain FastAPI (Python). No prior caching knowledge assumed.
- **Guides** — six practical, production-grade references for developers who already know that
  vocabulary: real libraries (Redis, fastapi-cache2, apicache), the Redis command API itself,
  standard pattern names, and the trade-offs a professional team weighs when caching ships to
  production. Every guide is shown in both **FastAPI (Python)** and **Express (Node.js)**, switchable
  via the tabs above each code block.

Plain HTML/CSS/JS, no build step, no framework — just open it or host it as static files.

## Structure

```
index.html                          Home page

learn/index.html                     Learn hub — links to all eight lessons
learn/what-is-caching.html            1. Introduction (no code, analogies + vocabulary)
learn/your-first-cache.html           2. Your first cache (a plain dict, hit/miss)
learn/cache-keys.html                 3. Cache keys (a real bug, then the fix)
learn/ttl.html                        4. TTL & expiration (time.time(), shelf life)
learn/eviction.html                   5. Eviction (hand-built LRU with OrderedDict)
learn/invalidation.html               6. Invalidation (clearing a cache entry on write)
learn/http-caching.html                7. HTTP caching (the Cache-Control header)
learn/putting-it-together.html         8. Full combined example + lesson map

guides/index.html                    Guides hub — links to all six guides
guides/patterns.html                   Cache-Aside, Read-Through, Write-Through, Write-Behind
guides/redis-caching.html               Redis lifecycle, DI, the core Redis command API, fail-open
guides/fastapi-cache2.html               Decorator/middleware caching: fastapi-cache2 & apicache
guides/http-caching-advanced.html        ETag/304, Vary, stale-while-revalidate, CDN edge caching
guides/invalidation-at-scale.html        Pub/sub invalidation, distributed locks, XFetch
guides/testing-observability.html        fakeredis/testcontainers, fake timers, hit-rate metrics

css/style.css                        Dark theme design system
js/main.js                           Copy buttons, mobile nav, on-page TOC, code tabs
```

## Viewing it locally

Because the page uses only static assets, you can open `index.html` directly in a browser. For
the smoothest experience (and to match how it'll behave on GitHub Pages), serve it with any static
file server, for example:

```bash
python -m http.server 8000
# then visit http://localhost:8000
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
- `js/main.js`'s FastAPI/Express code tab switcher is used throughout Guides; Learn stays
  Python-only by design, so those pages don't render the tab buttons at all. The switcher remembers
  your last-picked language across pages via `localStorage`.
