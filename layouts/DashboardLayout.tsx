'use client'
import Cart from '@/components/Cart'
import Sidebar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return pathname === '/login' ? (
    <main>{children}</main>
  ) : (
    <div className='flex h-screen gap-x-6 overflow-hidden'>
      <div className='min-w-[7rem]'>
        <Sidebar />
      </div>
      <div className='no-scrollbar w-full overflow-y-scroll px-6 py-8'>
        {children}
      </div>
      {pathname === '/' ? (
        <div className='hidden min-w-[34rem] p-6 lg:block'>
          <Cart />
        </div>
      ) : null}
    </div>
  )
}

export default DashboardLayout
