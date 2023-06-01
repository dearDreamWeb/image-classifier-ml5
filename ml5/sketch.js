let circles = [];
let squares = [];
let triangles = [];
let count = 400;
let chunks = 10;
let trainButton;

function preload() {
  for (let i = 0; i < count; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
  }
}

let shapeClassifier;

function setup() {
  createCanvas(400, 400);
  let options = {
    inputs: [100, 100, 4],
    task: 'imageClassification',
    debug: true,
    useGPU: true
  }
  shapeClassifier = ml5.neuralNetwork(options)
  trainButton = createButton('开始训练');
  trainButton.mousePressed(train)
}

function train() {
  console.log('train start', circles.length);
  console.time('trainTime')
  trainButton.elt.innerHTML = '训练中'
  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' })
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' })
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' })
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 1 }, finishedTraining)
}

function finishedTraining() {
  console.log('finished');
  console.timeEnd('trainTime')
  trainButton.elt.innerHTML = '开始训练'
  // shapeClassifier.save()
}
