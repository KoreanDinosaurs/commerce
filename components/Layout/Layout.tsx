import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

import Header from '../Header'

import styles from './Layout.module.scss'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  return (
    <>
      <Header session={session} />
      <main className={styles.layout}>{children}</main>
    </>
  )
}
