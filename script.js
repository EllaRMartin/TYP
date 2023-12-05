
class Colours 
{
    constructor(){
                    
    }
    static // red     yellow    green      cyan      blue     magenta
     colourcodes = [["#C00000","#C0C000","#00C000","#00C0C0","#0000C0","#C000C0"],//dark colours
            ["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF"],//bright colours
            ["#FFC0C0","#FFFFC0","#C0FFC0","#C0FFFF","#C0C0FF","#FFC0FF"]];//light colours
    static getHue(scrabbleScore)
    {
        return scrabbleScore%this.colourcodes[0].length;
    }
    static getLightness(scrabbleScore)
    {
        return Math.floor(scrabbleScore/this.colourcodes[0].length)%this.colourcodes.length;
    }
    static getColour(lightness, hue)
    {
        return this.colourcodes[lightness][hue];
    }
}

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
        if(word != "") scores.push(word.toUpperCase().split("").reduce(getScrabbleScore,0));
        document.getElementById("output").innerHTML = JSON.stringify(scores);
    });
    repaint(scores)
    return scores;
}

function repaint(scores)
{
    let canvas = document.getElementById("pietCanvas")
    let ctx = canvas.getContext("2d")
    let codelWidth = canvas.width/scores.length;
    scores.forEach((score, i)=>{
        document.getElementById("output").innerHTML
        if(score!=0)  ctx.fillStyle = Colours.getColour(Colours.getLightness(score),Colours.getHue(score))
        else ctx.fillstyle = "white"
        ctx.fillRect(i*codelWidth,0,codelWidth,codelWidth);
    });
    
}
function setCanvasSize(){
    var canvas = document.getElementById("pietCanvas");
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;

}
function setBeatnikInputBoxSize(){
    var beatBox = document.getElementById("beatnikInput");
    let compStyle = window.getComputedStyle(beatBox);
    let sz = compStyle.getPropertyValue("font-size");
    beatBox.cols = window.innerWidth/(2*sz);
    beatBox.rows = window.innerHeight/sz;
    //beatBox.value = window.innerWidth
}
function getColourChange(val1, val2)
{
    changeInHue = Colours.getHue(val2)-Colours.getHue(val1);
    changeInLightness = Colours.getLightness(val2) - Colours.getLightness(val1);
    return [changeInHue,changeInLightness]
}

function executePiet()
{
    //document.getElementById("output").innerHTML = "running"
    let scores = getScores(); 
    let changes = [];
    for(let i = 0;i < scores.length-1;i++)
    {
        let change = getColourChange(scores[i], scores[i+1]);
        changes.push(change);
    }
    document.getElementById("output").innerHTML = JSON.stringify(changes);

}

function init()
{
    document.getElementById("beatnikInput").addEventListener("resize",setBeatnikInputBoxSize);
    document.getElementById("pietCanvas").addEventListener("resize",setCanvasSize);
    setBeatnikInputBoxSize();
    setCanvasSize();
    document.getElementById("beatnikInput").addEventListener("input",getScores);
    document.getElementById("runButton").addEventListener("click",executePiet);
}

window.onload = init;