lx = 0;
ly = 0;
rx = 0;
ry = 0;
function preload() {
    censor = loadImage("https://i.postimg.cc/P5B1836L/Censor.png");
}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    video.quality = 60;
    image(video, 0, 0, 300, 300);
    image(censor, lx - 10, ly - 10, 30, 30);
    image(censor, rx - 10, ry - 10, 30, 30);
}
function take_snapshot(){
    save('CensoredImage.png');
}
function modelLoaded(){
    console.log('PoseNet has been initialised');
}
function gotPoses(results) {
    if(results.length >0) {
        console.log(results);
        lx = results[0].pose.leftEye.x;
        ly = results[0].pose.leftEye.y;
        rx = results[0].pose.rightEye.x;
        ry = results[0].pose.rightEye.y;
        console.log("left eye x =" + lx);
        console.log("left eye y =" + ly);
        console.log("right eye x =" + rx);
        console.log("right eye y =" + ry);
    }
}