player = {
    x: 9,
    y: 50,
    w: 100,
    h: 100
  }
  enemy = {
    x: 100,
    y: 100,
    w: 100,
    h: 100
  }
  output = document.getElementById("collisionType");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d")
  
  function collision(object1, object2) {
    return !(
      object1.x > object2.x + object2.w ||
      object1.x + object1.w < object2.x ||
      object1.y > object2.y + object2.h ||
      object1.y + object1.h < object2.y
    )
  }
  
  function draw() {
    ctx.clearRect(0, 0, 400, 400)
    ctx.lineWidth = "5"
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.rect(enemy.x, enemy.y, enemy.w, enemy.h);
    ctx.stroke();
  
  }
  
  function handleCollision() {
    if (collision(player, enemy)) {
      var playerHalfW = player.w / 2
      var playerHalfH = player.h / 2
      var enemyHalfW = enemy.w / 2
      var enemyHalfH = enemy.h / 2
      var playerCenterX = player.x + player.w / 2
      var playerCenterY = player.y + player.h / 2
      var enemyCenterX = enemy.x + enemy.w / 2
      var enemyCenterY = enemy.y + enemy.h / 2
  
      // Calculate the distance between centers
      var diffX = playerCenterX - enemyCenterX
      var diffY = playerCenterY - enemyCenterY
  
      // Calculate the minimum distance to separate along X and Y
      var minXDist = playerHalfW + enemyHalfW
      var minYDist = playerHalfH + enemyHalfH
  
      // Calculate the depth of collision for both the X and Y axis
      var depthX = diffX > 0 ? minXDist - diffX : -minXDist - diffX
      var depthY = diffY > 0 ? minYDist - diffY : -minYDist - diffY
  
      // Now that you have the depth, you can pick the smaller depth and move
      // along that axis.
      if (depthX != 0 && depthY != 0) {
        if (Math.abs(depthX) < Math.abs(depthY)) {
          // Collision along the X axis. React accordingly
          if (depthX > 0) {
            output.innerHTML = "left side collision"
          } else {
            output.innerHTML = "right side collision"
          }
        } else {
          // Collision along the Y axis.
          if (depthY > 0) {
            output.innerHTML = "top side collision"
          } else {
            output.innerHTML = "bottom side collision"
          }
        }
      }
    } else {
      output.innerHTML = "No collision"
    }
  }
  
  keyStates = []
  
  function handleKeys() {
    if (keyStates[39]) {
      player.x += 4 //Move right
    } else if (keyStates[37]) {
      player.x -= 4 //Move left
    }
    if (keyStates[38]) {
      player.y -= 4 //Move up
    }
    if (keyStates[40]) {
      player.y += 4 //Move down
    }
  }
  
  function main() {
    handleKeys();
    draw();
    handleCollision();
    window.requestAnimationFrame(main);
  }
  
  window.onkeydown = function(e) {
    keyStates[e.keyCode] = true
  }
  
  window.onkeyup = function(e) {
    keyStates[e.keyCode] = false
  }
  
  ctx = canvas.getContext('2d');  
  main();