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

function mapStateToProps({recipes, calendar}, props) {
    console.log(Object.keys(calendar));

    return {
        calendar: Object.keys(calendar).map(day => ({
            day,
            meals:{
                ...(Object.keys(calendar[day]).reduce(
                    (acc,val) => {
                        acc[val] = calendar[day][val] ?recipes[calendar[day][val]] : null;
                        return acc;
                    }
                    , {})),

            }
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectRecipe: (data) => dispatch(addRecipe(data)),
        removeRecipe: (data) => dispatch(removeFromCalendar(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
