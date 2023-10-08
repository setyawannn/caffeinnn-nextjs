'use client'

import NextUIProvider from '@/lib/provider/NextUIProvider'
import ProgressProvider from '@/lib/provider/ProgressProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </NextUIProvider>
  )
}
