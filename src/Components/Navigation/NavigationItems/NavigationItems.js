import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigateItems =(props) => {
    return(
        <ul className="NavigationItems">
            <NavigationItem
            link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
}

export default navigateItems;