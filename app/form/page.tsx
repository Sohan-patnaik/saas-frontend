"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

const Form = () => {
const [name,setName] = React.useState('')
const [age,setAge] = React.useState(0)
const [preference,setPreference] = React.useState('')
const router = useRouter();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    try {
      const res = await axios.post('http://127.0.0.1:8000/set_profile', {
        name,
        age,
        preference
      })
      console.log('Server response:', res.data)
      console.log('Sent data:', { name, age, preference })
      router.push('/botPage');
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='bg-slate-300 p-4 rounded-lg shadow-md flex flex-col justify-center items-center'>
      <h1 className='text-lg font-semibold'>Tell us about yourself</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </label>
        <label>
          Preference:
          <select value={preference} onChange={(e) => setPreference(e.target.value)}>
            <option value="">Select</option>
            <option value="option1">friendly</option>
            <option value="option2">professional</option>
            <option value="option3">humorous</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      
      </form>
    </div>
  )
}

export default Form