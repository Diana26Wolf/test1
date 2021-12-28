objects= []
status_new= ""
function preload(){
    video= createVideo("video.mp4")
}
function setup(){
    canvas= createCanvas(550, 450)
    canvas.center()
    video.hide()
}
function s(){
    od= ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML= "Objects are being detected"
}
function modelLoaded(){
    console.log("Model Loaded!")
    status_new= true
    video.loop()
    video.speed(1)
    video.volume(0)
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        objects = results
    }
}
function draw(){
    image(video, 0, 0, 550, 450)
    if (status_new != "") {
        detector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML= "Objects detected"
            document.getElementById("ono").innerHTML= "Number of objects:" + objects.length
            oname = objects[i].label
            oconfidence = floor(objects[i].confidence * 100)
            oheight = objects[i].height
            owidth = objects[i].width
            ox = objects[i].x
            oy = objects[i].y
            stroke("red")
            fill("red")
            textSize(20)
            text(oname + oconfidence, ox + 100, oy + 100)
            noFill()
            rect(ox, oy, owidth, oheight)
        }
    }
}