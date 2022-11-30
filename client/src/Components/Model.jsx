
import React, {useState} from 'react'
import '../Components/Model.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const Model = ({open, onClose,refresh}) => {


    const [user, setuser] = useState({username: "", veihcle: "", number: ""})
    const [username, setusername] = useState(false)
    const [veihcle, setveihcle] = useState(false)
    const [number, setnumber] = useState(false)
    const [format, setformat] = useState("")

   
    

    const onChange = e => {
        setuser({...user,[e.target.name]:e.target.value})
        if(e.target.name === "username")
        {
            e.target.value === "" ? setusername(true) : setusername(false)
        } 
        if(e.target.name === "veihcle")
        {
            e.target.value === "" ? setveihcle(true) : setveihcle(false)
        }
        if(e.target.name === "number")
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

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!user.username) setusername(true)
        if(!user.veihcle)  setveihcle(true)
        if(!user.number)   setnumber(true)
     
        if(user.username && user.veihcle && user.number && format === "valited" ){
            await axios.post('http://localhost:5000/api/veihcle/addveihcle', {
                username : user.username,
                Vehicle : user.veihcle,
                Number_Plate : user.number
            })
            .then(function (response) {
                if(response.status === 200)
                {
                    Swal.fire(
                        'successfully created!',
                        'You clicked the button!',
                        'success'
                    )
                    cancel()
                    refresh()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            return false
        } 
    }
  
    if(!open)
    {
        return null
    }

    const cancel = () => {
        onClose(false)
        setuser({username: "", veihcle: "", number: ""})
       setusername(false)
       setveihcle(false)
       setnumber(false)
       setformat("")
      }
        
    

  return (
    <section className='section'>
        <div className="form_container">
            <div className="form_head">
                <h2>Register Your Veihcle</h2>
                <i class="fa-solid fa-xmark close" onClick={cancel}></i> 
            </div>
            <form id='form' method='POST' onSubmit={handleSubmit}>
                <div className="input">
                    <input type="text" placeholder='Username' name='username' onChange={onChange} value = {user.username}/>
                </div>
                {username === true && <p className='user'>Please fill your details </p>}
                <div className="input">
                    <input type="text" placeholder='Veihcle' name='veihcle' onChange={onChange} value = {user.veihcle}/>
                </div>
                {veihcle === true && <p className='vehicle'>Please fill your details </p>}
                <div className="input">
                    <input type="text" placeholder='Number Plate' name='number' onChange={onChange} value = {user.number}/>
                </div>
                {number === true  &&   <p className='number'>Please fill your details </p>}
                {format === "not valited" && number === false &&<span>Invalid Number</span>}
                {format === "valited" && <span className='valid'>Valid</span>}
                <div className="input_button">
                    <button className='submit' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Model