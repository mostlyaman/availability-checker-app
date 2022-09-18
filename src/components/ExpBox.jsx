import { useState } from 'react';
import axios from 'axios';

function renderMins(mins) {
    return (mins < 10 ? "0" + mins.toString() : mins)
}


function calculateSlots(data) {
    const startTime = data.workingHours[0][0] * 60 + data.workingHours[0][1]
    const endTime = data.workingHours[1][0] * 60 + data.workingHours[1][1]
    let sessionsTime = []
    let availableTime = []


    data.sessions.forEach((session) => {
        let time = []
        time.push(session.time[0][0] * 60 + session.time[0][1])
        time.push(session.time[1][0] * 60 + session.time[1][1])
        sessionsTime.push(time)
    })
    sessionsTime = sessionsTime.sort()

    let start = startTime
    let no = 0
    while (start != endTime) {
        if (no != sessionsTime.length) {
            if (start == sessionsTime[no][0]) {
                start = sessionsTime[no][1]
                no++
            }
            else {
                let avtime = []
                avtime.push(start)
                avtime.push(sessionsTime[no][0])
                availableTime.push(avtime)
                start = sessionsTime[no][0]
            }
        } else {
            let avtime = []
            avtime.push(start)
            avtime.push(endTime)
            availableTime.push(avtime)
            start = endTime
        }
    }
    return availableTime

}

function convertToMins(time) {
    return time[0] * 60 + time[1]
}

function convertToTime(time) {
    return renderMins(Math.floor(time / 60)).toString() + ":" + renderMins(time % 60).toString()
}

async function handleSubmit(data, bookTime, name) {
    const start = [Math.floor(bookTime[0] / 60), bookTime[0] % 60]
    const end = [Math.floor(bookTime[1] / 60), bookTime[1] % 60]
    const updatedData = { ...data, "sessions": [...data.sessions, { "client": name, "time": [start, end] }] }
    await axios.put('http://localhost:3000/expert/' + data.name, updatedData)
    location.reload()
}


function ExpBox({ index, data, name }) {

    const [formTime, setFormTime] = useState([convertToMins(data.workingHours[0]), convertToMins(data.workingHours[1])])
    const [bookTime, setBookTime] = useState([convertToMins(data.workingHours[0]), convertToMins(data.workingHours[1])])
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="text-left my-2 rounded-lg border-2 p-5 pb-0">
            <div className="expert-info flex justify-between">
                <div className="expert-details">
                    <div className="expert-name font-bold text-lg">
                        {index + 1}. {data.name}
                    </div>
                </div>
                <div className="expert-time">
                    Usual Timings: {renderMins(data.workingHours[0][0])}:{renderMins(data.workingHours[0][1])} to {renderMins(data.workingHours[1][0])}:{renderMins(data.workingHours[1][1])}
                </div>
            </div>
            <div className="slot-timings m-3 mt-4">
                <div className="slot-timings-heading mb-3">
                    Slots Available:
                </div>
                <div className={calculateSlots(data).length ? "hidden" : ""}>
                    This expert is completely booked.
                </div>
                <div className="flex">
                    {
                        calculateSlots(data).map((timeSlot) => {
                            return (
                                <div key={timeSlot[0]} className="time-slot bg-sky-400 w-fit text-white rounded-lg p-2 mx-2 my-1 hover:cursor-pointer" onClick={(e) => { setShowForm(!showForm); setFormTime(timeSlot); setBookTime(timeSlot) }}>
                                    {convertToTime(timeSlot[0])}-{convertToTime(timeSlot[1])}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={`slot-form m-4 flex flex-col ${showForm ? '' : 'hidden'}`}>
                <div className="form-heading mb-6">Choose your Slot</div>
                <label>
                    <div className='flex align-items-center my-2'>
                        <div className='p-1 underline'>
                            Start Time:
                        </div>
                        <div className='bg-gray-200 p-1 '>{convertToTime(bookTime[0])}</div>
                    </div>
                    <div className='flex align-items-center mb-3'>
                        {convertToTime(formTime[0])} <input type="range" className='mx-2 my-0 py-0 px-0 w-[80%]' name="form-slider" id="form-slider" min={formTime[0]} max={formTime[1] - 10} value={bookTime[0]} onChange={(e) => { setBookTime([parseInt(e.target.value), bookTime[1]]) }} /> {convertToTime(formTime[1] - 10)}
                    </div>
                </label>
                <label>
                    <div className='flex align-items-center my-2'>
                        <div className="p-1 underline">
                            End Time:
                        </div>
                        <div className="bg-gray-200 p-1">
                            {convertToTime(parseInt(bookTime[1]))}
                        </div>
                    </div>
                    <div className='flex align-items-center mb-3'>
                        {convertToTime(parseInt(bookTime[0]) + 10)} <input type="range" className='mx-2 my-0 py-0 px-0 w-[80%]' name="form-slider" id="form-slider" min={bookTime[0] + 10} max={formTime[1]} value={bookTime[1]} onChange={(e) => { setBookTime([bookTime[0], e.target.value]) }} /> {convertToTime(formTime[1])}
                    </div>
                </label>
                <div className='mx-auto rounded-lg bg-green-300 py-2 px-3 m-2 w-fit' onClick={(e) => { handleSubmit(data, bookTime, name) }}>
                    Book Appointment
                </div>
            </div>
        </div >
    )
}

export default ExpBox