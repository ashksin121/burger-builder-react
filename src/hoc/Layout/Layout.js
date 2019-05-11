import React,{Component} from 'react';
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
                <Toolbar click={this.sideOpened} />
                <SideDrawer
                show={this.state.showDrawer} 
                closed={this.sideClosed} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;