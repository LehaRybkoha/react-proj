import styles from "./Button.module.scss"
import React from "react"

interface ButtonInterface {
  text: string
  id?: string
  disabled?: boolean
  variant?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonInterface) {
  return (
    <button
      onClick={props.onClick}
      id={props.id}
      className={`${styles.button} ${props.disabled ? styles.disabled : ""} ${
        props.variant ? styles[`button--${props.variant}`] : ""
      }`}
    >
      {props.text}
    </button>
  )
}

export default Button
