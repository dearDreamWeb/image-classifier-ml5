let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;
let resultText;
let img;


function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('canvasMain')
    pixelDensity(1);
    background(255);

    let options = {
        task: 'imageClassification'
    }

    shapeClassifier = ml5.neuralNetwork(options)
    const modelInfo = {
        model: '/classifier-demo/model.json',
        metadata: '/classifier-demo/model_meta.json',
        weights: '/classifier-demo/model.weights.bin'
    }

    shapeClassifier.load(modelInfo, function () {
        console.log('model ready');
    })

    clearButton = createButton('清除');
    clearButton.parent('btnBox')
    clearButton.mousePressed(function () {
        background(255);
        resultText.html('');
    })

    confirmButton = createButton('识别');
    confirmButton.parent('btnBox')
    confirmButton.mousePressed(function () {
        classifyImage();
    })

    resultText = createDiv('')
    resultText.parent('footer')
    inputImage = createGraphics(100, 100);
}

function mouseDragged() {
    stroke(0);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
}



function classifyImage() {
    inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 100, 100);
    shapeClassifier.classify({
        image: inputImage
    }, gotResults)
}

function gotResults(err, results) {
    if (err) {
        console.log('err', err)
        return;
    }
    let map = {
        circle: '圆形概率',
        square: '矩形概率',
        triangle: '三角形概率',
    }

    let listDom = ``;
    results.forEach((item) => {
        listDom += `<li>${map[item.label]}:${(item.confidence * 100).toFixed(2)}%</li>`
    })
    resultText.html(`<ul>${listDom}</ul>`)
    console.log('results:', results);
}
