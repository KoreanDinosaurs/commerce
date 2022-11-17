import React, { Dispatch, SetStateAction } from 'react'

import Arrow from 'public/icon/arrow-icon.svg'

import styles from './Select.module.scss'

interface SelectProps {
  /** 목록 배열을 넣어주세요. */
  data: { label: string; value: string }[]
  /** useState의 value */
  value: string
  /** useState의 setter 함수 */
  onChange: Dispatch<SetStateAction<string>>
}

export default function Select({ data, value, onChange }: SelectProps) {
  const $dropDownList = React.useRef<HTMLUListElement>(null)
  const [dropDown, setDropDown] = React.useState<boolean>(false)

  const selectComponentWidth = React.useMemo(() => {
    const lengthOftheLongestText = Math.max(...data.map((v) => v.label.length))
    return lengthOftheLongestText * 20
  }, [data])

  const handleSelect = (label: string) => {
    onChange(label)
    setDropDown((prev) => !prev)
  }

  const handleFocusOut = React.useCallback(() => {
    setDropDown((prev) => !prev)
  }, [])

  React.useEffect(() => {
    if ($dropDownList.current === null) return
    $dropDownList.current?.addEventListener('mouseleave', handleFocusOut)

    return () =>
      // eslint-disable-next-line react-hooks/exhaustive-deps
      $dropDownList.current?.removeEventListener('mouseleave', handleFocusOut)
  }, [handleFocusOut, dropDown, $dropDownList])

  return (
    <div
      className={styles.select}
      style={{ width: `${selectComponentWidth}px` }}
    >
      <div className={styles.select__main}>
        {data.filter((option) => option.value === value)[0].label}
        <Arrow
          fill="#8b8b8b"
          width={15}
          height={15}
          onClick={() => setDropDown((prev) => !prev)}
        />
      </div>
      {dropDown && (
        <ul className={styles.select__ul} ref={$dropDownList}>
          {data.map((option, idx) => (
            <li
              className={[
                styles.select__li,
                value === option.value ? styles['select__li--prev'] : '',
              ].join(' ')}
              key={idx}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
