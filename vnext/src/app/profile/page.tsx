'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

async function Profile() {
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [username, setUsername] = useState<string>()

  useEffect(() => { 
    async function load() {
      let userData = await fetch('/api/profile')
      let res = await userData.json()
      setName(`${res.firstName} ${res.lastName}`)
      setImageUrl(res.profileImageUrl)
      setUsername(res.username)
    }
    load()
  }, [])

  function onSubmit(data: any) {
    console.log("hello world!", data)
  }

  return (
    <div>
      <h2>Profile</h2>
      <div className='flex flex-col'>
        <span className='bold'>name:</span>
        <span>{name}</span>
        <span className='bold'>url:</span>
        <span>https://orbytal.ink/u/{username}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Twitter
          <input {...register("twitter")} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Profile