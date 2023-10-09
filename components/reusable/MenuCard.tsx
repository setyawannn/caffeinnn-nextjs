'use client'
import { useCoffeeCart } from '@/context/CartContex'
import { IMenu } from '@/types/menu-types'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
  menu: IMenu
}

interface typeDetailTransaksi {
  jumlah: number
  menuId: number
  harga: number
}

const MenuCard: React.FC<Props> = ({ menu }: Props) => {
  const [detailTransaksi, setDetailTransaksi] = useState<
    Array<typeDetailTransaksi>
  >([])
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartItems
  } = useCoffeeCart()

  // const quantity = getItemQuantity(menu.id)

  const changeK = (value: number) => {
    const result = value / 1000
    return result
  }

  console.log('menucard', detailTransaksi)

  return (
    <div className='flex cursor-pointer flex-col items-center justify-center rounded-xl p-4 duration-200 hover:bg-zinc-100'>
      <div className='flex w-full justify-center rounded-full'>
        <Image
          src={
            menu.gambar ||
            'https://ik.imagekit.io/setyawanlearn/ukk-cafe/menu/Coffee_Latte_1696742449432_VKCpwW991'
          }
          alt=''
          width={200}
          height={200}
          className='h-fit w-full'
        />
      </div>
      <div className='mt-2 text-center'>
        <h3 className='text-xl font-semibold'>{menu.nama_menu}</h3>
        <p className='text-2xl font-medium text-danger'>
          {changeK(menu.harga)}K
        </p>
      </div>
      <div className='w-fulljustify-between mt-6 flex h-fit items-center gap-x-4'>
        <div className='flex w-full'>
          <Button
            color='danger'
            className='w-full'
            onClick={() => increaseCartQuantity(menu)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MenuCard
