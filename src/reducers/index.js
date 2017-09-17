import {ADD_RECIPE, REMOVE_FROM_CALENDAR} from '../actions';

const initialCalendarState = {
    sunday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    monday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    tuesday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    wednesday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    thursday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    friday: {
        breakfast: null,
        launch: null,
        dinner:null
    },
    saturday: {
        breakfast: null,
        launch: null,
        dinner:null
    },

};

function calendar(state = initialCalendarState, action) {
    const {type, day, meal, recipe} = action;
    switch(type){
        case ADD_RECIPE:
            return {
                ...state,
                [day]:{
                    ...[day],
                    [meal]: recipe
                }
            };
        case REMOVE_FROM_CALENDAR:
            return {
                ...state,
                [day]:{
                    ...[day],
                    [meal]: null
                }
            };
        default:
            return state;
    }
}

export default calendar;