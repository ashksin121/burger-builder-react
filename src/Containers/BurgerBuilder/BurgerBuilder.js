import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Au/Au';
import * as actionTypes from '../../store/actions';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const prices = {
    salad:0.5,
    bacon:0.4,
    cheese:1.3,
    meat:0.7
}

class BurgerBuilder extends Component {

    state = {
        price : 4,
        pur: false,
        ordered:false,
        loading:false,
        error:null
    }

    componentDidMount(){
        console.log(this.props);
        // axios.get('https://react-burger-builder-fa346.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error:true});
        //     });
    }

    updatePurchase = (ingredients) => {
        // const ingredients={...this.props.ings};
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({pur:sum>0});
    }

    addIngredient = (type) => {
        const old = this.props.ings[type];
        const neew = old+1;
        const updated = {...this.props.ings};
        updated[type] = neew;
        const priceAdd = prices[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAdd;
        this.setState({price: newPrice, ingredients: updated});
        this.updatePurchase(updated);
    }

    removeIngredient =(type) => {
        const old = this.props.ings[type];
        if(old<=0)
        {
            return;
        }
        const neew = old-1;
        const updated = {...this.props.ings};
        updated[type] = neew;
        const priceAdd = prices[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceAdd;
        this.setState({price: newPrice, ingredients: updated});
        this.updatePurchase(updated);
    }

    purchaseHandler = () => {
        this.setState({ordered:true});
    }

    purchaseCancelHandler = () => {
        this.setState({ordered:false});
    }

    purchaseContinueHandler = () => {
       // alert('Order Placed');
  
    // console.log("hello");
    const queryParams =[];
    for (let i in this.props.ings){
        queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push('price=' + this.state.price);
    const queryString =queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
    });
    }

    render () {

        const disable={
            ...this.props.ings
        };
        for(let key in disable) {
            disable[key] = disable[key]<=0
        }

        let orderSummary=null;

        

        let burger=this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    add={this.props.onIngredientAdd}
                    delete={this.props.onIngredientRemove}
                    disabled={disable}
                    price={this.state.price}
                    pur={this.state.pur}
                    ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary=   <OrderSummary ingredients={this.props.ings}
                            price={this.state.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler} />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.ordered}
                modalClosed={this.state.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));