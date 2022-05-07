import React ,{Component} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {axiosInstance} from "../config";

const Login = (props) => {

     const formik =useFormik({
         initialValues:{
                email:'',
                password:''
                
         },
        validationSchema: yup.object({
            email: yup.string()
                .email('Enter Valid email address')
                .strict()
                .trim()
                .required('This field is required'),  
            password: yup.string()
                .strict()
                .trim()
                .required('This field is required')
            
        }),
        onSubmit:(data)=>{
            console.log(data);
            axiosInstance.post('/api',data)
            .then(res =>{
                console.log(res);
                localStorage.setItem('auth',JSON.stringify(res.data));
                props.history.push("/home");
                         })
            .catch(err=>{
                toast.error(err.response.data);
                        })
                }
        });



    return(
        <div className='container mt-6'>
         <div className="jumbotron">
            <form autoComplete ="off" onSubmit ={formik.handleSubmit}>
              

              <div autoComplete ="off" className='form-group'>
                <label>Email</label>
                <input
                className='form-control'
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email} />
                {formik.errors.email ? 
                <div className='text-danger'>{formik.errors.email}</div>
                :null
                }
              </div>

              
              <div className='form-group'>
                <label>Password</label>
                <input
                className='form-control'
                type="text"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password} />
                {formik.errors.password ? 
                <div className='text-danger'>{formik.errors.password}</div>
                :null
                }
              </div>
               
              <div className="d-flex justify-content-between">
                <button className='btn btn-primary'>Submit</button>
                <a
                href='#'
                onClick={()=>{window.location.href='register';
                }}>
                    Register
                </a>
              </div>
              
            </form>
         </div>          

        </div>)
    }

export default Login;