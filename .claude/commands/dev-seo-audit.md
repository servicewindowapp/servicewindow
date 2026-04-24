# /dev-seo-audit — Developer SEO Audit

Audit the current page file or component for SEO implementation completeness. Focused on code-level checks — not keyword strategy or marketing copy. Works on Next.js App Router pages.

> Note: The Marketing plugin's `/seo-audit` covers keyword research, competitor analysis, and content strategy.
> This command covers code implementation: metadata, structured data, heading hierarchy, alt text, and technical correctness.

## Invocation
```
/dev-seo-audit [file path or paste file contents]
/dev-seo-audit src/app/about/page.tsx
```

If no file is specified, audit the most recently discussed or edited file.

## Audit Checklist — Run Every Item

### 1. Metadata (`metadata` export or `generateMetadata`)

- [ ] `title` is set and follows pattern: `Page Name | Site Name`
- [ ] `description` is between 50 and 160 characters
- [ ] `openGraph.title` present
- [ ] `openGraph.description` present
- [ ] `openGraph.url` is an absolute URL (not relative)
- [ ] `openGraph.images` includes at least one image with explicit `width` and `height`
- [ ] `openGraph.type` is set (`website`, `article`, etc.)
- [ ] `twitter.card` is `summary_large_image` or `summary`
- [ ] `twitter.title` present
- [ ] `twitter.images` present
- [ ] `alternates.canonical` is set to the absolute canonical URL
- [ ] No metadata is duplicated across `layout.tsx` and `page.tsx` without intentional override

### 2. Heading Hierarchy

- [ ] Exactly one `<h1>` per page (check layout for inherited headings that may add a second)
- [ ] `<h2>` through `<h6>` follow logical nesting — no level is skipped
- [ ] `<h1>` content matches or closely relates to the page `<title>`
- [ ] Headings describe content structure, not just style (no `<h2>` used only for font size)

### 3. Images

- [ ] Every `<img>` and Next.js `<Image>` has an `alt` prop
- [ ] Decorative images use `alt=""` (not `alt="image"` or `alt="photo"`)
- [ ] Alt text is descriptive for content images — not filename or generic label
- [ ] Hero / LCP candidate images use `priority` prop on `<Image>` component
- [ ] No images use pixel dimensions that require browser rescaling at common viewports

### 4. Structured Data (JSON-LD)

Check whether structured data is present and appropriate:

| Page Type | Expected Schema |
|-----------|----------------|
| Home / About | `Organization` |
| Product / Service | `Product` or `Service` |
| Blog / Article | `Article` or `BlogPosting` |
| Multi-page nav | `BreadcrumbList` |
| FAQ content | `FAQPage` |
| Local business | `LocalBusiness` |

- [ ] Structured data uses JSON-LD format (not microdata or RDFa)
- [ ] Injected via `<script type="application/ld+json">` in a Server Component
- [ ] Required fields for the schema type are populated (validate against schema.org)
- [ ] No structured data for content that doesn't exist on the page

### 5. Links and Navigation

- [ ] Internal links use `<Link>` from `next/link` (not `<a>` with hard-coded hrefs)
- [ ] External links have `rel="noopener noreferrer"` when opening in new tab
- [ ] No links with text like "click here" or "read more" — anchor text is descriptive
- [ ] Breadcrumb navigation is present on deep pages and matches BreadcrumbList schema

### 6. Performance Signals That Affect SEO

- [ ] LCP element (typically hero image or heading) loads without render-blocking
- [ ] No layout shift from images without explicit `width`/`height`
- [ ] Page does not rely on client-side rendering for primary content (prefer Server Components)
- [ ] No blocking `<script>` tags in `<head>` without `async` or `defer`

## Output Format

Report findings as three sections:

**PASS** — items correctly implemented (list briefly)

**FAIL** — items missing or incorrect, with:
- What is missing or wrong
- The exact code fix required (not a description — actual code)
- Severity: Critical / High / Medium / Low

**NOT APPLICABLE** — items that don't apply to this page type, with a one-line reason

End with a count: `X issues found — Y critical, Z high, N medium/low`
