import React from 'react';
import Logo from '../../Logo/Logo';
import  NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Au/Au';

const sideDrawer = (props) => {
    let attachedClasses = "SideDrawer Close";
    if(props.show){
        attachedClasses= "SideDrawer Open";
    }
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div onClick={props.closed}>
                <div className={attachedClasses}>
                    <Logo height="11%" />
                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth} />
                    </nav>
                </div>
            </div>
        </Aux>
    );
}

export default sideDrawer;