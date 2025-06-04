
export interface CartItem {
    id: number,
    quantity: number,
    price?: number
};

export interface CartState {
    items: CartItem[],
}

export interface PhoneState {
    number: string
}

export interface Product {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number
}

export interface ProductsResponse {
    page: number,
    amount: number,
    total: number,
    items: Product[]
}

export interface Review {
    id: number,
    text: string
}

export interface ReviewState {
    items: Review[]
}

export type ReviewsResponse = Review[]

export interface OrderReponse {
    phone: PhoneState,
    cart: CartItem[],
    success?: number,
    error?: string
}
