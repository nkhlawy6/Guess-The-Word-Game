let arr = ["🍎", "🍌", "🍓", "🍇"];
let count=0;

document.getElementById('current').textContent=arr[count];

function guess(userGuess){
  count++;
  if(count>=arr.length){
    count=0;
  }
let next=arr[count]
 if(userGuess===next){
  document.getElementById('result').innerHTML+='✅ Well done!<br>';
 }else{
  document.getElementById('result').textContent='Nice try! But the correct answer is...'+next;
 }

 document.getElementById('current').textContent=next;
}