import { ReactNode } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  className?: string
  children?: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>
}
