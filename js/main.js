let lastFrameTimeMs = 0;
let maxFPS = 60;
let delta = 0;
let timestep = 1000 / 60;
let jugador = new Jugador();
let requestId;
let intervalEnemigosId;
let intervalPokemonesId;
let intervalBufosId;
let idEnemigo = 0;
let idPokemon = 0;
let idBufo = 0;
let bufoActivo = false;
let puntos = 0;
let maxL = 155;
let maxR = 390;
let enemigos = [new Enemigo(155,-100,idEnemigo++),
                new Enemigo(180,-100,idEnemigo++),
                new Enemigo(205,-100,idEnemigo++),
                new Enemigo(230,-100,idEnemigo++),
                new Enemigo(255,-100,idEnemigo++),
                new Enemigo(290,-100,idEnemigo++),
                new Enemigo(320,-100,idEnemigo++),
                new Enemigo(340,-100,idEnemigo++),
                new Enemigo(360,-100,idEnemigo++),
                new Enemigo(390,-100,idEnemigo++)];

let pokemones =  [new Pokemon(180,-100,idPokemon++),
                  new Pokemon(250,-100,idPokemon++),
                  new Pokemon(300,-100,idPokemon++)];

let bufos = [new Bufo(180,-100,idBufo++),
             new Bufo(250,-100,idBufo++),
             new Bufo(330,-100,idBufo++)];


function mainLoop(timestamp) {
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestId = requestAnimationFrame(mainLoop);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  while (delta >= timestep) {
      update(timestep);
      delta -= timestep;
  }
  draw();
  requestId = requestAnimationFrame(mainLoop);
  for (var i = 0; i < enemigos.length; i++) {
    if (!jugador.intersects(enemigos[i])) {
      jugador.state = State.DEAD;
      stop();
    }
  }
  for (var i = 0; i < pokemones.length; i++) {
    if (!jugador.intersects(pokemones[i])) {
      jugador.state = State.DEAD;
      stop();
    }
  }
  for (var i = 0; i < bufos.length; i++) {
    if (!jugador.intersects(bufos[i])) {
      jugador.state = State.GOD;
      bufoActivo = true;
      bufos[i].state = State.HIDDEN;
      jugador.div.className = 'personaje_moving_up god';
      setTimeout(function (){jugador.state = State.RUNNING;  bufoActivo = false; jugador.div.className = 'personaje_moving_up';}, 10000);
    }
  }

  puntos += 0.01;
  document.getElementById('puntos').innerHTML = '<p>'+puntos.toFixed(2)+' kms</p>';
}

function update(delta) {
  jugador.update(delta,maxL,maxR);
  for (var i = 0; i < enemigos.length; i++) {
    enemigos[i].update(delta);
  }
  for (var i = 0; i < pokemones.length; i++) {
    pokemones[i].update(delta,maxL,maxR);
  }
  for (var i = 0; i < bufos.length; i++) {
    bufos[i].update(delta);
  }
}

function draw(){
  jugador.draw();
  for (var i = 0; i < enemigos.length; i++) {
    if (enemigos[i].state == State.RUNNING) {
      enemigos[i].draw();
    }
  }
  for (var i = 0; i < pokemones.length; i++) {
    if (pokemones[i].state == State.RUNNING) {
      pokemones[i].draw();
    }
  }
  for (var i = 0; i < bufos.length; i++) {
    bufos[i].draw();
  }
}

function setEnemigoActual(){
  let nroE = Math.floor(Math.random() * 10);
  while (enemigos[nroE].state == State.RUNNING ) {
    nroE = Math.floor(Math.random() * 10);
  }
  enemigos[nroE].state = State.RUNNING;
}

function setPokemonActual(){
  let nroP = Math.floor(Math.random() * 3);
  while (pokemones[nroP].state == State.RUNNING ) {
    nroP = Math.floor(Math.random() * 3);
  }
  pokemones[nroP].state = State.RUNNING;
}

function setBufoActual(){
  if (!bufoActivo){
    let nroP = Math.floor(Math.random() * 3);
    while (bufos[nroP].state == State.RUNNING ) {
      nroP = Math.floor(Math.random() * 3);
    }
    bufos[nroP].state = State.RUNNING;
  }
}

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
    case "A":
      jugador.moveLeft = true;
      if (!bufoActivo){
        document.getElementById('jugador').className = 'personaje_moving_up';
      }else {
        document.getElementById('jugador').className = 'personaje_moving_up god';
      }
    break;
    case "ArrowRight":
    case "d":
    case "D":
      jugador.moveRight = true;
      if (!bufoActivo){
        document.getElementById('jugador').className = 'personaje_moving_up';
      }else {
        document.getElementById('jugador').className = 'personaje_moving_up god';
      }
    break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
    case "A":
      jugador.moveLeft = false;
    break;
    case "ArrowRight":
    case "d":
    case "D":
      jugador.moveRight = false;
    break;
  }
});


function start(){
  document.getElementById('arranca').style.display = 'none';
  document.getElementById('prado').className='prado_moviendo';
  document.getElementById('cartelito').style.display = 'none';
  jugador.div.style.display = '';

  if (!requestId) {
    requestId = requestAnimationFrame(mainLoop);
  }
  intervalEnemigosId = setInterval(function(){setEnemigoActual()},2000);
  intervalPokemonesId = setInterval(function(){setPokemonActual()},12000);
  intervalBufosId = setInterval(function(){setBufoActual()},16000);
}

function stop() {
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
    clearInterval(intervalEnemigosId);
    clearInterval(intervalPokemonesId);
    clearInterval(intervalBufosId);
    document.getElementById('perdio').innerHTML = '<p>OH OH, te alcanzaron!</p><p><b>Corriste '+puntos.toFixed(2)+' kms.</b></p><p><button class="btn"type="button" onclick="location.reload();">Intentalo de nuevo!</button></p>';

    for (var i = 0; i < enemigos.length; i++) {
      enemigos[i].state = State.HIDDEN;
      enemigos[i].div.className = 'enemigo';
    }
    jugador.div.className = '';
    document.getElementById('prado').className='';
    document.getElementById('cartelito').style.display = '';
    document.getElementById('perdio').style.display = 'inline-grid';
  }
}
jugador.div.style.display = 'none';
document.getElementById('prado').className='';
