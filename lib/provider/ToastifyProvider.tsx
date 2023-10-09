import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastifyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}

export default ToastifyProvider
