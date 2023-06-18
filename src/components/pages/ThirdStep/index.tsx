import styles from "./ThirdStep.module.scss"
import Navbar from "@/components/elements/Navbar"
import Button from "@/components/common/Button"
import ReactDOM from "react-dom"
import closeSvg from "@/assets/img/close.svg"
import successModalIcon from "@/assets/img/success-modal.svg"
import errorModalIcon from "@/assets/img/error-modal.svg"
import type { StepProps } from "@/interfaces"
import { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { formData, changeData } from "@/features/form/formSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function ThirdStep(props: StepProps) {
  const form = useAppSelector(formData)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [isValidSend, setIsValidSend] = useState(false)
  const [showModal, setShowModal] = useState("hide")

  const steps = [1, 2, 3]

  const [about, setAbout] = useState("")

  const handleCloseModal = (state: "success" | "error") => {
    if (state === "error") {
      setShowModal("hide")
    }
    if (state === "success") {
      const clearState = {
        phone: "",
        email: "",
        nickname: "",
        name: "",
        sername: "",
        sex: "",
        advantages: [],
        checkboxes: [],
        radio: 1,
        about: "",
      }
      setShowModal("hide")
      navigate("/")
      changeData(clearState)
    }
  }

  const successState = {
    status: "success",
    title: "Форма успешно отправлена",
    buttonText: "На главную",
    buttonAction: () => handleCloseModal("success"),
    icon: successModalIcon,
  }

  const errorState = {
    status: "error",
    title: "Ошибка",
    buttonText: "Закрыть",
    buttonAction: () => handleCloseModal("error"),
    icon: errorModalIcon,
  }

  const portalDiv = document.querySelector("body") as Element | DocumentFragment

  const [currentState, setCurrentState] = useState(errorState)

  const handleBack = () => {
    props.backFunction()
  }

  const textareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 201) {
      setAbout(e.target.value)
    } else {
      setAbout(about)
    }
  }

  const submit = async () => {
    const {
      phone,
      email,
      nickname,
      name,
      sername,
      sex,
      advantages,
      checkboxes,
      radio,
      about,
    } = form

    const url = "https://api.sbercloud.ru/content/v1/bootcamp/frontend"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        phone,
        email,
        nickname,
        name,
        sername,
        sex,
        advantages,
        checkboxes,
        radio,
        about,
      }),
    })
    if (res.ok) {
      setCurrentState(successState)
    } else {
      setCurrentState(errorState)
    }
    setShowModal("show")
  }

  useEffect(() => {
    const storeData = {
      about: about,
    }
    dispatch(changeData(storeData))

    if (about.length) {
      setIsValidSend(true)
    } else {
      setIsValidSend(false)
    }
  }, [about])

  useEffect(() => {
    setAbout(form.about ?? "")
  }, [])

  return (
    <div className={styles.step}>
      <header className={styles.step__header}>
        <Navbar steps={steps} step={3} />
      </header>
      <div className={styles.step__content}>
        <div className={styles.step__form}>
          <div className={styles.step__block}>
            <p className={styles["step__block-title"]}>About</p>
            <textarea
              onChange={(e) => textareaChange(e)}
              name="textarea"
              value={about}
              placeholder="Placeholder"
              id="field-about"
              className={styles.step__textarea}
            ></textarea>
            <p className={styles["step__block-advice"]}>Tip</p>
            <p className={styles.step__count}>{about.length}</p>
          </div>
        </div>
        <div className={styles.step__bottom}>
          <Button
            onClick={handleBack}
            id="button-back"
            text="Назад"
            variant="outlined"
          />
          <Button
            onClick={submit}
            disabled={!isValidSend}
            id="button-send"
            text="Отправить"
          />
        </div>
      </div>
      {ReactDOM.createPortal(
        <div
          className={`${styles.modal} ${
            styles[`modal--${currentState.status} `]
          } ${styles[`modal--${showModal}`]}`}
        >
          <div className={styles.modal__content}>
            <img
              onClick={currentState.buttonAction}
              src={closeSvg}
              alt=""
              className={styles.modal__close}
            />
            <p className={styles.modal__title}>{currentState.title}</p>
            <img
              src={currentState.icon}
              alt=""
              className={styles.modal__image}
            />
            <div className={styles.modal__button}>
              <Button
                onClick={currentState.buttonAction}
                text={currentState.buttonText}
              />
            </div>
          </div>
        </div>,
        portalDiv,
      )}
    </div>
  )
}

export default ThirdStep
