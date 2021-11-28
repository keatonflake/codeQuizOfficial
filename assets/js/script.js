const count = 3;


const timer = setInterval(function() {
  document.getElementById('count').innerHTML=count;
  count--;
  if(count === -1) {
    stopInterval()
    window.alert("TIME IS UP!")
  }
}, 1000);

const stopInterval = function() {
  console.log('time is up!');
  clearInterval(timer);
}