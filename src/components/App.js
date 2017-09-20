import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {addRecipe, removeFromCalendar} from "../actions/index"
class App extends Component {

    state = {
        calendar: null
    };

    componentDidMount(){
        console.log(this.props)
    }

    submitFood = () =>{

    };

    render() {
        return (
            <div>Hello react-redux</div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log(Object.keys(state));

    return {
        calendar: Object.keys(state).map(day => ({
            day,
            meals:{
                ...state[day]
            }
        }))
    }
}

function mapDispatchToProps() {
    return {
        addRecipe,
        removeFromCalendar
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
