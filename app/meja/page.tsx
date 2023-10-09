import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const role = getCookie('role')

  if (role !== 'ADMIN') {
    redirect('/404')
  }

  return <div>page</div>
}

export default page
