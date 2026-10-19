const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "br",
  "em",
  "i",
  "li",
  "ol",
  "p",
  "span",
  "strong",
  "ul",
]);

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractSafeHref(attrs: string) {
  const match = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const href = (match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();
  if (!/^https?:\/\//i.test(href)) {
    return null;
  }
  return escapeHtml(href);
}

/** Allowlist sanitizer — no jsdom/DOMPurify (broken on Vercel serverless via ESM/require). */
function sanitizeHtml(input: string) {
  const withoutBlocks = input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "");

  return withoutBlocks.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g,
    (match, rawTag: string, attrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        return "";
      }

      if (match.startsWith("</")) {
        return `</${tag}>`;
      }

      if (tag === "br") {
        return "<br />";
      }

      if (tag === "a") {
        const href = extractSafeHref(attrs);
        return href
          ? `<a href="${href}" rel="noopener noreferrer" target="_blank">`
          : "<a>";
      }

      return `<${tag}>`;
    },
  );
}

export function hasHtmlMarkup(content: string) {
  return /<[a-z][\s\S]*>/i.test(content);
}

export function prepareRichDescriptionHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) {
    return "";
  }

  if (hasHtmlMarkup(trimmed)) {
    return sanitizeHtml(trimmed);
  }

  const escaped = escapeHtml(trimmed).replace(/\n/g, "<br />");
  return `<p>${escaped}</p>`;
}
