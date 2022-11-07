import React, { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * Do you want a circular shape?
   */
  rounded?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Do you need to adds icon before button label
   */
  leftIcon?: ReactNode
  /**
   * Do you want to limit the functionality of the button?
   */
  disabled?: boolean
  /**
   * Button width
   */
  width?: string
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  primary = false,
  size = 'medium',
  rounded = true,
  backgroundColor,
  width,
  disabled,
  leftIcon,
  label,
  ...props
}: ButtonProps) {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  const shape = rounded
    ? 'storybook-button--rounded'
    : 'storybook-button--brick'
  return (
    <button
      disabled={disabled}
      type="button"
      className={[
        styles.storybookButton,
        styles[size],
        styles[mode],
        styles[shape],
      ].join(' ')}
      style={{ backgroundColor, width }}
      {...props}
    >
      {leftIcon && leftIcon}
      <span className={styles.buttonText}>{label}</span>
    </button>
  )
}
