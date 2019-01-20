import React, {Component} from "react";
import QrReader from "react-qr-reader";
import {Network, MAJOR, MINOR} from "../../utils/guidance";
import {Map} from "../../utils/map";

class QRLocalizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delay: 5,
            result: 1,
            hallway: 1,
            major: MAJOR.UP
        };

        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
        if (data) {
            const [hallway, major] = data.split(':').map(d => parseInt(d));
            this.setState({
                result: data,
                hallway: hallway,
                major: major
            });
            this.props.onChange({hallway, major});
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{width: "100%", height: "50%"}}
                />
            </div>
        );
    }
}

export default QRLocalizer;