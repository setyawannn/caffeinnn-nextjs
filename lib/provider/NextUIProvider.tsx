'use client'

import { NextUIProvider as NextProvider } from '@nextui-org/react'

export interface ProvidersProps {
  children: React.ReactNode
}

const NextUIProvider = ({ children }: ProvidersProps) => {
  return <NextProvider>{children}</NextProvider>
}

export default NextUIProvider
