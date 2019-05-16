import React,{Component} from 'react';
import './ContactData.css'; 
import axios from '../../../axios-orders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid:false
        // loading:false
    }

    checkValidity(value,rules) {
        let isValid=true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid= value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid= value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler =(event) => {
        event.preventDefault();
        // this.setState({loading:true});
        const formData= {};
        for (let formElement in this.state.orderForm){
            formData[formElement]=this.state.orderForm[formElement].value;
        }
        const order = {
        ingredient : this.props.ings,
        price : this.props.price,
        orderData: formData        
        }
        this.props.onOrderBurger(order);
        // axios.post('/orders.json',order)
        // .then(response => {
        //     this.setState({loading:false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading:false});
        // });
    }

    inputChanged = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedElement = { 
            ...updatedForm[inputIdentifier]
        };
        updatedElement.value=event.target.value;
        updatedElement.touched=true;
        updatedElement.valid=this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedForm[inputIdentifier]=updatedElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedForm) {
            formIsValid=updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:updatedForm,formIsValid: formIsValid});
    }

    render(){

        const formArray = [];

        for(let key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChanged(event,formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner />;
        }
        return(
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));