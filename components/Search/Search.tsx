import React, { Dispatch, SetStateAction } from 'react'

import SearchIcon from 'public/icon/search-icon.svg'
import CancleIcon from 'public/icon/cross-icon.svg'

import styles from './Search.module.scss'

interface SearchProps {
  /**
   * 해당 컴포넌트를 호출하는 페이지의 value(useState) 함수를 전달해주세요.
   */
  value: string
  /**
   * 해당 컴포넌트를 호출하는 페이지의 setter(useState) 함수를 전달해주세요.
   */
  setValue: Dispatch<SetStateAction<string>>
  /**
   * placeholder는 자유자재로 입력해주세요
   */
  placeholder?: string
  /**
   * 검색창 좌측 돋보기 아이콘 삽입
   */
  leftIcon?: boolean
  /**
   * 검색창 우측 삭제 아이콘 삽입
   */
  rightIcon?: boolean
  /**
   * 검색창 가로 길이 지정 (px, em, rem, %)
   */
  width?: string
}

export default function Search({
  value,
  setValue,
  placeholder,
  leftIcon,
  rightIcon,
  width,
}: SearchProps) {
  const padding = leftIcon
    ? 'Search__input--padding-icon'
    : 'Search__input--padding-plain'

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [setValue],
  )

  const handleClick = React.useCallback(() => setValue(''), [setValue])

  return (
    <div className={styles.Search} style={{ width }}>
      {leftIcon && (
        <div className={styles['Search__icon--left']}>
          <SearchIcon width={15} height={15} />
        </div>
      )}
      {rightIcon && value && (
        <div className={styles['Search__icon--right']}>
          <CancleIcon width={10} height={10} onClick={handleClick} />
        </div>
      )}
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={[styles.Search__input, styles[padding]].join(' ')}
        style={{ width }}
      />
    </div>
  )
}
