import React from 'react';
import { Route } from 'react-router-dom'
import {
    NavBar
} from '../../components';


const NotLoggedInLayout = props => {
    const { component: Component, ...rest} = props;
    return(
        <Route 
            {...rest}
            component={matchProps => (
                <div>
                    <NavBar {...matchProps}/>
                    <Component {...matchProps}/>
                </div>
            )}
        />
    )
}

export default NotLoggedInLayout;