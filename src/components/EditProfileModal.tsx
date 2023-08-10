/* eslint-disable @typescript-eslint/ban-types */
import { useEditModalStore } from '../store'
import EditProfileForm from './EditProfileForm'

function EditProfileModal() {
  const { isModalShowing, hideModal } = useEditModalStore((state) => state)

  if(isModalShowing) {
    return (
      <EditProfileForm onBackgroundClicked={() => hideModal()} onCloseClicked={() => hideModal()} /> 
    )
  } else {
    return null
  }
}

export default EditProfileModal