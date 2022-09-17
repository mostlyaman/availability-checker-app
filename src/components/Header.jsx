import { Link } from 'react-router-dom'

function Header({ name }) {
    return (
        <div className="w-[100%] text-center">
            <div className=" text-bold text-2xl mt-7 underline">
                Availability Checker App
            </div>
            {name &&
                <div className="text-gray-500 text-sm m-2 ">
                    Signed in as {name}
                    <br />
                    <Link to={'/'} className="hover:underline hover:cursor-pointer">
                        Logout
                    </Link>
                </div>
            }

        </div>
    )
}

export default Header