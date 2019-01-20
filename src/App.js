import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Network, MAJOR, MINOR} from "./utils/guidance";
import {Map} from "./utils/map";
import QRLocalizer from "./components/localizers/QRLocalizer";
import ColourCodeLocalizer from "./components/localizers/ColourCodeLocalizer";

class App extends Component {
    constructor() {
        super()
        this.state = {
            n: new Network(Map.nodes, Map.codes),
            hallway: 1,
            major: MAJOR.UP
        }
    }

    render() {
        return (
            <div className="App">

                {/*<img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/50334224_2254028511478706_8040846675591299072_n.jpg?_nc_cat=109&_nc_ht=scontent-yyz1-1.xx&oh=2c437204d925e497b1dd40b2e453b3ee&oe=5CC6BCDA"/>*/}

                {/*<p>Hallway: {this.state.hallway} Direction: {this.state.major == 1 ? 'Up' : 'Down'}</p>*/}
                {/*<p>Path: {JSON.stringify(this.state.n.genPath(this.state.hallway, this.state.major, 2))}</p>*/}

                {/*<QRLocalizer*/}
                    {/*onChange = {({hallway, major}) => this.setState({hallway, major})}*/}
                {/*/>*/}
                <ColourCodeLocalizer/>
            </div>
        );
    }
}

export default App;
