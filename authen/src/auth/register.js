import React ,{Component} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {axiosInstance} from "../config";

const Register = (props) => {

     const formik =useFormik({
         initialValues:{
                name:'',
                email:'',
                password:'',
                confirmpassword:''
         },
        validationSchema: yup.object({
            name: yup.string()
                .strict()
                .trim()
                .required('This field is required'),
            email: yup.string()
                .email('Enter Valid email address')
                .strict()
                .trim()
                .required('This field is required'),  
            password: yup.string()
                .strict()
                .trim()
                .required('This field is required'),  
            confirmpassword: yup.string()
                .oneOf([yup.ref('password'),null],'must be same')
                .required('This field is required'),
         
        }),
        onSubmit:(data)=>{
            console.log(data);
            axiosInstance.post('/api/register',data)
            .then(res =>{
                toast.success("Registered Successfully");
                props.history.push("/");
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
              <div className='form-group'>
                <label>Name</label>
                <input
                className='form-control'
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name} />
                {formik.errors.name ? 
                <div className='text-danger'>{formik.errors.name}</div>
                :null
                }
              </div>

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
              <div className='form-group'>
                <label>ConfirmPassword</label>
                <input
                className='form-control'
                type="text"
                name="confirmpassword"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword} />
                {formik.errors.confirmpassword ? 
                <div className='text-danger'>{formik.errors.confirmpassword}</div>
                :null
                }
              </div>
              <div className="d-flex justify-content-between">
                <button className='btn btn-primary'>Submit</button>
                <a
                href='#'
                onClick={()=>{window.location.href='/';
                }}>
                    Login
                </a>
              </div>
              
            </form>
         </div>          

        </div>)
    }

export default Register;