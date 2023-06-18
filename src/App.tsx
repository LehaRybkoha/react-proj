import styles from "./App.module.scss"
import Form from "./components/elements/Form"
import MainPage from "./components/pages/Main"
import FirstStep from "./components/pages/FirstStep"
import ThirdStep from "./components/pages/ThirdStep"
import SecondStep from "./components/pages/SecondStep"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

function StepCompute() {
  const query = useQuery()
  const navigate = useNavigate()

  const handleNavigate = (route: string) => {
    navigate(route)
  }

  const steps = [
    <FirstStep
      backFunction={() => handleNavigate("/")}
      nextFunction={() => handleNavigate("/create?step=2")}
    />,
    <SecondStep
      backFunction={() => handleNavigate("/create?step=1")}
      nextFunction={() => handleNavigate("/create?step=3")}
    />,
    <ThirdStep
      backFunction={() => handleNavigate("/create?step=2")}
      nextFunction={() => {}}
    />,
  ]

  const [currentStep, setStep] = useState(steps[0])

  useEffect(() => {
    const queryStep = query.get("step")
    if (queryStep) {
      setStep(steps[+queryStep - 1])
    }
  }, [query])

  return <Form children={currentStep}></Form>
}

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Form children={<MainPage />}></Form>} />
        <Route path="/create" element={<StepCompute />} />
      </Routes>
    </div>
  )
}

export default App
