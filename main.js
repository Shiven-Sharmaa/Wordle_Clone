const buttonElements = document.querySelectorAll('button');
let row=1;
let letter=1;
const wordElements = document.querySelectorAll(('.row'));
const wordForTheDayArray = new Array("piano","apple","words","pears","jokes");
const wordForTheDay= wordForTheDayArray[(Math.floor(Math.random() * wordForTheDayArray.length))];
//console.log(wordForTheDay)
//console.log(dictionary[((Math.floor(Math.random() * dictionary.length)))]);
let gameOver=false;
let guessedCorrectly=false;
const letterFrequencyInWord = Array(26).fill(0);
const alertContainer = document.querySelector("[data-alert-container");


//COUNTING FREQUENCY OF LETTERS IN THE WORD OF THE DAY
letterFrequency();
function letterFrequency(){
    for(let i=0;i<wordForTheDay.length;i++){
        let asciiValue=wordForTheDay.charCodeAt(i);
        letterFrequencyInWord[asciiValue-97]+=1;
        //console.log(letterFrequencyInWord);
    }
}

//GETTING VALUE OF KEY FROM INPUT FROM MOUSE CLICK
buttonElements.forEach((element) => {
    element.addEventListener('click',function(){keypress(element.attributes["data-key"].value)});
});

//TO GET VALUE OF KEY FROM KEYBOARD
startInteraction();
function startInteraction(){
    document.addEventListener("keydown",handleKeyPress);
}

//TO DELETE THE LETTER FROM THE CURRENT INPUT WORD
function deleteLetter(){
    const letterElements = wordElements[row-1].querySelectorAll('.col');
    for(let index=letterElements.length - 1;index>=0;index--){
        const element = letterElements[index];
        if(element.innerText === ''){}
        else{
            element.innerText='';
            letter-=1;
            break;
        }
    }
}

//Alert Messages
function showAlert(message, duration) {
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null) return
  
    setTimeout(() => {
      alert.classList.add("hide")
      alert.addEventListener("transitionend", () => {
        alert.remove()
      })
    }, duration)
}

//CHECKING POSSIBLE THREE CASES OF INPUT FROM KEYBOARD
function handleKeyPress(e) {
    if(!gameOver){
        if (e.key === "Enter") {
            //console.log(wordElements[row-1].querySelectorAll('.col').innerText);
            //if(!dictionary.includes(wordElements[row-1].querySelectorAll('.col').innerText))
            enterWord();
            //else
             //showAlert("Not a correct word!");
        return
        }
    
        if (e.key === "Backspace" || e.key === "Delete") {
        deleteLetter()
        return
        }
    
        if (e.key.match(/^[a-z]$/) || e.key.match(/^[A-Z]$/)) {
        addWord(e.key.toUpperCase())
        return
        }
    }
    else{
        showAlert('Game over');
    }
  }  

//add individual keys to the word
function addWord(key){
    if(letter<6){
        wordElements[row-1].querySelectorAll('.col')[letter-1].innerText = key;
        letter+=1;
    }
}

//check case
function checkWord(){
    const letterElements = wordElements[row-1].querySelectorAll('.col');
    let numberOfCorrectAlphabets=0;
    //starting here
    let ind=0;
    letterElements.forEach((element,index)=>{
        const indexOfLetterInWordOfTheDay = wordForTheDay.toLowerCase().indexOf(element.innerText.toLowerCase());
        //console.log('input : '+element.innerText.toLowerCase()+'word : '+wordForTheDay[ind].toLowerCase())
        let word = wordForTheDay.toLowerCase();
        let asciiOfLetterInInput = element.innerText.toLowerCase().charCodeAt(0)-97;
        //green case
        if (element.innerText.toLowerCase()===wordForTheDay[ind].toLowerCase()){
            numberOfCorrectAlphabets+=1;
            element.classList.add('colr');
            letterFrequencyInWord[asciiOfLetterInInput]-=1;
        }//orange case
        else if(letterFrequencyInWord[asciiOfLetterInInput]>0){
            element.classList.add('colw');
            letterFrequencyInWord[asciiOfLetterInInput]-=1;
        }//grey case
        else{
            element.classList.add('colg');
        }
        ind+=1;
    });
    //game end conditions
    if(numberOfCorrectAlphabets===5){
        gameOver=true;
        guessedCorrectly=true;
        showAlert('You guessed correctly!',3000);
    }
    else if(row===6){
        gameOver=true;
        showAlert('You have lost. The correct word is ' + wordForTheDay,3000);
    }
}

//finally submit the word
function enterWord(){
    if(letter<6){
        showAlert("Not enough letters",1000);
    }
    else{
        checkWord();
        row+=1;
        
    letterFrequency();
        letter=1;
    }
}

//same thing as handle key press but for mouse
function keypress(key){
    if(!gameOver){

    if(key.toLowerCase() === 'enter'){
        enterWord();
    }
    else if(key.toLowerCase() === 'del'){
        deleteLetter();
    }
    else{
        addWord(key);
    }}
    else{
        showAlert('Game over');
    }
}

