
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'

function renderMins(mins) {
    return (mins < 10 ? "0" + mins.toString() : mins)
}

function checkSubmit(timevals) {
    if (timevals[0][0] * 60 + timevals[0][1] + 30 > timevals[1][0] * 60 + timevals[1][1]) {
        return false
    }
    return true
}

async function handleSubmit(name, timevals) {
    await axios.post('http://localhost:3000/expert', {
        id: name,
        name: name,
        workingHours: timevals,
        sessions: []
    }).then((e) => {
        location.href = `/expert/${name}`
    })
}

function CreateExpert() {
    const { name } = useParams()
    const [startTimeHour, setStartTimeHour] = useState(0)
    const [startTimeMin, setStartTimeMin] = useState(0)
    const [endTimeHour, setEndTimeHour] = useState(0)
    const [endTimeMin, setEndTimeMin] = useState(0)
    const [showError, setShowError] = useState(false)

    const timevals = [[startTimeHour, startTimeMin], [endTimeHour, endTimeMin]]
    const time = [setStartTimeHour, setStartTimeMin, setEndTimeHour, setEndTimeMin]


    return (
        <div className="w-[90vw] text-center mx-auto flex flex-col">
            <Header name={name}></Header>
            <div className="experts w-[50%] mx-auto text-center mt-10">
                <div className="title-heading text-2xl mb-5">
                    Welcome {name}
                </div>
                <div className="title-subtitle">
                    Please tell us your work timings.
                </div>
                <div className="time-form flex justify-center m-7 align-items-center">
                    <input type="number" className='w-[80px] mx-1' min={"0"} defaultValue={0} max={"23"} onChange={(e) => { if (parseInt(e.target.value) <= 23) { time[0](parseInt(e.target.value)) } }} />
                    <input type="number" className='w-[80px] mx-1' min={"0"} defaultValue={0} max={"59"} onChange={(e) => { if (parseInt(e.target.value) <= 59) { time[1](parseInt(e.target.value)) } }} />
                    <div className='self-center mx-5'>to</div>
                    <input type="number" className='w-[80px] mx-1' min={"0"} defaultValue={0} max={"23"} onChange={(e) => { if (parseInt(e.target.value) <= 23) { time[2](parseInt(e.target.value)) } }} />
                    <input type="number" className='w-[80px] mx-1' min={"0"} defaultValue={0} max={"59"} onChange={(e) => { if (parseInt(e.target.value) <= 59) { time[3](parseInt(e.target.value)) } }} />
                </div>
                <div>
                    Selected Work Timings: {renderMins(timevals[0][0])}:{renderMins(timevals[0][1])} - {renderMins(timevals[1][0])}:{renderMins(timevals[1][1])}
                </div>
                <div className=''>
                    <div className='w-fit p-3 m-3 bg-blue-500 text-white rounded-lg justify-center mx-auto' onClick={(e) => { checkSubmit(timevals) ? handleSubmit(name, timevals) : setShowError(true) }}>
                        Submit
                    </div>
                    <div className={`text-red-600 ${showError ? '' : ' hidden'}`} >
                        You have entered invalid timings. 😕
                        <br />
                        Please select a time range of alteast 30 mins within a day.
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateExpert