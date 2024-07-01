import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

const MainVideoPage = () =>{
    const [searchParams, setSearchParams] = useSearchParams()
    const [appointmentInfo, setAppointmentInfo] = useState({})

    useEffect(()=>{
        // GRAB THE TOKEN VAR OUT OF THE QUERY STRING
        const token = searchParams.get('token')
        console.log(token)

        const fetchDecodedToken = async()=>{
            const res = await axios.post("https://localhost:5000/validate-link", {token})
            console.log(res.data)
            setAppointmentInfo(res.data)
        }

        fetchDecodedToken() 
    }, [])

    return(
        <h1>
            {appointmentInfo.professionalsName} at {appointmentInfo.iat}
        </h1>
    )
}

export default MainVideoPage