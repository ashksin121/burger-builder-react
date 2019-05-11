import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let trans = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    }, []);

    // console.log(trans);

    if(trans.length === 0) {
        trans = <p>Please start adding ingredients!!</p>;
    }

    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {trans}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;