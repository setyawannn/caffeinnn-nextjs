'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuStore, LuClipboard, LuMenu, LuLogOut, LuUser2 } from 'react-icons/lu'

const ListNav = [
  { value: 'Home', href: '/', icon: <LuStore size={24} /> },
  { value: 'Menu', href: '/menu', icon: <LuClipboard size={24} /> },
  { value: 'Bills', href: '/bills', icon: <LuMenu size={24} /> },
  { value: 'User', href: '/user', icon: <LuUser2 size={24} /> }
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className='flex h-full flex-col items-center p-4'>
      <div>
        <h1 className='p-4 text-3xl font-bold text-danger'>Ca</h1>
      </div>
      <div className='flex h-5/6 w-full flex-col justify-between'>
        <div className='mt-4 flex w-full flex-col gap-y-6'>
          {ListNav.map((item, index) => (
            <Link
              key={index}
              href={
                item.href === '/' ? `${item.href}?category=Makanan` : item.href
              }
              className={`${
                pathname === item.href
                  ? 'bg-danger text-white hover:text-white hover:opacity-80'
                  : 'bg-white text-zinc-400'
              } flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-xl py-4 text-base font-normal duration-200 hover:text-danger`}
            >
              {item.icon}
              {item.value}
            </Link>
          ))}
        </div>
        <Link
          href={'/logout'}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-xl bg-white py-4 text-base font-normal text-zinc-400 duration-200 hover:text-danger`}
        >
          <LuLogOut />
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
