import { useParams, useLoaderData } from 'react-router-dom'
import Header from './Header'
import ExpBox from './ExpBox'
import './css/Client.css'

function Client() {


    const expert = useLoaderData()
    console.log(expert)
    const { name } = useParams()
    return (
        <div className="w-[90vw] text-center mx-auto flex flex-col">
            <Header name={name}></Header>
            <div className="experts w-[50%] mx-auto text-center mt-10">
                {
                    Object.keys(expert).map((key, index) => {
                        return (
                            <ExpBox key={key} index={index} data={expert[key]} name={name} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Client