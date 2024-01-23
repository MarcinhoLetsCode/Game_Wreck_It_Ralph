//Parte Visual
const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time"),
      score: document.querySelector("#score"),
      life: document.querySelector('#lives'),
    },
    values: {
        gameVelocity: 1000,
        gameTime: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLife: 3,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    //console.log(state.view.squares[randomNumber]);
    //console.log(randomSquare);
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
          //square.addEventListener("mouseup", () => {
            state.view.squares.forEach((square) => {
                square.classList.remove("enemy");
            });
          //});
        } else if (square.id !== state.values.hitPosition) {
            //alert('Errou!');
            state.values.currentLife--;
            state.view.life.textContent = state.values.currentLife;
            checkLife();
        }
      });
    });
  }

  function checkLife() {
    if (state.values.currentLife <= 0) {
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });
        if(!alert("Game Over! O seu resultado foi: " + state.values.result)){
            if(!alert(`Restarting Game...`)){window.location.reload();}
        }
    }  
  }
  
  //Funcao Principal
  function initialize() {
    if(!alert(`Welcome To My Game!`)){
        if(!alert(`Starting...`)){
            addListenerHitBox();
        } 
    }
  }
  
  //Primeira a Chamar
  initialize();
