
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
    static getColourChange(val1, val2)
    {
        let changeInHue = Colours.getHue(val2)-Colours.getHue(val1);
        if(changeInHue < 0) changeInHue = this.colourcodes[0].length + changeInHue;
        let changeInLightness = Colours.getLightness(val2) - Colours.getLightness(val1);
        if(changeInLightness < 0) changeInLightness = this.colourcodes.length + changeInLightness;
        return [changeInLightness,changeInHue]
    }
}
class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
class Tree{
    constructor(){
        this.root = null
        this.numNodes = 0;
    }
    insert(val){
        var newNode = new Node(val)
        if(this.root==null){//first node in tree
            this.root = newNode;
            this.numNodes++;
            return this //tree
        }
        //if tree already has node(s)
        current = this.root;
        // pos = val%(this.numNodes+1);//num free spaces = num nodes +1
        //depth first search
        //currently puts furthest left or furthest right 
        pos = val%2;
        if(pos==1)
        {
            do{
                current = current.left;
            }while(current.left !== null)
            current.left = newNode}
        else if(pos==2)
        {
            do{
                current = current.right;
            }while(current.right !== null)
            current.right = newNode
        }
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
    //repaint(scores) //to be replaced by paintPiet
    paintPiet(scores)
    return scores;
}
function paintRect(scores, x1,y1, x2, y2,val){
    console.log("painting rectangle ...")

    //console.log(JSON.stringify(scores))
    //test greater than
    if(x1>x2){
        temp = x1;
        x1=x2;
        x2=temp;
    }
    if(y1>y2){
        temp = y1;
        y1=y2;
        y2=temp;
    }
    if(x1<0)x1=0
    if(y1<0)y1=0
    if(x2>99)y2=99
    if(y2>99)y2=99
    for(let x = x1;x<=x2;x++)
    {
        for(let y = y1;y<=y2;y2++)
        {
            scores[x][y] = val;
        }
    }
    return scores;
}
function paintPiet(scores){
    console.log("painting page ...")
    //input 1d array of scrabblescores 
    //make a tree
    //process into image
    //return 2d array of codels (as hex colourcodes) and print on screen
    // leftVertical = 50;
    // rightVertical = 50;
    // leftHorizontal = 50;
    // rightHorizontal = 50;


    //STUFF
    codels=[];
    for(let i = 0;i<100;i++){
        codels[i]=[]
        for(let j = 0;j<100;j++){
            codels[i][j]=0;
        }
    }
    //console.log(JSON.stringify(codels))
    vertical = scores[0];
    if(scores[0]%2==1)//odd
    {
        console.log("odd")
        codels[0][0]=8
        repaint(codels)
        //codels = paintRect(codels,0,0,50,100,scores[0]);
    }
    // else { //even
    //     console.log("even")

    //     codels = paintRect(codels,50,0,100,100,scores[0]);

    // }


    // for(let i = 0;i<lengthscores;i++){
    //     //insert into tree??
    //     if(scores[i]%2 == 1)//odd
    //     {
    //         leftVertical=scores[i]
    //     }
    //     else {//even
    //     }
    // }

}
function repaint(codels)
{
    let canvas = document.getElementById("pietCanvas")
    let ctx = canvas.getContext("2d")
    // let codelWidth = canvas.width/scores.length;
    // scores.forEach((score, i)=>{
    //     document.getElementById("output").innerHTML
    //     if(score!=0)  ctx.fillStyle = Colours.getColour(Colours.getLightness(score),Colours.getHue(score))
    //     else ctx.fillstyle = "white"
    //     ctx.fillRect(i*codelWidth,0,codelWidth,codelWidth);
    // });
    let codelWidth = canvas.width/100;
    for(let x = 0;x<=100;x++){
        for(let y = 0;y<=100;y++){
            c = codels[x][y]
            if(c!=0 ){
                ctx.fillStyle = Colours.getColour(Colours.getLightness(c),Colours.getHue(c))
            //     console.log(c)
            // console.log(Colours.getHue(c))
            }
            else ctx.fillStyle = "white"
            ctx.fillRect(x*codelWidth,y*codelWidth,(x*codelWidth)+codelWidth,(y*codelWidth)+codelWidth);
        }

    }
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
    // beatBox.cols = window.innerWidth/(2*sz);
    // beatBox.rows = window.innerHeight/sz;
    beatBox.cols = "50%";
    beatBox.rows = "50%";

    //beatBox.value = window.innerWidth
}

function executePiet()
{
    //clear previous outputs
    document.getElementById("stack").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("pietOutput").innerHTML = "";


    //document.getElementById("output").innerHTML = "running"
    let scores = getScores(); //may be redundant - could pass to func instead
    let stack = []; let changes = [];
    //let registers = [];
    let colourBlockCount = 1;
    for(let i = 0;i < scores.length-1;i++)
    {
        let change = Colours.getColourChange(scores[i], scores[i+1]);
        changes.push(change);
        if(change[0] == 0 && change[1] == 0) colourBlockCount++; //if no change in hue or lightness, increment block size counter
        else  //if new colour block
        {
            let num2 = null;
            let num1 = null;
            switch(change[0]) //chose operation by change in lightness
            {
                case 0:
                    switch(change[1])
                    {
                        case 1: //ADD Pop top two numbers, push sum to stack 
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Addition failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2+num1);
                            break;
                        case 2: //DIV Pop top two numbers, push quotient to stack (bottom/top)
                            console.log("DIV")
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Division failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else if (num1 ==0) console.log("Division failed: tried to divide by zero")
                            else stack.push(num2 / num1);
                            break;
                        case 3: //GREATER If second value is greater that top, push 1, else push 0
                            console.log("GREATER")
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Comparison failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else if (num2 > num1) stack.push(1);
                            else stack.push(0);
                            break;
                        case 4: //DUPLICATE push copy of top value to stack
                            console.log("DUPLICATE");
                            num1 = stack.pop();
                            if(num1!=null){
                                stack.push(num1);
                                stack.push(num1);
                             }
                            break;
                        case 5://user input char
                            console.log("INPUT CHAR");
                            char = prompt("Enter a character");
                            char = char.charCodeAt(0);
                            if(char!= null) stack.push(char);
                            break;
                    }
                    break;
                case 1:
                    switch(change[1]) //choose operation by change in hue
                    {
                        case 0: //Push size of current block to stack
                            console.log("PUSH");
                            stack.push(colourBlockCount);
                            break;
                        case 1: //SUB Pop top two numbers, push difference to stack (bottom-top)
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Subtraction failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2 - num1);
                            break;
                        case 2: //MOD Pop top two numbers, push remainder to stack (bottom/top)
                            console.log("MOD")
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Modulo failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2 % num1);
                            break;
                        case 3://POINTER increment dp
                            break;
                        case 4:
                            console.log("ROLL")
                            num1 = stack.pop(); //number of places to shift
                            num2 = stack.pop(); //number of items to shift
                            // let items = []
                            // if(num1 == null || num2 == null) {
                            //     console.log("Roll failed: Two not null input values requried")
                            //     break;
                            // }
                            // for(i = 0; i< num2;i++)
                            // {
                            //     let item = stack.pop();
                            //     if(item == null) {
                            //         console.log("Roll failed: Tried to roll more items than present on stack");
                            //         i = num2;
                            //         break;
                            //     }else items[i] = item;
                            // }
                            // for(i = 0; i < num1;i++)
                            // {
                            //     let temp = items[items.length-1];//save top item
                            //     for(i = 1;i<num1;i++)
                            //     {
                            //         items[items.length-(i)] = items[items.length-(i+1)];//replace item with previous
                            //     }
                            // }
                            break;
                        case 5://output num
                            console.log("OUTPUT NUM");
                            num = stack.pop()
                            if(num != null) document.getElementById("pietOutput").innerHTML = document.getElementById("pietOutput").innerHTML + num;
                            break;
                    }
                    break;
                case 2:
                    switch(change[1])
                    {
                        case 0: //Pop top value from stack
                            stack.pop();
                        break;
                        case 1: //MULT Pop top two numbers, push product to stack 
                            console.log("MULT")
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Multiplication failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2 * num1);
                            break;
                        case 2: //NOT Pop top value from stack, if 0 push 1, else push 0
                            console.log("NOT")
                            num1 = stack.pop();
                            if(num1 == 0) stack.push(1);
                            else stack.push(0);
                            break;
                        case 3: //increment cc
                            break;
                        case 4://user input num
                            console.log("INPUT NUM");
                            num = parseInt(prompt("Enter a number"));
                            if(num!= NaN) stack.push(num);
                            //parse float?
                            break;
                        case 5://output char
                            console.log("OUTPUT CHAR");
                            num = stack.pop()
                            char = String.fromCharCode(num);
                            if(char != null) document.getElementById("pietOutput").innerHTML = document.getElementById("pietOutput").innerHTML + char;
                            break;
                    }
                    break;
                    
            }
            colourBlockCount = 1; //reset counter
        }
    }
    document.getElementById("stack").innerHTML = JSON.stringify(stack);
    document.getElementById("output").innerHTML = JSON.stringify(changes);

    //console.log(changes)
}

function init()
{
    // resize page elements
    document.getElementById("beatnikInput").addEventListener("resize",setBeatnikInputBoxSize);
    document.getElementById("pietCanvas").addEventListener("resize",setCanvasSize);
    setBeatnikInputBoxSize();
    setCanvasSize();
    // add event listeners to input elements
    document.getElementById("beatnikInput").addEventListener("input",getScores);
    document.getElementById("runButton").addEventListener("click",executePiet);
}

window.onload = init;