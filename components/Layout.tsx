import { ReactNode } from 'react'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-36">
      <Header />
      <main>{children}</main>
    </div>
  )
}
