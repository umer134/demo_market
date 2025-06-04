"use client";

interface ReviewProps {
  content: string;
}

export default function Review({ content }: ReviewProps) {
  const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
  const textMatch = content.match(/<p>(.*?)<\/p>/);

  const title = titleMatch ? titleMatch[1] : "Без заголовка";
  const text = textMatch ? textMatch[1] : "";

  return (
    <div className="review-card">
      <h2 className="review-card__title">{title}</h2>
      <p className="review-card__text">{text}</p>
    </div>
  );
}
