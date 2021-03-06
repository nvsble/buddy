import React, {Component} from 'react';

const axiosFileupload = require('axios-fileupload');

/**
 * This takes in relevant context from the face, object, and
 */
export class Awareness extends Component {
    constructor() {
        super();
        this.state = {
            faces: [],
            labels: [],
            objects: []
        }
        this.averageFaceInterest = 0;
    }

    componentWillReceiveProps(props) {
        if (props.pic) {
            var file = new File([this.props.pic], 'picture.jpg');
            axiosFileupload('http://localhost:5000/api/vision', file, 'picture')
                .then(({data}) => {
                    this.setState({
                        faces: data.faces,
                        labels: data.labels,
                        objects: data.objects,
                    })
                });
            console.dir(this.state);
        }
    }

    render() {
        return (
            <div style={{color: 'white'}}>
                <FaceFeatures interesting={this.analyzeFaces()}/>
            </div>
        )
    }

    analyzeFaces() {
        const categories = {
            "angerLikelihood": false,
            "blurredLikelihood": false,
            "headwearLikelihood": undefined,
            "joyLikelihood": true,
            "sorrowLikelihood": false,
            "surprisedLikelihood": true,
            "underExposedLikelihood": true
        }

        const sentimentMap = new Map();
        Object.keys(categories).forEach(k => sentimentMap.set(k, 0));

        let localAverageFaceInterest = 0;
        const interestingFaces = [];
        this.state.faces.forEach(face => {
            let faceInterest = 0;
            let qualities = []
            Object.keys(categories).forEach(k => {
                if (face[k] == "VERY_LIKELY" || face[k] == "VERY_UNLIKELY" && !categories[k]) {
                    sentimentMap.set(k, sentimentMap.get(k) + 1);
                    qualities.push(k);
                    faceInterest += 1;
                }
            });
            localAverageFaceInterest = (localAverageFaceInterest + faceInterest)/2;
            if (faceInterest >= this.averageFaceInterest) {
                interestingFaces.push([face, qualities]);
            }
        })
        localAverageFaceInterest /= this.state.faces.length;
        this.averageFaceInterest = (this.averageFaceInterest * this.state.faces.length + localAverageFaceInterest * this.state.faces.length) / 2 * this.state.faces.length
        return interestingFaces;
    }

}

const FaceFeatures = ({interesting}) => {
    return (
        <div>
            {
                interesting.map(([face, qualities]) => (
                    <div>
                        {qualities.map(q => <span>{q}</span>)}
                    </div>
                ))
            }
        </div>
    );
}