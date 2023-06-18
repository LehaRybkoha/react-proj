import { ReactNode } from "react"

export interface AppProps {
  children?: ReactNode
}

export interface OptionInterface {
  name: string
  id?: string
}

export interface StepProps {
  backFunction: () => void
  nextFunction: () => void
}
