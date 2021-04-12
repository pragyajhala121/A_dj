song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    fill("#aa00ff");
    stroke('#aa00ff');

    
   if(score_leftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    number_leftWristY = Number(leftWristY);
    remove_decimal = floor(number_leftWristY);
    decimal_number = remove_decimal / 1000;
    volume = decimal_number * 2;
    document.getElementById("volume").innerHTML = "Volume"+"="+volume;
    song.setVolume(volume);
}
}
function play_song() {
  song.play();  
  song.setVolume(1);
  song.rate(1);
}
function modelLoaded(){
    console.log("Posenet is Initalized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("score is leftWrist =" + score_leftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}