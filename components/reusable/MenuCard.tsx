'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface CardProps {
  name: string
  price: number
  image: string
  id: number
  harga: number
}

interface typeDetailTransaksi {
  jumlah: number
  menuId: number
  harga: number
}

const MenuCard = ({ name, price, image, id, harga }: CardProps) => {
  const [detailTransaksi, setDetailTransaksi] = useState<
    Array<typeDetailTransaksi>
  >([])
  const changeK = (value: number) => {
    const result = value / 1000
    return result
  }

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen dimuat.
    const storeditems = localStorage.getItem('detailTransaksi')

    if (storeditems) {
      // Mengurai data JSON jika ada data yang tersimpan.
      setDetailTransaksi(JSON.parse(storeditems))
    }
  }, [])

  useEffect(() => {
    // Menyimpan items ke dalam localStorage setiap kali berubah.
    localStorage.setItem('detailTransaksi', JSON.stringify(detailTransaksi))
  }, [detailTransaksi])

  const addToCart = (menuId: number, harga: number) => {
    // Mengecek apakah item dengan menuId yang sama sudah ada di keranjang.
    const existingItem = detailTransaksi.find(item => item.menuId === menuId)

    if (existingItem) {
      // Jika ada, maka tambahkan ke jumlah yang ada.
      const updatedItems = detailTransaksi.map(item =>
        item.menuId === menuId ? { ...item, jumlah: item.jumlah + 1 } : item
      )

      setDetailTransaksi(updatedItems)
    } else {
      // Jika tidak ada, tambahkan item baru ke dalam keranjang.
      const newDetailTransaksi = [...detailTransaksi]

      const newData = {
        menuId: menuId,
        harga: harga,
        jumlah: 1
      }

      // Menambahkan objek baru ke dalam array.
      newDetailTransaksi.push(newData)

      // Mengatur state cartItems dengan array yang diperbarui.
      setDetailTransaksi(newDetailTransaksi)
    }
  }

  console.log('menucard', detailTransaksi)

  return (
    <div
      onClick={() => addToCart(id, harga)}
      className='flex cursor-pointer flex-col items-center justify-center rounded-xl p-4 duration-200 hover:bg-zinc-100'
    >
      <div className='flex w-full justify-center rounded-full'>
        <Image
          src={
            image ||
            'https://ik.imagekit.io/setyawanlearn/ukk-cafe/menu/Coffee_Latte_1696742449432_VKCpwW991'
          }
          alt=''
          width={200}
          height={200}
          className='h-fit w-full'
        />
      </div>
      <div className='mt-2 text-center'>
        <h3 className='text-xl font-semibold'>{name}</h3>
        <p className='text-2xl font-medium text-danger'>{changeK(price)}K</p>
      </div>
    </div>
  )
}

export default MenuCard
