import { useEffect, useState } from "react"
import { useEditModalStore } from "../store";
import EditProfileForm from "../components/EditProfileForm";

function Me() {
  return (
    <EditProfileForm />
  )
}

export default Me