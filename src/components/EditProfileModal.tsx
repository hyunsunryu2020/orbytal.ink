/* eslint-disable @typescript-eslint/ban-types */
import { useEditModalStore } from '../store'

function EditProfileModal() {
  const { isModalShowing, hideModal } = useEditModalStore((state) => state)

  if(isModalShowing) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 grid justify-center items-center">
        <div onClick={() => hideModal()} className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900/90 z-[100]"/>
        <div className="relative rounded shadow-sm w-screen sm:w-[80vw] sm:max-w-[800px] h-screen sm:h-auto bg-slate-100 z-[1000]" >
          Main content goes here!
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default EditProfileModal