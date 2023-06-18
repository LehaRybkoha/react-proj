import { useState } from "react"
import styles from "./Select.module.scss"
import selectSvg from "@/assets/img/select.svg"
import type { OptionInterface } from "@/interfaces"

interface SelectInterface {
  options: OptionInterface[]
  label?: string
  value: OptionInterface
  onChange: (e: OptionInterface) => void
}

function Select(props: SelectInterface) {
  const [isActive, setActive] = useState(true)

  const handleClose = (item: OptionInterface) => {
    props.onChange(item)
    setActive(false)
  }

  return (
    <div className={styles.select}>
      <p className={styles.select__title}>{props.label}</p>
      <div
        onClick={() => setActive(!isActive)}
        className={styles.select__input}
      >
        <span id="field-sex" className={styles.select__value}>
          {props.value.name}
        </span>
        <img src={selectSvg} alt="" className={styles.select__icon} />
      </div>
      <div
        className={`${styles.select__content} ${
          isActive ? styles["select__content--active"] : ""
        }`}
      >
        {props.options.map((item) => {
          return (
            <div
              onClick={() => handleClose(item)}
              key={item.id}
              className={styles.select__option}
            >
              <p className={styles["select__option-value"]}>{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Select
