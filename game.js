
cacheDom = $('#btnid');

function next_Seq() {
  // $("#btnid").remove();
  $(".btnss").hide();
  $("h1").removeClass("margin-zero").addClass("margin-tops");
  User_seq = [];
  level++;
  $("h1").text("Level " + level);
  var col = color[Math.floor(Math.random() * 4)];
  Comp_seq.push(col);
  $("#" + col).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(col);
}

var color = ["red", "blue", "green", "yellow"];
const colors = { "red": 1, "blue": 2, "green": 3, "yellow": 4 };
var level = 0;
var Comp_seq = [];
var User_seq = [];
var game_is_active = false;

$(document).keypress(function () {
  if (!game_is_active) {
    // $("#btnid").remove();
    $(".btnss").hide();
    // document.getElementById("btnid").remove();
    $("h1").text("Level " + level);
    next_Seq();
    game_is_active = true;
  }
});

$("#btnid").click(function () {
  if (!game_is_active) {
    $("h1").text("Level " + level);
    next_Seq();
    game_is_active = true;
    // $("#btnid").remove();
    $(".btnss").hide();
  }
});

function playsound(col) {
  var aud = new Audio("sounds/" + col + ".mp3");
  aud.play();
}

$(document).keypress(function (event) {
  if (game_is_active) {
    var h = event.which;
    var col = "None";
    if (h === 114)
      col = "red";
    else if (h === 98)
      col = "blue";
    else if (h === 103)
      col = "green";
    else if (h === 121)
      col = "yellow";
    if (col in colors) {
      animatePress(col);
      User_seq.push(col);
      check(User_seq.length - 1, col);
      // $("h1").text(col);
    }
  }
});

$(".btn").click(function () {
  var col = this.getAttribute("id");
  animatePress(col);
  User_seq.push(col);
  check(User_seq.length - 1, col);
});

function check(curr_level, col) {
  if (Comp_seq[curr_level] === User_seq[curr_level]) {
    playsound(col);
    if (Comp_seq.length === User_seq.length) {
      setTimeout(function () {
        next_Seq();
      }, 1000);
    }
  }
  else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("h1").removeClass("margin-tops");
    $("h1").addClass("margin-zero");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    new_Game();
  }
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function new_Game() {
  level = 0;
  Comp_seq = [];
  game_is_active = false;
  $(".btnss").show();
  // document.getElementById("btnid").show();
  // $(".for-my-btn").append(cacheDom);
}