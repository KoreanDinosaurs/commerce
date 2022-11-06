import { css, keyframes } from '@emotion/react'

interface SkeletonProps {
  width: number | string
  height?: number | string
  radius?: number | string
  color?: string
  circle?: boolean
  children?: string
  responsive?: boolean
  grow?: boolean
}

export const fade = keyframes`
  from, to { opacity: 0.4 }
  50% { opacity: 1 }

`

export default function SkeletonComponent({
  width,
  height = 'fit-content',
  radius,
  color,
  circle = false,
  children,
  responsive = false,
  grow = false,
}: SkeletonProps) {
  const styles = {
    width,
    height: circle ? width : height,
    borderRadius: circle ? width : radius,
    backgroundColor: color ?? '#F5F5F5',
    color: 'transparent',
    flexGrow: grow ? 1 : 0,
  }

  if (responsive) {
    return (
      <div
        style={styles}
        css={css`
          animation: ${fade} 1500ms linear infinite;
          &::after {
            content: '';
            display: block;
            padding-bottom: 100%;
          }
        `}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      style={styles}
      css={css`
        animation: ${fade} 1500ms linear infinite;
      `}
    >
      {children}
    </div>
  )
}
