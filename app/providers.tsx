'use client'

import HotToastProvider from '@/lib/provider/HotToastProvider'
import NextUIProvider from '@/lib/provider/NextUIProvider'
import ProgressProvider from '@/lib/provider/ProgressProvider'
import ToastifyProvider from '@/lib/provider/ToastifyProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ProgressProvider>
        <HotToastProvider>{children}</HotToastProvider>
      </ProgressProvider>
    </NextUIProvider>
  )
}
