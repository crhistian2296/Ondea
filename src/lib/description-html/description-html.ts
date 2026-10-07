import DOMPurify from "isomorphic-dompurify";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
    return DOMPurify.sanitize(trimmed);
  }

  const escaped = escapeHtml(trimmed).replace(/\n/g, "<br />");
  return DOMPurify.sanitize(`<p>${escaped}</p>`);
}
