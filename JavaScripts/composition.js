var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute('width', 520);
canvas.setAttribute('height', 400);
canvas.offsetTop = 200;

const ballRadius = 10;
var current_eX;
var current_eY;
var current_X = [0, 0];
var current_Y = [0, 0];
var x = canvas.width / 2;
var y = canvas.height / 2;
var members = [[]]
const n_element = 4; //メンバーの要素数（x, y, state, count,[r,g,b]）

const scatt_dist = 5;
const bami = scatt_dist * 4;
var N = 0;
var scene_s = 0;
var scene_n = 0;
var state = 0; //0=固定　1=選択　2=移動　3=選択状態のものの上でマウスが押された状態
var UpDown = "Up";

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("click", clickHandler, false);

function clickHandler(e) {
    var count = 0;
    for (var i = 0; i < N; i++) {
        var dist = (e.clientX - canvas.offsetLeft - members[scene_n][i][0]) ** 2 + (e.clientY - canvas.offsetTop - members[scene_n][i][1]) ** 2;
        if (members[scene_n][i][2] == 2) {
            members[scene_n][i][2] = 1;
        }
        else if (members[scene_n][i][2] == 3) {
            members[scene_n][i][2] = 0;
        }
        if (dist < ballRadius ** 2) count++;
        if (current_eX != e.clientX || current_eY != e.clientY) {
            members[scene_n][i][2] = 0;
        }
    }
    if (count == 0) {
        for (var i = 0; i < N; i++) {
            members[scene_n][i][2] = 0;
        }
    }
}
function mouseDownHandler(e) {
    for (var i = 0; i < N; i++) {
        var dist = (e.clientX - canvas.offsetLeft - members[scene_n][i][0]) ** 2 + (e.clientY - canvas.offsetTop - members[scene_n][i][1]) ** 2;
        if (members[scene_n][i][2] == 0 && dist < ballRadius ** 2) {
            members[scene_n][i][2] = 2;
            current_eX = e.clientX;
            current_eY = e.clientY;
            current_X[i] = members[scene_n][i][0];
            current_Y[i] = members[scene_n][i][1];
        }
        else if (members[scene_n][i][2] == 1 && dist < ballRadius ** 2) {
            members[scene_n][i][2] = 3;
        }
        else if (members[scene_n][i][2] == 1) {
            members[scene_n][i][2] = 2;
        }
    }

}
function mouseMoveHandler(e) {
    for (var i = 0; i < N; i++) {
        var relativeX = e.clientX - current_eX;
        var relativeY = e.clientY - current_eY;
        if (members[scene_n][i][2] == 2 || members[scene_n][i][2] == 3) {
            if (current_X[i] + relativeX > 0 && current_X[i] + relativeX < canvas.width) {
                members[scene_n][i][0] = (current_X[i] + relativeX) - (current_X[i] + relativeX) % scatt_dist;
            }
            if (current_Y[i] + relativeY > 0 && current_Y[i] + relativeY < canvas.height) {
                members[scene_n][i][1] = (current_Y[i] + relativeY) - (current_Y[i] + relativeY) % scatt_dist;
            }
        }
    }

}

function drawBall(member) {
    ctx.beginPath();
    ctx.arc(member[0], member[1], ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(" + member[3][0] + "," + member[3][1] + "," + member[3][2] + ")";
    ctx.fill();
    if (member[2] == 1) {
        ctx.strokeStyle = "deepskyblue";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    else if (member[2] == 2 || member[2] == 3) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.closePath();
}

function drawStage() {
    for (var i = 1; i * bami < canvas.width; i++) {
        ctx.beginPath();
        ctx.moveTo(i * bami, 0);
        ctx.lineTo(i * bami, canvas.height);
        ctx.strokeStyle = "rgb(220, 220,220)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
    for (var i = 1; i * bami < canvas.height; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * bami);
        ctx.lineTo(canvas.width, i * bami);
        ctx.strokeStyle = "rgb(220,220,220)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgb(200,200,0)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.font = "16px Arial";
    ctx.fillStyle = "rgb(200,200,200)";
    if (UpDown == "Up") {
        for (var i = 0; i * 40 <= canvas.width / 2; i++) {
            ctx.fillText(i, canvas.width / 2 + i * 40 - 4, 87);
            ctx.fillText(i, canvas.width / 2 - i * 40 - 4, 87);
        }
    }
    else if (UpDown == "Down") {
        for (var i = 0; i * 40 <= canvas.width / 2; i++) {
            ctx.fillText(i, canvas.width / 2 + i * 40 - 4, canvas.height - 75);
            ctx.fillText(i, canvas.width / 2 - i * 40 - 4, canvas.height - 75);
        }
    }

}

function drawScene(str) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("scene:" + str, 8, 20);
}

/*
function drawMove(pre_scene, new_scene) {
    for (var i = 0; i < 100; i++) {
        for(var j=0; j<N; j++){
        ctx.beginPath();
        ctx.arc(member[0], member[1], ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(" + member[3][0] + "," + member[3][1] + "," + member[3][2] + ")";
        ctx.fill();
        ctx.closepath();
        }
    }
}
*/


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStage();
    drawScene(scene_n + 1);
    for (var i = 0; i < N; i++) {
        drawBall(members[scene_n][i]);
    }
    requestAnimationFrame(draw);
}

function OB_MemberPlus() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    for (var i = 0; i <= scene_s; i++) {
        members[i][N] = [N * 40 % canvas.width + 20, canvas.height - 40, 0, [r, g, b]];
        current_X[N] = 0;
        current_Y[N] = 0;
    }
    N++;
}

function OB_MemberDelete() {

    for (var i = 0; i < N; i++) {
        if (members[scene_n][i][2] == 2) {
            for (var j = 0; j < N; j++) {
                members[j].splice(i, 1);
            }
            N--;
        }
    }
}

function OB_SceneNext() {
    if (scene_n < scene_s) scene_n++;
}

function OB_ScenePre() {
    if (scene_n > 0) scene_n--;
}

function OB_DeleteScene() {
    if (scene_s > 0) {
        members.splice(scene_n, 1);
        scene_n--;
        scene_s--;
    }
}

function OB_InsertScene() {
    scene_s++;
    members.splice(scene_n + 1, 0, []);
    for (var i = 0; i < N; i++) {
        members[scene_n + 1].push([]);
    }
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < n_element; j++) {
            members[scene_n + 1][i][j] = members[scene_n][i][j];
        }
    }

    scene_n++;
}

function OB_ChangeUpDown() {
    for (var i = 0; i <= scene_s; i++) {
        for (var j = 0; j < N; j++) {
            members[i][j][0] = canvas.width - members[i][j][0];
            members[i][j][1] = canvas.height - members[i][j][1];
        }
    }
    if (UpDown == "Up") UpDown = "Down";
    else if (UpDown == "Down") UpDown = "Up";
}

draw();
