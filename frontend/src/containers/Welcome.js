import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <h1> Welcome to our Page !</h1>
            <ul>
                <li>
                    <Link to='/showData'>Show My Name !</Link>
                </li>
            </ul>
        </div>
    );
};