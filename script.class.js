class Rect {
    X;
    Y;
    width;
    height;
    halfHeight;
    halfWidth;
    color;
    lineWeight;

    constructor (px, py, width, height) {
        this.X = px;
        this.Y = py;
        this.width = width;
        this.height = height;
        this.setProperties();
    }

    setProperties () {
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    }

    centerX () {
        return this.X + this.width / 2;
    }

    centerY () {
        return this.Y + this.height / 2;
    }
}

class Enemy extends Rect{
    constructor (px, py, width, height, line, color = 'red') {
        super(px, py, width, height);
        this.color = color;
        this.lineWeight = line;
    }
}

class Player extends Rect {
    constructor (px, py, width, height, line, color) {
        super(px, py, width, height);
        // this.color = 'green';
        this.color = color;
        this.lineWeight = line;
    }
}

const output = document.getElementById('collisionType');
const canvas = document.getElementById('canvas');
const plrColor = document.getElementById('inpPlayer');
const enmColor = document.getElementById('inpEnemy');
const plrWidth = document.getElementById('inpPlayerWidth');
const plrHeight = document.getElementById('inpPlayerHeight');
const plrLine = document.getElementById('inpPlayerLineWidth');
const plrSpeed = document.getElementById('inpPlayerSpeed');

let enemy,
    player, 
    playerColor = 'green',
    enemyColor = 'red',
    keyStates = [],
    ctx;

// console.log('Player: ' , player )

function isColliding(plr, obj) {
    return !(
        plr.X > obj.X + obj.width ||
        plr.X + plr.width < obj.X ||
        plr.Y > obj.Y + obj.height ||
        plr.Y + plr.height < obj.Y
    )
}  

function handleCollision() {
    if (isColliding(player, enemy)) {        
        // Calculate the distance between centers
        let diffX = player.centerX() - enemy.centerX(),
            diffY = player.centerY() - enemy.centerY();
        // Calculate the minimum distance to separate along X and Y
        let minDistX = player.halfWidth + enemy.halfWidth,
            minDistY = player.halfHeight + enemy.halfHeight;    
        // Calculate the depth of collision for both the X and Y axis
        let depthX = diffX > 0 ? minDistX - diffX : -minDistX - diffX,
            depthY = diffY > 0 ? minDistY - diffY : -minDistY - diffY;
    
        // having the depth, pick the smaller depth and move along that axis
        if (depthX != 0 && depthY != 0) {
            // Collision along the X-axis...
            if (Math.abs(depthX) < Math.abs(depthY)) {                
                if (depthX > 0) return 'left';
                return 'right';
            // Collision along the Y-axis...    
            } else { 
                if (depthY > 0) return 'top';
                return 'bottom';
            }
        }
    } else {
        return null;
    }
}
  
function move(step = 2) {
    // move right  
    if (keyStates[39]) player.X += step; 
    if (player.X + player.width > canvas.width) player.X = canvas.width - player.width;
    // move left
    if (keyStates[37]) player.X -= step; 
    if (player.X < 0) player.X = 0;
    // move up
    if (keyStates[38]) player.Y -= step; 
    if (player.Y < 0) player.Y = 0;
    // move down
    if (keyStates[40]) player.Y += step; 
    if (player.Y + player.height > canvas.height) player.Y = canvas.height - player.height;
    
}

function draw(obj, clear = true) {
    if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = obj.lineWeight;
    ctx.beginPath();
    ctx.strokeStyle = obj.color;
    ctx.rect(obj.X, obj.Y, obj.width, obj.height);
    ctx.stroke();
}

function run () {
    player = new Player(50,50, +plrWidth.value, +plrHeight.value, +plrLine.value, playerColor);
    enemy = new Enemy(300,200,100,100,6,enemyColor),
    main();
}

  
function main() {
    move(+plrSpeed.value);
    draw(player);
    draw(enemy, false);
    output.innerHTML = handleCollision() + ' collision';
    window.requestAnimationFrame(main);
}
  
window.onkeydown = function(e) {
    keyStates[e.keyCode] = true
}
  
window.onkeyup = function(e) {
    keyStates[e.keyCode] = false
}

plrColor.oninput = function() {
    playerColor = this.value;
};

enmColor.oninput = function() {
    enemyColor = this.value;
};

plrWidth.oninput = function () {
    document.getElementById('outPlayerWidth').innerText = ' ' + this.value;
};

plrHeight.oninput = function () {
    document.getElementById('outPlayerHeight').innerText = ' ' + this.value;
};

plrLine.oninput = function () {
    document.getElementById('outPlayerLineWidth').innerText = ' ' + this.value;
};

plrSpeed.oninput = function () {
    document.getElementById('outPlayerSpeed').innerText = ' ' + this.value;
};

ctx = canvas.getContext('2d');  
// main();