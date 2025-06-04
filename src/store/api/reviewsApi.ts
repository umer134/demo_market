import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewsResponse } from "@/types";

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
    }),
    endpoints: (build) => ({
        getReviews: build.query<ReviewsResponse, void>({
            query: () => `/api/reviews`
        })
    })
});

export const { useGetReviewsQuery } = reviewsApi;