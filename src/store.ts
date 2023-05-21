/* eslint-disable @typescript-eslint/ban-types */
import { create } from 'zustand'

interface EditModalState {
  isModalShowing: boolean,
  showModal: Function
  hideModal: Function
}

export const useEditModalStore = create<EditModalState>((set) => ({
  isModalShowing: false,
  showModal: () => set(() => ({ isModalShowing: true})),
  hideModal: () => set(() => ({ isModalShowing: false}))
}))