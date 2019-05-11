import React from 'react';
import Logo from '../../Assets/Images/burger-logo.png';
import './Logo.css';

const logo = (props) => {
    return(
        <div className="Logo" style={{height:props.height}}>
            <img src={Logo} alt="MyBurger" />
        </div>
    );
}

export default logo;