function getScore(total, current)
{ 
    let i = current.charCodeAt(0) - 65;
    const scrabble = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,1];
    
    if(scrabble[i]) return total + scrabble[i]; 
    else return total;
    
}
function displayCodel(score, i)
{
    let colours = ["red", "yellow", "green", "blue", "purple"];
    
    ctx().fillStyle = colours[score%colours.length];
    ctx().fillRect(10*i, 10, 10, 10);
}
function ctx()
{
    return document.getElementById("myCanvas").getContext("2d");
}
function getCanvasSize(noCodels)
{
    return Math.round(Math.pow(noCodels,2))
}
function getScores()
{
    let scores = [];
    let str = document.getElementById("input").value;
    let words = str.split(" ");
    document.getElementById("output").innerHTML = JSON.stringify(words);
    
    words.forEach(word => { 
        scores.push(word.toUpperCase().split("").reduce(getScore,0));
        document.getElementById("check").innerHTML = JSON.stringify(scores);
    });
    

    scores.forEach(displayCodel);
    
}
