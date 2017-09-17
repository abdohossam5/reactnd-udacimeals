import React, {Component} from 'react';
import '../App.css';
import {addRecipe} from "../actions/index"

class App extends Component {

    state = {
        calendar: null
    };

    componentDidMount(){

        this.setState(()=>({
            calendar: this.props.store.getState()
        }));

        this.props.store.subscribe(() =>(
            this.setState({
                calendar: this.props.store.getState()
            })
        ))
    }

    submitFood = () =>{

        this.props.store.dispatch(addRecipe({
            day: 'monday',
            recipe:{label: this.input.value},
            meal: 'breakfast'
        }));

        this.input.value = ''
    };

    render() {
        return (
            <div>
                <input
                    type='text'
                    ref={(input) => this.input = input}
                    placeholder="Monday's Breakfast"
                />
                <button onClick={this.submitFood}>Submit</button>

                <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
            </div>
        );
    }
}

export default App;
