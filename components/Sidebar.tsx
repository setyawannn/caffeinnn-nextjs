import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LuStore, LuClipboard, LuMenu, LuLogOut, LuUser2 } from 'react-icons/lu'
import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { redirect, usePathname, useRouter } from 'next/navigation'

type MenuDataItem = {
  value: string
  href: string
  icon: JSX.Element
}

type MenuData = {
  [role: string]: MenuDataItem[]
}

type MenuProps = {
  role: string
}

const menuData = {
  KASIR: [
    { value: 'Home', href: '/', icon: <LuStore size={24} /> },
    { value: 'Bills', href: '/bills', icon: <LuMenu size={24} /> }
  ],
  ADMIN: [
    { value: 'Menu', href: '/menu', icon: <LuClipboard size={24} /> },
    { value: 'Bills', href: '/bills', icon: <LuMenu size={24} /> },
    { value: 'User', href: '/user', icon: <LuUser2 size={24} /> }
  ],
  MANAGER: [
    { value: 'Menu', href: '/menu', icon: <LuClipboard size={24} /> },
    { value: 'Home', href: '/', icon: <LuStore size={24} /> }
  ]
}

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<any>([])
  const pathname = usePathname()
  if (!hasCookie('jwtToken')) {
    redirect('/login')
  }

  useEffect(() => {
    // Baca nilai dari cookie "role"
    const cookieRole = getCookie('role')

    // Mendapatkan daftar sesuai dengan peran dari menuData
    const roleMenuData = menuData[cookieRole] || []

    setMenuItems(roleMenuData)

    if (!hasCookie('jwtToken')) {
      redirect('/login')
    }
  }, [])

  const handleLogout = () => {
    deleteCookie('jwtToken')
    deleteCookie('role')
  }

  return (
    <div className='flex h-full flex-col items-center p-4'>
      <div>
        <h1 className='p-4 text-3xl font-bold text-danger'>Ca</h1>
      </div>
      <div className='flex h-5/6 w-full flex-col justify-between'>
        <div className='mt-4 flex w-full flex-col gap-y-6'>
          {menuItems?.map((item: any, index: number) => (
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
          onClick={handleLogout}
          href='/login'
          className='flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-xl bg-white py-4 text-base font-normal text-zinc-400 duration-200 hover:text-danger'
        >
          <LuLogOut />
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
