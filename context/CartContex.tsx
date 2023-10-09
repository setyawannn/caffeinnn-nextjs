'use client'
import { IMenu } from '@/types/menu-types'
import { createContext, useContext, useState } from 'react'

type CoffeeCartProviderProps = {
  children: React.ReactNode
}

type CartItem = {
  menuId: number
  harga: number
  jumlah: number
}

type CoffeeCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (menu: IMenu) => void
  decreaseCartQuantity: (menu: IMenu) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const CoffeeCartContext = createContext({} as CoffeeCartContext)

export function useCoffeeCart() {
  return useContext(CoffeeCartContext)
}

export function CoffeeCartProvider({ children }: CoffeeCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce(
    (jumlah, item) => item.jumlah + jumlah,
    0
  )

  function getItemQuantity(id: number): number {
    return cartItems.find(item => item.menuId === id)?.jumlah || 0
  }

  function increaseCartQuantity(menu: IMenu): void {
    setCartItems(currItems => {
      if (currItems.find(item => item.menuId === menu.id) == null) {
        return [...currItems, { menuId: menu.id, harga: menu.harga, jumlah: 1 }]
      } else {
        return currItems.map(item => {
          if (item.menuId === menu.id) {
            return { ...item, jumlah: item.jumlah + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(menu: IMenu): void {
    setCartItems(currItems => {
      if (currItems.find(item => item.menuId === menu.id)?.jumlah === 1) {
        return currItems.filter(item => item.menuId !== menu.id)
      } else {
        return currItems.map(item => {
          if (item.menuId === menu.id) {
            return { ...item, jumlah: item.jumlah - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.menuId !== id)
    })
  }

  return (
    <CoffeeCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems
      }}
    >
      {children}
    </CoffeeCartContext.Provider>
  )
}
