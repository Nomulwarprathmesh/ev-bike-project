import { useState, useEffect } from 'react'

const KEY = 'voltrix_compare'
const MAX_COMPARE = 4

export const useCompare = () => {
  const [compare, setCompare] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(compare))
  }, [compare])

  const add = (scooter) =>
    setCompare(prev => {
      if (prev.length >= MAX_COMPARE) return prev
      const exists = prev.find(s => s.id === scooter.id)
      if (exists) return prev
      return [...prev, scooter]
    })

  const remove = (id) => setCompare(prev => prev.filter(s => s.id !== id))

  const clear = () => setCompare([])

  const has = (id) => compare.some(s => s.id === id)

  const canAdd = () => compare.length < MAX_COMPARE

  return {
    compare,
    add,
    remove,
    clear,
    has,
    canAdd,
    count: compare.length,
  }
}
