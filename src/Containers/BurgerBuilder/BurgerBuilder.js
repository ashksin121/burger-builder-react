import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Au/Au';
import * as actionTypes from '../../store/actions/actionTypes';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        ordered:false
        // loading:false,
        // error:null
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
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
        return sum>0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ordered:true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ordered:false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {

        const disable={
            ...this.props.ings
        };
        for(let key in disable) {
            disable[key] = disable[key]<=0;
            console.log(disable[key]);
        }

        let orderSummary=null;

        

        let burger=this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    add={this.props.onIngredientAdd}
                    delete={this.props.onIngredientRemove}
                    disabled={disable}
                    price={this.props.price}
                    pur={this.updatePurchase(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary=   <OrderSummary ingredients={this.props.ings}
                            price={this.props.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler} />;
        }

        // if(this.state.loading){
        //     orderSummary = <Spinner />;
        // }

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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));