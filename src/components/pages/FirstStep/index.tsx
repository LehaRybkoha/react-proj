import styles from "./FirstStep.module.scss"
import Navbar from "@/components/elements/Navbar"
import Input from "@/components/common/Input"
import Select from "@/components/common/Select"
import Button from "@/components/common/Button"
import { useState, ChangeEvent, useEffect } from "react"
import type { OptionInterface, StepProps } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { formData, changeData } from "@/features/form/formSlice"

function FirstStep(props: StepProps) {
  const form = useAppSelector(formData)
  const dispatch = useAppDispatch()

  const [selectVal, setSelect] = useState({ name: "Не выбрано" })

  const [nickname, setNickname] = useState("")
  const [name, setName] = useState("")
  const [sername, setSername] = useState("")

  const [isValidStep, setValidStep] = useState(false)

  const isNicknameValid = (value: string) => {
    const regex = new RegExp("^[а-яА-Яa-zA-Z0-9 ]+$")
    if (value.length >= 30 || (!regex.test(value) && value !== "")) {
      return false
    }
    return true
  }
  const isSurnameNameValid = (value: string) => {
    const regex = new RegExp("^[а-яА-Яa-zA-Z]*$")

    if (value.length >= 50 || (!regex.test(value) && value !== "")) {
      return false
    }
    return true
  }

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNicknameValid(e.target.value)) {
      setNickname(nickname)
      return
    }
    setNickname(e.target.value)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp("^[а-яА-Яa-zA-Z]*$")

    console.log(regex.test(e.target.value))

    if (!isSurnameNameValid(e.target.value)) {
      setName(name)
      return
    }
    setName(e.target.value)
  }

  const onSernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp("^[а-яА-Яa-zA-Z]*$")

    console.log(regex.test(e.target.value))

    if (!isSurnameNameValid(e.target.value)) {
      setSername(sername)
      return
    }
    setSername(e.target.value)
  }

  useEffect(() => {
    const storeData = {
      nickname: nickname,
      name: name,
      sername: sername,
      sex: selectVal.name,
    }
    dispatch(changeData(storeData))

    if (
      sername.length &&
      name.length &&
      nickname.length &&
      selectVal.name !== "Не выбрано"
    ) {
      setValidStep(true)
    } else {
      setValidStep(false)
    }

    // console.log("CBAEEF")
  }, [nickname, name, sername, selectVal.name, dispatch])

  useEffect(() => {
    setName(form.name ?? "")
    setNickname(form.nickname ?? "")
    setSername(form.sername ?? "")
    setSelect({ name: form.sex?.length ? form.sex : "Не выбрано" })
  }, [])

  const steps = [1, 2, 3]
  const options = [
    {
      name: "man",
      id: "field-sex-option-man",
    },
    {
      name: "woman",
      id: "field-sex-option-woman",
    },
  ]

  const onSelectChange = (e: OptionInterface) => {
    setSelect(e)
  }

  const handleBack = () => {
    props.backFunction()
  }

  const handleNext = () => {
    props.nextFunction()
  }

  return (
    <div className={styles.step}>
      <header className={styles.step__header}>
        <Navbar steps={steps} step={1} />
      </header>
      <div className={styles.step__content}>
        <div className={styles.step__form}>
          <div className={styles.step__block}>
            <Input
              onChange={onNicknameChange}
              type="string"
              id="field-nickname"
              advice="Tip"
              placeholder="Placeholder"
              label="Nickname"
              variant="transparent"
              value={nickname}
            />
          </div>
          <div className={styles.step__block}>
            <Input
              onChange={onNameChange}
              type="string"
              id="field-name"
              advice="Tip"
              placeholder="Placeholder"
              label="Name"
              variant="transparent"
              value={name}
            />
          </div>
          <div className={styles.step__block}>
            <Input
              onChange={onSernameChange}
              type="string"
              id="field-sername"
              advice="Tip"
              placeholder="Placeholder"
              label="Sername"
              variant="transparent"
              value={sername}
            />
          </div>
          <div className={styles.step__block}>
            <Select
              label="sex"
              value={selectVal}
              options={options}
              onChange={onSelectChange}
            />
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
            disabled={!isValidStep}
            onClick={handleNext}
            id="button-next"
            text="Далее"
          />
        </div>
      </div>
    </div>
  )
}

export default FirstStep
