var song;
var mic;
var fft;
var button;
var return_value = 0;



function setup() {
  createCanvas(512, 256);
  colorMode(HSB);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0, 256);
  fft.setInput(mic);

}

function draw() {
  var writeTo = document.getElementById('textfield');
  var frequency1 = 19500; //Sound played on device
  var frequency2 = 19500;
  background(0);
  var spectrum = fft.analyze();
  var energy = fft.getEnergy(frequency1);
  console.log(energy);
  var direction = 0; //0 = left, 1 = right, 2 = forward, 3 back

  //TODO: Set the threshold properly
  if(energy>140){
    var msg = new SpeechSynthesisUtterance('Turn right');
    window.speechSynthesis.speak(msg);
    document.getElementById("writeTo").innerHTML = 'Turn right!';
    console.log('You have arrived at the junction');
    return_value = direction;
    mic.stop();
  }
  
    //console.log(spectrum);
  //stroke(255);
  noStroke();
  translate(width / 2, height / 2);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 20, 100);
    //fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255);
    line(0, 0, x, y);
    //vertex(x, y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
  //endShape();


}
