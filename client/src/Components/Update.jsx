import React, {useState,useEffect} from 'react'
import '../Components/Model.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const Update = ({update, closeUpdate,value,refresh}) => {
    const [user, setuser] = useState({Username:"", Vehicle:"", Number_Plate:""})
    const [username, setusername] = useState(false)
    const [veihcle, setveihcle] = useState(false)
    const [number, setnumber] = useState(false)
    const [format, setformat] = useState("")
    useEffect(()=>{
        setuser(value)
        setformat("valited")
    },[value])
    if(!update)
    {
        return null
    }

    const onChange = e => {
        setuser({...user,[e.target.name]:e.target.value})
        if(e.target.name === "Username")
        {
            e.target.value === "" ? setusername(true) : setusername(false)
        } 

        if(e.target.name === "Veihcle")
        {
            e.target.value === "" ? setveihcle(true) : setveihcle(false)
        }

        if(e.target.name === "Number_Plate")
        {
            if(e.target.value){
            setnumber(false)
            const regex1 = /^.{1}[A-Z]-.{1}[A-Z]-.{3}[0-9]$/
            const regex2 = /^.{2}[A-Z]-.{3}[0-9]$/
            const regex3 = /^.{2}[0-9]-.{3}[0-9]$/
            const regex4 = /^.{1}[0-9]-.{3}[0-9]$/
            const regex5 = /^.{1}[0-9]-.{0}[\u0D80-\u0DFF]-.{3}[0-9]$/

           regex1.test(e.target.value) || regex2.test(e.target.value) || regex3.test(e.target.value) || regex4.test(e.target.value) || regex5.test(e.target.value) === true? setformat("valited"): setformat("not valited")
            }
            else{
                setnumber(true) 
            }  
        }
    }

    const handleclose = () =>{
        closeUpdate()
        setformat("")
        setnumber(false)
        setusername(false)
        setveihcle(false)
        setformat("")
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!user.Username) setusername(true)
        if(!user.Vehicle)  setveihcle(true)
        if(!user.Number_Plate)   setnumber(true)
        if(user.Username && user.Vehicle && user.Number_Plate && format === "valited" ){
        await axios.put('http://localhost:5000/api/veihcle/editveihcle', {
                username : user.Username,
                Veihcle : user.Vehicle,
                Number_Plate : user.Number_Plate,
                id:user.Id
            })
            .then(function (response) {
                if(response.status === 200)
                {
                    Swal.fire(
                        'Good job!',
                        `${response.data}`,
                        'success'
                    )
                    refresh()
                    closeUpdate()
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
  return (
    <section className='section'>
        <div className="form_container">
            <div className="form_head">
                <h2>Update Your Details</h2>
                <i className="fa-solid fa-xmark close" onClick={handleclose} ></i> 
            </div>
            <form action=""  method='POST' onSubmit={handleSubmit}>
                <div className="input">
                    <input type="text" placeholder='Username' name='Username' onChange={onChange} value ={user.Username}/>
                </div>
                {username === true && <p className='user'>Please fill your details </p>}
                <div className="input">
                    <input type="text" placeholder='Veihcle' name='Vehicle' onChange={onChange} value ={user.Vehicle}/>
                </div>
                {veihcle === true && <p className='vehicle'>Please fill your details </p>}
                <div className="input">
                    <input type="text" placeholder='Number Plate' name='Number_Plate' onChange={onChange} value ={user.Number_Plate}/>
                </div>
                {number === true  &&   <p className='number'>Please fill your details </p>}
                {format === "not valited" && number === false &&<span>Invalid Number</span>}
                {format === "valited" && <span className='valid'>Valid</span>}
                <div className="input_button">
                    <button className='submit' type='submit'>Update</button>
                </div>
            </form>
        </div>
    </section>


  )
}

export default Update