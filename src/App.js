import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Network, MAJOR, MINOR} from "./utils/guidance";
import {Map} from "./utils/map";
import QRLocalizer from "./components/localizers/QRLocalizer";
import ColourCodeLocalizer from "./components/localizers/ColourCodeLocalizer";
import {PictureSubscriber} from "./utils/PictureSubscriber";
import axios from 'axios';
import {Awareness} from "./components/features/Awareness";
import {perform} from "./components/features/tts";


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            n: new Network(Map.nodes, Map.codes),
            hallway: 1,
            major: MAJOR.UP,
            pic: undefined
        }
    }

    render() {

        perform('Hello World')
            .then(v => console.dir(v))

        return (
            <div className="App">
                {/*<img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/50334224_2254028511478706_8040846675591299072_n.jpg?_nc_cat=109&_nc_ht=scontent-yyz1-1.xx&oh=2c437204d925e497b1dd40b2e453b3ee&oe=5CC6BCDA"/>*/}

                <div style={{color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                    <p>Hallway: {this.state.hallway} Direction: {this.state.major == 1 ? 'Up' : 'Down'}</p>
                    <p>Path: {JSON.stringify(this.state.n.genPath(this.state.hallway, this.state.major, 2))}</p>
                </div>

                <Awareness
                    pic = {this.state.pic}
                />

                <PictureSubscriber
                    onPicture={pic => {
                        this.setState({pic: pic})
                    }}
                />

                <QRLocalizer
                    onChange={({hallway, major}) => {
                        this.setState({hallway, major})
                    }}
                />
                <ColourCodeLocalizer
                    pic={this.state.pic}
                />
            </div>
        );
    }
}

export default App;
