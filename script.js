function getScrabbleScore(total, current)
{ 
    let i = current.charCodeAt(0) - 65;
    const scrabble = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,1];
    
    if(scrabble[i]) return total + scrabble[i]; 
    else return total;
    
}
function displayCodel(score, i)
{
    let colours = ["red", "yellow", "green", "blue", "purple"];
    var codelWidth = 10;
    ctx().fillStyle = colours[score%colours.length];
    ctx().fillRect(codelWidth*i, codelWidth, codelWidth, codelWidth);
}
function getCanvasSize(noCodels)
{
    return Math.round(Math.pow(noCodels,2))
}
function getScores()
{
    let scores = [];
    let str = document.getElementById("beatnikInput").value;

    let words = str.split(" ");
    document.getElementById("output").innerHTML = JSON.stringify(words);
    
    words.forEach(word => { 
        scores.push(word.toUpperCase().split("").reduce(getScrabbleScore,0));
        document.getElementById("output").innerHTML = JSON.stringify(scores);
    });
    

    repaint(scores)
}
function repaint(scores)
{
    
    scores.forEach(score,i => {
        displayCodel(score,i)
    });
}
function setCanvasSize(){
    var canvas = document.getElementById("pietCanvas");
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight;

}
function setBeatnikInputBoxSize(){
    var beatBox = document.getElementById("beatnikInput");
    beatBox.cols = window.innerWidth/2;
    beatBox.rows = window.innerHeight;
}
function init()
{
    //var canvas = document.getElementById("pietCanvas");
    //var ctx = canvas.getContext("2d");
    //initialize global variables with let

    //document.getElementById("pietCanvas").addEventListener("resize",setCanvasSize);
    document.getElementById("beatnikInput").addEventListener("resize",setBeatnikInputBoxSize);
    document.getElementById("beatnikInput").addEventListener("input",getScores);

    setCanvasSize();
    //const { width, height } = canvas.getBoundingClientRect();
    //document.getElementById("beatnikInput").value = width;


}


window.onload = init;