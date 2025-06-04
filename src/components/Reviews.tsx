"use client";

import { useGetReviewsQuery } from "@/store/api/reviewsApi";
import Review from "./Review";
import { Review as ReviewType } from "@/types";

export default function Reviews() {
  const { data: reviews, isLoading, error } = useGetReviewsQuery();

  if (error) return <div className="error-message">Ошибка при загрузке отзывов</div>;

  return (
    <div className="reviews-wrapper">
      <h2>Отзывы</h2>
      {isLoading && 
      <div className="review-loading">
          Загрузка информации об отзывах…
      </div>}
      {reviews?.map((review: ReviewType) => (
        <Review key={review.id} content={review.text} />
      ))}
    </div>
  );
}