import React from 'react'
import Title from './reusable/Title'
import Image from 'next/image'

const Cart = () => {
  return (
    <div>
      <Title bold='Your' normal='Order' />
      <div className='mt-6'>
        <div className='flex items-center gap-4'>
          <div className='flex h-16 w-32 items-center justify-center rounded-xl bg-orange-100'>
            <Image
              src={
                'https://ik.imagekit.io/setyawanlearn/ukk-cafe/menu/Coffee_Latte_1696742449432_VKCpwW991'
              }
              alt=''
              width={100}
              height={100}
              className='object-cover'
            />
          </div>
          <div className='w-2/5'>
            <h4 className='text-lg font-semibold'>Burger Cina</h4>
            <p className='text-base font-medium text-zinc-500'>10K</p>
          </div>
          <div className='w-1/5'>
            <p>3x</p>
          </div>
          <div className='w-1/5'>
            <h4 className='text-lg font-semibold'>30K</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
