import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
//import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import '../SideDrawer/DrawerToggle/DrawerToggle.css';

const toolbar = (props) => {
    return(
        <header className="Toolbar">
            {/* <DrawerToggle clicked={props.click}/> */}
            <div onClick={props.click} className="DrawerToggle">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height="80%" />
            <nav className="DesktopOnly">
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
}

export default toolbar; 