//Create a few variables used in code below:

let green = $(".green");
let red = $(".red");
let yellow = $(".yellow");
let blue = $(".blue");
let button = $(".button");


//Create a function which generates random number and returns it:

function getRandom() {
  return Math.floor((Math.random() * 4 + 1))
};


//Create a function "ButtonAnimated" which switches animations depending on different buttons:


function buttonAnimated(i) {

  switch (i) {

    case 1:
      green.addClass("clicked");
      setTimeout(() => {
        green.removeClass("clicked");
      }, "500");

      var tom1 = new Audio("tom-1.mp3")
      tom1.play();

      break;

    case 2:
      red.addClass("clicked");
      setTimeout(() => {
        red.removeClass("clicked");
      }, "500");
      var tom2 = new Audio("tom-2.mp3")
      tom2.play();

      break;

    case 3:
      yellow.addClass("clicked");
      setTimeout(() => {
        yellow.removeClass("clicked");
      }, "500");
      var crash = new Audio("crash.mp3")
      crash.play();

      break;

    case 4:
      blue.addClass("clicked");
      setTimeout(() => {
        blue.removeClass("clicked");
      }, "300");
      var snare = new Audio("snare.mp3")
      snare.play();

      break;
  }
  return i;
};


//Create a function RandomButton which is connecting random number witch animations:

function randomButton() {
  let i = getRandom();
  buttonAnimated(i);
  return i;
}

//Create an array of clicked buttons called ButtonsClickedOrder:

let buttonsClickedOrder = []
green.on("click", function () {
  let i = 1
  buttonAnimated(i);
  buttonsClickedOrder.push(i)
  check();

});
red.on("click", function () {
  let i = 2
  buttonAnimated(i);
  buttonsClickedOrder.push(i);
  check();
});
yellow.on("click", function () {
  let i = 3
  buttonAnimated(i);
  buttonsClickedOrder.push(i);
  check();
});
blue.on("click", function () {
  let i = 4
  buttonAnimated(i);
  buttonsClickedOrder.push(i);
  check();
});


// Create an array of buttons appearing randomly:

let buttonsOrder = [];

function pushRandomButton() {
  buttonsOrder.push(randomButton());
  return buttonsOrder;
};


//Check if the 2 arrays have the same elements 

function check() {
  console.log(buttonsClickedOrder);
  console.log(buttonsOrder);


  if (compareArraysItems() === true) {

    console.log("Items are equal")



    if (compareArraysLength() === true) {
      $(".button").attr("disabled", true);
      setTimeout(() => {
        console.log("Length is ok, repeat order");
        repeatButtonsOrder();
      }, "800");

      setTimeout(() => {
        console.log("Add another random button");
        pushRandomButton();
      }, (buttonsOrder.length + 1) * 800);
      $(".button").attr("disabled", false);

      score();

    }

    if (buttonsClickedOrder > buttonsOrder) {

      for (let i = 0; i < buttonsClickedOrder.length; i++) {

        $(".scoreNumber").html("GAME OVER");
        $("body").css("background-color", "red");
      }

    }

    else {


      console.log("Length is to short , push another button");
    }

  } else {

    $(".scoreNumber").html("GAME OVER");
    $("body").css("background-color", "red");

  }
}



//Functions to compare two arrays:
function compareArraysItems() {

  for (let i = 0; i < buttonsClickedOrder.length; i++) {
    if (buttonsOrder[i] !== buttonsClickedOrder[i]) {
      return false;
    }
  }
  return true;
};

function compareArraysLength() {

  if (buttonsClickedOrder.length === buttonsOrder.length) {
    return true;
  }

  return false;
};

//Repeat button order function:
function repeatButtonsOrder() {

  buttonsOrder;
  var interval = 800;
  buttonsOrder.forEach(function (el, index) {
    setTimeout(function () {
      buttonAnimated(el);
    }, index * interval);
  });

}

//Restart the game on button click:
function restartGame() {
  $("body").css("background-color", "#EEE2DE");
  $(".scoreNumber").html("Your score is: 0 !");
  buttonsOrder = [];
  buttonsClickedOrder = [];
  pushRandomButton();
};

//Inner HTML to a paragraph in HTML, showing the score:
function score() {

  $(".scoreNumber").html("Your score is: " + buttonsOrder.length + " !");
  buttonsClickedOrder = [];
}

