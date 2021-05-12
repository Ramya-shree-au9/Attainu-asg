import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './register.scss'


const url='http://localhost:5000/users'
const Editform=(props)=>{
    const [selectedData,setSelectedData]= useState([])
    const [email,setEmail]= useState()
    const [user,setUser]=useState()
    const [errorMessage,setErrorMessage] = useState()
    const [error,setError] = useState()
    const [country,setCountry] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()

    
     useEffect(()=>{
        
        const fetchPosts=async()=>{
            const res = await axios.get(`${url}/${props.match.params.id}`)
            setSelectedData(res.data);
            setUser(res.data["Full Name"])
            setCountry(res.data.Country)
            setEmail(res.data.Email)
            setDate(res.data["Date of birth"].split('T')[0])
            setTime(res.data["Date of birth"].split('T')[1].split('.')[0])
        }
        fetchPosts()
        
    },[ ])  

    const renderSemail=(e)=>{
        if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(e.target.value)) { 
          setEmail(e.target.value)
          setErrorMessage('') 
         
        } else {
          setErrorMessage('Please enter correct email adress')
        }   
      }
     
     
      const renderName=(e)=>{ 
          setUser(e.target.value)  
           
      }
      const renderCountry=(e)=>{  
          setCountry(e.target.value)       
      }
      const renderDateOfBirth=(e)=>{      
          setDate(e.target.value)       
      }
      const renderTime=(e)=>{     
          setTime(e.target.value)       
      }
  
  
      const submmiteditform=()=>{ 
        if(user && email && country && date && time){
            axios.patch(`${url}/${props.match.params.id}`,{
                
                    "Full Name": user,
                    "Country":country,
                    "Date of birth": `${date}T${time}Z`,
                    "Email": email,
                    "Created at":new Date().toISOString()
               
            }).then((res)=>{
                console.log(res.data)
            }).catch(err=>{
                console.log('errr')
            })
           
      props.history.push('/')
      window.location.reload(false)
      }          
          else{ 
            setError('Fill all credentials') 
          } 
      }

      const  submmitSignup=async()=>{ 
        if(user && email && country && date && time){
         const Id = 1+ +(localStorage.getItem("lastId"))
            axios.post((url),{
                "Full Name": user,
              "Country":country,
              "Id":Id ,
              "Date of birth": `${date}T${time}.000Z`,
              "Email": email,
              "Created at":new Date().toISOString()
            })
    
      props.history.push('/')
      }
                  
          else{ 
            setError('Fill all credentials') 
          } 
      }

    return (
        <React.Fragment>
              <div className="registration-form">
        <form>
            <div className="form-icon">
                <span><i className="glyphicon glyphicon-user"></i></span>
            </div>
            <div className="form-group">
            <label>Name:</label> <input type="text" className="form-data" defaultValue={selectedData["Full Name"]} onChange={renderName} id="username" placeholder="name" />
                
            </div>
            <div className="form-group">
            <label>Country:</label>  <input type="text" className="form-data" defaultValue={selectedData.Country}  onChange={renderCountry} id="country" placeholder="country"/>
               
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <div className='row'>
                    
                    <div className='col-md-6'><input type="date" defaultValue={date} className="form-control item"  onChange={renderDateOfBirth} id="date" /></div>
                    <div className='col-md-6'><input type="time" defaultValue={time} className="form-control item"  onChange={renderTime} id="time" /></div>
                </div>     
            </div>
          
          
            <div className="form-group">
            <label>Email: </label> <input type="text" className="form-data" defaultValue={selectedData.Email}  onChange={renderSemail} id="email" placeholder="Email"/>
            </div>
            
            <span className='error'>{errorMessage}</span>
          
           <div> <span className='error'>{error}</span></div>
            <div className="form-group">
                {props.match.params.id !== ':id'?
                <button type="button" className="btn btn-block create-account" onClick={submmiteditform} >Update</button>:
                <button type="button" className="btn btn-block create-account" onClick={submmitSignup} >Register Here</button>}
            </div>
           
        </form>
      
    </div>
        
    
    </React.Fragment>
    )
}

export default Editform







  
   


