import styles from "./Form.module.scss"
import type { AppProps } from "@/interfaces"

const Form = (props: AppProps) => {
  return <div className={styles.form}>{props.children}</div>
}

export default Form
