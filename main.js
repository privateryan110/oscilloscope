//test for a graph 
let canvas;

//current values of the dot
let x;
let y;
//previous values (to account for frame rate)
let pX;
let pY;

//center of the canvas
let centerX;
let centerY;

//thickness of the line
let weight = 5;

//opacity of background (from 0 to 100)
let bgOpacity = 20; 

//startTime
let startTime;
let currentTime;
let lastTime;


//Channel 1
let Hz_1 = 1;
let A_1 = 250;
let phi_1 = 0;

//Channel 2
let Hz_2 = 1;
let A_2 = 250;
let phi_2 = 0;



function setup(){
    //creates the canvas
    canvas = createCanvas(1000, 1000);
    canvas.parent("canvas_holder");
    background(0);
    
    //initiatizes the variables
    centerX = width / 2;
    centerY = height / 2;
    
    x = centerX;
    y = centerY;
    
    pX = x;
    pY = y;
    
    //sets the start time
    setStartTime();
    
    frameRate(120);
}

function draw(){
    //sets all the values
    //channel1
    //hertz
    Hz_1 = document.getElementById("channelOneHertz").value;
    document.getElementById("channelOneHertzDiplay").innerHTML= Hz_1;
    //amplitude
    A_1 = document.getElementById("channelOneAmp").value;
    document.getElementById("channelOneAmpDiplay").innerHTML= A_1;
    //phase
    phi_1 = float(document.getElementById("channelOnePhase").value);
    document.getElementById("channelOnePhaseDiplay").innerHTML= phi_1;
    
    
    //channel2
    //hertz
    Hz_2 = document.getElementById("channelTwoHertz").value;
    document.getElementById("channelTwoHertzDiplay").innerHTML= Hz_2;
    //amplitude
    A_2 = document.getElementById("channelTwoAmp").value;
    document.getElementById("channelTwoAmpDiplay").innerHTML= A_2;
    //phase
    //phi_2 = 0;
    phi_2 = float(document.getElementById("channelTwoPhase").value);
    document.getElementById("channelTwoPhaseDiplay").innerHTML= phi_2;
    
    //creates the background that leaves the trails
    background(0, bgOpacity);
    
    //finds the current time
    currentTime = new Date().getTime();
    
    //finds the first channel
    x = centerX + A_1 * channelOne(currentTime, Hz_1, phi_1);
    y = centerY - A_2 * channelTwo(currentTime, Hz_2, phi_2);
    
    //creates the dot that moves around 
    fill(0, 255, 0);
    noStroke();
    circle(x, y, weight);
    
    //draws the line between the previous point and the current point 
    fillIn(currentTime, lastTime);
    
    //stores values for next iteration
    lastTime = currentTime;
}

function setStartTime(){
    startTime = new Date().getTime();
    
    print(startTime);
}

function channelOne(time, hertz, phase){
    return sin ((((2 * PI) / (1000 / hertz)) * (time)) + phase);
}

function channelTwo(time, hertz, phase){
    return sin ((((2 * PI) / (1000 / hertz)) * (time)) + phase);
}

function fillIn(timeNow, timePrev){
    for (let i = 0; i < (timeNow - timePrev); i += 0.02){
        reX = centerX + A_1 * channelOne(currentTime + i, Hz_1, phi_1);
        reY = centerY - A_2 * channelTwo(currentTime + i, Hz_2, phi_2);
        
        //print(reX, reY);
        fill(0, 255, 0);
        noStroke();
        circle(reX, reY, weight);
    }
}

/*
function setPhaseOne(){
    let phaseSetter = document.getElementById("channelOnePhase").value;
    console.log(phaseSetter);
    phi_1 = int(phaseSetter);
}
*/




