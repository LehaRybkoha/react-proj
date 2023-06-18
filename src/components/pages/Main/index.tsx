import styles from "./Main.module.scss"
import avatar from "@/assets/img/sber.jpg"
import fileSvg from "@/assets/img/file.svg"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { formData, changeData } from "@/features/form/formSlice"

function MainPage() {
  const form = useAppSelector(formData)
  const dispatch = useAppDispatch()

  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [emailError, setEmailError] = useState("")

  const [isValid, setIsValid] = useState(false)

  const navigate = useNavigate()

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  const submit = () => {
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email")
      return
    }
    setEmailError("")
    navigate("/create")
  }

  const unmaskedPhone = (phoneVal: string) => {
    return phoneVal.replace(/[^\d]/g, "")
  }

  useEffect(() => {
    const storeData = {
      phone: phone,
      email: email,
    }
    dispatch(changeData(storeData))
    if (email.length && unmaskedPhone(phone).length === 11) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [phone, email, dispatch])

  useEffect(() => {
    setPhone(form.phone ?? "")
    setEmail(form.email ?? "")
  }, [])

  const list = [
    {
      name: "Telegram",
      route: "https://t.me/Darkkkstranger",
      icon: fileSvg,
    },
    {
      name: "GitHub",
      route: "https://github.com/LehaRybkoha",
      icon: fileSvg,
    },
    {
      name: "Resume",
      route: "https://hh.ru/resume/b8c5a66eff06068c2a0039ed1f6366796c7161",
      icon: fileSvg,
    },
  ]

  return (
    <div className={styles.main}>
      <header className={styles.main__header}>
        <div className={styles.main__logo}>
          <img src={avatar} alt="" className={styles["main__logo-img"]} />
        </div>
        <div className={styles.main__info}>
          <h1 className={styles.main__title}>Рыбко Алексей</h1>
          <ul className={styles.main__list}>
            {list.map((item, idx) => {
              return (
                <li key={idx} className={styles.main__item}>
                  <img
                    src={item.icon}
                    alt=""
                    className={styles["main__item-icon"]}
                  />
                  <a
                    target="_blank"
                    href={item.route}
                    className={styles["main__item-link"]}
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </header>
      <main className={styles.main__content}>
        <div className={styles.main__block}>
          <Input
            value={phone}
            onChange={onPhoneChange}
            type="string"
            label="Номер телефона"
            mask="+7 (999) 999-99-99"
          />
        </div>
        <div className={styles.main__block}>
          <Input
            value={email}
            onChange={onEmailChange}
            type="email"
            label="Email"
            error={emailError}
          />
        </div>
        <div className={styles.main__bottom}>
          <Button
            disabled={!isValid}
            id="button-start"
            text="Начать"
            onClick={submit}
          />
        </div>
      </main>
    </div>
  )
}

export default MainPage
