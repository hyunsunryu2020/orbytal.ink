/* eslint-disable @typescript-eslint/ban-types */
import { create } from 'zustand'

interface EditProfileState {
  isEditingProfile: boolean,
  setEditing: Function
}

export const useEditProfileStore = create<EditProfileState>((set) => ({
  isEditingProfile: false,
  setEditing: (isEditing: boolean) => set(() => ({ 
    isEditingProfile: isEditing
  }))
}))

// TODO: Type these
interface ProfileState {
  profile: {
    tagline: string,
    blocks: any
  },
  isLoaded: boolean
  setProfile: Function
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    tagline: "",
    blocks: []
  },
  isLoaded: false,
  setProfile: (profile: any) => set(() => ({
    profile: profile,
    isLoaded: true
  }))
}))

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