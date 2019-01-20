var express = require('express');
var router = express.Router();

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


// Performs label detection on the image file
//const [result] = await client.labelDetection('samples/Rafay.jpg');
//const labels = result.labelAnnotations;
//labels.forEach(label => console.log(label.description));

// const [result] = await client.faceDetection('samples/Smile.jpg');
// const faces = result.faceAnnotations;
// console.log('Faces:');
//
// faces.forEach((face, i) => {
//     console.log(`  Face #${i + 1}:`);
//     console.log(`    Joy: ${face.joyLikelihood}`);
//     console.log(`    Anger: ${face.angerLikelihood}`);
//     console.log(`    Sorrow: ${face.sorrowLikelihood}`);
//     console.log(`    Surprise: ${face.surpriseLikelihood}`);
// });

// const [result] = await client.objectLocalization('samples/Rafay.jpg');
// const objects = result.localizedObjectAnnotations;
// objects.forEach(object => {
//     console.log(`Name: ${object.name}`);
//     console.log(`Confidence: ${object.score}`);
//     const vertices = object.boundingPoly.normalizedVertices;
//     vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
// });

/* GET users listing. */
router.post('/vision', async function (req, res, next){

    console.dir('hey');
    const [[labelResult], [faceResult], [objectResult]] = await Promise.all([
        client.labelDetection('../samples/Smile.jpg'),
        client.faceDetection('../samples/IMG_0173.HEIC'),
        client.objectLocalization('../samples/IMG_0173.HEIC')
    ]);

    const labelObjects = labelResult.labelAnnotations;
    const faces = faceResult.faceAnnotations;
    const objectObjects = objectResult.localizedObjectAnnotations;
    res.json({labels: labelObjects, faces: faces, objects: objectObjects});

});


module.exports = router;
