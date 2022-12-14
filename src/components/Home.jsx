import Header from './Header'
import './css/Home.css'
import { useState } from 'react'
import { Link, useLoaderData } from "react-router-dom"
import axios from 'axios'

function Home() {


  const [name, setName] = useState("")
  // Creating a list of all experts
  const expert = useLoaderData()

  let experts = []
  for (let i = 0; i < expert.length; i++) {
    experts.push(expert[i].name)
  }


  return (
    <div className="w-[90vw] text-center mx-auto">
      <Header></Header>

      <div className="form mt-7">
        <div className="form-title">
          Youre Name?
        </div>
        <div className="name-input">
          <input type="text" id="name" placeholder='John' autoComplete='off' onInput={(e) => setName(e.target.value)} />
        </div>
        <div className="form-title m-4">
          Youre a?
        </div>
        <div className={(name == "" ? "" : "job-input") + " m-7"}>
          <Link to={`/client/${name}`} className={name == "" ? "pointer-events-none bg-gray-400 px-[20px] py-[15px] m-[10px] rounded-[10px]" : "pointer-events-auto"}>
            Client
          </Link >
          <Link to={experts.includes(name) ? `/expert/${name}` : `/create-expert/${name}`} className={name == "" ? "pointer-events-none bg-gray-400 px-[20px] py-[15px] m-[10px] rounded-[10px]" : "pointer-events-auto"} >
            Expert
          </Link>
        </div>
      </div>
    </div >

  )
}


export default Home
