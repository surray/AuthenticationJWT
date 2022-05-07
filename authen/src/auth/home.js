import React ,{useEffect, useState}from 'react'
import {axiosInstance} from "../config";
const Home =(props) =>{
    const [json,setJson] =useState([]);
    useEffect(()=>{
        axiosInstance.get('/api/getAll',{
            headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
        })
        .then(res =>{
           
            setJson(res.data);
            console.log(res.data);
                     })
        .catch(err=>{
           
                    })
            

    },[])
    
    return(
        <div>
        <h3>You are logged in Successfully and this is your home page</h3>
        <button 
        onClick ={()=>{localStorage.clear();
            props.history.push('/');
        }}
        className='btn btn-primary'>Logout</button>
        </div>
    )
}

export default Home;