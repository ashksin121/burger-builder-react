import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Cheese' , type:'cheese'},
    {label:'Meat' , type:'meat'}
];

const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.add(ctrl.type)}
            removed={() => props.delete(ctrl.type)}
            disabledd={props.disabled[ctrl.type]} />
        ))} 

        <button 
        className="OrderButton"
        disabled={!props.pur}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;