import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Au/Au';
import './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showDrawer:false
    }

    sideClosed = () => {
        this.setState({showDrawer:false})
    }

    sideOpened = () => {
        this.setState({showDrawer:true})
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    click={this.sideOpened} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showDrawer} 
                    closed={this.sideClosed} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);