import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {addRecipe, removeFromCalendar} from "../actions/index";
import {capitalize} from '../utils/helper';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import Loading from 'react-loading';
import Modal from 'react-modal';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right';
import {fetchRecipes} from '../utils/api';
import FoodList from './FoodList';
import ShoppingList from './ShoppingList';

class App extends Component {

    state = {
        foodModalOpen: false,
        day: null,
        mealType: null,
        food: null,
        foodLoading: false,
        ingredientsModalOpen: false
    };

    openFoodModal({day, mealType}){
        this.setState({
            foodModalOpen:true,
            day,
            mealType
        })
    }

    closeFoodModal(){
        this.setState({
            foodModalOpen: false,
            day: null,
            mealType: null,
            food: null
        })
    }

    searchFood = () =>{
        this.setState({
            foodLoading:true
        });

        fetchRecipes(this.input.value)
            .then(food => {
                this.setState({food});
                this.setState({
                    foodLoading:false
                })
            })
    };

    openIngredientsModal = () => this.setState({ingredientsModalOpen:true});

    closeIngredientsModal = () => this.setState({ingredientsModalOpen:false});

    generateShoppingList(){
        return this.props.calendar.reduce((result, {day,meals}) => {
            const {breakfast, dinner, launch} = meals;
            breakfast && result.push(breakfast);
            dinner && result.push(dinner);
            launch && result.push(launch);

            return result;
        }, [])
            .reduce((totalIngredients, { ingredientLines })=> totalIngredients.concat(ingredientLines),[])
    }

    render() {
        const {foodModalOpen, day, mealType, foodLoading, food, ingredientsModalOpen} = this.state;
        const {calendar, removeRecipe, selectRecipe} = this.props;
        const mealOrder = ['breakfast', 'launch', 'dinner'];
        return (
            <div className="container">
                <div className='nav'>
                    <h1 className='header'>UdaciMeals</h1>
                    <button
                        className='shopping-list'
                        onClick={this.openIngredientsModal}>
                        Shopping List
                    </button>
                </div>
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
                                                <button onClick={()=> removeRecipe({day, meal:mealType})}>clear</button>
                                            </div>
                                            :
                                            <button onClick={()=> this.openFoodModal({day, mealType}) } className="icon-btn">
                                                <CalendarIcon size={30}/>
                                            </button>}
                                    </li>
                                ))}
                            </ul>
                        ))}

                    </div>
                </div>

                <Modal
                    isOpen={foodModalOpen}
                    closeTimeoutMS={300}
                    contentLabel="Modal"
                    overlayClassName='overlay'
                    className='modal'
                    onRequesClose = {this.closeFoodModal}
                >
                    <div>
                        {foodLoading === true
                            ? <Loading delay={200} type='spin' color='#222' className='loading' />
                            : <div className='search-container'>
                                <h3 className='subheader'>
                                    Find a meal for {capitalize(`${day}'s ${mealType}`)}.
                                </h3>
                                <div className='search'>
                                    <input
                                        className='food-input'
                                        type='text'
                                        placeholder='Search Foods'
                                        ref={(input) => this.input = input}
                                    />
                                    <button
                                        className='icon-btn'
                                        onClick={this.searchFood}>
                                        <ArrowRightIcon size={30}/>
                                    </button>
                                </div>
                                {food !== null && (
                                    <FoodList
                                        food={food}
                                        onSelect={(recipe) => {
                                            selectRecipe({ recipe, day, meal: mealType });
                                            this.closeFoodModal()
                                        }}
                                    />)}
                            </div>}
                    </div>
                </Modal>


                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={ingredientsModalOpen}
                    onRequestClose={this.closeIngredientsModal}
                    contentLabel='Modal'
                >
                    {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
                </Modal>


            </div>
        );
    }
}

function mapStateToProps({recipes, calendar}, props) {

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
