import React, {Component} from 'react';
import axios from 'axios';


export default class ColourCodeLocalizer extends Component {

    constructor() {
        super();

        this.mediaStreamTrack = undefined;
        this.imageCapture = undefined;

        navigator.mediaDevices.getUserMedia({video: true})
            .then((mediaStream) => {
                gotMedia(mediaStream)
            })
            .catch(error => console.error('getUserMedia() error:', error));

        const gotMedia = (mediaStream) => {
            this.mediaStreamTrack = mediaStream.getVideoTracks()[0];
            this.imageCapture = new ImageCapture(this.mediaStreamTrack);
        }
    }

    componentDidMount() {
        const img = document.querySelector('img');

        setInterval(() => {
            if (this.imageCapture != undefined) {
                this.imageCapture.takePhoto()
                    .then(blob => {
                        img.src = URL.createObjectURL(blob);
                        var fd = new FormData();
                        fd.append('files', blob, 'snapshot');
                        console.dir(blob);
                        axios.post('https://c5aada1b.ngrok.io/api/vision', fd, {headers: "Content-Type": "multipart/form"})
                    })
                    .catch(error => console.error('takePhoto() error:', error));
            }
        }, 5000)
    }

    render() {
        return (
            <div>
                <img/>
            </div>
        )
    }
}

function getColors(canvas, color1, color2) {

    var pixels = canvas.getImageData(0, 0, canvas.width, canvas.height),
        data = pixels.data,
        output = {};

    for (var i = 0; i < data.length; i += 2) {
        var r = data[i],
            g = data[i + 1],
            b = data[i + 2],
            col = rgbToHex(r, g, b);

        if (output[col])
            output[col]++
        else
            output[col] = 1
    }

    // Count total
    var total = 0;
    for (var key in output) {
        total = total + parseInt(output[key])
    }
    output.total = total;

    // Return the color data as an object
    return output;
}

//Takes in imgData dictionary returned from extract_colors and a threshold for seeing if successful
function scanSuccess(imgData, threshold) {

    //hallway structure: id, color1, color2
    //indianRed, arbitraryPink
    const hallwayOne = [1, imgData.B0171F, imgData.CD919E];

    const total = imgData.total;

    //Calc %s
    for (var i = 1; i < hallwayOne.length; i += 1) {
        hallwayOne[i] = (hallwayOne[i] / total * 100).toFixed(2)
        if (Math.abs(hallwayOne[i] - threshold) < 1) {
            return [true, hallwayOne[0]]
        } else {
            return [false, 0]
        }
    }
}

//got these bay boys online, i think we only need rgbToHex but jaydeep will figure it out

function extract_colors(img) {
    var canvas = document.createElement("canvas");
    var c = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    c.width = canvas.width;
    c.height = canvas.height;
    console.dir(img);
    c.clearRect(0, 0, c.width, c.height);
    c.drawImage(img, 0, 0, img.width, img.height);
    var output = getColors(c);
    return scanSuccess(output, 0, 7)
}

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}

