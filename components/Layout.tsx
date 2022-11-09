import { ReactNode } from 'react'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-32">{children}</main>
    </>
  )
}
