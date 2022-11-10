import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  return (
    <>
      <Header session={session} />
      <main className="px-32">{children}</main>
    </>
  )
}
