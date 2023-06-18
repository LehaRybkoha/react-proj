import styles from "./Navbar.module.scss"
import { useEffect, useRef, useState } from "react"
import successIcon from "@/assets/img/success.svg"

interface NavbarInterface {
  step: number
  steps: number[]
}

function Navbar(props: NavbarInterface) {
  const navbar = useRef(null)
  const [lineWidth, setLineWidth] = useState("")

  useEffect(() => {
    const currentNavbar = navbar.current as Element | null
    const width = currentNavbar?.getBoundingClientRect().width
    if (width) {
      setLineWidth(`${(width / (props.steps.length - 1)) * (props.step - 1)}px`)
    }
  }, [props.step])

  return (
    <div
      ref={navbar}
      className={`${styles.navbar} ${styles[`navbar--${props.step}`]}`}
    >
      <div className={styles.navbar__line} style={{ width: lineWidth }}></div>
      <div className={styles.navbar__balls}>
        {props.steps.map((step) => {
          return (
            <div
              key={step}
              className={`${styles.navbar__ball} ${
                step <= props.step ? styles["navbar__ball--active"] : ""
              }`}
            >
              <div className={styles.navbar__sball}></div>
              <img
                src={successIcon}
                alt=""
                className={`${styles.navbar__success} ${
                  step < props.step ? styles["navbar__success--active"] : ""
                }`}
              />
              <div
                className={`${styles.navbar__count} ${
                  step <= props.step ? styles["navbar__count--active"] : ""
                }`}
              >
                {step}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
