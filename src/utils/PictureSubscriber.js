import React, {Component} from 'react';
import axios from "axios";

export class PictureSubscriber extends Component {

    constructor(){
        super();

        this.mediaStreamTrack = undefined;
        this.imageCapture = undefined;

        navigator.mediaDevices.getUserMedia({video: true})
            .then((mediaStream) => {
                gotMedia(mediaStream);
            })
            .catch(error => console.error('getUserMedia() error:', error))
        const gotMedia = (mediaStream) => {
            this.mediaStreamTrack = mediaStream.getVideoTracks()[0];
            this.imageCapture = new ImageCapture(this.mediaStreamTrack);
        }
    }

    componentDidMount(){
        const img = document.querySelector('img');

        setInterval(() => {
            if (this.imageCapture != undefined) {
                this.imageCapture.takePhoto()
                    .then(blob => {
                        this.props.onPicture(blob);
                    })
                    .catch(error => console.error('takePhoto() error:', error));
            }
        }, 5000)
    }

    render() {
        return(<div/>)
    }

}