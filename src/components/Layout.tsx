import type { ReactNode } from 'react'
import Logo from './Logo'

type LayoutProps = {
  home?: boolean
  children: ReactNode
}

export default function Layout({ home = false, children }: LayoutProps) {
  return (
    <div className="page">
      {!home && <Logo />}
      {children}
    </div>
  )
}
