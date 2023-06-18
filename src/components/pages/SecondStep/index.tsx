import styles from "./SecondStep.module.scss"
import Navbar from "@/components/elements/Navbar"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import deleteIcon from "@/assets/img/delete.svg"
import plusIcon from "@/assets/img/plus.svg"
import { useEffect, useState } from "react"
import type { StepProps } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { formData, changeData } from "@/features/form/formSlice"

function SecondStep(props: StepProps) {
  const form = useAppSelector(formData)
  const dispatch = useAppDispatch()

  const steps = [1, 2, 3]

  const checkboxes = [1, 2, 3]
  const radios = [1, 2, 3]

  const [advantages, setAdvantages] = useState([""])
  const [resultCheckboxes, setResultCheckboxes] = useState([] as number[])
  const [currentRadio, setCurrentRadio] = useState(1)

  const [isValidForm, setIsValid] = useState(false)

  const changeInput = (idx: number, value: string) => {
    const advArr = [...advantages]
    advArr[idx] = value
    setAdvantages(advArr)
  }

  const addNew = () => {
    const advArr = [...advantages]
    advArr.push("")
    setAdvantages(advArr)
  }

  const deleteCurrent = (idx: number) => {
    const advArr = [...advantages].filter((item, itemIdx) => itemIdx !== idx)
    setAdvantages(advArr)
  }

  const changeCheckbox = (value: number) => {
    let checkArr = [...resultCheckboxes]

    if (checkArr.indexOf(value) !== -1) {
      checkArr = checkArr.filter((el: number) => el !== value)
    } else {
      checkArr.push(value)
    }
    setResultCheckboxes(checkArr)
  }

  const changeRadio = (value: number) => {
    setCurrentRadio(value)
  }

  const handleBack = () => {
    props.backFunction()
  }

  const handleNext = () => {
    props.nextFunction()
  }

  const checkAdvantages = () => {
    for (let i = 0; i < advantages.length; i++) {
      if (!advantages[i].length) {
        return false
      }
    }

    return true
  }

  useEffect(() => {
    const storeData = {
      advantages: advantages,
      checkboxes: resultCheckboxes,
      radio: currentRadio,
    }
    dispatch(changeData(storeData))

    if (checkAdvantages() && resultCheckboxes.length) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [advantages, resultCheckboxes, currentRadio])

  useEffect(() => {
    setAdvantages(form.advantages ?? [])
    setResultCheckboxes(form.checkboxes ?? [])
    setCurrentRadio(form.radio ?? 1)
  }, [])

  return (
    <div className={styles.step}>
      <header className={styles.step__header}>
        <Navbar steps={steps} step={2} />
      </header>
      <div className={styles.step__content}>
        <div className={styles.step__form}>
          <div className={styles.step__block}>
            <p className={styles["step__block-title"]}>Advantages</p>
            {advantages.map((item, idx) => {
              return (
                <div className={styles.step__advantage} key={idx}>
                  <Input
                    id={`field-advatages-${idx + 1}`}
                    onChange={(e) => changeInput(idx, e.target.value)}
                    value={item}
                    type="text"
                    placeholder="Placeholder"
                    variant="transparent"
                  />
                  <button id={`button-remove-${idx + 1}`}>
                    <img
                      onClick={() => deleteCurrent(idx)}
                      src={deleteIcon}
                      alt=""
                      className={styles.step__delete}
                    />
                  </button>
                </div>
              )
            })}
            <button
              id="button-add"
              onClick={addNew}
              className={styles["step__advantages-btn"]}
            >
              <img src={plusIcon} alt="" />
            </button>
          </div>
          <div className={styles.step__block}>
            <p className={styles["step__block-title"]}>Checkbox group</p>
            <div className={styles.checkboxes}>
              {checkboxes.map((val) => {
                return (
                  <div key={val} className={styles.checkboxes__block}>
                    <input
                      id={`field-checkbox-group-option-${val}`}
                      type="checkbox"
                      className={styles.checkboxes__input}
                      onChange={() => changeCheckbox(val)}
                    />
                    <span className={styles.checkboxes__name}>{val}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.step__block}>
            <p className={styles["step__block-title"]}>Radio group</p>
            <div className={styles.checkboxes}>
              {radios.map((val) => {
                return (
                  <div key={val} className={styles.checkboxes__block}>
                    <input
                      id={`field-radio-group-option-${val}`}
                      type="radio"
                      name="group"
                      value={val}
                      checked={currentRadio === val}
                      className={styles.checkboxes__input}
                      onChange={() => changeRadio(val)}
                    />
                    <span className={styles.checkboxes__name}>{val}</span>
                  </div>
                )
              })}
            </div>
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
            disabled={!isValidForm}
            onClick={handleNext}
            id="button-next"
            text="Далее"
          />
        </div>
      </div>
    </div>
  )
}

export default SecondStep
