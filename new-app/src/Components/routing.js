import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import UserDetail from './usersdata/Viewusers'
import EditedForm from './usersdata/Register with editform'

const Routing= ()=> {
    return(
        <BrowserRouter>
            <div>
                <Route exact path='/' component={UserDetail}/>               
                <Route exact path='/regiEdit/:id' component={EditedForm}/>   
            </div>
        </BrowserRouter>
    )
}

export default Routing