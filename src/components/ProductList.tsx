"use client"
import { useEffect, useState, useRef, useCallback } from 'react'
import { useGetProductsQuery } from '@/store/api/productsApi'
import ProductCard from '@/components/ProductCard'
import Spinner from '@/components/Spinner';
import { Product } from '@/types'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery({ page, page_size: 20 })

  useEffect(() => {
    if (isSuccess && data) {
      setAllProducts(prev => [...prev, ...data.items])
    }
  }, [isSuccess, data])

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && data && allProducts.length < data.total) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observerRef.current.observe(node)
  }, [isLoading, data, allProducts.length])

  if (isError) {
    return <div className='error-message'>Ошибка при загрузке товаров</div>
  }

  return (
    <>
      <div className="products-grid">
        {isLoading && <Spinner />}
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: 1 }} />
    </>
  )
}