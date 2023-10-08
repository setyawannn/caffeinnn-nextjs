'use client'
import CategoryCard from '@/components/reusable/CategoryCard'
import MenuCard from '@/components/reusable/MenuCard'
import Title from '@/components/reusable/Title'
import { IMenu } from '@/types/menu-types'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PiBowlFood } from 'react-icons/pi'
import { TbGlassFull } from 'react-icons/tb'

const ListCategory = [
  {
    name: 'Food',
    href: 'Makanan',
    icon: <PiBowlFood size={28} className='text-zinc-700' />
  },
  {
    name: 'Drink',
    href: 'Minuman',
    icon: <TbGlassFull size={28} className='text-zinc-700' />
  }
]

export default function Home() {
  const [data, setData] = useState<IMenu[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const token = getCookie('jwtToken')
  const searchParam = useSearchParams().get('category')

  useEffect(() => {
    try {
      setIsLoading(true)
      const getMenu = async () => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            setData(res.data.data)
          })
      }

      getMenu()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [searchParam, token])

  return (
    <div className=''>
      <Title bold='Home' normal='Dashboard' />
      <div className='mt-6 flex w-full gap-4'>
        {ListCategory.map((item, index) => (
          <CategoryCard
            key={index}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>
      <div className='mt-10'>
        <Title bold='List' normal='Menu' />
        <div className='mt-6 grid grid-cols-3 gap-8'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data?.map((item: IMenu) => (
              <MenuCard
                key={item.id}
                name={item.nama_menu}
                price={item.harga}
                image={item.gambar}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
