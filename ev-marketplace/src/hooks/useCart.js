import { useState, useEffect } from 'react'

const KEY = 'voltrix_cart'
const COUPONS = { VOLTRIX10: 10, EV20: 20, FIRSTRIDE: 15 }

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] }
  })
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(cart)) }, [cart])

  const add = (scooter) =>
    setCart(prev => {
      const exists = prev.find(i => i.id === scooter.id)
      if (exists) return prev.map(i => i.id === scooter.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...scooter, qty: 1 }]
    })

  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return remove(id)
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setCart([])

  const applyCoupon = (code) => {
    const pct = COUPONS[code.toUpperCase()]
    if (pct) { setDiscount(pct); setCouponError(''); return true }
    setDiscount(0); setCouponError('Invalid coupon code')
    return false
  }

  const removeCoupon = () => { setDiscount(0); setCoupon(''); setCouponError('') }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountAmt = Math.round(subtotal * discount / 100)
  const total = subtotal - discountAmt

  return { cart, add, remove, updateQty, clear, coupon, setCoupon, discount, discountAmt, applyCoupon, removeCoupon, couponError, subtotal, total, count: cart.reduce((s, i) => s + i.qty, 0) }
}
