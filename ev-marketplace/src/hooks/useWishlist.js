import { useState, useEffect } from 'react'

const KEY = 'voltrix_wishlist'

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const add = (scooter) =>
    setWishlist(prev => {
      const exists = prev.find(s => s.id === scooter.id)
      if (exists) return prev
      return [...prev, scooter]
    })

  const remove = (id) => setWishlist(prev => prev.filter(s => s.id !== id))

  const clear = () => setWishlist([])

  const has = (id) => wishlist.some(s => s.id === id)

  return {
    wishlist,
    add,
    remove,
    clear,
    has,
    count: wishlist.length,
  }
}
