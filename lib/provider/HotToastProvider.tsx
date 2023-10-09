import React from 'react'
import { Toaster } from 'react-hot-toast'

const HotToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default HotToastProvider
