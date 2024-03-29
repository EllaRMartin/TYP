
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
        let hue= scrabbleScore%this.colourcodes[0].length;
        return hue
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
    constructor(colourcode,percentage){
        this.colourcode = colourcode;
        this.percentage = percentage;
        this.left = null;
        this.right = null;
        this.chooser = 0; //direction chooser
        //this.parent = null;
        //console.log("Node created: " + this.percentage)
    }
}
class Tree{
    constructor(){
        this.root = null
        this.depth = 0;
        //console.log("Tree created")
    }
    insert(newNode){
        //var newNode = new Node(colour,percentage)
        if(this.root==null){//first node in tree
            this.root = newNode;
            this.depth++;
            return this;
            //console.log("Node successfully inserted ")
            //return this //tree
        }else if(this.depth>0){ // at least one node exists
            //if tree already has node(s)
            let current = this.root;
            for(let d =0;d<=this.depth;d++){
                //newNode.parent = current;
                //if(right==null & left != null){ //insert right
                if(current.right == null && current.left == null ) {
                    this.depth++;
                    //console.log("DEPTH: " + this.depth)
                }
                if(current.left==null){ //insert left
                    //console.log("left")
                    current.left = newNode;
                    return this;
                }else if(current.right==null){ //insert right
                    //console.log("right")
                    current.right = newNode;
                    return this;
                }
                else {//insert deeper in tree, pick direction
                    if(current.chooser == 1){
                        current.chooser = 0; //flip chooser
                        current = current.right; 
                    }else{ 
                        current.chooser = 1;
                        current = current.left;
                    }
                }
            }
        }
    }
    
    traverse(current,traversal) // https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
    {
        // console.log("Curr: " + current.percentage)
        // if(current.left != null)console.log(" L: " + current.left.percentage)
        // if(current.right != null)console.log(" R: " + current.right.percentage)
        let l = 0
        let r = 0
        if(current.left!= null) l = current.left.colourcode
        if(current.right!=null) r = current.right.colourcode

        console.log("Current: " + current.colourcode + " L: " + l  + " R: " + r)
        if(current.left != null)traversal = this.traverse(current.left, traversal)
        if(current.right != null)traversal = this.traverse(current.right,traversal)
                        
        traversal.push(current.percentage)
        return traversal
    }
}


