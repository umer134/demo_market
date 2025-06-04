'use client'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setPhone } from '@/store/slices/phoneSlice'
import { clearCart } from '@/store/slices/cartSlice'
import { useOrderProductsMutation, useGetProductsQuery } from '@/store/api/productsApi'
import { Product } from '@/types'

export default function CartSummary() {
  const dispatch = useAppDispatch()
  const [orderProduct] = useOrderProductsMutation()

  const cartItems = useAppSelector(state => state.cart.items)
  const phone = useAppSelector(state => state.phone.number)

  const {
    data: allProducts,
    isLoading: productsLoading,
    isSuccess: productsLoaded,
    isError: productsError
  } = useGetProductsQuery({ page: 1, page_size: 1000 })

  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const findProduct = (id: number): Product | undefined =>
    allProducts?.items.find(p => p.id === id)

  const totalPrice = cartItems.reduce((acc, i) => {
    const prod = findProduct(i.id)
    if (!prod) return acc
    return acc + prod.price * i.quantity
  }, 0)

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    dispatch(setPhone(val))
  }

  const onOrder = async () => {
    if (phone.replace(/\D/g, '').length !== 11) {
      setError(true)
      return
    }
    setError(false)
    setIsSubmitting(true)

    const cartPayload = cartItems.map(i => ({ id: i.id, quantity: i.quantity }))
    const payload = { phone: phone.replace(/\D/g, ''), cart: cartPayload }

    try {
      const data = await orderProduct(payload).unwrap()
      if (data.success) {
        setShowSuccess(true)
        dispatch(clearCart())
      } else {
        console.error(data.error)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (productsError) {
    return (
      <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold">Ошибка при загрузке информации о товарах</h2>
      </div>
    )
  }

    return (
    <div className="cart-card">
      <h2 className="cart-card__title">Корзина</h2>

      {/* Сначала спиннер (или просто текст), пока идёт загрузка товаров */}
      {productsLoading && (
        <div className="cart-loading">
          Загрузка информации о товарах…
        </div>
      )}

      {/* Как только товары загрузились, рендерим остальной контент */}
      {productsLoaded && (
        <>
          {/* Итоговая строка: количество товаров и общая сумма */}
          <div className="cart-summary">
            🛒 Всего товаров: {cartItems.reduce((acc, i) => acc + i.quantity, 0)}<br />
            💵 Сумма: {totalPrice.toLocaleString('ru-RU')} ₽
          </div>

          {/* Список строк: «название  2× 20 000 ₽ = 40 000 ₽» */}
          <div className="cart-items">
            {cartItems.map(i => {
              const product = findProduct(i.id);
              if (!product) return null;

              const subtotal = product.price * i.quantity;
              return (
                <div key={i.id} className="cart-item">
                  <span className="cart-item__name">{product.title}</span>
                  <span className="cart-item__detail">
                    {i.quantity}× {product.price.toLocaleString('ru-RU')} ₽ = {subtotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              );
            })}
          </div>

          {/* Поле ввода телефона */}
          <div className="cart-input-wrapper">
            <label htmlFor="phone" className="cart-input-label">Телефон:</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={onPhoneChange}
              placeholder="+7 (___) ___-__-__"
              className={`cart-input ${error ? 'error' : ''}`}
            />
            {error && (
              <p className="cart-error">Введите корректный номер телефона</p>
            )}
          </div>

          {/* Кнопка «Заказать» */}
          <button
            onClick={onOrder}
            disabled={isSubmitting || cartItems.length === 0}
            className="button-order"
          >
            {isSubmitting ? 'Отправляем…' : 'Заказать'}
          </button>

          {/* Модальное окно «Спасибо!» */}
          {showSuccess && (
            <div className="success-overlay">
              <div className="success-modal">
                <h3 className="success-title">Спасибо!</h3>
                <p>Ваш заказ успешно отправлен.</p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="success-button"
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}