import { CartItem, OrderReponse, ProductsResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
  }),
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { page: number; page_size: number }>({
      query: ({ page, page_size }) => `/api/products?page=${page}&page_size=${page_size}`
    }),
    orderProducts: build.mutation<OrderReponse, {phone: string, cart: CartItem[]}>({
      query: ({phone, cart}) => ({
        url: `/api/order`,
        method: 'POST',
        body: {phone, cart}
      })
    })
  })
})

export const { useGetProductsQuery, useOrderProductsMutation } = productsApi