function getScrabbleScore(total, current)
{ 2
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
    paintPiet(scores)
    return scores;
}
function paintPiet(scores){
    //clear canvas
    let canvas = document.getElementById("pietCanvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //new empty codel array
    codels=[];
    for(let i = 0;i<100;i++){
        codels[i]=[]
        for(let j = 0;j<100;j++){
            codels[i][j]=0;
        }
    }
    if(scores.length>0){
        //PUT SCORES IN TREE
        let tree = new Tree();
        scores.forEach(score => tree.insert(new Node(score,getPercentage(score))));
        //let traversal = tree.traverse(tree.root,[]);
        //console.log(JSON.stringify(traversal));
        current = tree.root;
        if(current!=null){
            codels = paintNode(current,codels,0,0,current.percentage,100,true,true);
            codels = paintNode(current,codels,current.percentage,0,100,100,true,false);
        }
        else console.log("Tree empty");
    }
    return codels;
}
function paintNode(current,codels,x1,y1,x2,y2,vertical,paint){
    
    if(paint)codels = paintRect(codels,x1,y1,x2,y2,current.colourcode);
    if(vertical){
        if(paint && current.left!=null){ 
            paintNode(current.left,codels,x1,y1,x2,Math.floor((y2-y1)*current.left.percentage/100+y1),false,true);
            paintNode(current.left,codels,x1,Math.round((y2-y1)*current.left.percentage/100+y1),x2,y2,false,false);
        }
        if(!paint && current.right!=null){
            paintNode(current.right,codels,x1,y1,x2,Math.floor((y2-y1)*current.right.percentage/100+y1),false,false);
            paintNode(current.right,codels,x1,Math.round((y2-y1)*current.right.percentage/100+y1),x2,y2,false,true);
        }
    }else{
        if(paint && current.left!=null){
            paintNode(current.left,codels,x1,y1,Math.floor((x2-x1)*(current.left.percentage)/100+x1),y2,true, true);
            paintNode(current.left,codels,Math.round((x2-x1)*(current.left.percentage)/100+x1),y1,x2,y2,true, false);

        }
        if(!paint && current.right!=null){
            paintNode(current.right,codels,x1,y1,Math.floor((x2-x1)*(current.right.percentage)/100+x1),y2,true, false);
            paintNode(current.right,codels,Math.round((x2-x1)*(current.right.percentage)/100+x1),y1,x2,y2,true,true);

        }
    }
    return codels;
}
function paintRect(codels, x1,y1, x2, y2,score){
    //console.log(x1 + "," + y1 +"," + x2 +"," + y2 + " colour: " + score)
    //UPDATE SCORES ARRAY - for execution
    // if(x1>x2){temp = x1;x1=x2;x2=temp;}
    // if(y1>y2){temp = y1;y1=y2;y2=temp;}
    if(x1<0){x1=0;}
    if(y1<0){y1=0;}
    if(x2>99){x2=99;}
    if(y2>99){y2=99;}
    //update grid
    for(let x = x1;x<=x2;x++)
    {
        for(let y = y1;y<=y2;y++)
        {
            codels[x][y] = score;
        }
    }
    //UPDATE CANVAS
    let canvas = document.getElementById("pietCanvas");
    let ctx = canvas.getContext("2d");
    let codelWidth = canvas.width/100;
    let codelHeight = canvas.height/100;


    if(score!=null && score!=0){
        //paint a rectange
        ctx.fillStyle = Colours.getColour(Colours.getLightness(score),Colours.getHue(score));
    }else ctx.fillStyle = "white";
    //console.log(x1 + "," + y1 +"," + x2 +"," + y2 + " colour: " + score)

    ctx.fillRect(x1*codelWidth,y1*codelHeight,((x2-x1)*codelWidth),((y2-y1)*codelHeight));

    return codels;
}
function getPercentage(score){
    let percentage = score * 4;
    if(percentage>99)percentage = 99;
    else if(percentage<1) percentage = 1;
    return percentage;
}

function switchDirection(xin,yin){
    if(xin == 1){ //moving right, move down
        xin = 0;
        yin = 1;
    }else if(yin == 1){ //moving down , move left
        xin = -1;
        yin = 0;
    }else if(xin == -1){//moving left,move up
        xin = 0;
        yin = -1;
    }else if(yin == -1){//moving up, move right
        xin = 1;
        yin = 0;
    }
    return [xin,yin];
}
function executePiet()
{
    //clear previous outputs
    document.getElementById("stack").innerHTML = ""; 
    document.getElementById("output").innerHTML = ""; //debugging output 
    document.getElementById("pietOutput").innerHTML = "";
    codels = paintPiet(getScores())

    let changes = [];
    let stack = [];
    let colourBlockCount = 0;
    let xin = 1;//initially moves right from top left corner
    let yin = 0;
    let numRounds = 0; 
    let lim = 4; //limit number of loops - avoid infinite loop crash
    //pad array? -1
    let x = 0,y = 0;
    let canvas = document.getElementById("pietCanvas");
    let ctx = canvas.getContext("2d");
    while(x>=0 && x<codels.length && y>=0 && y<codels.length)//lefthand corner to right 
    {
        x+=xin; //increment x value
        y+=yin; //increment y value
        if(x+xin>= codels.length || y+yin>=codels.length || x+xin<0 || y+yin<0){ //if on border, change direction
            [xin,yin] = switchDirection(xin,yin);
            //console.log("SWITCH: " + x + ", " + y + " in: " + xin + ", " + yin);

            numRounds++;
            if(numRounds==lim){
                break;
            }
        }else{ //if not on border, calculate change in hue/lightness
            let change = [-1,-1]
            try{
                change = Colours.getColourChange(codels[x][y],codels[x+xin][y+yin]);
                //draw execution path
                ctx.beginPath();
                ctx.moveTo((x+0.5)*canvas.width/100,(y+0.5)*canvas.height/100);
                ctx.lineTo((x+xin+0.5)*canvas.width/100,(y+yin+0.5)*canvas.height/100);
                ctx.closePath();
                ctx.stroke();
            }catch(err){
                console.log("ERROR: " + x + ", " + y);
            }
            if(change[0]==0 && change[1]==0){// no change - same colour
                //console.log("+");
                colourBlockCount++;
            //}else if (change[0] ==-1 && change[1] == -1){//no change - error
            }else{ //new colourblock entered
                changes.push(change);
                executePietOperation(change,stack,colourBlockCount,xin,yin)
                if(document.getElementById("stack").innerHTML!== stack){
                    document.getElementById("stack").innerHTML = document.getElementById("stack").innerHTML + "\n" + JSON.stringify(stack);
                }
                colourBlockCount= 0;//reset block count - new colour
            }
        } 
        //console.log(codels[i][0])
    }
    console.log("END: " + x + ", " + y + " in: " + xin + ", " + yin);

    document.getElementById("output").innerHTML = JSON.stringify(changes);
}
function executePietOperation(change,stack,colourBlockCount,xin,yin)
{
            let num2 = null;
            let num1 = null;
            switch(change[0]) //chose operation by change in lightness
            {
                case 0: // no change in lightness 
                    switch(change[1]) // choose operation by change in hue
                    {
                        case 1: //ADD Pop top two numbers, push sum to stack 
                            console.log("ADD");
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
                            else console.log("INPUT CHAR failed: null input");
                            break;
                    }
                    break;
                case 1: //change in lightness = 1
                    switch(change[1]) //choose operation by change in hue
                    {
                        case 0: //Push size of current block to stack
                            console.log("PUSH " + colourBlockCount);
                            stack.push(colourBlockCount);
                            break;
                        case 1: //SUB Pop top two numbers, push difference to stack (bottom-top)
                            console.log("SUB");
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Subtraction failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2 - num1);
                            break;
                        case 2: //MOD Pop top two numbers, push remainder to stack (bottom/top)
                            console.log("MOD");
                            num1 = stack.pop();
                            num2 = stack.pop();
                            if(num1 == null && num2 == null) console.log("Modulo failed: Tried to pop from empty stack");
                            else if(num1 == null) stack.push(num2);
                            else if (num2 == null) stack.push(num1);
                            else stack.push(num2 % num1);
                            break;
                        case 3://POINTER increment dp
                            console.log("INCREMENT DP");
                            num1 = stack.pop();
                            if(num1 == null) console.log("POINTER Failed: Empty stack");
                            else{
                                for(let i = 0;i<num1;i++){
                                    switchDirection(xin,yin);
                                }
                            }
                            break;
                        case 4: //aq aqpp aqpp aqpppp aqpppp aqpppp aq aq aq aqpp aqpppp ppp
                            console.log("ROLL")
                            num1 = stack.pop(); //number of places to shift
                            num2 = stack.pop(); //number of items to shift
                            let items = []
                            if(num1 == null || num2 == null) {
                                console.log("Roll failed: null value")
                                break;
                            }
                            for(let i = 0; i< num2;i++)
                            {
                                let item = stack.pop();
                                if(item == null) {
                                    console.log("Roll failed: index out of bounds");
                                    i = num2;
                                    break;
                                }else{ 
                                    items[i] = item;
                                    console.log(JSON.stringify(items));
                                }
                            }
                            
                            for(let i = items.length-num1;i<items.length;i++)
                            {
                                stack.push(items[i]);
                            }
                            for(let i = 0;i<items.length-num1;i++)
                            {
                                stack.push(items[i])
                            }

                            break;
                            
                        case 5://output num
                            console.log("OUTPUT NUM");
                            let num = stack.pop()
                            if(num == null)console.log("OUTPUT failed: Empty stack");
                            else document.getElementById("pietOutput").innerHTML = document.getElementById("pietOutput").innerHTML + num;
                            break;
                    }
                    break;
                case 2:
                    switch(change[1])
                    {
                        case 0: //Pop top value from stack
                            console.log("POP");
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
                            if(num1 == null)console.log("NOT failed: empty stack")
                            else if(num1 == 0) stack.push(1);
                            else stack.push(0);
                            break;
                        case 3: //increment cc
                            break;
                        case 4://user input num
                            console.log("INPUT NUM");
                            num = parseInt(prompt("Enter a number"));
                            if(num == NaN) console.log("INPUT failed: not a number");
                            else stack.push(num);
                            //parse float?
                            break;
                        case 5://output char
                            console.log("OUTPUT CHAR");
                            num = stack.pop()
                            char = String.fromCharCode(num);
                            if(char == null)console.log("OUTPUT failed: Empty stack");
                            else document.getElementById("pietOutput").innerHTML = document.getElementById("pietOutput").innerHTML + char;
                            break;
                    }
                    break;
                    
            }
    //         colourBlockCount = 1; //reset counter
    //     }
    // }
    // document.getElementById("stack").innerHTML = JSON.stringify(stack);
    // document.getElementById("output").innerHTML = JSON.stringify(changes);

    //console.log(changes)
}
function setCanvasSize(){
    let canvas = document.getElementById("pietCanvas");
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
    beatBox.rows = "100%";

    //beatBox.value = window.innerWidth
}
function displayHint1(){
    document.getElementById("hint1").style.display="block";
}
function hideHint1(){
    document.getElementById("hint1").style.display="none";
}
function displayHint2(){
    document.getElementById("hint2").style.display="block";
}
function hideHint2(){
    document.getElementById("hint2").style.display="none";
}
function init()
{
    //Initialize event listeners
    document.getElementById("beatnikInput").addEventListener("resize",setBeatnikInputBoxSize);
    document.getElementById("pietCanvas").addEventListener("resize",setCanvasSize);
    // resize page elements
    setBeatnikInputBoxSize();
    setCanvasSize();
    //Hide hint panels
    document.getElementById("hint1").style.display="none";
    document.getElementById("hint2").style.display="none";
    // add event listeners to input elements
    document.getElementById("beatnikInput").addEventListener("input",getScores);
    document.getElementById("runButton").addEventListener("click",executePiet);
    // add event listeners to hint buttons
    document.getElementById("hintButton1").addEventListener("mouseover",displayHint1);
    document.getElementById("hintButton1").addEventListener("mouseout",hideHint1);
    document.getElementById("hintButton2").addEventListener("mouseover",displayHint2);
    document.getElementById("hintButton2").addEventListener("mouseout",hideHint2);
    document.getElementById("hint1").addEventListener("mouseover",displayHint1);
    document.getElementById("hint1").addEventListener("mouseout",hideHint1);
    document.getElementById("hint2").addEventListener("mouseover",displayHint2);
    document.getElementById("hint2").addEventListener("mouseout",hideHint2);

    //hide debugging info 
    document.getElementById("output").style.display="none";

}

window.onload = init;


