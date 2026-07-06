---
title: "What I Learned Building This Site"
date: 2026-07-06
description: "A deep dive into the tools, decisions, and lessons behind building my personal site — from choosing Astro to deploying with Docker and Cloudflare."
tags: ["astro", "web-dev", "docker", "deployment", "learning"]
---

Building a personal site sounds simple. Pick a template, throw some content in, deploy it. That's what I thought too. But somewhere between choosing a framework and getting it live, I ended up learning a lot more than expected.

Here's a breakdown of what I picked up along the way.

## Astro: Why I Chose It and What It Actually Does

I didn't pick Astro because it was trendy. I picked it because I wanted a site that was fast, simple, and didn't require a full React app just to render a blog post.

### What is Astro?

Astro is a static site generator that lets you build pages using components from frameworks like React, Vue, or Svelte — but here's the catch: it ships zero JavaScript by default. Your pages are rendered to plain HTML at build time. If you need interactivity, you opt into it on a per-component basis using what they call "islands."

For a personal site, this is ideal. You get the component model of a modern framework without shipping unnecessary JS to the browser.

### What I liked

- **Content-first architecture.** Astro treats markdown files as first-class citizens. I could write blog posts in `.md` files with frontmatter and they just worked — no extra setup.
- **Component flexibility.** I used `.astro` components for most of the site, but if I needed a interactive widget, I could drop in a React component and only that component would ship JS.
- **Performance.** The site scores near-perfect on Lighthouse without any optimization. That's the benefit of shipping static HTML.
- **Simplicity.** No complex state management, no API routes to maintain, no server-side rendering headaches. Just pages and components.

### What took time to understand

Astro's mental model is different from React. You write components that run at build time, not in the browser. It took me a moment to stop thinking in terms of `useState` and `useEffect` and start thinking in terms of "what does this page need to look like at build time?"

## Blog Management: Keeping It Simple

I wanted a blog that was easy to update. No CMS, no database, just markdown files.

Astro handles this perfectly. Each blog post is a `.md` file in `src/content/blog/` with frontmatter for metadata:

```markdown
---
title: "My Post"
date: 2026-07-06
description: "A short description."
tags: ["tech", "learning"]
---

Content goes here.
```

Astro's content collections let me query these files, sort by date, filter by tags, and generate pages automatically. It feels like having a mini CMS built into the framework.

The tradeoff is that you need to rebuild the site to publish new content. For a personal blog, that's fine — I'm already deploying the whole site anyway.

## Deployment Options: More Than I Expected

When it came time to deploy, I was surprised by how many options there are for a static site:

| Option | Pros | Cons |
|--------|------|------|
| **Vercel** | Zero config, fast, free tier | Vendor lock-in, less control |
| **Netlify** | Similar to Vercel, good free tier | Same concerns |
| **Cloudflare Pages** | Fast CDN, free, good DX | Newer, less mature |
| **GitHub Pages** | Free, simple | Limited, no server-side |
| **Self-hosted** | Full control | You manage everything |

I initially considered Vercel or Cloudflare Pages — both are solid for static sites. But I already had a server, and I wanted more control over how things were deployed and where.

That led me to Docker.

## Docker + Cloudflare Tunnel: My Actual Setup

This is where things got interesting. Instead of using a managed platform, I containerized the site and exposed it through a Cloudflare Tunnel.

### Why Docker?

- **Reproducibility.** The build environment is identical everywhere. No "works on my machine" issues.
- **Isolation.** The site runs in its own container with its own dependencies.
- **Portability.** I can move it to any server without changing anything.

The Dockerfile is straightforward — build the Astro site, serve the static output with a lightweight server like Nginx.

### Why Cloudflare Tunnel?

I didn't want to open ports on my server or deal with SSL certificates manually. Cloudflare Tunnel (formerly Argo Tunnel) lets you expose a local service to the internet through Cloudflare's network without punching holes in your firewall.

Here's the basic flow:

1. Run the site in a Docker container on my server
2. Run `cloudflared` (Cloudflare's tunnel client) on the same machine
3. `cloudflared` connects to Cloudflare's edge and routes traffic to my container
4. Visitors hit my domain, traffic flows through Cloudflare, reaches my server

Benefits:
- **No exposed ports.** The server isn't listening on 80/443 publicly.
- **Automatic SSL.** Cloudflare handles certificates.
- **DDoS protection.** Traffic goes through Cloudflare's network.
- **Free.** The tunnel itself is free, and I'm already using Cloudflare for DNS.

### The setup in practice

```
[Visitor] → [Cloudflare Edge] → [cloudflared tunnel] → [Docker container: Nginx serving Astro build]
```

It took some time to configure — mainly getting the tunnel to route correctly and making sure the container served the right directory — but once it was running, it's been solid.

## What I'd Do Differently

- **Start with deployment earlier.** I spent too long perfecting the site before figuring out how I'd actually host it. Getting the pipeline working first would have saved time.
- **Write more blog posts during development.** Having real content while building makes it easier to design around.
- **Don't overthink the stack.** Astro + markdown + Docker + Cloudflare is simple and effective. I could have shipped this in a weekend instead of overthinking it.

## Final Thoughts

The biggest lesson? A personal site doesn't need to be complicated. Pick a tool that fits your needs, write your content, and get it live. The stack matters less than the content.

If you're thinking about building a personal site, just start. You'll learn more by doing than by comparing frameworks.

---

*Next up: a deep dive into the Docker setup and how I configured Cloudflare Tunneling.*
