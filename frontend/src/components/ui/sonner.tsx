// components/ui/sonner.tsx
'use client'

import { Toaster as SonnerToaster, toast } from 'sonner'
import type { ToasterProps } from 'sonner'

export const Toaster = ({ ...props }: ToasterProps) => (
  <SonnerToaster 
    position="top-right"
    richColors
    expand
    visibleToasts={5}
    {...props}
  />
)

export { toast }