import React, {Component} from 'react';
import axios from 'axios';


export default class ColourCodeLocalizer extends Component {
    render() {

        // const heightWidth = {
        //     height: 500,
        //     width: 500
        //   };

        const hidden = {
            display: 'none',
        }

        return (
            <div>
                <img/>
                <canvas id="canvBuffer" style={hidden}></canvas>
            </div>
        )
    }
}
function getColors(ctx, w, h) {

    var pixels = ctx.getImageData(0, 0, w,h),
    data = pixels.data,        
    hexCurr = '';
    var output = {};
    
    console.log(data.length);
    for (var i = 0; i < data.length; i+=4) {
        var r = data[i],
            g = data[i + 1],
            b = data[i + 2],
            rcurr = r,
            gcurr = g,
            bcurr = b,
            rmax = data[i]*1.05,      
            gmax = data[i + 1]*1.05,
            bmax = data[i + 2]*1.05,
            rlow = data[i]*0.95,
            glow = data[i + 1]*0.95,
            blow = data[i + 2]*0.95,
            col = rgbToHex(r, g, b),
            colmax = rgbToHex(rmax, gmax, bmax),
            collow = rgbToHex(rlow, glow, blow)

        if( output[col] ){
            output[col]++;
            for(var i=0; i<(linspace(Math.round(rlow), Math.round(rmax),1)).length; i+=1){
                rcurr+=1;
                gcurr+=1;
                bcurr+=1;

                var hex = rgbToHex(rcurr, gcurr, bcurr);
                if(output[hex]){output[hex]++;}
                else{output[hex]=1;}
            }
        }

        else{
            output[col] = 1;
            for(var i=0; i<(linspace(Math.round(rlow), Math.round(rmax))).length; i+=1){
                rcurr+=1;
                gcurr+=1;
                bcurr+=1;
                hex = rgbToHex(rcurr, gcurr, bcurr);
                if(output[hex]){output[hex]++;}
                else{output[hex]=1;}
            }
        }

    }
    
    // Count total
    var total = 0;
    for(var key in output) {
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

    var hallwayOne = [1, imgData.B0171F, imgData.CD919E];
    var total = imgData.total;
    var counters = [0,0];

    //Calc %s
    for (var i =1; i<hallwayOne.length; i+=1){
            var rgbvals = hexToRgb(hallwayOne[i]);

            var rmax = rgbvals['r']*1.05,      
                gmax = rgbvals['g']*1.05,
                bmax = rgbvals['b']*1.05,
                rlow = rgbvals['r']*0.95,
                glow = rgbvals['g']*0.95,
                blow = rgbvals['b']*0.95

            for(const r in imgData.keys){
//convert key to rgb, if rgb within rlow, rmax, then counter++.
//counter/total
                var rgbValsCompare = hexToRgb(r);
                if(((rgbValsCompare['r']<rmax && rgbValsCompare['r']>rlow) && (rgbValsCompare['g']<gmax && rgbValsCompare['g']>glow) && (rgbValsCompare['b']<bmax && rgbValsCompare['b']>blow))){
                    counters[i-1]++;
                }
            }

            for(var i=0; i<counters.length; i++){
                counters[i] = counters[i]/total;
                if (Math.abs(counters[i]>0.7)){
                    return [true, hallwayOne[i]];
                }
                else {
                    return [false, 0];
                }
            }
    }
}

//got these bad boys online, i think we only need rgbToHex but jaydeep will figure it out

function extract_colors(image) {
    var canvBuffer = document.getElementById("canvBuffer");
    canvBuffer.setAttribute('width', image.width);
    canvBuffer.setAttribute('height', image.height);
    var ctx = canvBuffer.getContext('2d');
    ctx.drawImage(image, 0, 0);
 
    // c = canvas.getContext('2d');

    return getColors(ctx, image.width, image.height);
}

//From online
function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}


