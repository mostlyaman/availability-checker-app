import { useLoaderData, useParams } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'

function renderMins(mins) {
    return (mins < 10 ? "0" + mins.toString() : mins)
}

function findExpert(expert, name) {
    for (let i = 0; i < expert.length; i++) {
        if (expert[i].name == name) {
            return i
        }
    }
}

async function deleteSession(index, data, name) {
    let updatedData
    if (data.sessions.length == 1) {
        updatedData = { ...data, sessions: [] }
    } else {

        updatedData = { ...data, sessions: data.sessions.filter((value, i, arr) => { return i == index }) }
    }
    console.log(updatedData)
    await axios.put(`http://localhost:3000/expert/${name}`, updatedData)
    location.reload()
}

function Expert() {

    const { name } = useParams()
    const expert = useLoaderData()
    const no = findExpert(expert, name)
    return (
        <div className="w-[90vw] text-center mx-auto flex flex-col">
            <Header name={name}></Header>
            <div className="experts w-[50%] mx-auto text-center mt-10">
                <div className={expert[no].sessions.length == 0 ? "" : "hidden"}>
                    You have no booked appointments. 👍
                </div>
                {
                    expert[no].sessions.map((elements, index) => {
                        return (
                            <div key={elements.time[0]} className="flex justify-between content-center my-2 rounded-lg border-2 p-5">
                                <div className='text-left'>
                                    Client Name: {elements.client}
                                    <br></br>
                                    Session Timings: {renderMins(elements.time[0][0])}:{renderMins(elements.time[0][1])} - {renderMins(elements.time[1][0])}:{renderMins(elements.time[1][1])}
                                </div>
                                <div className='text-right h-fit my-auto bg-red-500 text-white rounded-lg p-2 hover:cursor-pointer' onClick={(e) => { deleteSession(index, expert[no], name) }}>
                                    Cancel
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )

}

export default Expert

