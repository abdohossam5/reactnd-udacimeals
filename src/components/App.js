import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {addRecipe, removeFromCalendar} from "../actions/index";
import {capitalize} from '../utils/helper';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';

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
        const {calendar, removeRecipe} = this.props;
        const mealOrder = ['breakfast', 'launch', 'dinner'];
        return (
            <div className="container">
                <ul className='meal-types'>
                    {mealOrder.map((mealType) => (
                        <li key={mealType} className='subheader'>
                            {capitalize(mealType)}
                        </li>
                    ))}
                </ul>
                <div className="calendar">
                    <div className="days">
                        {calendar.map( ({day,meals})=>(<h3 className='subheader' key={day}>{capitalize(day)}</h3>))}
                    </div>

                    <div className="icon-grid">
                        {calendar.map( ({day,meals})=>(
                            <ul key={day}>
                                {mealOrder.map((mealType) => (
                                    <li key={mealType} className='meal'>
                                        {meals[mealType] ?
                                            <div className="food-item">
                                                <img src={meals[mealType].image}/>
                                                <button>clear</button>
                                            </div>
                                            :
                                            <button onClick={()=> removeRecipe({day, meal:mealType})} className="icon-btn">
                                                <CalendarIcon size={30}/>
                                            </button>}
                                    </li>
                                ))}
                            </ul>
                        ))}

                    </div>
                </div>

            </div>
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
