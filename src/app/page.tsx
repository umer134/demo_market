import CartSummary from '@/components/CartSummary'
import ProductList from '@/components/ProductList'
import Reviews from '@/components/Reviews'

export default function HomePage() {
  return (
    <main className="main-container">
      <Reviews />
      <h2>Корзина</h2>
      <CartSummary />
      <h2>Товары</h2>
      <ProductList />
    </main>
  )
}
