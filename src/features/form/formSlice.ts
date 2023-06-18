import { RootState } from "@/app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FormDataState {
  phone?: string
  email?: string
  nickname?: string
  name?: string
  sername?: string
  sex?: string
  advantages?: string[]
  checkboxes?: number[]
  radio?: number
  about?: string
}

const initialState: FormDataState = {
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

export const formData = (state: RootState) => state.formData

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    changeData: (state, action: PayloadAction<object>) => {
      for (let key in action.payload) {
        // @ts-ignore

        state[key] = action.payload[key]
      }
    },
  },
})

export const { changeData } = formDataSlice.actions

export default formDataSlice.reducer
