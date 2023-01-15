window.onload = function () {
  var c = document.getElementById("board");
  var ctx = c.getContext("2d");

  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      ctx.moveTo(0, 70 * j);
      ctx.lineTo(560, 70 * j);
      ctx.stroke();

      ctx.moveTo(70 * i, 0);
      ctx.lineTo(70 * i, 560);
      ctx.stroke();
      var left = 0;
      for (var a = 0; a < 8; a++) {
        for (var b = 0; b < 8; b += 2) {
          startX = b * 70;
          if (a % 2 == 0) startX = (b + 1) * 70;
          ctx.fillRect(startX + left, a * 70, 70, 70);
        }
      }
    }
  }
  function fromx(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let fromx = event.clientX - rect.left;
    return fromx;
  }

  function fromy(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let fromy = event.clientX - rect.left;
    return fromy;
  }
  function tox(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let tox = event.clientX - rect.left;
    return tox;
  }

  function toy(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let toy = event.clientX - rect.left;
    return toy;
  }
  var canvasElem = document.querySelector("canvas");
  canvasElem.addEventListener("mousedown", function (e) {
    fromx(canvasElem, e);
    fromy(canvasElem, e);
  });
  canvasElem.addEventListener("mouseup", function (e) {
    tox(canvasElem, e);
    toy(canvasElem, e);
  });
  drawArrow(fromx, fromy, tox, toy);
  console.log(fromx, fromy, tox, toy);
};

function drawArrow(fromx, fromy, tox, toy) {
  //variables to be used when creating the arrow
  var c = document.getElementById("board");
  var ctx = c.getContext("2d");
  var headlen = 10;

  var angle = Math.atan2(toy - fromy, tox - fromx);

  //starting path of the arrow from the start square to the end square and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.strokeStyle = "#cc0000";
  ctx.lineWidth = 22;
  ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 7),
    toy - headlen * Math.sin(angle + Math.PI / 7)
  );

  //path from the side point back to the tip of the arrow, and then again to the opposite side point
  ctx.lineTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //draws the paths created above
  ctx.strokeStyle = "#cc0000";
  ctx.lineWidth = 22;
  ctx.stroke();
  ctx.fillStyle = "#cc0000";
  ctx.fill();
}
