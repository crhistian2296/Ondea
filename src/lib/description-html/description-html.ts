function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHtml(dirty: string) {
  // Lazy-load so importing this module does not init jsdom until sanitize runs.
  // Pairs with next.config `serverExternalPackages` (resolved from node_modules).
  const mod = import("isomorphic-dompurify") as {
    default?: { sanitize: (value: string) => string };
    sanitize?: (value: string) => string;
  };
  const DOMPurify = mod.default ?? mod;
  if (typeof DOMPurify.sanitize !== "function") {
    throw new Error("isomorphic-dompurify sanitize unavailable");
  }
  return DOMPurify.sanitize(dirty);
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
  return sanitizeHtml(`<p>${escaped}</p>`);
}
