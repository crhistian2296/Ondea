"use client";

import { prepareRichDescriptionHtml } from "@/lib/description-html/description-html";

export function RichDescription({ content }: { content: string }) {
  const html = prepareRichDescriptionHtml(content);

  if (!html) {
    return (
      <p className="rich-text rich-text--empty">Sin descripción disponible.</p>
    );
  }

  return (
    <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
