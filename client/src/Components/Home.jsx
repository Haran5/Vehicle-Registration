import React, {useState, useEffect} from 'react'
import Update from './Update.jsx'
import '../Components/Home.css'
import axios from 'axios'
import Model from './Model.jsx'
import Navbar from './Navbar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



function Home() {

    const [update, setupdate] = useState(false)
    const [VehicleDetails, setVehicleDetails] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [value,setvalues] = useState({Username:"", Vehicle:"", Number_Plate:""})
  
    
    useEffect(() => {
        vehicle()
    },[])

    const vehicle = async () => {
        await axios.get('http://localhost:5000/api/veihcle/details')
          .then(function (response) {
            if(response.status === 200)
            {
                setVehicleDetails(response.data)
             
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const onDelete =(id)=>{
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              await axios.delete(`http://localhost:5000/api/veihcle/delete/${id}`).then((res)=>{
                Swal.fire(
                    'Deleted!',
                    `${res.data}`,
                    'success'
                  )
                  vehicle()
              })
            }
          })
    }

    const onUpdate =async (id) =>{
        setupdate(true)
        await axios.get(`http://localhost:5000/api/veihcle/single/${id}`)
        .then(function (response) {
          if(response.status === 200) setvalues(response.data) 
        })
        .catch(function (error) {
          console.log(error);
        });
    }


  return (  
    <>
   <Navbar open={()=>setOpenModel(true)}/>
    <section>
        <div className="table_container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Vehicle</th>
                        <th>Number Plate</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {VehicleDetails && VehicleDetails.map((data,index) => {
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{data.Username}</td>
                                <td>{data.Vehicle}</td>
                                <td>{data.Number_Plate}</td>
                                <td>{data.Type}</td>
                                <td className='buttons'>
                                    <button className='edit' onClick={() => onUpdate(data.Id)}><i className="fa-solid fa-pen" ></i></button>
                                 
                                    <button className='delete' onClick={() => onDelete(data.Id)}><i className="fa-solid fa-trash" ></i></button>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <Model open={openModel} onClose={setOpenModel} refresh={vehicle} />
            <Update value={value} update={update}  closeUpdate={() => setupdate(false)} refresh={vehicle} />
        </div>
    </section>
</>
  )
}

export default Home