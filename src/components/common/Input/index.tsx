import styles from "./Input.module.scss"
import React from "react"
import InputMask from "react-input-mask"

interface InputInterface {
  type: string
  value: string
  label?: string
  id?: string
  mask?: string | (string | RegExp)[]
  error?: string
  variant?: "default" | "transparent"
  placeholder?: string
  advice?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function Input(props: InputInterface) {
  return (
    <label className={styles.label}>
      <p className={styles.label__text}>{props.label}</p>
      <InputMask
        id={props.id}
        className={`${styles.label__input} ${
          props.variant === "transparent" ? styles["label__input--trans"] : ""
        }`}
        mask={props.mask ?? ""}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <p className={styles.label__error}>{props.error}</p>
      <p className={styles.label__advice}>{props.advice}</p>
    </label>
  )
}

export default Input
