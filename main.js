Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='snapshot' src='"+data_uri+"' />";

});
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6-94kEKkI/model.json",model_loaded);
function model_loaded(){
    console.log("model is loaded");
}
function check(){
img=document.getElementById("snapshot");
classifier.classify(img,got_results); 
}
function got_results(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("result_emotion_name1").innerHTML=prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        speak();
        if(prediction_1=="happy"){
            document.getElementById("result_emoji1").innerHTML="&#128522;"
        }
        if(prediction_1=="sad"){
            document.getElementById("result_emoji1").innerHTML="&#128532;"
        }
        if(prediction_1=="angry"){
            document.getElementById("result_emoji1").innerHTML="&#128548;"
        }
        
        if(prediction_2=="happy"){
            document.getElementById("result_emoji2").innerHTML="&#128522;"
        }
        if(prediction_2=="sad"){
            document.getElementById("result_emoji2").innerHTML="&#128532;"
        }
        if(prediction_2=="angry"){
            document.getElementById("result_emoji2").innerHTML="&#128548;"
        }
        
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="the first prediction is "+ prediction_1;
    speakdata2="the second prediction is "+ prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}
