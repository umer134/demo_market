'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addItem, removeItem, setQuantity } from '@/store/slices/cartSlice'
import { Product } from '@/types'

interface ProductCardProps { product: Product }

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const cartItem = useAppSelector(state =>
    state.cart.items.find(i => i.id === product.id)
  )

  const [localQty, setLocalQty] = useState(cartItem?.quantity || 0)

  useEffect(() => {
    if (cartItem) {
      setLocalQty(cartItem.quantity)
    } else {
      setLocalQty(0)
    }
  }, [cartItem])

  const onBuyClick = () => {
    if (!cartItem) {
      dispatch(addItem({ id: product.id }))
    }
  }

  const increase = () => {
    const newQty = localQty + 1
    setLocalQty(newQty)
    dispatch(setQuantity({ id: product.id, quantity: newQty }))
  }

  const decrease = () => {
    const newQty = localQty - 1
    if (newQty <= 0) {
      dispatch(removeItem({ id: product.id }))
    } else {
      setLocalQty(newQty)
      dispatch(setQuantity({ id: product.id, quantity: newQty }))
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (val <= 0 || isNaN(val)) return
    setLocalQty(val)
    dispatch(setQuantity({ id: product.id, quantity: val }))
  }

  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.title} />
      <div className="product-card__content">
        <h3 className="product-card__title" title={product.title}>{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__bottom">
          <span className="product-card__price">{product.price} ₽</span>
          {!cartItem ? (
            <button onClick={onBuyClick} className="button-buy">Купить</button>
          ) : (
            <div className="quantity-controls">
              <button onClick={decrease} type="button">–</button>
              <input type="number" value={localQty} onChange={onInputChange} min="1" />
              <button onClick={increase} type="button">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}