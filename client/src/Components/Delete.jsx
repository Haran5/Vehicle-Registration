import React from 'react'
import './Delete.css'

const Delete = ({opendelete, closeDelete}) => {

    if(!opendelete)
    {
        return null
    }


    
  return (
    <section className='delete_section'>
        <div className="delete_container">
            <div className="delete_head">
                <i class="fa-solid fa-circle-exclamation icon"></i>
                <h3>Are you sure you want to delete this details</h3>
            </div>
            <div className="action">
                <button className='cancel' onClick={ () => closeDelete(false)}>Cancel</button>
                <button className="yes">Yes, I want</button>
            </div>
           
        </div>
    </section>
  )
}

export default Delete