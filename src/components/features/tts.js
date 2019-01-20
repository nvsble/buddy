const fs = require('fs');
const util = require('util');

// Imports the Google Cloud client library
const tts = require('@google-cloud/text-to-speech');

// Creates a client
const client = new tts.TextToSpeechClient();

// Construct the request
const request = {
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
};

function getRequest(text) {
    const input = {text}
    return {...request, ...input}
}

export async function perform(text) {
    // Performs the Text-to-Speech request
    const [response] = await client.synthesizeSpeech(getRequest(text));
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    const x = await writeFile('output.mp3', response.audioContent, 'binary');
    console.dir(x);
}
