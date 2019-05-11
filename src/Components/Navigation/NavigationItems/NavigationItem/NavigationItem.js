import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';

const navigateItem =(props) => {
    return(
        <li className="NavigationItem">
            <NavLink 
            activeClassName="active"
            to={props.link}
            exact>
            {props.children}</NavLink>
        </li>
    );
}

export default navigateItem;