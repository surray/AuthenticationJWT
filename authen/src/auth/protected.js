import React from 'react'
import {Route , Redirect} from 'react-router-dom'

const ProtectedRouter =({component,...rest}) =>{
    let RenderComponents =component;
    let hasToken =JSON.parse(localStorage.getItem('auth'));
    console.log(RenderComponents);

    return(
        <Route
           {...rest}
            render ={props =>{
                    return hasToken !==null ?(
                        <RenderComponents {...props}/>
                    ): (
                        <Redirect
                        to ={{pathname:'/'
                            }}
                       />
                       )
                }
            }
        />
    )
}




export default ProtectedRouter;