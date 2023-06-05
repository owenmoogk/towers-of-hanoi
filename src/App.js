import { useEffect } from 'react';
import './styles.css'
import $ from 'jquery';

export default function App() {

  // keep track of weather or not it is running
  var running;

  // timing for visualizations
  var interval = null;

  function startAlgorithm() {
    if (running) {
      window.location.reload()
      return
    }

    reset()
    running = true
    var goButton = document.getElementById('goButton')
    goButton.innerHTML = "Stop"
    goButton.style.color = 'red'
    var speedInput = document.getElementById("simSpeed")
    speedInput.disabled = true;
    var numDiscsInput = document.getElementById("numDiscs")
    numDiscsInput.disabled = true;

    totalDelay = 0;
    moveTower(numDiscs, "#peg1", "#peg3", "#peg2")

    setTimeout(() => {
      stopRunning()
    }, totalDelay)
  }

  // stop the interval from running when the algorithm is done
  function stopRunning() {
    running = false
    var goButton = document.getElementById('goButton')
    goButton.innerHTML = "Go"
    goButton.style.color = ''
    var speedInput = document.getElementById("simSpeed")
    speedInput.disabled = false;
    var numDiscs = document.getElementById("numDiscs")
    numDiscs.disabled = false;
  }

  function getColor(index, max){
    let fraction = index / max;
    return `hsl(${fraction*300}, 100%, 50%)`
  }

  function reset() {
    $("#peg1").empty()
    $("#peg2").empty()
    $("#peg3").empty()
    for (let disc = 0; disc < numDiscs; disc++){
      let discNum = numDiscs - disc - 1
      var node = document.createElement("div")
      node.classList.add('disc')
      node.id = discNum
      node.style.backgroundColor = getColor(discNum, numDiscs)
      node.style.width =  `${Math.round((15-discNum)/15*100)}%`
      document.getElementById("peg1").appendChild(node)
    }
  }

  let totalDelay = 0;
  function moveTower(disk, source, dest, spare){
    if (disk == 0) return
    else{
      moveTower(disk - 1, source, spare, dest)
      setTimeout(() => {
        let removed = $(source).find(":first-child")
        removed.remove();
        $(dest).prepend(removed)
      }, totalDelay);
      totalDelay += timeDelay;
      moveTower(disk - 1, spare, dest, source)
    }
  }

  function updateNumDiscs(e){
    var newNum = parseInt(e.target.value)
    if (newNum > 12) newNum = 12;
    if (newNum < 0) newNum = 0;
    numDiscs = newNum;
    e.target.value = newNum;
    reset()
  }

  useEffect(() => {
    reset()
  }, [])

  var timeDelay = 100;
  var numDiscs = 8;

  return (
    <div className="App" style={{ userSelect: 'none' }}>
      <div id='header'>
        <p id='myName'><a href='https://owenmoogk.github.io' target='_blank' rel='noreferrer'>Owen Moogk</a></p>
        <div className='buttonContainer'>
          <p className="button" onClick={() => startAlgorithm()} id='goButton'>Go</p>
          <p className="button" onClick={() => reset()} id='clearButton'>Reset</p>
          <p>Sim Speed (ms):</p>
          <input id='simSpeed' type='number' placeholder='100' onChange={(e) => timeDelay = parseInt(e.target.value)} />
          <p>Discs:</p>
          <input id='numDiscs' type='number' placeholder='8' onChange={updateNumDiscs} />

        </div>
        <p id='infoButton'><a href='https://owenmoogk.github.io/projects/towers-of-hanoi' target='_blank' rel='noreferrer'>About This Project</a></p>

      </div>
      <div id='display'>
        <div id='peg1' className='peg'></div>
        <div id='peg2' className='peg'></div>
        <div id='peg3' className='peg'></div>
      </div>
    </div>
  );
}