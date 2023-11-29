function getScrabbleScore(total, current)
{ 
    let i = current.charCodeAt(0) - 65;
    const scrabble = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10];
    
    if(scrabble[i]) return total + scrabble[i]; 
    else return total;
    
}
function getScores()
{
    let scores = [];
    let str = document.getElementById("beatnikInput").value; //get user input

    let words = str.split(" ");
    //document.getElementById("output").innerHTML = JSON.stringify(words);
    
    words.forEach(word => { 
        scores.push(word.toUpperCase().split("").reduce(getScrabbleScore,0));
        document.getElementById("output").innerHTML = JSON.stringify(scores);
    });
    repaint(scores)
    return scores;
}
function repaint(scores)
{
    let canvas = document.getElementById("pietCanvas")
    let ctx = canvas.getContext("2d")
    // if(scores == null){
    //     ctx.fillStyle = "white";
    //     ctx.fillRect(0,0)
    // }
                    // red     yellow    green      cyan      blue     magenta
    let colours = [["#C00000","#C0C000","#00C000","#00C0C0","#0000C0","#C000C0"],//dark colours
                   ["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF"],//bright colours
                   ["#FFC0C0","#FFFFC0","#C0FFC0","#C0FFFF","#C0C0FF","#FFC0FF"]]//light colours

    let codelWidth = canvas.width/scores.length;
    //document.getElementById("output").innerHTML = JSON.stringify(colours[scores[0]]);
    scores.forEach((score, i)=>{
        if(score==0) ctx.fillStyle = "#FFFFFF";
        else ctx.fillStyle = colours[Math.floor(score/colours[0].length)%colours.length][score%colours[0].length]
        ctx.fillRect(i*codelWidth,0,codelWidth,codelWidth);
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
function getColourChange(val1, val2)
{
    changeInLightness = Math.floor(val2-val1/5);
    changeInHue = val2-val1%5;
    return [changeInLightness,changeInHue]
}

function executePiet()
{
    let scores = getScores(); 
    for(let i = 0;i < scores.length-1;i++)
    {
        let change = getColourChange(scores[i], scores[i+1]);
        document.getElemCentById("output").innerHTML = JSON.stringify(change);
        
    }
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

    document.getElementById("runButton").addEventListener("click",executePiet())
    //const { width, height } = canvas.getBoundingClientRect();
    //document.getElementById("beatnikInput").value = width;


}


window.onload = init;