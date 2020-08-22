var canvas;
var ws;     
var foundMatch;
var queue;
var user;
var p1stats;
var turn;
var gameTimer;
var check = false;
var moo;
var start;
var stage;
var createjs;
var loadingBar;
var loadingText;
var car = 0;
var h_load;
var endTurnImage;
var box;
var done;
var info;
var select;
var phealth1 = [100,100,100,0,0,0];
var phealth2 = [100,100,100,0,0,0];
var penergy1 = [100,100,100,0,0,0];
var penergy2 = [100,100,100,0,0,0];
var cancelbutton;
var statsInfo;




window.onload = function()
{
    
       
    canvas = document.getElementById('myCanvas');
    canvas.width = 1100;
    canvas.height = 700;
 
   
    stage = new createjs.Stage("myCanvas");
    createjs.Touch.enable(stage);
    stage.enableMouseOver();
    websocketGo();   
    
    
       
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
   // queue.on("progress", updateLoading);
    createjs.Sound.alternateExtensions = ["ogg"];
    

    queue.loadManifest([
		{id: 'backgroundImage2', src: 'assets/ingamebackground.png'},
        {id: 'bgm1', src: 'assets/music1.mp3'},
        {id: 'select', src: 'assets/scouter.mp3'},
        {id: 'victory', src: 'assets/victory.mp3'},
        {id: 'death', src: 'assets/death.mp3'},
        {id: 'done', src: 'assets/done.png'},
        {id: 'surrender', src: 'assets/hercule.jpg'},
        {id: 'inGameHold', src: 'assets/skills_hold.png'},
        {id: 'characterBar', src: 'assets/character_hold2.png'}, 
        {id: 'mute', src: 'assets/mute1.png'},
        {id: 'arrow', src: 'assets/arrow.png'},
        {id: 'find', src: 'assets/sprite2.png'},
        {id: 'found', src: 'assets/sprite1.png'},
        {id: 'load', src: 'assets/loading.png'},
        {id: 'cancelLoad', src: 'assets/cancel.png'},
        {id: 0, src: 'ava/box.png'},
        {id: 'team', src: 'assets/Team.png'}, //Background
        {id: 'zNa', src: 'assets/zNa.jpg'}, //Face Stuff
        {id: 'zSn', src: 'assets/zSn.jpg'},
        {id: 'zRz', src: 'assets/zRz.jpg'},
        {id: 'zGu', src: 'assets/zGu.jpg'}, //Face Stuff
        {id: 'zKG', src: 'assets/zKG.jpg'},
        {id: 'zPo', src: 'assets/zPo.jpg'}, 
        {id: 'zKn', src: 'assets/zKn.jpg'}, 
        {id: 'zYa', src: 'assets/zYa.jpg'}, //Face Stuff
        {id: 'zGu1', src: 'assets/zGu1.jpg'},//Moves Pics
        {id: 'zGu2', src: 'assets/zGu2.jpg'},
        {id: 'zGu3', src: 'assets/zGu3.jpg'},
        {id: 'zKG1', src: 'assets/zKG1.jpg'},//Moves Pics
        {id: 'zKG2', src: 'assets/zKG2.jpg'},
        {id: 'zKG3', src: 'assets/zKG3.jpg'},
        {id: 'zPo1', src: 'assets/zPo1.jpg'},//Moves Pics
        {id: 'zPo2', src: 'assets/zPo2.jpg'},
        {id: 'zPo3', src: 'assets/zPo3.jpg'},
        {id: 'zYa1', src: 'assets/zYa1.jpg'},//Moves Pics
        {id: 'zYa2', src: 'assets/zYa2.jpg'},
        {id: 'zYa3', src: 'assets/zYa3.jpg'},
        {id: 'zKn1', src: 'assets/zKn1.jpg'},//Moves Pics
        {id: 'zKn2', src: 'assets/zKn2.jpg'},
        {id: 'zKn3', src: 'assets/zKn3.jpg'},
        {id: 'zGu-t1', src: 'assets/zGu-t1.jpg'},
        {id: 'zKG-t1', src: 'assets/zKG-t1.jpg'},
        {id: 'zPo-t1', src: 'assets/zPo-t1.jpg'},
        {id: 'g1', src: 'assets/g1.jpg'},
        {id: 'g2', src: 'assets/g2.jpg'},
        {id: 'g3', src: 'assets/g3.jpg'},
        {id: 'g4', src: 'assets/g4.jpg'},
        {id: 'g5', src: 'assets/g5.jpg'},
        {id: 'g6', src: 'assets/g6.jpg'},
        {id: 'g7', src: 'assets/g7.jpg'},
        {id: 'g8', src: 'assets/g8.jpg'},
        {id: 'g9', src: 'assets/g9.jpg'},
         {id: 'ge1', src: 'assets/ge1.jpg'},
         {id: 'ge-t', src: 'assets/ge-t.jpg'},
         {id: 'ko', src: 'assets/Ko.png'},
    ]);
     
    queue.load();

    /*
     *      Create a timer that updates once per second
     *
     */
    
};



function updateLoading() {
 
	 loadingText.text = "Loading " + (queue.progress * 100 | 0) + "%";
	 car = queue.progress * 370;
	 loadingBar.graphics.clear().beginFill("red").drawRect(425,350,car,25);
	
	stage.update();
}


function queueLoaded(event)
{
  
    
//background = createjs.Sound.play("backgroundMusic1", {loop: -1});
// background.on("loop", handleLoop);
 //background.volume = .4;
 //background.stop();
 $('.choice').removeClass("hidden");
 select = createjs.Sound.play("select", {loop: 0});
 //select.background = createjs.Sound.play("bgm1", {loop: -1});
 select.volume = 0.3;
    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
}


function websocketGo ()
{
     ws = new WebSocket('wss://' + window.location.host + window.location.pathname);
     ws.onopen    = function(m)  { console.log('websocket opened ');};
     ws.onclose   = function()  { console.log('websocket closed'); alert("Connection Ended f5"); };
     ws.onmessage = function(m) 
     { 
     console.log('websocket message: ' +  m.data); 
    //Server Messaging Actions
     var server = JSON.parse(m.data);
     //console.log(server.msg);
     switch(server.msg)
     {
         case "user_info":
         user = server;
         user.team = JSON.parse(user.team);
         break;
             
         case "battle":
         user.game_id = server.game_id;
         stage.removeChild(info);
         foundMatch();
         break;
             
         case "Y_turn": 
         turn = true;  
         check = false;
         clearInterval(gameTimer);
         console.log("Is it your turn? " + turn);
         break;
         
             
         case "O_turn":
         turn = false; 
         check = false;
         console.log("Is it your turn? " + turn);
         clearInterval(gameTimer);
         
         break;
         
         case "win":
         createjs.Sound.play("victory", {loop: 0});    
         clearInterval(gameTimer);   
         stage.removeAllChildren();
         stage.removeAllEventListeners();
         stage.enableMouseOver(10);
         $( "#game" ).addClass( "hidden" );
         $("#contents").fadeIn(1000);
         win(server);
         break;
             
         case "lose":
         createjs.Sound.play("death", {loop: 0});      
         clearInterval(gameTimer);
         stage.removeAllChildren();
         stage.removeAllEventListeners();
         stage.enableMouseOver(10);
         $( "#game" ).addClass( "hidden" );
         $("#contents").fadeIn(1000);
         lose(server);
         break;
         
         case "game_info":
         start = server;
         console.log(start);
         check = false;
         setTimeout(gameLoop,3000);
         break;
         
         case "start":
         user = server;
         user.team = JSON.parse(user.team);
         user.stats = JSON.parse(user.stats);
         mainMenu();
         break;
         
         case "opponent_info":
         moo = server;
         moo.team = JSON.parse(moo.team);
         break;
         
         case "menu":
         moo = "moo";
         break;
         
         case "save":
         $("#report").text(server.report);
         break;
         
         case "upgrade":
         user = server
         user.stats = JSON.parse(user.stats);
         statsCharacter(user.character);
         break;
     }
         
         
         
     }; 
     ws.error   = function()  {  console.log('websocket error'); };
     
     //ws.send("Hello");
         //setInterval(show, 10000);
}

function win(stats)
{   
    stats.old = JSON.parse(stats.old);
    stats.new = JSON.parse(stats.new);
    var s = [stats.old[3],stats.old[4],stats.old[5],stats.new[3],stats.new[4],stats.new[5]];
    
    switch (stats.old[0])
    {
        case 1:
        stats.old[3] = stats.old[3] / 100 * 100;    
        break;
        
        case 2:
        stats.old[3] = stats.old[3] / 200 * 100;
        break;
        
        case 3:
        stats.old[3] = stats.old[3] / 300 * 100; 
        break;
        
        case 4:
         stats.old[3] = stats.old[3] / 400 * 100;
        break;
        
        case 5:
        stats.old[3] = stats.old[3] / 500 * 100; 
        break;
        
        case 6:
        stats.old[3] = stats.old[3] / 600 * 100; 
        break;
        
        case 7:
        stats.old[3] = stats.old[3] / 700 * 100;  
        break;
        
        case 8:
        stats.old[3] = stats.old[3] / 800 * 100;
        break;
        
        case 9:
        stats.old[3] = 100;
        break;
        
    }
   
    switch (stats.old[1])
    {
        case 1:
        stats.old[4] = stats.old[4] / 100 * 100;    
        break;
        
        case 2:
        stats.old[4] = stats.old[4] / 200 * 100;
        break;
        
        case 3:
        stats.old[4] = stats.old[4] / 300 * 100; 
        break;
        
        case 4:
         stats.old[4] = stats.old[4] / 400 * 100;
        break;
        
        case 5:
        stats.old[4] = stats.old[4] / 500 * 100; 
        break;
        
        case 6:
        stats.old[4] = stats.old[4] / 600 * 100; 
        break;
        
        case 7:
        stats.old[4] = stats.old[4] / 700 * 100;  
        break;
        
        case 8:
        stats.old[4] = stats.old[4] / 800 * 100;
        break;
        
        case 9:
        stats.old[4] = 100;
        break;
        
    }
    
    switch (stats.old[2])
    {
        case 1:
        stats.old[5] = stats.old[5] / 100 * 100;    
        break;
        
        case 2:
        stats.old[5] = stats.old[5] / 200 * 100;
        break;
        
        case 3:
        stats.old[5] = stats.old[5] / 300 * 100; 
        break;
        
        case 4:
         stats.old[5] = stats.old[5] / 400 * 100;
        break;
        
        case 5:
        stats.old[5] = stats.old[5] / 500 * 100; 
        break;
        
        case 6:
        stats.old[5] = stats.old[5] / 600 * 100; 
        break;
        
        case 7:
        stats.old[5] = stats.old[5] / 700 * 100;  
        break;
        
        case 8:
        stats.old[5] = stats.old[5] / 800 * 100;
        break;
        
        case 9:
        stats.old[5] = 100;
        break;
        
    }
   
    
    
       switch (stats.new[0])
    {
        case 1:
        stats.new[3] = stats.new[3] / 100 * 100;    
        break;
        
        case 2:
        stats.new[3] = stats.new[3] / 200 * 100;
        break;
        
        case 3:
        stats.new[3] = stats.new[3] / 300 * 100; 
        break;
        
        case 4:
         stats.new[3] = stats.new[3] / 400 * 100;
        break;
        
        case 5:
        stats.new[3] = stats.new[3] / 500 * 100; 
        break;
        
        case 6:
        stats.new[3] = stats.new[3] / 600 * 100; 
        break;
        
        case 7:
        stats.new[3] = stats.new[3] / 700 * 100;  
        break;
        
        case 8:
        stats.new[3] = stats.new[3] / 800 * 100;
        break;
        
        case 9:
        stats.new[3] = 100;
        break;
        
    }
    
      switch (stats.new[1])
    {
        case 1:
        stats.new[4] = stats.new[4] / 100 * 100;    
        break;
        
        case 2:
        stats.new[4] = stats.new[4] / 200 * 100;
        break;
        
        case 3:
        stats.new[4] = stats.new[4] / 300 * 100; 
        break;
        
        case 4:
         stats.new[4] = stats.new[4] / 400 * 100;
        break;
        
        case 5:
        stats.new[4] = stats.new[4] / 500 * 100; 
        break;
        
        case 6:
        stats.new[4] = stats.new[4] / 600 * 100; 
        break;
        
        case 7:
        stats.new[4] = stats.new[4] / 700 * 100;  
        break;
        
        case 8:
        stats.new[4] = stats.new[4] / 800 * 100;
        break;
        
        case 9:
        stats.new[4] = 100;
        break;
        
    }
    
      switch (stats.new[2])
    {
        case 1:
        stats.new[5] = stats.new[5] / 100 * 100;    
        break;
        
        case 2:
        stats.new[5] = stats.new[5] / 200 * 100;
        break;
        
        case 3:
        stats.new[5] = stats.new[5] / 300 * 100; 
        break;
        
        case 4:
        stats.new[5] = stats.new[5] / 400 * 100;
        break;
        
        case 5:
        stats.new[5] = stats.new[5] / 500 * 100; 
        break;
        
        case 6:
        stats.new[5] = stats.new[5] / 600 * 100; 
        break;
        
        case 7:
        stats.new[5] = stats.new[5] / 700 * 100;  
        break;
        
        case 8:
        stats.new[5] = stats.new[5] / 800 * 100;
        break;
        
        case 9:
        stats.new[5] = 100;
        break;
        
    }
    
    console.log(stats.new);
    stats.old[3] = Math.round(stats.old[3]);
    stats.old[4] = Math.round(stats.old[4]);
    stats.old[5] = Math.round(stats.old[5]);
    stats.new[3] = Math.round(stats.new[3]);
    stats.new[4] = Math.round(stats.new[4]);
    stats.new[5] = Math.round(stats.new[5]);
    $('#pb-1').css('width', stats.old[3]);
    $('#pb-2').css('width', stats.old[4]);
    $('#pb-3').css('width', stats.old[5]);
    $('#pb-text1').text(stats.old[3] + "%");
    $('#pb-text2').text(stats.old[4] + "%"); 
    $('#pb-text3').text(stats.old[5] + "%"); 
    $("#c1e").attr('src', queue.getItem(user.team[0]).src);
    $("#c2e").attr('src', queue.getItem(user.team[1]).src);
    $("#c3e").attr('src', queue.getItem(user.team[2]).src);
    $("#result").attr('src', "/assets/You_Win.jpg");
    $("#title").text("You Win!");
    $("#endgame").modal("show");
    

    $("#pb-1").animate({width: stats.new[3] + "%"}, 2500);
    $("#pb-2").animate({width: stats.new[4] + "%"}, 2500);
    $("#pb-3").animate({width: stats.new[5] + "%"}, 2500);
    $('#info1').text("Level:" +stats.old[0] + "->" + stats.new[0] + " Experience:" + s[0] + "->" + s[3] + " Points:" +stats.old[6] + "->" + stats.new[6]);
    $('#info2').text("Level:" +stats.old[1] + "->" + stats.new[1] + " Experience:" + s[1] + "->" + s[4] + " Points:" +stats.old[7] + "->" + stats.new[7]);
    $('#info3').text("Level:" +stats.old[2] + "->" + stats.new[2] + " Experience:" + s[2] + "->" + s[5] + " Points:" +stats.old[8] + "->" + stats.new[8]);
    setTimeout(function(){ $('#pb-text1').text(stats.new[3] + "%");$('#pb-text2').text(stats.new[4] + "%"); $('#pb-text3').text(stats.new[5] + "%");   }, 2500);
  
    
}

function lose(stats)
{
console.log(user.team);
//{"msg":"lose","old":"[2, 2, 2, 100, 100, 100]","new":"[2, 2, 2, 100, 100, 100]"}
    
    stats.old = JSON.parse(stats.old);
    stats.new = JSON.parse(stats.new);
    
    var s = [stats.old[3],stats.old[4],stats.old[5],stats.new[3],stats.new[4],stats.new[5]];

     switch (stats.old[0])
    {
        case 1:
        stats.old[3] = stats.old[3] / 100 * 100;    
        break;
        
        case 2:
        stats.old[3] = stats.old[3] / 300 * 100;
        break;
        
        case 3:
        stats.old[3] = stats.old[3] / 600 * 100; 
        break;
        
        case 4:
         stats.old[3] = stats.old[3] / 1000 * 100;
        break;
        
        case 5:
        stats.old[3] = stats.old[3] / 1500 * 100; 
        break;
        
        case 6:
        stats.old[3] = stats.old[3] / 2100 * 100; 
        break;
        
        case 7:
        stats.old[3] = stats.old[3] / 2800 * 100;  
        break;
        
        case 8:
        stats.old[3] = stats.old[3] / 3600 * 100;
        break;
        
        case 9:
        stats.old[3] = 100;
        break;
        
    }
   
    switch (stats.old[1])
    {
        case 1:
        stats.old[4] = stats.old[4] / 100 * 100;    
        break;
        
        case 2:
        stats.old[4] = stats.old[4] / 300 * 100;
        break;
        
        case 3:
        stats.old[4] = stats.old[4] / 600 * 100; 
        break;
        
        case 4:
         stats.old[4] = stats.old[4] / 1000 * 100;
        break;
        
        case 5:
        stats.old[4] = stats.old[4] / 1500 * 100; 
        break;
        
        case 6:
        stats.old[4] = stats.old[4] / 2100 * 100; 
        break;
        
        case 7:
        stats.old[4] = stats.old[4] / 2800 * 100;  
        break;
        
        case 8:
        stats.old[4] = stats.old[4] / 3600 * 100;
        break;
        
        case 9:
        stats.old[4] = 100;
        break;
        
    }
    
    switch (stats.old[2])
    {
        case 1:
        stats.old[5] = stats.old[5] / 100 * 100;    
        break;
        
        case 2:
        stats.old[5] = stats.old[5] / 300 * 100;
        break;
        
        case 3:
        stats.old[5] = stats.old[5] / 600 * 100; 
        break;
        
        case 4:
         stats.old[5] = stats.old[5] / 1000 * 100;
        break;
        
        case 5:
        stats.old[5] = stats.old[5] / 1500 * 100; 
        break;
        
        case 6:
        stats.old[5] = stats.old[5] / 2100 * 100; 
        break;
        
        case 7:
        stats.old[5] = stats.old[5] / 2800 * 100;  
        break;
        
        case 8:
        stats.old[5] = stats.old[5] / 3600 * 100;
        break;
        
        case 9:
        stats.old[5] = 100;
        break;
        
    }
   
    
    
       switch (stats.new[0])
    {
        case 1:
        stats.new[3] = stats.new[3] / 100 * 100;    
        break;
        
        case 2:
        stats.new[3] = stats.new[3] / 300 * 100;
        break;
        
        case 3:
        stats.new[3] = stats.new[3] / 600 * 100; 
        break;
        
        case 4:
         stats.new[3] = stats.new[3] / 1000 * 100;
        break;
        
        case 5:
        stats.new[3] = stats.new[3] / 1500 * 100; 
        break;
        
        case 6:
        stats.new[3] = stats.new[3] / 2100 * 100; 
        break;
        
        case 7:
        stats.new[3] = stats.new[3] / 2800 * 100;  
        break;
        
        case 8:
        stats.new[3] = stats.new[3] / 3600 * 100;
        break;
        
        case 9:
        stats.new[3] = 100;
        break;
        
    }
    
      switch (stats.new[1])
    {
        case 1:
        stats.new[4] = stats.new[4] / 100 * 100;    
        break;
        
        case 2:
        stats.new[4] = stats.new[4] / 300 * 100;
        break;
        
        case 3:
        stats.new[4] = stats.new[4] / 600 * 100; 
        break;
        
        case 4:
         stats.new[4] = stats.new[4] / 1000 * 100;
        break;
        
        case 5:
        stats.new[4] = stats.new[4] / 1500 * 100; 
        break;
        
        case 6:
        stats.new[4] = stats.new[4] / 2100 * 100; 
        break;
        
        case 7:
        stats.new[4] = stats.new[4] / 2800 * 100;  
        break;
        
        case 8:
        stats.new[4] = stats.new[4] / 3600 * 100;
        break;
        
        case 9:
        stats.new[4] = 100;
        break;
        
    }
    
      switch (stats.new[2])
    {
        case 1:
        stats.new[5] = stats.new[5] / 100 * 100;    
        break;
        
        case 2:
        stats.new[5] = stats.new[5] / 300 * 100;
        break;
        
        case 3:
        stats.new[5] = stats.new[5] / 600 * 100; 
        break;
        
        case 4:
         stats.new[5] = stats.new[5] / 1000 * 100;
        break;
        
        case 5:
        stats.new[5] = stats.new[5] / 1500 * 100; 
        break;
        
        case 6:
        stats.new[5] = stats.new[5] / 2100 * 100; 
        break;
        
        case 7:
        stats.new[5] = stats.new[5] / 2800 * 100;  
        break;
        
        case 8:
        stats.new[5] = stats.new[5] / 3600 * 100;
        break;
        
        case 9:
        stats.new[5] = 100;
        break;
        
    }
    
    $('#pb-1').css('width', stats.old[3] + "%");
    $('#pb-2').css('width', stats.old[4] + "%");
    $('#pb-3').css('width', stats.old[5] + "%");
    $("#c1e").attr('src', queue.getItem(user.team[0]).src);
    $("#c2e").attr('src', queue.getItem(user.team[1]).src);
    $("#c3e").attr('src', queue.getItem(user.team[2]).src);
    $("#result").attr('src', "/assets/You_Lose.jpg");
    $("#title").text("You Lose!");
    $("#endgame").modal("show");
    $("#pb-1").animate({width: stats.new[3] + "%"}, 2500);
    $("#pb-2").animate({width: stats.new[4] + "%"}, 2500);
    $("#pb-3").animate({width: stats.new[5] + "%"}, 2500);
    $('#info1').text("Level:" +stats.old[0] + "->" + stats.new[0] + " Experience:" + s[0] + "->" + s[3] + " Points:" +stats.old[6] + "->" + stats.new[6] );
    $('#info2').text("Level:" +stats.old[1] + "->" + stats.new[1] + " Experience:" + s[1] + "->" + s[4] + " Points:" +stats.old[7] + "->" + stats.new[7]);
    $('#info3').text("Level:" +stats.old[2] + "->" + stats.new[2] + " Experience:" + s[2] + "->" + s[5] + " Points:" +stats.old[8] + "->" + stats.new[8]);
     console.log(stats.new);
     console.log(stats.old);
} 

function change(n)
{
    if($(n).hasClass( "fa-minus-square" ))
    {
         $(n).removeClass("fa-minus-square").addClass("fa-plus-square");
    }
  
   else
    {
         $(n).removeClass("fa-plus-square").addClass("fa-minus-square");
    }
    
}



function showCharacter(n,y,z)
{
    
    
    var b;
    var c;
    var d;
     var a = $(n).attr('data-character');
     var f = $(n).attr("id");
     
     
     
     switch(f)
     {
         case "c1":
        f = 1;
         break;
         
          case "c2":
             f=2;
         break;
         
          case "c3":
              f=3;
         break;
     }
     
  console.log(a);
    $('.character').contents().remove();
    $("#skill").contents().remove();
    $(".skillSelected").contents().remove();
    //$(skill).hide().fadeIn(1000);
    $("#skillavater").attr('src', "/ava/box.png");
$("#skilldescription").text(d);
$("#skillname").text("Skill Name");
$("#skillinfo").text("");
$("#skilldescription").text("Description");


 p1stats.hold = [0,0,0];

if(y)
{
    
    
 if($(".csa").hasClass( "blinkchange1" ))
 {
     $(".csa").removeClass( "blinkchange1" );
    
    
     a = clearSkills(f);
     
 }
     currentSkills(f);
      showSkills(a);
     
}

else
{
    $(".csa").addClass( "blinkchange1" );
     p1stats.ch = a;
    
    
}

   switch (a)
{
  

case "zGu":
b = "Cheerful, courageous and also a bit naive, Goku is a Saiyan originally sent to Earth as in infant with the mission to destroy it. However, an accident alters his memory,causing him to grow up pure-hearted and later become Earth's \ngreatest defender.";
c = "/assets/zGu.jpg";
d = "Goku (Z)";
break;

case "zKG":
b = "Gohan is the son of goku and may not resemble him in appearance but clearly shows it in fighting and his personality, Gohan has shown amazing potential at such a young age and his bravery is none the less.";
c = "/assets/zKG.jpg";
d = "Kid Gohan (Z)";
break;

case "zPo":
b = "A wise, expert strategist who was originally a ruthless enemy of Goku, Piccolo later becomes a permanent member of the Z Fighters during Dragon Ball Z.";
c = "/assets/zPo.jpg";
d = "Piccolo (Z)";
break;

case "zKn":
b = "Krillin is a bald, short guy but is also one of the stongest humans on Earth. Krillin determination in helping his friends and protecting the weak";
c = "/assets/zKn.jpg";
d = "Krillin (Z)";
break;

case "zYa":
b = "Yamcha is a human on planet earth and a Z fighter who aids goku and his friends in upcoming battles. He is cocky and arrogant but has ferocious abilities.";
c = "/assets/zYa.jpg";
d = "Yamcha (Z)";
break;

case "zRz":
b = "Raditz is the brother of goku but with completely different personalities,He's heartless and mocks weak enemies,He has a strong build and dangerous energy beams to destroy his opponents.";
c = "/assets/zRz.jpg";
d = "Raditz (Z)";
break;

case "zNa":
b = "Nappa is an elite Saiyan warrior from Planet Vegeta, and Vegeta's partner in combat. Nappa is destructive and cocky which makes him fight in a powerhouse style of fighting.";
c = "/assets/zNa.jpg";
d = "Nappa (Z)";
break;

case "zSn":
b = "Saibaman are green, humanoid creatures that grow from a planted seed placed in the ground.Saibamen possess only enough intelligence to understand orders and will do whatever it takes to kill there target. ";
c = "/assets/zSn.jpg";
d = "Saibaman (Z)";
break;

} //switch end

select.play();
  $(".characterID").hide().fadeIn(1000);
    $("#cText").text(b);
      $("#cAva").attr('src', c);
    $("#cName").text(d);
  
}

function showSkills(name){
  var  a, b,c;
  console.log(name);
    switch (name)
    
{

case "zGu":

genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zGu1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zGu1.jpg" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zGu2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zGu2.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zGu3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zGu3.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zGu-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zGu-t1.jpg" ></a> </div>');  
break;

case "zKG":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKG1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKG1.jpg" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKG2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKG2.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKG3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKG3.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKG-t1" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKG-t1.jpg" ></a> </div>');  
break;

case "zPo":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zPo1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zPo1.jpg" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zPo2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zPo2.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zPo3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zPo3.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-type="T" data-move="zPo-t1" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zPo-t1.jpg" ></a> </div>');  
break;

case "zYa":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zYa1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zYa1.jpg" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zYa2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zYa2.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zYa3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zYa3.jpg" ></a> </div>');  
break;

case "zKn":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKn1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKn1.jpg" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKn2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKn2.jpg" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="zKn3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/zKn3.jpg" ></a> </div>');
break;

case "zRz":
genericSkills(2);
break;

case "zNa":
genericSkills(2);
break;

case "zSn":
genericSkills(2);
break;
} //switch end

function genericSkills(n){
    switch(n){
        case 1:
        $("#skill").hide().fadeIn(1000);
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g1.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g2.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g3.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g4" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g4.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g5" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g5.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g6" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g6.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g7" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g7.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g8" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g8.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g9" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g9.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="ge-t" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/ge-t.jpg" ></a> </div>');  
        break;
        
        case 2:
            case 1:
        $("#skill").hide().fadeIn(1000);
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g1.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g2" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g2.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g3" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g3.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g4" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g4.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g6" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g6.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g7" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g7.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g8" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g8.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="g9" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/g9.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="ge1" data-type="S" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/ge1.jpg" ></a> </div>');  
        $("#skill").append('<div class="col-xs-3 col-lg-1"><a href="#" data-move="ge-t" data-type="T" onclick="skillD(this,false);return false;"><img class="img responsive img-thumbnail "  src="/assets/ge-t.jpg" ></a> </div>');  
        break;
    }
}

    
}

function skillD(n,t)

{
    var a = $(n).attr("data-move");
    var j = $(n).attr("id");
    var z = $(n).attr("data-type");
    t = Boolean(t);
    
    if(z === "true")
    {
        z = Boolean(z);
        
    }
    
    var b,c,d,e,f,g,h,i;
     console.log(Date());
    console.log("Z: " + z + " T:" + t);
   console.log(p1stats.hold);
  
    
    if(t === false && z === true && p1stats.hold[1] === true && p1stats.hold[2])
{
     
         console.log("Here in 1");
         $("#transform").removeClass( "blinkchange1" );
     $(".m1").removeClass( "blinkchange1" );
     $(".m2").removeClass( "blinkchange1" );
     $(".m3").removeClass( "blinkchange1" );
     $(".m4").removeClass( "blinkchange1" );
     a = updateSkills(j);
      p1stats.hold = [a,true,false];
    
     
     
}

else if(t && z === true && p1stats.hold[1] === false && p1stats.hold[2])
{
    console.log("Here in 2");
    
         $(".m1").removeClass( "blinkchange1" );
     $(".m2").removeClass( "blinkchange1" );
     $(".m3").removeClass( "blinkchange1" );
     $(".m4").removeClass( "blinkchange1" );
     $("#transform").removeClass( "blinkchange1" );
     a = updateSkills(j);
     p1stats.hold = [a,false,false];
     
    
     
}

else if (t === false  && z === "T")
{
    console.log("Here in 3");
    $("#transform").addClass( "blinkchange1" );
      $(".m1").removeClass( "blinkchange1" );
     $(".m2").removeClass( "blinkchange1" );
     $(".m3").removeClass( "blinkchange1" );
     $(".m4").removeClass( "blinkchange1" );
     p1stats.hold = [a,true,true,];
}

else if (t === false && z === "S" )
{
    console.log("Here in 4");
    $("#transform").removeClass( "blinkchange1" );
      $(".m1").addClass( "blinkchange1" );
     $(".m2").addClass( "blinkchange1" );
     $(".m3").addClass( "blinkchange1" );
     $(".m4").addClass( "blinkchange1" );
     p1stats.hold = [a,false,true];
}

else
{
   console.log("Error");
}

console.log("A: " + a);
    switch (a)
{
case "zGu1":
a ="/assets/zGu1.jpg";
b = 1;
c = 2;
d = "Goku lands a crushing blow to the enemy. One enemy will take 10 damage and there defense decrease by 20%.";
e = 20;
f = "Punishing Attack";
g = "Strength";
h = "Single-Enemy";
break;

case "zGu2":
a ="/assets/zGu2.jpg";
b = 2;
c = 1;
d = "Goku stores energy from around him and shoots it at an enemy. One enemy takes 25 damage and is stunned.";
e = 20;
f = "Spirit Bomb: Small";
g = "Ki";
h = "Single-Enemy";
break;

case "zGu3":
a ="/assets/zGu3.jpg";
b = 2;
c = 1;
d = "Using his signature attack, Goku will deal 15 damage to one enemy.";
e = 20;
f = "Kamehameha";
g = "Ki";
h = "Single-Enemy";
break;

case "zKG1":
a ="/assets/zKG1.jpg";
b = 1;
c = 1;
d = "Increases Gohan's BP gain by 1 for 2 turns.";
e = 20;
f = "Hidden Power";
g = "Power-Up";
h = "Self";
break;

case "zKG2":
a ="/assets/zKG2.jpg";
b = 1;
c = 1;
d = "Deals 15 damage to one enemy.";
e = 20;
f = "Masenko";
g = "Ki";
h = "Single-Enemy";
break;

case "zKG3":
a ="/assets/zKG3.jpg";
b = 2;
c = 1;
d = "Deals 20 damage to one enemy, but reduced Gohans defense by 5 the following turn.";
e = 20;
f = "Rushing Assualt";
g = "Strength";
h = "Single-Enemy";
break;

case "zPo1":
a ="/assets/zPo1.jpg";
b = 1;
c = 2;
d = "Piccolo strategically charges up his energy. Piccolo gains 20% more kai and gain 20 energy.";
e = 0;
f = "Charge";
g = "Power-Up";
h = "Self";
break;

case "zPo2":
a ="/assets/zPo2.jpg";
b = 1;
c = 2;
d = "Using one of his strongest techniques, Piccolo will deal 20 damage to one enemy.This lowers enemy defense by 10%.";
e = 20;
f = "Special Beam Cannon";
g = "Ki";
h = "Single-Enemy";
break;

case "zPo3":
a ="/assets/zPo3.jpg";
b = 2;
c = 4;
d = "Piccolo increases one player defense by 30% but goes down in defense 20%.";
e = 20;
f = "Risking It All For A Friend";
g = "Power-Up";
h = "Support";
break;

case "zYa1":
a ="/assets/zYa1.jpg";
b = 2;
c = 3;
d = "Deals 10 damage to one enemy. This skill lasts 3 turns and ends if Yamacha becomes invulnerable.";
e = 30;
f = "Wolf Fang Fist";
g = "Strength";
h = "Single-Enemy";
break;

case "zYa2":
a ="/assets/zYa2.jpg";
b = 1;
c = 1;
d = "Stuns one enemy and lowers their defense by 5 for 1 turn.";
e = 20;
f = "Suprise Attack";
g = "Strength";
h = "Single-Enemy";
break;

case "zYa3":
a ="/assets/zYa3.jpg";
b = 2;
c = 3;
d = "Deals 10 damage to one enemy. This skill lasts 3 turns and ends if Yamacha becomes invulnerable.";
e = 30;
f = "Spirit Ball";
g = "Ki";
h = "Single-Enemy";
break;

case "zKn1":
a ="/assets/zKn1.jpg";
b = 2;
c = 1;
d = "Targets one enemy, countering the first harmful skill they use for 1 turn.";
e = 15;
f = "High Velocity Kick";
g = "Strength";
h = "Single-Enemy";
break;

case "zKn2":
a ="/assets/zKn2.jpg";
b = 2;
c = 1;
d = "Deals 15 piercing damage to one enemy.";
e = 20;
f = "Destructo Disk";
g = "Ki";
h = "Single-Enemy";
break;

case "zKn3":
a ="/assets/zKn3.jpg";
b = 2;
c = 2;
d = "Deals 10 damage to all enemies.";
e = 30;
f = "Scattering Bullets";
g = "Ki";
h = "Multiple-Enemies";
break;

case "g1":
a = "/assets/g1.jpg";
b = 2;
c = 2;
d = "Permanently increases the characters defense by 5 points.";
e = 20;
f = "Afterimage";
g = "Defensive";
h = "Self";
break;

case "g2":
a = "/assets/g2.jpg";
b = 1;
c = 2;
d = "The target becomes invulnerable to the first enemy ki based skill used on them for 1 turn.";
e = 20;
f = "Energy Deflect";
g = "Defensive";
h = "Self";
break;

case "g3":
a = "/assets/g3.jpg";
b = 2;
c = 1;
d = "Deals strength and ki stats combined damage to one enemy.";
e = 20;
f = "Energy Punch";
g = "Strength/Ki";
h = "Single-Enemy";
break;

case "g4":
a = "/assets/g4.jpg";
b = 2;
c = 3;
d = "The target becomes invulnerable to all enemy skills for 1 turn.";
e = 20;
f = "Sonic Sway";
g = "Defensive";
h = "Self";
break;

case "g5":
a = "/assets/g5.jpg";
b = 2;
c = 2;
d = "Decreases the targets strength and defense by 5 points for 2 turns.";
e = 20;
f = "Solar Flare";
g = "Power-Down";
h = "Single-Enemy";
break;

case "g6":
a = "/assets/g6.jpg";
b = 1;
c = 0;
d = "This skill does 10 strength damage to one enemy.";
e = 10;
f = "Punch";
g = "Strength";
h = "Single-Enemy";
break;

case "g7":
a = "/assets/g7.jpg";
b = 1;
c = 2;
d = "The target becomes invulnerable to the first enemy strength skill used on them for one turn.";
e = 20;
f = "Physical-Block";
g = "Defensive";
h = "Self";
break;

case "g8":
a = "/assets/g8.jpg";
b = 1;
c = 0;
d = "Deals 10 damage to one enemy.";
e = 10;
f = "Ki-Blast";
g = "Ki";
h = "One-Enemy";
break;

case "g9":
a = "/assets/g9.jpg";
b = 2;
c = 1;
d = "Deals 5 damage to all enemies.";
e = 20;
f = "Explosive Wave";
g = "Ki/Defensive";
h = "Multiple-Enemies";
break;

case "ge1":
a = "/assets/ge1.jpg";
b = 1;
c = 1;
d = "This skill lowers enemy defense by 10%";
e = 20;
f = "Scouter";
g = "Power-Down";
h = "Single-Enemy";
break;

case "zGu-t1":
a = "/assets/zGu-t1.jpg";
b = 0;
c = 0;
d = "Goku turns Kaioken all stats increases by 0%.";
e = 20;
f = "Kaio-Ken";
g = "Transformation";
h = "Self";
break;

case "zKG-t1":
console.log("Working?");
a = "/assets/zKG-t1.jpg";
b = 0;
c = 0;
d = "Kid Gohan powers are unlocked.Ki increases by 30%.Strength increases by \n40%.Defense by 20%.";
e = 20;
f =  "Unlocked Potential";
g = "Transformation";
h = "Self";
break;

case "zPo-t1":
a = "/assets/zPo-t1.jpg";
b = 0;
c = 0;
d = "Piccolo fuses with Nail.Ki increases by 40%.Strength increases by 30%.\nDefense by 15%.";
e = 20;
f =  "Fuse With Nail";
g = "Transformation";
h = "Self";
break;

case "ge-t":
a = "/assets/ge-t.jpg";
b = 1;
c = 0;
d = "Increases the targets strength, ki, and defense by 5 points. Re-use of this skill while active will remove its current effects.";
e = 10;
f = "Power-Up";
g = "Transformation";
h = "Self";
break;

default:
a = "/ava/box.png";
b = 0;
c = 0;
d = "Description";
e = 0;
f = "none";
g = "none";
h = "none";


}//end switch



$(".sd").hide().fadeIn(1000);
$("#skillavater").attr('src', a);
$("#skilldescription").text(d);
$("#skillname").text(f);
$("#skillinfo").text("Energy:"+ e + " Cooldown:" + c + " BP:" + b + " Focus:" + h + " Type:" + g);


}

function currentSkills(z)
{
   console.log(z);
   z = parseInt(z);
   
   p1stats.current = z;
    switch(z)
    {
        case 1:
        $(".skillSelected").append('<div class="col-xs-3 col-md-2"><img id="SSA" class="img-thumbnail" src="'+queue.getItem(p1stats.c1).src+'"></div> ');
      $(".skillSelected").append('<a href="#" id="mt" data-move="' + p1stats.cS1[4] + '"  data-type="true" onclick="skillD(this,false);return false;"><div class="col-xs-3 col-md-2"><img id="transform" class="img-thumbnail mt" src="'+queue.getItem(p1stats.cS1[4]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m1" data-move="' + p1stats.cS1[0] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m1" id="move" src="'+queue.getItem(p1stats.cS1[0]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m2" data-move="' + p1stats.cS1[1] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m2" id="move" src="'+queue.getItem(p1stats.cS1[1]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m3" data-move="' + p1stats.cS1[2] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m3" id="move" src="'+queue.getItem(p1stats.cS1[2]).src+'"></div></a>');
   $(".skillSelected").append('<a href="#" id="m4" data-move="' + p1stats.cS1[3] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m4" id="move" src="'+queue.getItem(p1stats.cS1[3]).src+'"></div></a> ');
        break;
        
       case 2:
   $(".skillSelected").append('<div class="col-xs-3 col-md-2"><img id="SSA" class="img-thumbnail" src="'+queue.getItem(p1stats.c2).src+'"></div> ');
   $(".skillSelected").append('<a href="#" id="mt" data-move="' + p1stats.cS2[4] + '" data-type="true" onclick="skillD(this,false);return false;"><div class="col-xs-3 col-md-2 col-md-2"><img  id="transform" class="img-thumbnail mt" src="'+queue.getItem(p1stats.cS2[4]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m1" data-move="' + p1stats.cS2[0] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m1" id="move" src="'+queue.getItem(p1stats.cS2[0]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m2" data-move="' + p1stats.cS2[1] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m2" id="move" src="'+queue.getItem(p1stats.cS2[1]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m3" data-move="' + p1stats.cS2[2] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m3" id="move" src="'+queue.getItem(p1stats.cS2[2]).src+'"></div></a>');
   $(".skillSelected").append('<a href="#" id="m4" data-move="' + p1stats.cS2[3] + '"  data-type="true" onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m4" id="move" src="'+queue.getItem(p1stats.cS2[3]).src+'"></div></a> ');
        break;
        
        case 3:
   $(".skillSelected").append('<div class="col-xs-3 col-md-2"><img id="SSA" class="img-thumbnail" src="'+queue.getItem(p1stats.c3).src+'"></div> ');
   $(".skillSelected").append('<a href="#" id="mt" data-move="' + p1stats.cS3[4] + '" data-type="true" data-type="T"; onclick="skillD(this,false);return false;"><div class="col-xs-3 col-md-2"><img  id="transform" class="img-thumbnail mt" src="'+queue.getItem(p1stats.cS3[4]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m1" data-move="' + p1stats.cS3[0] + '" data-type="true" data-type="S"; onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m1" id="move" src="'+queue.getItem(p1stats.cS3[0]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m2" data-move="' + p1stats.cS3[1] + '" data-type="true" data-type="S"; onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m2" id="move"src="'+queue.getItem(p1stats.cS3[1]).src+'"></div></a> ');
   $(".skillSelected").append('<a href="#" id="m3" data-move="' + p1stats.cS3[2] + '" data-type="true" data-type="S"; onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m3" id="move" src="'+queue.getItem(p1stats.cS3[2]).src+'"></div></a>');
   $(".skillSelected").append('<a href="#" id="m4" data-move="' + p1stats.cS3[3] + '" data-type="true" data-type="S"; onclick="skillD(this,true);return false;"><div class="col-xs-3 col-md-2"><img class="img-thumbnail m4" id="move" src="'+queue.getItem(p1stats.cS3[3]).src+'"></div></a> ');
        break;
    }
   

   
}

function clearSkills(num)
{
    num = parseInt(num);
    select.play();
    var fake;
   
   if (num === 1)
{
    fake = p1stats.c1;
p1stats.c1 = p1stats.ch;
   $(".c1").attr('src', queue.getItem(p1stats.c1).src);
$("#c1").attr('data-character', p1stats.c1);
 p1stats.cS1 = ["g1","g8","g3","g4","ge-t"];
    
    switch(p1stats.c1)
    {
        case p1stats.c2:
        p1stats.c2 = fake;
    $(".c2").attr('src', queue.getItem(p1stats.c2).src);
    $("#c2").attr('data-character', p1stats.c2);
    p1stats.cS2 = ["g1","g8","g3","g4","ge-t"];
        break;
        
        case p1stats.c3:
      p1stats.c3 = fake;
    $(".c3").attr('src', queue.getItem(p1stats.c3).src);
    $("#c3").attr('data-character', p1stats.c3);
    p1stats.cS3 = ["g1","g8","g3","g4","ge-t"];
        break;
    }
}

else if (num === 2 && p1stats.c2 !== p1stats.hold[0])
{
     fake = p1stats.c2;
p1stats.c2 = p1stats.ch;
   $(".c2").attr('src', queue.getItem(p1stats.c2).src);
$("#c2").attr('data-character', p1stats.c2);
p1stats.cS2 = ["g1","g8","g3","g4","ge-t"];
    
     switch(p1stats.c2)
    {
        case p1stats.c1:
    
        p1stats.c1 = fake;
    $(".c1").attr('src', queue.getItem(p1stats.c1).src);
    $("#c1").attr('data-character', p1stats.c1);
    p1stats.cS1 = ["g1","g8","g3","g4","ge-t"];
        break;
        
        case p1stats.c3:
    
      p1stats.c3 = fake;
    $(".c3").attr('src', queue.getItem(p1stats.c3).src);
    $("#c3").attr('data-character', p1stats.c3);
      p1stats.cS3 = ["g1","g8","g3","g4","ge-t"]; 
        break;
    }
}

else if (num === 3 && p1stats.c3 !== p1stats.hold[0])
{
   fake = p1stats.c3;
p1stats.c3 = p1stats.ch;
   $(".c3").attr('src', queue.getItem(p1stats.c3).src);
    $("#c3").attr('data-character', p1stats.c3);
    p1stats.cS3 = ["g1","g8","g3","g4","ge-t"];
     switch(p1stats.c3)
    {
      case p1stats.c1:
   p1stats.c1 = fake;
    $(".c1").attr('src', queue.getItem(p1stats.c1).src);
    $("#c1").attr('data-character', p1stats.c1);
    p1stats.cS1 = ["g1","g8","g3","g4","ge-t"];
        break;
        
        case p1stats.c2:
        p1stats.c2 = fake;
    $(".c2").attr('src', queue.getItem(p1stats.c2).src);
    $("#c2").attr('data-character', p1stats.c2);
    p1stats.cS2 = ["g1","g8","g3","g4","ge-t"];
        break;
        
    }
}

else
{
    console.log("I'm Lazy...");
   
}


    
    return p1stats.hold[0];
    
}

function updateSkills(num)
{
    var n;
    console.log(num);
    
    switch(num)
    {
        case "m1":
        n = 1;
        break;
        
        case "m2":
        n = 2;
        break;
        
        case "m3":
        n = 3;
        break;
        
        case "m4":
        n = 4;
        break;
        
        case "mt":
        n = 5;
        break;
    
    }
    
    var newArray;
    var num = p1stats.hold[0];
    console.log("Click: " + p1stats.hold[1]);
    if(p1stats.hold[1])
    {
        console.log("Click: " + p1stats.hold);
        console.log("num: " + num);
        switch(p1stats.current)
        {
            case 1:
            p1stats.cS1[4] = num;
            $(".mt").attr('src', queue.getItem(p1stats.cS1[4]).src);
    $("#mt").attr('data-move', p1stats.cS1[4]);
            break;
            
            case 2:
            p1stats.cS2[4] = num;
            $(".mt").attr('src', queue.getItem(p1stats.cS2[4]).src);
    $("#mt").attr('data-move', p1stats.cS2[4]);
            break;
            
            case 3:
            p1stats.cS3[4] = num;
            $(".mt").attr('src', queue.getItem(p1stats.cS3[4]).src);
    $("#mt").attr('data-move', p1stats.cS3[4]);
            break;
        }
    }
    else{
switch(p1stats.current){
    case 1:
    switch(p1stats.cS1.indexOf(num))
    {
        case -1:
        p1stats.cS1[n-1] = num;
        newArray = p1stats.cS1;
        break;
        
        case 0:
        p1stats.cS1[0] = p1stats.cS1[n-1];
        p1stats.cS1[n-1] = num;
        newArray = p1stats.cS1;    
        break;
        
        case 1:
        p1stats.cS1[1] = p1stats.cS1[n-1];
        p1stats.cS1[n-1] = num;
        newArray = p1stats.cS1;       
        break;
        
        case 2:
        p1stats.cS1[2] = p1stats.cS1[n-1];
        p1stats.cS1[n-1] = num;
        newArray = p1stats.cS1;       
        break;
        case 3:
        p1stats.cS1[3] = p1stats.cS1[n-1];
        p1stats.cS1[n-1] = num;
        newArray = p1stats.cS1;       
        break;
       
    }
    $(".m1").attr('src', queue.getItem(p1stats.cS1[0]).src);
    $("#m1").attr('data-move', p1stats.cS1[0]);

$(".m2").attr('src', queue.getItem(p1stats.cS1[1]).src);
    $("#m2").attr('data-move', p1stats.cS1[1]);

$(".m3").attr('src', queue.getItem(p1stats.cS1[2]).src);
    $("#m3").attr('data-move', p1stats.cS1[2]);

$(".m4").attr('src', queue.getItem(p1stats.cS1[3]).src);
    $("#m4").attr('data-move', p1stats.cS1[3]);

    break;
    //moo
    case 2:
    switch(p1stats.cS2.indexOf(num))
    {
        case -1:
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;
        break;
        
        case 0:
        p1stats.cS2[0] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;    
        break;
        
        case 1:
        p1stats.cS2[1] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
        
        case 2:
        p1stats.cS2[2] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
        case 3:
        p1stats.cS2[3] = p1stats.cS2[n-1];
        p1stats.cS2[n-1] = num;
        newArray = p1stats.cS2;       
        break;
    
    }
    $(".m1").attr('src', queue.getItem(p1stats.cS2[0]).src);
    $("#m1").attr('data-move', p1stats.cS2[0]);

$(".m2").attr('src', queue.getItem(p1stats.cS2[1]).src);
    $("#m2").attr('data-move', p1stats.cS2[1]);

$(".m3").attr('src', queue.getItem(p1stats.cS2[2]).src);
    $("#m3").attr('data-move', p1stats.cS2[2]);

$(".m4").attr('src', queue.getItem(p1stats.cS2[3]).src);
    $("#m4").attr('data-move', p1stats.cS2[3]);


    break;
    
    case 3:
     switch(p1stats.cS3.indexOf(num))
    {
         case -1:
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;
        break;
        
        case 0:
        p1stats.cS3[0] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;    
        break;
        
        case 1:
        p1stats.cS3[1] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
        
        case 2:
        p1stats.cS3[2] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
        case 3:
        p1stats.cS3[3] = p1stats.cS3[n-1];
        p1stats.cS3[n-1] = num;
        newArray = p1stats.cS3;       
        break;
       
    }
    $(".m1").attr('src', queue.getItem(p1stats.cS3[0]).src);
    $("#m1").attr('data-move', p1stats.cS3[0]);

$(".m2").attr('src', queue.getItem(p1stats.cS3[1]).src);
    $("#m2").attr('data-move', p1stats.cS3[1]);

$(".m3").attr('src', queue.getItem(p1stats.cS3[2]).src);
    $("#m3").attr('data-move', p1stats.cS3[2]);

$(".m4").attr('src', queue.getItem(p1stats.cS3[3]).src);
    $("#m4").attr('data-move', p1stats.cS3[3]);

    break;

}
}





return p1stats.hold[0];
  
}

function cancel2(num1)
{
    if (num1 == 1)
    {console.log("NOOOOOO");
  stage.removeChild(endTurnImage); 
stage.removeChild(box); 

stage.removeChild(done);   
}

else 
{
    console.log("Nope");
  stage.removeChild(done);  
}
}



foundMatch = function()
{
    
   var data = {
    images: [queue.getResult('found')],
    frames: {width:320, height:179},
    animations: {
        run:[1,23],
    }
};
var spriteSheet = new createjs.SpriteSheet(data);
var animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = 380;
 animation.y = 150;
 stage.addChild(animation);

stage.removeChild(cancelbutton); 

this.info = new createjs.Text("Found Match!", "20px Arial", "white");
    info.x = 470;
    info.y = 125;
    stage.addChild(info);
    
stage.setChildIndex( h_load, stage.getNumChildren()-1);

cancel2(2);
done.removeEventListener("click",function() {cancel2(1); });

};

function mainMenu()
{ var teamc = user.team;
var skill1 = JSON.parse(user.skill1);
var skill2 = JSON.parse(user.skill2);
var skill3 = JSON.parse(user.skill3);
user.uc = JSON.parse(user.uc);
user.us = JSON.parse(user.us);



p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false],stats:"",statshold:[false]};
console.log(user.avater);

$(".characterSelection").append('<div class="col-xs-3"><a href="#" onclick="showAvater(); return false;"><img class="img-thumbnail center-block" src="'+ user.avater+ '"></div> </a>'); 
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c1"  onclick="mainSkills(1);return false;"><img  class="img-thumbnail center-block" src="'+ queue.getItem(p1stats.c1).src+ '"></div> </a>');
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c2"  onclick="mainSkills(2);return false;"><img   class="img-thumbnail center-block" src="'+ queue.getItem(p1stats.c2).src+ '"></div> </a>'); 
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c3"  onclick="mainSkills(3);return false;"><img   class="img-thumbnail center-block" src="'+ queue.getItem(p1stats.c3).src+ '"></div> </a>'); 


$(".skill").append('<div class="col-md-2 col-md-offset-1 col-xs-3"><img class="img-thumbnail center-block c1" src="/ava/box.png"></div> ');
$(".skill").append('<div class="col-md-2 col-xs-3"><img class="img-thumbnail center-block c2" src="/ava/box.png"></div>'); 
$(".skill").append('<div class="col-md-2 col-xs-3"><img class="img-thumbnail center-block c3" src="/ava/box.png"></div>');     
$(".skill").append('<div class="col-md-2 col-xs-3"><img class="img-thumbnail center-block c4" src="/ava/box.png"></div>');
$(".skill").append('<div class="col-md-2 col-xs-3"><img class="img-thumbnail center-block c5" src="/ava/box.png"></div>'); 
    

}
function mainSkills(num)
{
    switch(num)
    {
        case 1:
        $('.c1').attr('src',queue.getItem(p1stats.cS1[0]).src);
        $('.c2').attr('src',queue.getItem(p1stats.cS1[1]).src);
        $('.c3').attr('src',queue.getItem(p1stats.cS1[2]).src);
        $('.c4').attr('src',queue.getItem(p1stats.cS1[3]).src);
        $('.c5').attr('src',queue.getItem(p1stats.cS1[4]).src);
        break;
        
        case 2:
        $('.c1').attr('src',queue.getItem(p1stats.cS2[0]).src);
        $('.c2').attr('src',queue.getItem(p1stats.cS2[1]).src);
        $('.c3').attr('src',queue.getItem(p1stats.cS2[2]).src);
        $('.c4').attr('src',queue.getItem(p1stats.cS2[3]).src);
        $('.c5').attr('src',queue.getItem(p1stats.cS2[4]).src);    
        break;
        
        case 3:
        $('.c1').attr('src',queue.getItem(p1stats.cS3[0]).src);
        $('.c2').attr('src',queue.getItem(p1stats.cS3[1]).src);
        $('.c3').attr('src',queue.getItem(p1stats.cS3[2]).src);
        $('.c4').attr('src',queue.getItem(p1stats.cS3[3]).src);
        $('.c5').attr('src',queue.getItem(p1stats.cS3[4]).src);
        break;
    }
}

function Team()
{
 
 console.log("Main Menu");
//stage.removeAllChildren();
//stage.removeAllEventListeners();
//stage.enableMouseOver(10);
//$("#slider").show();

var teamc = user.team;
 console.log(user);
var skill1 = JSON.parse(user.skill1);
var skill2 = JSON.parse(user.skill2);
var skill3 = JSON.parse(user.skill3);
p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false]};
console.log(p1stats);

$(".select").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Saiyan"><a href="#" data-character="zGu" onclick="showCharacter(this,false);return false;" ><img class="img responsive img-thumbnail "  src="/assets/zGu.jpg" ></a></div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Namekian"><a href="#" data-character="zPo" onclick="showCharacter(this,false);return false;"><img class="img responsive img-thumbnail"   src="/assets/zPo.jpg" ></a></div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Saiyan,Human"><a href="#" data-character="zKG" onclick="showCharacter(this,false);return false;"><img class="img responsive img-thumbnail"   src="/assets/zKG.jpg" ></a></div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Human"><a href="#" data-character="zYa" onclick="showCharacter(this,false);return false;"><img class="img responsive img-thumbnail"   src="/assets/zYa.jpg" ></a></div>');
$(".select").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Human"><a href="#" data-character="zKn" onclick="showCharacter(this,false);return false;"><img class="img responsive img-thumbnail"   src="/assets/zKn.jpg" ></a></div>');

$(".characterSelection").append('<div class="col-xs-3"><a href="#" onclick="showAvater(); return false;"><img class="img-thumbnail center-block" src="'+ user.avater+ '"></div> </a>'); 
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c1" data-character="'+p1stats.c1+'" onclick="showCharacter(this,true);return false;"><img  class="img-thumbnail center-block c1 csa" src="'+ queue.getItem(p1stats.c1).src+ '"></div> </a>');
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c2" data-character="'+p1stats.c2+'" onclick="showCharacter(this,true);return false;"><img   class="img-thumbnail center-block c2 csa" src="'+ queue.getItem(p1stats.c2).src+ '"></div> </a>'); 
$(".characterSelection").append('<div class="col-xs-3"><a href="#" id="c3" data-character="'+p1stats.c3+'" onclick="showCharacter(this,true);return false;"><img   class="img-thumbnail center-block c3 csa" src="'+ queue.getItem(p1stats.c3).src+ '"></div> </a>'); 

$('div.tagsort-tags-container').tagSort({
  selector: '.item-to-tag',

});
}

function character()
{
var teamc = user.team;
var skill1 = JSON.parse(user.skill1);
var skill2 = JSON.parse(user.skill2);
var skill3 = JSON.parse(user.skill3);
p1stats = {c1:teamc[0],c2:teamc[1],c3:teamc[2], a:true,cS1:skill1,cS2:skill2,cS3:skill3,current:0,hold:[null,null,false]};
$(".characters").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Saiyan"><a href="#" id="zGu" onclick="statsCharacter(this);return false;" ><img class="img responsive img-thumbnail "  src="/assets/zGu.jpg" ></a></div>');
$(".characters").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Namekian"><a href="#" id="zPo" onclick="statsCharacter(this);return false;"><img class="img responsive img-thumbnail"   src="/assets/zPo.jpg" ></a></div>');
$(".characters").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Saiyan,Human"><a href="#" id="zKG" onclick="statsCharacter(this);return false;"><img class="img responsive img-thumbnail"   src="/assets/zKG.jpg" ></a></div>');
$(".characters").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Human"><a href="#" id="zYa" onclick="statsCharacter(this);return false;"><img class="img responsive img-thumbnail"   src="/assets/zYa.jpg" ></a></div>');
$(".characters").append('<div class="item-to-tag col-xs-3 col-sm-1" data-item-tags="Hero,Human"><a href="#" id="zKn" onclick="statsCharacter(this);return false;"><img class="img responsive img-thumbnail"   src="/assets/zKn.jpg" ></a></div>');

	setTimeout(showcanvas,500);
	function showcanvas()
	{
	 var radarChartData = {
		labels: ["Strength", "Ki", "Defense","Speed"],
		datasets: [
		
			{
				label: "Stats",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [0,0,0,0]
			}
		]
	};
	 var stats= document.getElementById("canvas").getContext("2d");
    statsInfo = new Chart(stats).Radar(radarChartData,{
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 30,
    scaleStartValue: 0,
});
        
	}    
    
}

function statsCharacter(n)
{
    if (typeof n === 'string')
    {
        var name = n;
    }
    else
    {
      var name = $(n).attr("id");  
    }
    
    var stats;
    p1stats.statshold = [0,0,0,0,0];
    $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
    switch(name)
    {
        case "zGu":
       $("#cimage").attr("src","/assets/zGu.jpg");
       stats =  JSON.parse(user.stats.zGu);
       statsInfo.datasets[0].points[0].value = stats[0];
       statsInfo.datasets[0].points[1].value = stats[1];
       statsInfo.datasets[0].points[2].value = stats[2];
       statsInfo.datasets[0].points[3].value = stats[3];
       statsInfo.update();
       $("#points").text(stats[8]);
       p1stats.stats = name;
       p1stats.statshold[5] = stats[8];
        break;
        
        case "zPo":
        $("#cimage").attr("src","/assets/zPo.jpg");  
       stats =  JSON.parse(user.stats.zPo);
       statsInfo.datasets[0].points[0].value = stats[0];
       statsInfo.datasets[0].points[1].value = stats[1];
       statsInfo.datasets[0].points[2].value = stats[2];
       statsInfo.datasets[0].points[3].value = stats[3];
       statsInfo.update();
       $("#points").text(stats[8]);
       p1stats.stats = name;
       p1stats.statshold[5] = stats[8];
        break;
        
        case "zKG":
        stats =  JSON.parse(user.stats.zKG);
       statsInfo.datasets[0].points[0].value = stats[0];
       statsInfo.datasets[0].points[1].value = stats[1];
       statsInfo.datasets[0].points[2].value = stats[2];
       statsInfo.datasets[0].points[3].value = stats[3];
       statsInfo.update();
        $("#cimage").attr("src","/assets/zKG.jpg");
        $("#points").text(stats[8]);
        p1stats.stats = name;
        p1stats.statshold[5] = stats[8];
        break;
        
        case "zYa":
         stats =  JSON.parse(user.stats.zYa);
       statsInfo.datasets[0].points[0].value = stats[0];
       statsInfo.datasets[0].points[1].value = stats[1];
       statsInfo.datasets[0].points[2].value = stats[2];
       statsInfo.datasets[0].points[3].value = stats[3];
       statsInfo.update();
        $("#cimage").attr("src","/assets/zYa.jpg");
        $("#points").text(stats[8]);
        p1stats.stats = name;
        p1stats.statshold[5] = stats[8];
        break;
        
        case "zKn":
          stats =  JSON.parse(user.stats.zKn);
       statsInfo.datasets[0].points[0].value = stats[0];
       statsInfo.datasets[0].points[1].value = stats[1];
       statsInfo.datasets[0].points[2].value = stats[2];
       statsInfo.datasets[0].points[3].value = stats[3];
       statsInfo.update();
        $("#cimage").attr("src","/assets/zKn.jpg");
        $("#points").text(stats[8]);
        p1stats.stats = name;
        p1stats.statshold[5] = stats[8];
        break;
    }
}

function points(n)
{
  var a = $(n).attr("id"); //Move type: Strength
  var b = $(n).attr("id2"); //Add or Minus
  a = parseInt(a);
  

  if(p1stats.statshold === undefined)
  {
      b = null;
  }
 
   
   if(b === "true")
   {
       switch(a)
       {
           case 1:
           if (p1stats.statshold[5] !== 0)
           {
               p1stats.statshold[0] += 1;
               p1stats.statshold[5] -= 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
               
           }
           break;
           
           case 2:
           if (p1stats.statshold[5]  !== 0)
           {
                p1stats.statshold[1] += 1;
                p1stats.statshold[5] -= 1;
               $("#points").text(p1stats.statshold[5]);
                $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           
           case 3:
           if (p1stats.statshold[5]  !== 0)
           {
                p1stats.statshold[2] += 1;
                p1stats.statshold[5] -= 1;
                $("#points").text(p1stats.statshold[5]);
                $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
           }
           break;
       }
   }
   
   else if (b === "false")
   {
       switch(a)
       {
           case 5:
           if (p1stats.statshold[0] > 0)
           {
               p1stats.statshold[0] -= 1;
               p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
               
           }
           break;
           
           case 6:
           if (p1stats.statshold[1] > 0)
           {
                p1stats.statshold[1] -= 1;
                p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           
           case 7:
           if (p1stats.statshold[2] > 0)
           {
                p1stats.statshold[2] -= 1;
                p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] + " Ki:" + p1stats.statshold[1] + " Defense:" + p1stats.statshold[2] + " Speed:"+ p1stats.statshold[3]);
           }
           break;
       }
   }
   
   else
   {
       console.log("Fail?");
   }
   
   
}

function upgrade()
{
    var file = { action: "upgrade", c: p1stats.stats, s: p1stats.statshold};
ws.send(JSON.stringify(file)); 
}
//Function is for the main game
 function gameLoop() //num
{

//background.stop();
    stage.removeAllChildren();
stage.removeAllEventListeners();


var c = user.team;

var skill1 = JSON.parse(user.skill1);
var skill2 = JSON.parse(user.skill2);
var skill3 = JSON.parse(user.skill3);
var p1character1 = {c: c[0],moveUsed:0, attacked:false, cooldown:JSON.parse(start.y_c1_cooldown),skills:skill1, active:false, targeted:-1, order:-1, stunned:JSON.parse(start.y_c1_stunned)};
var p1character2 ={c: c[1],moveUsed:0, attacked:false, cooldown:JSON.parse(start.y_c2_cooldown), skills:skill2, active:false, targeted:-1, order:-1, stunned:JSON.parse(start.y_c2_stunned)};
var p1character3 ={c: c[2],moveUsed:0, attacked:false, cooldown:JSON.parse(start.y_c3_cooldown), skills:skill3, active:false, targeted:-1, order:-1, stunned:JSON.parse(start.y_c3_stunned)};
var p1effects1 = JSON.parse(start.y_c1_effect);
var p1effects2 = JSON.parse(start.y_c2_effect);
var p1effects3 = JSON.parse(start.y_c3_effect);
var p2effects1 = JSON.parse(start.o_c1_effect);
var p2effects2 = JSON.parse(start.o_c2_effect);
var p2effects3 = JSON.parse(start.o_c3_effect);
start.o_c1_block = JSON.parse(start.o_c1_block);
start.o_c2_block = JSON.parse(start.o_c2_block);
start.o_c3_block = JSON.parse(start.o_c3_block);
start.y_c1_experience = JSON.parse(start.y_c1_experience);
start.y_c2_experience = JSON.parse(start.y_c2_experience);
start.y_c3_experience = JSON.parse(start.y_c3_experience);
start.o_c1_experience = JSON.parse(start.o_c1_experience);
start.o_c2_experience = JSON.parse(start.o_c2_experience);
start.o_c3_experience = JSON.parse(start.o_c3_experience);
console.log(start.y_c1_experience);
console.log(start.y_c1_experience[0]);

/*
     *      Create a timer that updates once per second
     *
     */

    gameTimer = setInterval(updateTime, 1000);


  var doneNow; 
    var desiredW2 = 24;
    var desiredW3 = 20;
    
var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage2"));
    stage.addChild(backgroundImage);
    stage.addChild(timerText);

var descriptionText1;


var volume = .5;

//Character Objects



//Current Character Box
var currentBox;


var p1C1BoxUsed = [-1,-1,-1,-1];
var p1C2BoxUsed = [-1,-1,-1,-1];
var p1C3BoxUsed = [-1,-1,-1,-1];
var p2C1BoxUsed = [-1,-1,-1,-1];
var p2C2BoxUsed = [-1,-1,-1,-1];
var p2C3BoxUsed = [-1,-1,-1,-1];


//Use this for hitboxes for character and moves
var hitArea6 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,77,77));  
var hitArea7 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,26,26));   
//Player Two character boxes!

var p1Ch1e = [];
var p1Ch2e = [];
var p1Ch3e = [];
var p2Ch1e = [];
var p2Ch2e = [];
var p2Ch3e = [];

//Player Two character 
//Kill DOg

    
//------------------------------------------------------
var x = 555;
var y = 625;
for (var i = 0, len = p1effects1.length; i < len; i++) {
  p1Ch1e[i] = new createjs.Bitmap(queue.getResult(p1effects1[i]));
p1Ch1e[i].x = x;
p1Ch1e[i].y = y;
p1Ch1e[i].scaleX = p1Ch1e[i].scaleY = desiredW3 / 75;
p1Ch1e[i].hitArea = hitArea7;
p1Ch1e[i].cursor= "pointer";
  stage.addChild(p1Ch1e[i]);
  p1Ch1e[i].addEventListener("click",function(){showEffect(p1effects1[i])}); 
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
x = 770;
y = 625;
for ( i = 0, len = p1effects2.length; i < len; i++) {
    p1Ch2e[i] = new createjs.Bitmap(queue.getResult(p1effects2[i]));
p1Ch2e[i].x = x;
p1Ch2e[i].y = y;
p1Ch2e[i].scaleX = p1Ch2e[i].scaleY = desiredW3 / 75;
p1Ch2e[i].hitArea = hitArea7;
p1Ch2e[i].cursor= "pointer";
  stage.addChild(p1Ch2e[i]);
  p1Ch2e[i].addEventListener("click",function(){showEffect(p1effects2[i])});
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
x = 985;
y = 625;
for (i = 0, len = p1effects3.length; i < len; i++) {
      p1Ch3e[i] = new createjs.Bitmap(queue.getResult(p1effects3[i]));
p1Ch3e[i].x = x;
p1Ch3e[i].y = y;
p1Ch3e[i].scaleX = p1Ch3e[i].scaleY = desiredW3 / 75;
p1Ch3e[i].hitArea = hitArea7;
p1Ch3e[i].cursor= "pointer";
  stage.addChild(p1Ch3e[i]);
  p1Ch3e[i].addEventListener("click",function(){showEffect(p1effects3[i])});
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
x = 130;
y = 48;
for (var i = 0, len = p2effects1.length; i < len; i++) {
    p2Ch1e[i] = new createjs.Bitmap(queue.getResult(p2effects1[i]));
p2Ch1e[i].x = x;
p2Ch1e[i].y = y;
p2Ch1e[i].scaleX = p2Ch1e[i].scaleY = desiredW3 / 75;
p2Ch1e[i].hitArea = hitArea7;
p2Ch1e[i].cursor= "pointer";
  stage.addChild(p2Ch1e[i]);
  p2Ch1e[i].addEventListener("click",function(){showEffect(p2effects1[i])});
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
x =345;
y = 48;
for (i = 0, len = p2effects2.length; i < len; i++) {
    p2Ch2e[i] = new createjs.Bitmap(queue.getResult(p2effects2[i]));
p2Ch2e[i].x = x;
p2Ch2e[i].y = y;
p2Ch2e[i].scaleX = p2Ch2e[i].scaleY = desiredW3 / 75;
p2Ch2e[i].hitArea = hitArea7;
p2Ch2e[i].cursor= "pointer";
  stage.addChild(p2Ch2e[i]);
  p2Ch2e[i].addEventListener("click",function(){showEffect(p2effects2[i])});
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
x =556;
y = 48;
for (i = 0, len = p2effects3.length; i < len; i++) {
    p2Ch3e[i] = new createjs.Bitmap(queue.getResult(p2effects3[i]));
p2Ch3e[i].x = x;
p2Ch3e[i].y = y;
p2Ch3e[i].scaleX = p2Ch3e[i].scaleY = desiredW3 / 75;
p2Ch3e[i].hitArea = hitArea7;
p2Ch3e[i].cursor= "pointer";
  stage.addChild(p2Ch3e[i]);
  p2Ch3e[i].addEventListener("click",function(){showEffect(p2effects3[i])});
if (i % 2 == 0)
{
   y += 25; 
}
else
{
   x += 25; 
   y -= 25; 
}
}
//------------------------------------------------

if (start.turn === 0)
{
    phealth1[0] = start.y_c1_health;
    phealth1[1] = start.y_c2_health;
    phealth1[2] = start.y_c3_health;
    phealth2[0] = start.o_c1_health;
    phealth2[1] = start.o_c2_health;
    phealth2[2] = start.o_c3_health;
    penergy1[0] = start.y_c1_energy;
    penergy1[1] = start.y_c2_energy;
    penergy1[2] = start.y_c3_energy;
    penergy2[0] = start.o_c1_energy;
    penergy2[1] = start.o_c2_energy;
    penergy2[2] = start.o_c3_energy;
    phealth1[3] = start.y_c1_health;
    phealth1[4] = start.y_c2_health;
    phealth1[5] = start.y_c3_health;
    phealth2[3] = start.o_c1_health;
    phealth2[4] = start.o_c2_health;
    phealth2[5] = start.o_c3_health;
    penergy1[3] = start.y_c1_energy;
    penergy1[4] = start.y_c2_energy;
    penergy1[5] = start.y_c3_energy;
    penergy2[3] = start.o_c1_energy;
    penergy2[4] = start.o_c2_energy;
    penergy2[5] = start.o_c3_energy;
    
}

var p1c1actionbox1 = new createjs.Shape();
    p1c1actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(555, 625, 20, 20);
    stage.addChild(p1c1actionbox1);

var p1c1actionbox2 = new createjs.Shape();
    p1c1actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(555, 650, 20, 20);
    stage.addChild(p1c1actionbox2);

var p1c1actionbox3 = new createjs.Shape();
    p1c1actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(580, 625, 20, 20);
    stage.addChild(p1c1actionbox3);
    
var p1c1actionbox4 = new createjs.Shape();
    p1c1actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(580, 650, 20, 20);
    stage.addChild(p1c1actionbox4);

var p1c1actionbox5 = new createjs.Shape();
    p1c1actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(605, 625, 20, 20);
    stage.addChild(p1c1actionbox5);   

var p1c1actionbox6 = new createjs.Shape();
    p1c1actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(605, 650, 20, 20);
    stage.addChild(p1c1actionbox6);   

//Player 1 boxes 2
var p1c2actionbox1 = new createjs.Shape();
    p1c2actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(770, 625, 20, 20);
    stage.addChild(p1c2actionbox1);

var p1c2actionbox2 = new createjs.Shape();
    p1c2actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(770, 650, 20, 20);
    stage.addChild(p1c2actionbox2);

var p1c2actionbox3 = new createjs.Shape();
    p1c2actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(795, 625, 20, 20);
    stage.addChild(p1c2actionbox3);
    
var p1c2actionbox4 = new createjs.Shape();
    p1c2actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(795, 650, 20, 20);
    stage.addChild(p1c2actionbox4);

var p1c2actionbox5 = new createjs.Shape();
    p1c2actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(820, 625, 20, 20);
    stage.addChild(p1c2actionbox5);   

var p1c2actionbox6 = new createjs.Shape();
    p1c2actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(820, 650, 20, 20);
    stage.addChild(p1c2actionbox6);
    
//Player 1 boxes 3
var p1c3actionbox1 = new createjs.Shape();
    p1c3actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(985, 625, 20, 20);
    stage.addChild(p1c3actionbox1);

var p1c3actionbox2 = new createjs.Shape();
    p1c3actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(985, 650, 20, 20);
    stage.addChild(p1c3actionbox2);

var p1c3actionbox3 = new createjs.Shape();
    p1c3actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(1010, 625, 20, 20);
    stage.addChild(p1c3actionbox3);
    
var p1c3actionbox4 = new createjs.Shape();
    p1c3actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(1010, 650, 20, 20);
    stage.addChild(p1c3actionbox4);

var p1c3actionbox5 = new createjs.Shape();
    p1c3actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(1035, 625, 20, 20);
    stage.addChild(p1c3actionbox5);   

var p1c3actionbox6 = new createjs.Shape();
    p1c3actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(1035, 650, 20, 20);
    stage.addChild(p1c3actionbox6);

   //Player 2 boxes 1
var p2c1actionbox1 = new createjs.Shape();
    p2c1actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(130, 48, 20, 20);
    stage.addChild(p2c1actionbox1);

var p2c1actionbox2 = new createjs.Shape();
    p2c1actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(130, 73, 20, 20);
    stage.addChild(p2c1actionbox2);

var p2c1actionbox3 = new createjs.Shape();
    p2c1actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(155, 48, 20, 20);
    stage.addChild(p2c1actionbox3);
    
var p2c1actionbox4 = new createjs.Shape();
    p2c1actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(155, 73, 20, 20);
    stage.addChild(p2c1actionbox4);

var p2c1actionbox5 = new createjs.Shape();
    p2c1actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(180, 48, 20, 20);
    stage.addChild(p2c1actionbox5);   

var p2c1actionbox6 = new createjs.Shape();
    p2c1actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(180, 73, 20, 20);
    stage.addChild(p2c1actionbox6);   
    
   
    //Player 2 boxes 2
var p2c2actionbox1 = new createjs.Shape();
    p2c2actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(345, 48, 20, 20);
    stage.addChild(p2c2actionbox1);

var p2c2actionbox2 = new createjs.Shape();
    p2c2actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(345, 73, 20, 20);
    stage.addChild(p2c2actionbox2);

var p2c2actionbox3 = new createjs.Shape();
    p2c2actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(370, 48, 20, 20);
    stage.addChild(p2c2actionbox3);
    
var p2c2actionbox4 = new createjs.Shape();
    p2c2actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(370, 73, 20, 20);
    stage.addChild(p2c2actionbox4);

var p2c2actionbox5 = new createjs.Shape();
    p2c2actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(395, 48, 20, 20);
    stage.addChild(p2c2actionbox5);   

var p2c2actionbox6 = new createjs.Shape();
    p2c2actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(395, 73, 20, 20);
    stage.addChild(p2c2actionbox6);   
    
 //Player 2 boxes 3
var p2c3actionbox1 = new createjs.Shape();
    p2c3actionbox1.graphics.beginStroke("white").setStrokeStyle(2).drawRect(556, 48, 20, 20);
    stage.addChild(p2c3actionbox1);

var p2c3actionbox2 = new createjs.Shape();
    p2c3actionbox2.graphics.beginStroke("white").setStrokeStyle(2).drawRect(556, 73, 20, 20);
    stage.addChild(p2c3actionbox2);

var p2c3actionbox3 = new createjs.Shape();
    p2c3actionbox3.graphics.beginStroke("white").setStrokeStyle(2).drawRect(581, 48, 20, 20);
    stage.addChild(p2c3actionbox3);
    
var p2c3actionbox4 = new createjs.Shape();
    p2c3actionbox4.graphics.beginStroke("white").setStrokeStyle(2).drawRect(581, 73, 20, 20);
    stage.addChild(p2c3actionbox4);

var p2c3actionbox5 = new createjs.Shape();
    p2c3actionbox5.graphics.beginStroke("white").setStrokeStyle(2).drawRect(606, 48, 20, 20);
    stage.addChild(p2c3actionbox5);   

var p2c3actionbox6 = new createjs.Shape();
    p2c3actionbox6.graphics.beginStroke("white").setStrokeStyle(2).drawRect(606, 73, 20, 20);
    stage.addChild(p2c3actionbox6);   


var in_moveshold;
var currentwBox = new createjs.Shape();
currentwBox.graphics.setStrokeStyle(2).beginStroke('white').drawRect(645,220,76,76);

//Player 2 boxes 3




var chold = 0;

//Yolo
var sortSkill1;          
var sortSkill2;  
var sortSkill3;

var cD;

var p1information_hold = new createjs.Shape();
p1information_hold.graphics.beginFill("black").beginStroke("black").setStrokeStyle(1).drawRect(33,595,300,75);
p1information_hold.alpha = .2;
stage.addChild(p1information_hold); 

var p2information_hold = new createjs.Shape();
p2information_hold.graphics.beginFill("black").beginStroke("black").setStrokeStyle(1).drawRect(750,18,300,75);
p2information_hold.alpha = .2;
stage.addChild(p2information_hold); 

//Avaters for the game
var player1avater = new createjs.Bitmap(user.avater);
    player1avater.x = 33;
    player1avater.y = 594.5;
    player1avater.hitArea = hitArea6;
    stage.addChild(player1avater);

var player2avater = new createjs.Bitmap(moo.avater);
    player2avater.x =995;
    player2avater.y = 18;
    player2avater.hitArea = hitArea6;
    stage.addChild(player2avater);   

if (start.y_c1_health > 0)
{
//Player One Character 
var player1CharacterSlot1 = new createjs.Bitmap(queue.getResult(p1character1.c));
     player1CharacterSlot1.x = 474;
     player1CharacterSlot1.y = 594.5;
     player1CharacterSlot1.hitArea = hitArea6;
     player1CharacterSlot1.cursor = "pointer";
     stage.addChild(player1CharacterSlot1);
}
else
{
    var player1CharacterSlot1 = new createjs.Bitmap(queue.getResult("ko"));
     player1CharacterSlot1.x = 474;
     player1CharacterSlot1.y = 594.5;
     player1CharacterSlot1.hitArea = hitArea6;
     player1CharacterSlot1.cursor = "pointer";
     stage.addChild(player1CharacterSlot1);
}


if (start.y_c2_health > 0)
{
var player1CharacterSlot2 = new createjs.Bitmap(queue.getResult(p1character2.c));
    player1CharacterSlot2.x = 689;
    player1CharacterSlot2.y = 594.5;
    player1CharacterSlot2.hitArea = hitArea6;
    player1CharacterSlot2.cursor = "pointer";
    stage.addChild(player1CharacterSlot2);

}

else
{
    var player1CharacterSlot2 = new createjs.Bitmap(queue.getResult("ko"));
    player1CharacterSlot2.x = 689;
    player1CharacterSlot2.y = 594.5;
    player1CharacterSlot2.hitArea = hitArea6;
    player1CharacterSlot2.cursor = "pointer";
    stage.addChild(player1CharacterSlot2);
}


    
if (start.y_c3_health > 0)
{
var player1CharacterSlot3 = new createjs.Bitmap(queue.getResult(p1character3.c));
    player1CharacterSlot3.x = 904;
    player1CharacterSlot3.y = 594.5;
    player1CharacterSlot3.hitArea = hitArea6;
    player1CharacterSlot3.cursor = "pointer";
    stage.addChild(player1CharacterSlot3);
}

else
{
    var player1CharacterSlot3 = new createjs.Bitmap(queue.getResult("ko"));
    player1CharacterSlot3.x = 904;
    player1CharacterSlot3.y = 594.5;
    player1CharacterSlot3.hitArea = hitArea6;
    player1CharacterSlot3.cursor = "pointer";
    stage.addChild(player1CharacterSlot3);
}



//Player Two character 
if (start.o_c1_health > 0)
{
var player2CharacterSlot1 = new createjs.Bitmap(queue.getResult(moo.team[0]));
    player2CharacterSlot1.x = 49;
    player2CharacterSlot1.y = 18;
    player2CharacterSlot1.hitArea = hitArea6;
    player2CharacterSlot1.cursor = "pointer";
    stage.addChild(player2CharacterSlot1);
}
else
{
    var player2CharacterSlot1 = new createjs.Bitmap(queue.getResult("ko"));
    player2CharacterSlot1.x = 49;
    player2CharacterSlot1.y = 18;
    player2CharacterSlot1.hitArea = hitArea6;
    player2CharacterSlot1.cursor = "pointer";
    stage.addChild(player2CharacterSlot1);
}
    

if (start.o_c2_health > 0)
{
 var player2CharacterSlot2 = new createjs.Bitmap(queue.getResult(moo.team[1]));
    player2CharacterSlot2.x = 262;
    player2CharacterSlot2.y = 18;
    player2CharacterSlot2.hitArea = hitArea6;
    player2CharacterSlot2.cursor = "pointer";
    stage.addChild(player2CharacterSlot2);
}
else
{
  var player2CharacterSlot2 = new createjs.Bitmap(queue.getResult("ko"));
    player2CharacterSlot2.x = 262;
    player2CharacterSlot2.y = 18;
    player2CharacterSlot2.hitArea = hitArea6;
    player2CharacterSlot2.cursor = "pointer";
    stage.addChild(player2CharacterSlot2);
}



if (start.o_c3_health > 0)
{
  var player2CharacterSlot3 = new createjs.Bitmap(queue.getResult(moo.team[2]));
    player2CharacterSlot3.x = 475;
    player2CharacterSlot3.y = 18;
    player2CharacterSlot3.hitArea = hitArea6;
    player2CharacterSlot3.cursor = "pointer";
    stage.addChild(player2CharacterSlot3);  
}
else
{
    var player2CharacterSlot3 = new createjs.Bitmap(queue.getResult("ko"));
    player2CharacterSlot3.x = 475;
    player2CharacterSlot3.y = 18;
    player2CharacterSlot3.hitArea = hitArea6;
    player2CharacterSlot3.cursor = "pointer";
    stage.addChild(player2CharacterSlot3);  
}
    
    
//Character Boxes ^

//Moves Boxes
var skills1 = new createjs.Bitmap();
    skills1.x = 50;
    skills1.y = 410;
    skills1.hitArea = hitArea6;
    skills1.cursor = "pointer";
    stage.addChild(skills1);

var  skills2 = new createjs.Bitmap();
    skills2.x = 141;
    skills2.y = 410;
    skills2.hitArea = hitArea6;
    skills2.cursor = "pointer";
    stage.addChild(skills2);  

var skills3 = new createjs.Bitmap();
    skills3.x = 232;
    skills3.y = 410;
    skills3.hitArea = hitArea6;
    skills3.cursor = "pointer";
    stage.addChild(skills3);   


var skills4 = new createjs.Bitmap();
    skills4.x = 323;
    skills4.y = 410;
    skills4.hitArea = hitArea6;
    skills4.cursor = "pointer";
    stage.addChild(skills4);   
    
var skills5 = new createjs.Bitmap();
    skills5.x = 414;
    skills5.y = 410;
    skills5.hitArea = hitArea6;
    skills5.cursor = "pointer";
    stage.addChild(skills5);   

  

//Current Slots for sorting
var sortingMoves = [-1,-1,-1];

//Skill Info
var skillinfo;
  

//Skill selected variables Cost
    var bpNow = 1;
    var cooldownNow;
    var energy;
    var type;
    var target;
    var stype;

//Time Stuff

var gameTime = 80;
var timerText;


//Name of moves
    var name;
    var old;

//Current Move
    var moveNow = 0;

    //HealthBar
    var player1HP = [];
    var player1MP = [];
    var player2HP = [];
    var player2MP = [];
    
var p1Ch1boxes = [];
var p1Ch2boxes = [];
var p1Ch3boxes = [];
var p2Ch1boxes = [];
var p2Ch2boxes = [];
var p2Ch3boxes = [];

//Player Two character 
//p1effects1



p1Ch1boxes[0] = new createjs.Bitmap();
p1Ch1boxes[0].x = 450;
p1Ch1boxes[0].y = 595;
p1Ch1boxes[0].scaleX = p1Ch1boxes[0].scaleY = desiredW2 / 75;
p1Ch1boxes[0].hitArea = hitArea7;
p1Ch1boxes[0].cursor= "pointer";

p1Ch1boxes[1] = new createjs.Bitmap();
p1Ch1boxes[1].x = 450;
p1Ch1boxes[1].y = 630;
p1Ch1boxes[1].scaleX = p1Ch1boxes[1].scaleY = desiredW2 / 75;
p1Ch1boxes[1].hitArea = hitArea7;
p1Ch1boxes[1].cursor= "pointer";

p1Ch1boxes[2] = new createjs.Bitmap();
p1Ch1boxes[2].x = 450;
p1Ch1boxes[2].y = 655;
p1Ch1boxes[2].scaleX = p1Ch1boxes[2].scaleY = desiredW2 / 75;
p1Ch1boxes[2].hitArea = hitArea7;
p1Ch1boxes[2].cursor= "pointer";

p1Ch2boxes[0] = new createjs.Bitmap();
p1Ch2boxes[0].x = 665;
p1Ch2boxes[0].y = 595;
p1Ch2boxes[0].scaleX = p1Ch2boxes[0].scaleY = desiredW2 / 75;
p1Ch2boxes[0].hitArea = hitArea7;
p1Ch2boxes[0].cursor= "pointer";

p1Ch2boxes[1] = new createjs.Bitmap();
p1Ch2boxes[1].x = 665;
p1Ch2boxes[1].y = 630;
p1Ch2boxes[1].scaleX = p1Ch2boxes[1].scaleY = desiredW2 / 75;
p1Ch2boxes[1].hitArea = hitArea7;
p1Ch2boxes[1].cursor= "pointer";

p1Ch2boxes[2] = new createjs.Bitmap();
p1Ch2boxes[2].x = 665;
p1Ch2boxes[2].y = 655;
p1Ch2boxes[2].scaleX = p1Ch2boxes[2].scaleY = desiredW2 / 75;
p1Ch2boxes[2].hitArea = hitArea7;
p1Ch2boxes[2].cursor= "pointer";

p1Ch3boxes[0] = new createjs.Bitmap();
p1Ch3boxes[0].x = 880;
p1Ch3boxes[0].y = 595;
p1Ch3boxes[0].scaleX = p1Ch3boxes[0].scaleY = desiredW2 / 75;
p1Ch3boxes[0].hitArea = hitArea7;
p1Ch3boxes[0].cursor= "pointer";

p1Ch3boxes[1] = new createjs.Bitmap();
p1Ch3boxes[1].x = 880;
p1Ch3boxes[1].y = 630;
p1Ch3boxes[1].scaleX = p1Ch3boxes[1].scaleY = desiredW2 / 75;
p1Ch3boxes[1].hitArea = hitArea7;
p1Ch3boxes[1].cursor= "pointer";

p1Ch3boxes[2] = new createjs.Bitmap();
p1Ch3boxes[2].x = 880;
p1Ch3boxes[2].y = 655;
p1Ch3boxes[2].scaleX = p1Ch3boxes[2].scaleY = desiredW2 / 75;
p1Ch3boxes[2].hitArea = hitArea7;
p1Ch3boxes[2].cursor= "pointer";

p2Ch1boxes[0] = new createjs.Bitmap();
p2Ch1boxes[0].x = 25;
p2Ch1boxes[0].y = 18;
p2Ch1boxes[0].scaleX = p2Ch1boxes[0].scaleY = desiredW2 / 75;
p2Ch1boxes[0].hitArea = hitArea7;
p2Ch1boxes[0].cursor= "pointer";

p2Ch1boxes[1] = new createjs.Bitmap();
p2Ch1boxes[1].x = 25;
p2Ch1boxes[1].y = 43;
p2Ch1boxes[1].scaleX = p2Ch1boxes[1].scaleY = desiredW2 /75;
p2Ch1boxes[1].hitArea = hitArea7;
p2Ch1boxes[1].cursor= "pointer";

p2Ch1boxes[2] = new createjs.Bitmap();
p2Ch1boxes[2].x = 25;
p2Ch1boxes[2].y = 68;
p2Ch1boxes[2].scaleX = p2Ch1boxes[2].scaleY = desiredW2 / 75;
p2Ch1boxes[2].hitArea = hitArea7;
p2Ch1boxes[2].cursor= "pointer";

p2Ch2boxes[0] = new createjs.Bitmap();
p2Ch2boxes[0].x = 238;
p2Ch2boxes[0].y = 18;
p2Ch2boxes[0].scaleX = p2Ch2boxes[0].scaleY = desiredW2 / 75;
p2Ch2boxes[0].hitArea = hitArea7;
p2Ch2boxes[0].cursor= "pointer";

p2Ch2boxes[1] = new createjs.Bitmap();
p2Ch2boxes[1].x = 238;
p2Ch2boxes[1].y = 43;
p2Ch2boxes[1].scaleX = p2Ch2boxes[1].scaleY = desiredW2 / 75;
p2Ch2boxes[1].hitArea = hitArea7;
p2Ch2boxes[1].cursor= "pointer";

p2Ch2boxes[2] = new createjs.Bitmap();
p2Ch2boxes[2].x = 238;
p2Ch2boxes[2].y = 68;
p2Ch2boxes[2].scaleX = p2Ch2boxes[2].scaleY = desiredW2 / 75;
p2Ch2boxes[2].hitArea = hitArea7;
p2Ch2boxes[2].cursor= "pointer";

p2Ch3boxes[0] = new createjs.Bitmap();
p2Ch3boxes[0].x = 451;
p2Ch3boxes[0].y = 18;
p2Ch3boxes[0].scaleX = p2Ch3boxes[0].scaleY = desiredW2 / 75;
p2Ch3boxes[0].hitArea = hitArea7;
p2Ch3boxes[0].cursor= "pointer";

p2Ch3boxes[1] = new createjs.Bitmap();
p2Ch3boxes[1].x = 451;
p2Ch3boxes[1].y = 43;
p2Ch3boxes[1].scaleX = p2Ch3boxes[1].scaleY = desiredW2 / 75;
p2Ch3boxes[1].hitArea = hitArea7;
p2Ch3boxes[1].cursor= "pointer";

p2Ch3boxes[2] = new createjs.Bitmap();
p2Ch3boxes[2].x = 451;
p2Ch3boxes[2].y = 68;
p2Ch3boxes[2].scaleX = p2Ch3boxes[2].scaleY = desiredW2 / 75;
p2Ch3boxes[2].hitArea = hitArea7;
p2Ch3boxes[2].cursor= "pointer";
    
    
    //HealthBar
    //eww
    
    player1HP[0] = new createjs.Shape();
    player1HP[0].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(555, 595, 70, 10);
    stage.addChild(player1HP[0]);

    player1HP[1] = new createjs.Shape();
    player1HP[1].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(770, 595, 70, 10);
    stage.addChild(player1HP[1]);
    
    
    player1HP[2] = new createjs.Shape();
    player1HP[2].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(985, 595, 70, 10);
    stage.addChild(player1HP[2]);
    
   
    player1HP[3] = new createjs.Shape();
    stage.addChild(player1HP[3]);
    player1HP[3] = player1HP[3].graphics.beginFill("#669933").drawRect(556, 596,phealth1[0]/phealth1[3]*68, 8).command;
    createjs.Tween.get(player1HP[3], {loop: false})
          .wait(1000)
	      .to({w:start.y_c1_health/phealth1[3]*68}, 2000);
    
 
 
    player1HP[4] = new createjs.Shape();
    stage.addChild(player1HP[4]);
    player1HP[4] = player1HP[4].graphics.beginFill("#669933").drawRect(771, 596, phealth1[1]/phealth1[4]*68, 8).command;
    createjs.Tween.get(player1HP[4], {loop: false})
          .wait(1000)
	      .to({w:start.y_c2_health/phealth1[4]*68}, 2000);
    
    
    player1HP[5] = new createjs.Shape();
    stage.addChild(player1HP[5]);
    player1HP[5] = player1HP[5].graphics.beginFill("#669933").drawRect(986, 596, phealth1[2]/phealth1[5]*68, 8).command;
    createjs.Tween.get(player1HP[5], {loop: false})
          .wait(1000)
	      .to({w:start.y_c3_health/phealth1[5]*68}, 2000);

    
    //EnergyBar
    player1MP[0] = new createjs.Shape();
    player1MP[0].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(555, 609, 70, 10);
    stage.addChild(player1MP[0]);
    
    player1MP[1] = new createjs.Shape();
    player1MP[1].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(770, 609, 70, 10);
    stage.addChild( player1MP[1]);
    
    player1MP[2] = new createjs.Shape();
    player1MP[2].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.5).drawRect(985, 609, 70, 10);
    stage.addChild(player1MP[2]);
    
    player1MP[3] = new createjs.Shape();
    stage.addChild(player1MP[3]);
    player1MP[3] = player1MP[3].graphics.beginFill("#006699").drawRect(556, 610, penergy1[0]/penergy1[3]*68, 8).command;
    createjs.Tween.get(player1MP[3], {loop: false})
          .wait(1000)
	      .to({w:start.y_c1_energy/penergy1[3]*68}, 2000);


    player1MP[4] = new createjs.Shape();
    stage.addChild(player1MP[4]);
    player1MP[4] = player1MP[4].graphics.beginFill("#006699").drawRect(771, 610, penergy1[1]/penergy1[4]*68, 8).command;
    createjs.Tween.get(player1MP[4], {loop: false})
          .wait(1000)
	      .to({w:start.y_c2_energy/penergy1[4]*68}, 2000);
    
    
    player1MP[5] = new createjs.Shape();
    stage.addChild(player1MP[5]);
    player1MP[5] = player1MP[5].graphics.beginFill("#006699").drawRect(986, 610, penergy1[2]/penergy1[5]*68, 8).command;
    createjs.Tween.get(player1MP[5], {loop: false})
          .wait(1000)
	      .to({w:start.y_c3_energy/penergy1[5]*68}, 2000);
    

     //HealthBar  (150, 49, 20, 20);
    player2HP[0] = new createjs.Shape();
    player2HP[0].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(130, 18, 70, 10);
    stage.addChild(player2HP[0]);
    
    player2HP[1] = new createjs.Shape();
    player2HP[1].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(345, 18, 70, 10);
    stage.addChild(player2HP[1]);
    
    player2HP[2] = new createjs.Shape();
    player2HP[2].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(556, 18, 70, 10);
    stage.addChild(player2HP[2]);
    
    //HealthBar  (150, 49, 20, 20);
    player2HP[3] = new createjs.Shape();
    stage.addChild(player2HP[3]);
    player2HP[3] = player2HP[3].graphics.beginFill("#669933").drawRect(131, 19, phealth2[0]/phealth2[3]*68, 8).command;
    createjs.Tween.get(player2HP[3], {loop: false})
          .wait(1000)
	      .to({w:start.o_c1_health/phealth2[3]*68}, 2000);
   
    
    player2HP[4] = new createjs.Shape();
    stage.addChild(player2HP[4]);
    player2HP[4] = player2HP[4].graphics.beginFill("#669933").drawRect(346, 19, phealth2[1]/phealth2[4]*68, 8).command;
    createjs.Tween.get(player2HP[4], {loop: false})
        .wait(1000)
	    .to({w:start.o_c2_health/phealth2[4]*68}, 2000);
    
    
    player2HP[5] = new createjs.Shape();
    stage.addChild(player2HP[5]);
    player2HP[5] = player2HP[5].graphics.beginFill("#669933").drawRect(557, 19, phealth2[2]/phealth2[5]*68, 8).command;
    createjs.Tween.get(player2HP[5], {loop: false})
          .wait(1000)
	      .to({w:start.o_c3_health/phealth2[5]*68}, 2000);
    
    
    //start.o_c3_health*.68
     //EnergyBar
    player2MP[0] = new createjs.Shape();
    player2MP[0].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(130, 32, 70, 10);
    stage.addChild(player2MP[0]);
    
    player2MP[1] = new createjs.Shape();
    player2MP[1].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(345, 32, 70, 10);
    stage.addChild(player2MP[1]);
    
    player2MP[2] = new createjs.Shape();
    player2MP[2].graphics.beginFill("grey").beginStroke("white").setStrokeStyle(1.8).drawRect(556, 32, 70, 10);
    stage.addChild(player2MP[2]);
    
         //EnergyBar
    player2MP[3] = new createjs.Shape();
    stage.addChild(player2MP[3]);
    player2MP[3] = player2MP[3].graphics.beginFill("#006699").drawRect(131, 33, penergy2[0]/penergy2[3]*68, 8).command;
    createjs.Tween.get(player2MP[3], {loop: false})
          .wait(1000)
	      .to({w:start.o_c1_energy/penergy2[3]*68}, 2000);
    
    
    player2MP[4] = new createjs.Shape();
    stage.addChild(player2MP[4]);
    player2MP[4] = player2MP[4].graphics.beginFill("#006699").drawRect(346, 33, penergy2[1]/penergy2[4]*68, 8).command;
    createjs.Tween.get(player2MP[4], {loop: false})
          .wait(1000)
	      .to({w:start.o_c2_energy/penergy2[4]*68}, 2000);
    
    
    player2MP[5] = new createjs.Shape();
    stage.addChild(player2MP[5]);
    player2MP[5] = player2MP[5].graphics.beginFill("#006699").drawRect(557, 33, penergy2[2]/penergy2[5]*68, 8).command;
    createjs.Tween.get(player2MP[5], {loop: false})
          .wait(1000)
	      .to({w:start.o_c3_energy/penergy2[5]*68}, 2000);
    
    
    //Player 1 HealthBar HP1 Text
var Player1TextHealth1 = new createjs.Text("HP: " + start.y_c1_health + "/"+phealth1[3], "10px Arial", "white");
    Player1TextHealth1.x = 560;
    Player1TextHealth1.y = 595;
    stage.addChild(Player1TextHealth1);

    //Player 1 HealthBar HP2 Text
  var  Player1TextHealth2 = new createjs.Text("HP: " + start.y_c2_health + "/"+phealth1[4], "10px Arial", "white");
    Player1TextHealth2.x = 775;
    Player1TextHealth2.y = 595;
    stage.addChild(Player1TextHealth2);
    
    
    //Player 1 HealthBar HP3 Text
  var  Player1TextHealth3 = new createjs.Text("HP: " + start.y_c3_health + "/"+phealth1[5], "10px Arial", "white");
    Player1TextHealth3.x = 990;
    Player1TextHealth3.y = 595;
    stage.addChild(Player1TextHealth3);
    
    //Player 1  Energy  Text
  var  Player1TextEnergy1 = new createjs.Text("EP: " + start.y_c1_energy + "/"+penergy1[3], "10px Arial", "white");
    Player1TextEnergy1.x = 560;
    Player1TextEnergy1.y = 609;
    stage.addChild(Player1TextEnergy1);

    //Player 1  Energy Text
  var  Player1TextEnergy2 = new createjs.Text("EP: " + start.y_c2_energy + "/"+penergy1[4], "10px Arial", "white");
    Player1TextEnergy2.x = 775;
    Player1TextEnergy2.y = 609;
    stage.addChild(Player1TextEnergy2);
    
    
    //Player 1 Energy  Text
  var  Player1TextEnergy3 = new createjs.Text("EP: " + start.y_c3_energy + "/"+penergy1[5], "10px Arial", "white");
    Player1TextEnergy3.x = 990;
    Player1TextEnergy3.y = 609;
    stage.addChild(Player1TextEnergy3);


     // Player 2 HealthBar HP1 Text
   var Player2TextHealth1 = new createjs.Text("HP: " + start.o_c1_health + "/"+phealth2[3], "10px Arial", "white");
    Player2TextHealth1.x = 135;
    Player2TextHealth1.y = 18;
    stage.addChild(Player2TextHealth1);

    //Player 2 HealthBar HP2 Text
  var  Player2TextHealth2 = new createjs.Text("HP: " + start.o_c2_health + "/"+phealth2[4], "10px Arial", "white");
    Player2TextHealth2.x = 350;
    Player2TextHealth2.y = 18;
    stage.addChild(Player2TextHealth2);
    
    
    //Player 2 HealthBar HP3 Text
  var  Player2TextHealth3 = new createjs.Text("HP: " + start.o_c3_health + "/"+phealth2[5], "10px Arial", "white");
    Player2TextHealth3.x = 560;
    Player2TextHealth3.y = 18;
    stage.addChild(Player2TextHealth3);
    
    //Player 1 HealthBar HP1 Text
  var  Player2TextEnergy1 = new createjs.Text("EP: " + start.o_c1_energy + "/"+penergy2[3], "10px Arial", "white");
    Player2TextEnergy1.x = 135;
    Player2TextEnergy1.y = 32;
    stage.addChild(Player2TextEnergy1);

    //Player 1 HealthBar HP2 Text
  var  Player2TextEnergy2 = new createjs.Text("EP: " + start.o_c2_energy + "/"+penergy2[4], "10px Arial", "white");
    Player2TextEnergy2.x = 350;
    Player2TextEnergy2.y = 32;
    stage.addChild(Player2TextEnergy2);
    
    
    //Player 1 HealthBar HP3 Text
  var  Player2TextEnergy3 = new createjs.Text("EP: " + start.o_c3_energy + "/"+penergy2[5], "10px Arial", "white");
    Player2TextEnergy3.x = 560;
    Player2TextEnergy3.y = 32;
    stage.addChild(Player2TextEnergy3);
    
    var skills_box = [];


    //Ad Timer
    timerText = new createjs.Text("Time: 1:20", "20px Arial", "white");
    timerText.x = 40;
    timerText.y = 160;
    stage.addChild(timerText);

    var P1BlinkingBox1;
    var P1BlinkingBox2;
    var P1BlinkingBox3;
    var P2BlinkingBox1;
    var P2BlinkingBox2;
    var P2BlinkingBox3;
    
        // Player 1 Blinking Boxes    
 P1BlinkingBox1 = new createjs.Shape();
 P1BlinkingBox1.graphics.beginFill("red").drawRect(474, 594, 75, 76);
 P1BlinkingBox1.alpha= 0.5;
 P1BlinkingBox1.cursor= "pointer";
  P1BlinkingBox1.visible= false;
 createjs.Tween.get(P1BlinkingBox1, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P1BlinkingBox1);

 P1BlinkingBox2 = new createjs.Shape();
 P1BlinkingBox2.graphics.beginFill("red").drawRect(689, 594, 75, 76);
 P1BlinkingBox2.alpha= 0.5;
 P1BlinkingBox2.cursor= "pointer";
 P1BlinkingBox2.visible= false;
 createjs.Tween.get(P1BlinkingBox2, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);          
 stage.addChild(P1BlinkingBox2);

 P1BlinkingBox3 = new createjs.Shape();
 P1BlinkingBox3.graphics.beginFill("red").drawRect(904, 594, 75, 76);
 P1BlinkingBox3.alpha= 0.5;
 P1BlinkingBox3.visible= false;
 P1BlinkingBox3.cursor= "pointer";
 createjs.Tween.get(P1BlinkingBox3, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P1BlinkingBox3);

// Player 2 Blinking Boxes    
 P2BlinkingBox1 = new createjs.Shape();
 P2BlinkingBox1.graphics.beginFill("red").drawRect(49, 18, 75, 75);
 P2BlinkingBox1.alpha= 0.5;
 P2BlinkingBox1.visible= false;
  P2BlinkingBox1.cursor= "pointer";
 createjs.Tween.get(P2BlinkingBox1, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);         
 stage.addChild(P2BlinkingBox1);

 P2BlinkingBox2 = new createjs.Shape();
 P2BlinkingBox2.graphics.beginFill("red").drawRect(262, 18, 75, 75);
 P2BlinkingBox2.alpha= 0.5;
 P2BlinkingBox2.visible= false;
 P2BlinkingBox2.cursor= "pointer";
 createjs.Tween.get(P2BlinkingBox2, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);        
 stage.addChild(P2BlinkingBox2);

 P2BlinkingBox3 = new createjs.Shape();
 P2BlinkingBox3.graphics.beginFill("red").drawRect(475, 18, 75, 75);
 P2BlinkingBox3.alpha= 0.5;
 P2BlinkingBox3.visible= false;
  P2BlinkingBox3.cursor= "pointer";
 createjs.Tween.get(P2BlinkingBox3, {loop: true})
          .to({alpha:.4}, 200)
          .to({alpha:.7}, 200)
          .to({alpha:.4}, 200);          
 stage.addChild(P2BlinkingBox3);
 
 var p1Sbox= new createjs.Shape();
 p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(475, 595, 75, 75);
 stage.addChild(p1Sbox);

p1Sbox= new createjs.Shape();
p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(689, 595, 75, 75);
stage.addChild(p1Sbox);

p1Sbox= new createjs.Shape();
p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(905, 595, 75, 75);
stage.addChild(p1Sbox);

p1Sbox= new createjs.Shape();
    p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(49, 18, 75, 75);
    stage.addChild(p1Sbox);

p1Sbox= new createjs.Shape();
    p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(262, 18, 75, 75);
    stage.addChild(p1Sbox);

p1Sbox= new createjs.Shape();
    p1Sbox.graphics.beginStroke("white").setStrokeStyle(2).drawRect(475, 18, 75, 75);
    stage.addChild(p1Sbox);


var changeBox1;
var changeBox2;
var changeBox3;


    

//Display
    var display;
    done = new createjs.Shape();
    var exitMenu = new createjs.Shape(); 
    var doneText;
    var exitMenuText;

//----------------------------------------

var in_buttonhold= new createjs.Shape();
in_buttonhold.graphics.beginFill('black');
in_buttonhold.graphics.drawRoundRect(-10,530,270,30,15);
in_buttonhold.alpha = .6;
stage.addChild(in_buttonhold);   
 
    //Bp Text
var BPText = new createjs.Text("BP: " + start.bp, "20px Arial", "white");
    BPText.x = 160;
    BPText.y = 160;
    stage.addChild(BPText);

var hitArea5 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,90,20));
    //End Turn
var endTurn = new createjs.Text("End Turn", "20px Arial", "white");
    endTurn.x = 40;
    endTurn.y = 535;
    endTurn.hitArea = hitArea5;
    endTurn.cursor = "pointer";
    stage.addChild(endTurn);

    //Surrender
var surrender = new createjs.Text("Surrender", "20px Arial", "white");
    surrender.x = 145;
    surrender.y = 535;
    surrender.hitArea = hitArea5;
    surrender.cursor = "pointer";
    stage.addChild(surrender);

var endTurnImage = new createjs.Shape();
    endTurnImage.graphics.beginFill("black").drawRect(0,0, 1100, 700);
    endTurnImage.alpha = .5;
    endTurnImage.visible = false;
    stage.addChild(endTurnImage); 
var block1,block2,block3,stun;
    
    
//Testing
var cooldown1 = new createjs.Shape();
cooldown1.graphics.beginFill('white').setStrokeStyle(2).beginStroke('white');  
cooldown1.graphics.drawRect(50,410,75,75);
cooldown1.alpha = .6;    

var cooldown2 = new createjs.Shape();
cooldown2.graphics.beginFill('white').setStrokeStyle(2).beginStroke('white');  
cooldown2.graphics.drawRect(141,410,75,75);
cooldown2.alpha = .6;    

var cooldown3 = new createjs.Shape();
cooldown3.graphics.beginFill('white').setStrokeStyle(2).beginStroke('white');  
cooldown3.graphics.drawRect(232,410,75,75);
cooldown3.alpha = .6;  

var cooldown4 = new createjs.Shape();
cooldown4.graphics.beginFill('white').setStrokeStyle(2).beginStroke('white');  
cooldown4.graphics.drawRect(322,410,75,75);
cooldown4.alpha = .6; 

var cooldown1text = new createjs.Text("", "60px Arial", "black");
cooldown1text.x = 70;
cooldown1text.y = 413;


var cooldown2text = new createjs.Text("", "60px Arial", "black");
cooldown2text.x = 161;
cooldown2text.y = 413;

var cooldown3text = new createjs.Text("", "60px Arial", "black");
cooldown3text.x = 252;
cooldown3text.y = 413;

var cooldown4text = new createjs.Text("", "60px Arial", "black");
cooldown4.graphics.drawRect(322,410,75,75);
cooldown4text.x = 342;
cooldown4text.y = 413;
 
    
var in_gamehold = new createjs.Shape();
in_gamehold.graphics.beginFill('black').setStrokeStyle(2).beginStroke('white');
in_gamehold.graphics.drawRoundRect(-10,200,570,300,10);
in_gamehold.alpha = .6;

var in_statshold= new createjs.Shape();
in_statshold.graphics.beginFill('black').setStrokeStyle(2).beginStroke('white');
in_statshold.graphics.drawRoundRect(580,200,200,300,10);
in_statshold.alpha = .6;

var effect_hold = new createjs.Shape();
effect_hold.graphics.beginFill('black').setStrokeStyle(2,"square").beginStroke('#ff6633');
effect_hold.graphics.drawRoundRect(265,300,500,100,10);
effect_hold.alpha = .7;

var effect_title = new createjs.Text("", "12px Arial", "white");
effect_title.x = 280;
effect_title.y = 310;

var effect_text = new createjs.Text("", "12px Arial", "white");
effect_text.x = 280;
effect_text.y = 350;

var characterInfo;

characterInfo = new createjs.Text("", "12px Arial", "white");
characterInfo.x = 600;
characterInfo.y = 330;

phealth1 = [start.y_c1_health,start.y_c2_health,start.y_c3_health,phealth1[3],phealth1[4],phealth1[5]];
phealth2 = [start.o_c1_health,start.o_c2_health,start.o_c3_health,phealth2[3],phealth2[4],phealth2[5]];
penergy1[start.y_c1_energy,start.y_c2_energy,start.y_c3_energy,penergy1[3],penergy1[4],penergy1[5]];
penergy2[start.o_c1_energy,start.o_c2_energy,start.o_c3_energy,penergy2[3],penergy2[4],penergy2[5]];
    
//Event Listeners for menu
surrender.addEventListener("click",surrenderNow);
endTurn.addEventListener("click",endTurnNow);

//Player 1 Character Event Listners
player1CharacterSlot1.addEventListener("click",function() {p1CharacterSelected(1,p1character1.c); });
player1CharacterSlot2.addEventListener("click",function() {p1CharacterSelected(2,p1character2.c); });
player1CharacterSlot3.addEventListener("click",function() {p1CharacterSelected(3,p1character3.c); }); 

//Player 2 Character Event Listiners
player2CharacterSlot1.addEventListener("click",function() {p2CharacterSelected(1,moo.team[0]); });
player2CharacterSlot2.addEventListener("click",function() {p2CharacterSelected(2,moo.team[1]); });
player2CharacterSlot3.addEventListener("click",function() {p2CharacterSelected(3,moo.team[2]); }); 

//Display 
endTurnImage.addEventListener("click",nothing);

//Links
P1BlinkingBox1.addEventListener("click",function() {blinkingEffect(1); });
P1BlinkingBox2.addEventListener("click",function() {blinkingEffect(2); });
P1BlinkingBox3.addEventListener("click",function() {blinkingEffect(3); });
P2BlinkingBox1.addEventListener("click",function() {blinkingEffect(4); });
P2BlinkingBox2.addEventListener("click",function() {blinkingEffect(5); });
P2BlinkingBox3.addEventListener("click",function() {blinkingEffect(6); });

function showEffect (num)
{

var d;
var n;
switch (num)
{
case "zPo3":
d = "Piccolo increases one player defense by 50% but goes down in defense 20%.";
n = "Wall Of Defense";
break;

case "g2":
d = "This blocks all energy based skills for one turn.";
n = "Energy Deflect";
break;

case "g4":
d = "This blocks all skills for one turn.";
n = "Sonic Sway";
break;

case "g7":
d = "This blocks all strength based skills for one turn.";
n = "Physical Block";
break;

case "zGu-t1":
d = "Goku turns Kaioken strength increases by 70%, kai by 60%, and defense by 20%.\nGoku (z) will lose 15 energy every turn.This skill ends if user doesn't have enough energy or uses this \nskill while active.";
n = "Kaio-Ken";
break;

case "zKG-t1":
d = "Kid Gohan powers are unlocked.Kai increases by 80%.Strength increases by \n50%.Defense by 20%.Kid Gohan (z) will lose 15 energy every\nturn.skill will lose 10 energy every turn. This skill ends if user doesn't \nhave enough energy or uses this skill while active. ";
n = "Unlocked Potential";
break;

case "zPo-t1":
d = "Piccolo fuses with Nail.Kai increases by 75%.Strength increases by 50%.Defense by \n25%.Piccolo (z) will lose 15 energy every turn.skill will lose 10 energy every turn. \nThis skill ends if user doesn't have enough energy or uses this skill while active.";
n = "Fusion with Nail";
break;

case "ge-t":
d = "User of this skill powers up to his limit. Strength and Kai increase by 50%.User of this \nskill will lose 10 energy every turn. This skill ends if user doesn't have enough energy \nor uses this skill while active.";
n = "Full Power";
break;
} //End of skill check
effect_title.text = n;
effect_text.text = d;
stage.removeChild(effect_hold);
stage.removeChild(effect_title);
stage.removeChild(effect_text);
stage.addChild(effect_hold);
stage.addChild(effect_title);
stage.addChild(effect_text);

}

//This is for player 1 characters selected

function p1CharacterSelected(num1,num2)
{
    select.play();
   stage.removeChild(descriptionText1); 
   stage.removeChild(currentBox);  
  stage.removeChild(effect_hold);
stage.removeChild(effect_title);
stage.removeChild(effect_text);
   
    stage.removeChild(in_gamehold);
  stage.removeChild(in_statshold);
  //stage.removeChild(skillinfo);
  
   
   stage.removeChild(characterInfo);
 
  stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5); 

 
  stage.removeChild(skills_box[0]);  
 stage.removeChild(skills_box[1]);  
 stage.removeChild(skills_box[2]);   
 stage.removeChild(skills_box[3]);  
 stage.removeChild(skills_box[4]);  
 stage.removeChild(skills_box[5]); 
 
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);
switch(num1)
{
    case 1:
    console.log("c: 1");
    p1character1.active = true; 
    p1character2.active = false;
    p1character3.active = false;
    break;
    
    case 2:
    console.log("c: 2");
    p1character1.active = false;
    p1character2.active = true;
    p1character3.active = false;
    break;
    
    case 3:
    console.log("c: 3");
    p1character1.active = false;
    p1character2.active = false;
    p1character3.active = true;
    break;
}

//num1= Which box was selected
//num2= Character Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)
//zzz
  currentDescription(num1,num2,true,true);

  
  switch(num1)
  {
      case 1:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.y_c1_experience[1] + "\n\nStrength:" + start.y_c1_strength + "\n\nKi:" + start.y_c1_kai + "\n\nDefense:"+ start.y_c1_defense + "\n\nExperience:" + start.y_c1_experience[0];
      break;
      
      case 2:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.y_c2_experience[1] + "\n\nStrength:" + start.y_c2_strength + "\n\nKi:" + start.y_c2_kai + "\n\nDefense:"+ start.y_c2_defense + "\n\nExperience:" + start.y_c2_experience[0];
      break;
      
      case 3:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.y_c3_experience[1] + "\n\nStrength:" + start.y_c3_strength + "\n\nKi:" + start.y_c3_kai + "\n\nDefense:"+ start.y_c3_defense + "\n\nExperience:" + start.y_c3_experience[0];
      break;
      
      default:
      console.log("What is num1?");
  }
  
  stage.addChild(in_gamehold);
  stage.addChild(in_statshold);
  
stage.addChild(characterInfo);

//Updates Description
descriptionText1 = new createjs.Text(cD, "14px Arial", "white");
descriptionText1.x = 10;
descriptionText1.y = 205;
stage.addChild(descriptionText1); 

currentBox = new createjs.Bitmap(queue.getResult(num2));
currentBox.x = 645;
currentBox.y = 220;
stage.addChild(currentBox); 
stage.addChild(currentwBox);


if (num1 === 1 && start.y_c1_health != 0)
{
updateMoves(1);
}

else if (num1 === 2 && start.y_c2_health != 0)
{
updateMoves(2);
}

else if (num1 === 3 && start.y_c3_health != 0 )
{
updateMoves(3);
}


}

function p2CharacterSelected(num1,num2)
{
    select.play();
   stage.removeChild(descriptionText1); 
   stage.removeChild(currentBox);
  //stage.removeChild(skillinfo);
 
 
   stage.removeChild(effect_hold);
stage.removeChild(effect_title);
stage.removeChild(effect_text);
 stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5);  
 
 stage.removeChild(skills_box[0]);  
 stage.removeChild(skills_box[1]);  
 stage.removeChild(skills_box[2]);   
 stage.removeChild(skills_box[3]);  
 stage.removeChild(skills_box[4]);  
 stage.removeChild(skills_box[5]);   
 
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);

 
 stage.removeChild(in_gamehold);
  stage.removeChild(in_statshold);
  
stage.removeChild(characterInfo);

//num1= Which box was selected
//num2= Character Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)

 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;

currentDescription(num1,num2,false,true);

switch(num1)
  {
      case 1:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.o_c1_experience[1] + "\n\nStrength:" + start.o_c1_strength + "\n\nKi:" + start.o_c1_kai + "\n\nDefense:"+ start.o_c1_defense + "\n\nExperience:" + start.o_c1_experience[0];
      break;
      
      case 2:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.o_c1_experience[1] + "\n\nStrength:" + start.o_c2_strength + "\n\nKi:" + start.o_c2_kai + "\n\nDefense:"+ start.o_c2_defense + "\n\nExperience:" + start.o_c2_experience[0];
      break;
      
      case 3:
      characterInfo.text = "Name: " + name + "\n\nLevel: " + start.o_c1_experience[1] + "\n\nStrength:" + start.o_c3_strength + "\n\nKi:" + start.o_c3_kai + "\n\nDefense:"+ start.o_c3_defense + "\n\nExperience:" + start.o_c3_experience[0];
      break;
      
      default:
      console.log("What is num1?");
  }

  stage.addChild(in_gamehold);
  stage.addChild(in_statshold);
  
  stage.addChild(characterInfo);
  
//Updates Description
descriptionText1 = new createjs.Text(cD, "14px Arial", "white");
descriptionText1.x = 10;
descriptionText1.y = 205;
stage.addChild(descriptionText1); 


currentBox = new createjs.Bitmap(queue.getResult(num2));
currentBox.x = 645;
currentBox.y = 220;
stage.addChild(currentBox); 
stage.addChild(currentwBox);

moveNow = 0;
}

//This for skill selected
function skillSelected(num1,num2,num3)
{
select.play();
 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;
 stage.removeChild(effect_hold);
stage.removeChild(effect_title);
stage.removeChild(effect_text);
//num1 = Character
//num2 = Box Number
//num3 = Skill Code

//num1= Which box was selected
//num3 = Skill Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)

currentDescription(num1,num3,true,false);

characterInfo.text = "Name:" + name + "\n\nBP:" + bpNow + "\n\nEnergy:" + energy + "\n\nCooldown:" + cooldownNow + "\n\nFocus:" + target + "\n\nType:" + stype;
stage.addChild(characterInfo);

stage.removeChild(descriptionText1); 
stage.removeChild(currentBox); 
//stage.removeChild(skillinfo);

//Updates Description
descriptionText1 = new createjs.Text(cD, "14px Arial", "white");
descriptionText1.x = 10;
descriptionText1.y = 205;
stage.addChild(descriptionText1); 

//Updates pic
currentBox = new createjs.Bitmap(queue.getResult(num3));
currentBox.x = 645;
currentBox.y = 220;
stage.addChild(currentBox); 


stage.addChild(currentwBox);



if(num1 === 1 && p1character1.attacked === false && turn === true)
{
skillUpdate(num1,num3);
}

else if(num1 === 2 && p1character2.attacked === false && turn === true)
{
    skillUpdate(num1,num3);
}

else if(num1 === 3 && p1character3.attacked === false && turn === true)
{
    skillUpdate(num1,num3);
}

else
{

}

}

function skillUpdate(num1,num3)
{
//Blinking Boxes and Determine BP
block1 = false;
block2 = false;
block3 = false;
stun = false;

console.log("Num: " + num1);
 console.log("Type : " + stype);
 switch (stype)
{
    case "Strength":
    if (start.o_c1_block[2] === 0 && start.o_c1_block[0] === 0)  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.o_c2_block[2] === 0 && start.o_c2_block[0] === 0)  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.o_c3_block[2] === 0 && start.o_c3_block[0] === 0)  
    {block3 = false;}
    else
    {block3 = true;}
    
    if(num1 === 1 &&  p1character1.stunned[0] === 0 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[0] === 0 && p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[0] === 0 && p1character3.stunned[2] === 0 )
    {
        stun = false;
    }
    else
    {
        stun = true;
    }
    break;
    
    
    case "Ki":
    if (start.o_c1_block[2] === 0 && start.o_c1_block[1] === 0 )  
    {block1 = false;}
    else
    {block1 = true;}
    if (start.o_c2_block[2] === 0 && start.o_c2_block[1] === 0 )  
    {block2 = false;}
    else
    {block2 = true;}
    if (start.o_c3_block[2] === 0 && start.o_c3_block[1] === 0 )  
    {block3 = false;}
    else
    {block3 = true;}
    if(num1 === 1 &&  p1character1.stunned[1] === 0 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[1] === 0 && p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[1] === 0 && p1character3.stunned[2] === 0 )
    {
        stun = false;
    }
    else
    {
        stun = true;
    }
    break;
    
    case "Defensive":
    if(num1 === 1 && p1character1.stunned[2] === 0 )
    {
      
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[2] === 0 )
    {
        stun = false;
       
    }
    else if (num1 === 3 &&  p1character3.stunned[2] === 0 )
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
    break;
    
    case "Power-Up":
     if(num1 === 1 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[2] === 0 )
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
    break;
    
    case "Power-Down":
     if(num1 === 1 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[2] === 0 )
    {
        stun = false;

    }
     else
    {
        stun = true;
    }
    break;
      case "Transformation":
     if(num1 === 1 && p1character1.stunned[2] === 0 )
    {
        stun = false;
    }
    else if(num1 === 2 &&  p1character2.stunned[2] === 0 )
    {
        stun = false;
    }
    else if (num1 === 3 &&  p1character3.stunned[2] === 0 )
    {
        stun = false;
    }
     else
    {
        stun = true;
    }
}

//start.o_c1_block === 0 
//Type = Single Enemy ,All Enemies ,Self,One Ally
if (type === 1  && bpNow <= start.bp && !stun)
{
 if (start.o_c1_health > 0 && !block1)  
 {
 P2BlinkingBox1.visible = true;
 }
 if (start.o_c2_health > 0 && !block2)
 {
 P2BlinkingBox2.visible = true;
 }
 if (start.o_c3_health > 0 && !block3)
 {
 P2BlinkingBox3.visible = true;
 }
} 

else if  (type === 2  && bpNow <= start.bp && !stun)
{
 if (start.o_c1_health > 0 && !block1)  
 {
 P2BlinkingBox1.visible = true;
 }
 if (start.o_c2_health > 0 && !block2)
 {
 P2BlinkingBox2.visible = true;
 }
 if (start.o_c3_health > 0 && !block3)
 {
 P2BlinkingBox3.visible = true;
 }
}    

else if (type === 3 && bpNow <= start.bp && !stun)
{
   switch(num1) 
   {
   case 1:
   P1BlinkingBox1.visible = true;    
   break;

    case 2:
    P1BlinkingBox2.visible = true;
    break;
     
    case 3:
    P1BlinkingBox3.visible = true;    
    break;
   }
}

else if (type === 4  && bpNow <= start.bp && !stun)
{
     switch(num1) 
   {
   case 1:
   if (start.y_c2_health !== 0)
   {
   P1BlinkingBox2.visible = true;
   }
   if (start.y_c3_health !== 0)
   {
   P1BlinkingBox3.visible = true;
   }
   break;

    case 2:
    if (start.y_c1_health !== 0)
   {
   P1BlinkingBox1.visible = true;
   }
   if (start.y_c3_health !== 0)
   {
   P1BlinkingBox3.visible = true;
   }
    break;
    
    case 3:
     if (start.y_c1_health !== 0)
   {
   P1BlinkingBox1.visible = true;
   }
   if (start.y_c3_health !== 0)
   {
   P1BlinkingBox3.visible = true;
   }
    break;
   }
}

else if (type === 5  && bpNow <= start.bp && !stun)
{
     if (start.y_c1_health !==  0 )  //
 {
 P1BlinkingBox1.visible = true;
 }
 if (start.y_c2_health !==  0)
 {
 P1BlinkingBox2.visible = true;
 }
 if (start.o_c3_health !==  0)
 {
 P1BlinkingBox3.visible = true;
 }
}
else
{
    
}

//Current Info
if (!stun)
{
   moveNow = num3;  
}
 


}

function blinkingEffect(num1)
{
  select.play();
  P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;   
var order;
console.log("Active: " + p1character2.active);

var c;

if (p1character1.active)
{
    c = 1;
}
else if (p1character2.active)
{
    c = 2;
}

else
{
    c = 3;
}

//Type = Single Enemy ,All Enemies ,Self,One Ally, All Allies
if (type === 2)
{
    var send = [-1,-1,-1];
 if (start.o_c1_health > 0 && !block1)  
 {
switch(-1)
    {
        case p2C1BoxUsed[0]:
         p2C1BoxUsed[0] = moveNow; 
p2Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[0]);
  order = 0;
  send[0] = 0;
        break;
        
        case p2C1BoxUsed[1]:
         p2C1BoxUsed[1] = moveNow; 
 p2Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[1]);
 order = 1;
 send[0] = 1;
        break;
        
        case p2C1BoxUsed[2]:
        p2C1BoxUsed[2] = moveNow;
p2Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[2]);
 order = 2;
 send[0] = 2;
        break;
    }
 }
 
 if (start.o_c2_health > 0 && !block2)
 {
 switch(-1)
    {
    case p2C2BoxUsed[0]:
    p2C2BoxUsed[0] = moveNow; 
p2Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[0]);
 order = 0;
 send[1] = 0;
    break;
    
    case p2C2BoxUsed[1]:
         p2C2BoxUsed[1] = moveNow; 
    p2Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[1]);
 order = 1;
 send[1] = 1;
    break;
    
    case p2C2BoxUsed[2]:
         p2C2BoxUsed[2] = moveNow; 
   p2Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[2]);
 order = 2;
 send[1] = 2;
    break;

}
 }
 if (start.o_c3_health > 0 && !block3)
 {
 switch(-1)
{
    case p2C3BoxUsed[0]:
    p2C3BoxUsed[0] = moveNow; 
 p2Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[0]);
order = 0;
send[2] = 0;
    break;
    
    case p2C3BoxUsed[1]:
    p2C3BoxUsed[1] = moveNow;
p2Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[1]);
 order = 1;
 send[2] = 1;
    break;
    
    case p2C3BoxUsed[2]:
    p2C3BoxUsed[2] = moveNow;
p2Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[2]);
 order = 2;
 send[2] = 2;
    break;
}
 }
 
 if (send[0] > -1)
 {
     p2Ch1boxes[send[0]].addEventListener("click",function() {cancel(7,send,c); });
 }
  if (send[1] > -1)
 {
     p2Ch2boxes[send[1]].addEventListener("click",function() {cancel(7,send,c); });
 }
  if (send[2] > -1)
 {
     p2Ch3boxes[send[2]].addEventListener("click",function() {cancel(7,send,c); });
 }
 
}    

else if (type === 5)
{
if (start.o_c1_health > 0 && !block1)  
 {

 }
 if (start.o_c2_health > 0 && !block2)
 {

 }
 if (start.o_c3_health > 0 && !block3)
 {
 
 }
}

else
{
   if(moveNow !== 0 && num1 === 1)
{
 

switch(-1)
{
 case p1C1BoxUsed[0]:
 p1C1BoxUsed[0] = moveNow; 
 p1Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[0]);
 p1Ch1boxes[0].addEventListener("click",function() {cancel(num1,0,c); }); 
 order = 0;
 break;
 
 case p1C1BoxUsed[1]:
 p1C1BoxUsed[1] = moveNow; 
 p1Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[1]); 
 p1Ch1boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
 break;
 
 case p1C1BoxUsed[2]:
   p1C1BoxUsed[2] = moveNow; 
  p1Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch1boxes[2]);
 p1Ch1boxes[2].addEventListener("click",function() {cancel(num1,2,c); });
 order = 2;
 break;
}
}

else if(moveNow !== 0 && num1 === 2)
{
    
    switch(-1)
    {
        case p1C2BoxUsed[0]:
        p1C2BoxUsed[0] = moveNow;
  p1Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[0]);
 p1Ch2boxes[0].addEventListener("click",function() {cancel(num1,0,c); });
 order = 0;
        break;
        
        case p1C2BoxUsed[1]:
        p1C2BoxUsed[1] = moveNow;
 p1Ch2boxes[1] = new createjs.Bitmap(queue.getResult(moveNow));
  p1Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[0]);
 p1Ch2boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
        break;
        
        case p1C2BoxUsed[2]:
        p1C2BoxUsed[2] = moveNow;
  p1Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch2boxes[0]);
 p1Ch2boxes[2].addEventListener("click",function() {cancel(num1,2,c); });
 order = 2;
        break;
    }

}

else if (moveNow !== 0 && num1 === 3)
{
    
    switch(-1)
    {
        case p1C3BoxUsed[0]:
        p1C3BoxUsed[0] = moveNow;
 p1Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[0]);
 p1Ch3boxes[0].addEventListener("click",function() {cancel(num1,0,c); });
 order = 0;
        break;
        
        case p1C3BoxUsed[1]:
         p1C3BoxUsed[1] = moveNow;
 p1Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[1]);
 p1Ch3boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
        break;
        
        case p1C3BoxUsed[2]:
         p1C3BoxUsed[2] = moveNow;
 p1Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p1Ch3boxes[2]);
 p1Ch3boxes[2].addEventListener("click",function() {cancel(num1,2,c); });
 order = 2;
        break;
    }

}
else if (moveNow !== 0 && num1 === 4)
{
    
    switch(-1)
    {
        case p2C1BoxUsed[0]:
         p2C1BoxUsed[0] = moveNow; 
p2Ch1boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[0]);
 p2Ch1boxes[0].addEventListener("click",function() {cancel(num1,0,c); });
  order = 0;
        break;
        
        case p2C1BoxUsed[1]:
         p2C1BoxUsed[1] = moveNow; 
 p2Ch1boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[1]);
 p2Ch1boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
        break;
        
        case p2C1BoxUsed[2]:
        p2C1BoxUsed[2] = moveNow;
p2Ch1boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch1boxes[2]);
 p2Ch1boxes[2].addEventListener("click",function() {cancel(num1,2,c); }); 
 order = 2;
        break;
    }

}

else if (moveNow !== 0 && num1 === 5)
{
   
    switch(-1)
    {
    case p2C2BoxUsed[0]:
    p2C2BoxUsed[0] = moveNow; 
p2Ch2boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[0]);
 p2Ch2boxes[0].addEventListener("click",function() {cancel(num1,0,c); });
 order = 0;
    break;
    
    case p2C2BoxUsed[1]:
         p2C2BoxUsed[1] = moveNow; 
    p2Ch2boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[1]);
 p2Ch2boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
    break;
    
    case p2C2BoxUsed[2]:
         p2C2BoxUsed[2] = moveNow; 
   p2Ch2boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch2boxes[2]);
 p2Ch2boxes[2].addEventListener("click",function() {cancel(num1,2,c); });
 order = 2;
    break;

}

}

else if (moveNow !== 0 && num1 === 6)
{
    
switch(-1)
{
    case p2C3BoxUsed[0]:
    p2C3BoxUsed[0] = moveNow; 
 p2Ch3boxes[0].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[0]);
 p2Ch3boxes[0].addEventListener("click",function() {cancel(num1,0,c); });
order = 0;
    break;
    
    case p2C3BoxUsed[1]:
    p2C3BoxUsed[1] = moveNow;
p2Ch3boxes[1].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[1]);
 p2Ch3boxes[1].addEventListener("click",function() {cancel(num1,1,c); });
 order = 1;
    break;
    
    case p2C3BoxUsed[2]:
    p2C3BoxUsed[2] = moveNow;
p2Ch3boxes[2].image = queue.getResult(moveNow);
 stage.addChild(p2Ch3boxes[2]);
 p2Ch3boxes[2].addEventListener("click",function() {cancel(num1,2,c); });
 order = 2;
    break;
}
}
else
{
    
}


}

//Character Stop Attacking
if (p1character1.active)
{
   
   if(order ===  0)
   {
       if(p1character2.order > 0)
   {order += 1;}
   if(p1character3.order > 0)
   {  order += 1;} 
   }
  
   p1character1.moveUsed = moveNow;
   p1character1.attacked = true;
   if(type === 2)
   {
       p1character1.targeted = 7;
   }
   else
   {
       p1character1.targeted = num1;
   }
   
   attackOrder(-1,order);
}

else if (p1character2.active)
{
    
    if(order ===  0)
    {
         if(p1character1.order > 0)
   {order += 1;}
   if(p1character3.order > 0)
   {   
       order += 1;
   }
    }
   
    
    p1character2.moveUsed = moveNow;
    p1character2.attacked = true;
    if(type === 2)
   {
       p1character2.targeted = 7;
   }
   else
   {
       p1character2.targeted = num1;
   }
    attackOrder(-1,order);
    
}

else if (p1character3.active)
{
    
     if(order ===  0)
     {
          if(p1character1.order > 0)
   {
       
       order += 1;
   }
   if(p1character2.order > 0)
   {  
       order += 1;
   }
     
     }
    
     p1character3.moveUsed = moveNow;
     p1character3.attacked = true;
      if(type === 2)
   {
       p1character3.targeted = 7;
   }
   else
   {
       p1character3.targeted = num1;
   }
     attackOrder(-1,order);
} 

//Type = Single Enemy ,All Enemies ,Self,One Ally

console.log(p1C1BoxUsed);
bpUsage(0,num1);
moveNow = 0;
console.log("P1 M1: " + p1character1.moveUsed + "    P1 M2: " + p1character2.moveUsed + "    P1 M3: " + p1character3.moveUsed);

}

function bpUsage(num1)
{
//This is to take 
if(num1 === 0)
{
switch(moveNow)
{
    case "g1":
    start.bp -= 1;
    break;

    case "g2":
    start.bp -= 1;
    break;

    case "g3":
    start.bp -= 1;
    break;

    case "g4":
    start.bp -= 1;
    break;

    case "g5":
    start.bp -= 0;
    break;

    case "g6":
    start.bp -= 1;
    break;

    case "g7":
    start.bp -= 1;
    break;

    case "g8":
    start.bp -= 1;
    break;

    case "g9":
    start.bp -= 1;
    break;

    case "zGu1":
    start.bp -= 1;
    break;

    case "zGu2":
    start.bp -= 1;
    break;

    case "zGu3":
    start.bp -= 1;
    break;
    
    case "zPo1":
    start.bp -= 1;
    break;

    case "zPo2":
    start.bp -= 2;
    break;

    case "zPo3":
    start.bp -= 1;
    break;
    
     case "zKG1":
    start.bp -= 1;
    break;

    case "zKG2":
    start.bp -= 2;
    break;

    case "zKG3":
    start.bp -= 1;
    break;
}

}

else
{
    
    switch(num1)
    {
   case "g1":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g2":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g3":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g4":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g5":
    start.bp += 0;
    attackOrder(num1,0);
    break;

    case "g6":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g7":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g8":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "g9":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "zGu1":
    start.bp += 1;
    attackOrder(num1,0);
    break;

    case "zGu2":
    start.bp += 1;
    break;

    case "zGu3":
    start.bp -= 1;
    break;
    
    case "zPo1":
    start.bp -= 1;
    break;

    case "zPo2":
    start.bp -= 2;
    break;

    case "zPo3":
    start.bp -= 1;
    break;
    
     case "zKG1":
    start.bp -= 1;
    break;

    case "zKG2":
    start.bp -= 2;
    break;

    case "zKG3":
    start.bp -= 1;
    break;
}

}
stage.removeChild(BPText);
    BPText = new createjs.Text("BP: " + start.bp, "20px Arial", "white");
    BPText.x = 160;
    BPText.y = 160;
    stage.addChild(BPText);
}


//Order of Moves

function attackOrder(num1,num2)
{
  console.log("Num1: " + num1);
 num2 += 1;
 if(num1 === -1)
 {
     console.log("num2:" + num2)
     if (p1character1.active)
     {
        p1character1.order = num2;
     }
     else if (p1character2.active)
     {
        p1character2.order = num2;
     }
     else
     {
         p1character3.order = num2;
     }
     
 }
 
 else
 {
     
   if (p1character1.order === num1)
   {
     
     p1character1.moveUsed = 0;
     p1character1.order = -1;
   }

   else if(p1character2.order === num1)
   {
     
     p1character2.moveUsed = 0;
     p1character2.order = -1;
   }
   
   else if (p1character3.order === num1)
   {

     p1character3.moveUsed = 0;
     p1character3.order = -1;
   }

 }
 

 console.log("P1: " + p1character1.order + "   P2: " + p1character2.order + "   P3: " + p1character3.order);
 
}




function cancel(num1,num2,num3)
{
select.play();
//Num1 = character
//Num2 = box
//Num3 = Who attacked?

if(num1 == 1)
{
switch (num2)
{
case 0:
stage.removeChild(p1Ch1boxes[0]);    
p1Ch1boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C1BoxUsed[0],num3);
p1C1BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p1Ch1boxes[1]);    
p1Ch1boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C1BoxUsed[1],num3);
p1C1BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p1Ch1boxes[2]);    
p1Ch1boxes[2].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C1BoxUsed[2],num3);
p1C1BoxUsed[2] = -1;
break;
}//End of switch
}

else if(num1 == 2)
{
switch (num2)
{
case 0:
stage.removeChild(p1Ch2boxes[0]);    
p1Ch2boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C2BoxUsed[0],num3);
p1C2BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p1Ch2boxes[1]);    
p1Ch2boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C2BoxUsed[1],num3);
p1C2BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p1Ch2boxes[2]);    
p1Ch2boxes.removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C2BoxUsed[2],num3);
p1C2BoxUsed[2] = -1;
break;
}//End of switch

}
else if(num1 == 3)
{
switch (num2)
{
case 0:
stage.removeChild(p1Ch3boxes[0]);    
p1Ch3boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C3BoxUsed[0],num3);
p1C3BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p1Ch3boxes[1]);    
p1Ch3boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C3BoxUsed[1],num3);
p1C3BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p1Ch3boxes[2]);    
p1Ch3boxes[2].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C3BoxUsed[2],num3);
p1C3BoxUsed[2] = -1;
break;

}//End of switch

}

else if(num1 == 4)
{
switch (num2)
{
case 0:
stage.removeChild(p2Ch1boxes[0]);    
p2Ch1boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C1BoxUsed[0],num3);
p2C1BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p2Ch1boxes[1]);    
p2Ch1boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C1BoxUsed[1],num3);
p2C1BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p2Ch1boxes[2]);    
p2Ch1boxes[2].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C2BoxUsed[2],num3);
p2C1BoxUsed[2] = -1;
break;

}//End of switch
}

else if(num1 == 5)
{
switch (num2)
{
case 0:
stage.removeChild(p2Ch2boxes[0]);    
p2Ch2boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C2BoxUsed[0],num3);
p2C2BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p2Ch2boxes[1]);    
p2Ch2boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C2BoxUsed[1],num3);
p2C2BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p2Ch2boxes[2]);    
p2Ch2boxes[2].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p1C2BoxUsed[2],num3);
p2C2BoxUsed[2] = -1;
break;
}//End of switch
}

else if (num1 === 6)
{
switch (num2)
{
case 0:
stage.removeChild(p2Ch3boxes[0]);    
p2Ch3boxes[0].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C3BoxUsed[0],num3);
p2C3BoxUsed[0] = -1;
break;

case 1:
stage.removeChild(p2Ch3boxes[1]);    
p2Ch3boxes[1].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C3BoxUsed[1],num3);
p2C3BoxUsed.pop();
p2C3BoxUsed[1] = -1;
break;

case 2:
stage.removeChild(p2Ch3boxes[2]);    
p2Ch3boxes[2].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C3BoxUsed[2],num3);
p2C3BoxUsed[2] = -1;
break;

}//End of switch
}

else
{

if (num2[0] > -1 )
{
    stage.removeChild(p2Ch1boxes[num2[0]]);    
p2Ch1boxes[num2[0]].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C1BoxUsed[num2[0]],num3);
p2C1BoxUsed[num2[0]] = -1;
}

if (num2[1] > -1 )
{
 stage.removeChild(p2Ch2boxes[num2[1]]);    
p2Ch2boxes[num2[1]].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C2BoxUsed[num2[1]],num3);
p2C2BoxUsed[num2[1]] = -1;   
}

if (num2[2] > -1 )
{
stage.removeChild(p2Ch3boxes[num2[2]]);    
p2Ch3boxes[num2[2]].removeEventListener("click",function() {cancel(num1,num2,num3); });
bpUsage(p2C3BoxUsed[num2[2]],num3);
p2C3BoxUsed[num2[2]] = -1;
}

}



switch(num3){
    
    case 1:
    p1character1.attacked = false;
    p1character1.moveUsed = -1;
    p1character1.targeted = -1;  
    p1character1.order = -1;
    break;
    
    case 2:
    p1character2.attacked = false;
    p1character2.moveUsed = -1;
    p1character2.targeted = -1;
    p1character2.order = -1;
    break;
    
    case 3:
    p1character3.attacked = false;
    p1character3.moveUsed = -1;
    p1character3.targeted = -1;
    p1character3.order = -1;
    break;
    
    
}


}

function currentDescription(num1,num2,num3,num4)
{
    //num1= Which box was selected
//num2= Character Code
//num3 = Is this Player 1(true) or Player 2 (false)
//num4 = Is this a character? Yes(true) No(false)
 
//Characters
 if(num3 === true && num4 === true)
 {



switch (num2)
{
case "zGu":
cD = "Cheerful, courageous and also a bit naive, Goku is a Saiyan originally sent to Earth \nas in infant with the mission to destroy it. However, an accident alters his memory,\ncausing him to grow up pure-hearted and later become Earth's greatest defender.";
name = "Goku(Z)";
break;

case "zKG":
cD = "Gohan is the son of goku and may not resemble him in appearance but clearly shows \nit in fighting and his personality, Gohan has shown amazing potential at such a young \nage and his bravery is none the less.";
name = "Kid Gohan(Z)";
break;

case "zPo":
cD = "A wise, expert strategist who was originally a ruthless enemy of Goku, Piccolo later \nbecomes a permanent member of the Z Fighters during Dragon Ball Z.";
name = "Piccolo (Z)";
break;
case "zKn":
cD = "Krillin is a bald, short guy but is also one of the stongest humans on Earth. Krillin \ndetermination in helping his friends and protecting the weak.";
name = "Krillin (Z)";
break;
case "zYa":
cD = "Yamcha is a human on planet earth and a Z fighter who aids goku and his friends in \nupcoming battles. He is cocky and arrogant but has ferocious abilities.";
name = "Yamcha (Z)";
break;
} //switch end



}//Player 1 Character check ends here

//Player two checks and switch descriptions
else if(num3 === false && num4 === true)
{

switch (num2)
{
case "zGu":
cD = "Cheerful, courageous and also a bit naive, Goku is a Saiyan originally sent to Earth \nas in infant with the mission to destroy it. However, an accident alters his memory,\ncausing him to grow up pure-hearted and later become Earth's greatest defender.";
name = "Goku(Z)";
break;

case "zKG":
cD = "Gohan is the son of goku and may not resemble him in appearance but clearly shows \nit in fighting and his personality, Gohan has shown amazing potential at such a young \nage and his bravery is none the less.";
name = "Kid Gohan(Z)";
break;

case "zPo":
cD = "A wise, expert strategist who was originally a ruthless enemy of Goku, Piccolo later \nbecomes a permanent member of the Z Fighters during Dragon Ball Z.";
name = "Piccolo (Z)";
break;
case "zKn":
cD = "Krillin is a bald, short guy but is also one of the stongest humans on Earth. Krillin \ndetermination in helping his friends and protecting the weak.";
name = "Krillin (Z)";
break;
case "zYa":
cD = "Yamcha is a human on planet earth and a Z fighter who aids goku and his friends in \nupcoming battles. He is cocky and arrogant but has ferocious abilities.";
name = "Yamcha (Z)";
break;
}//end switch

} //End of Player character check

else if (num3 === true && num4 === false)
{
    
switch (num2)
{
case "zGu1":
cD = "Goku lands a crushing blow to the enemy. One enemy will take 10 damage and there \ndefense decrease by 20%.";
bpNow = 1;
cooldownNow = 2;
name = "Punishing Attack";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "zGu2":
cD = "Goku stores energy from around him and shoots it at an enemy. One enemy takes \n25 damage and is stunned for one turn.";
bpNow = 2;
cooldownNow = 1;
name = "Spirit Bomb: Small";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Ki";
break;

case "zGu3":
cD = "Using his signature attack, Goku will deal 15 damage to one enemy.";
bpNow = 2;
cooldownNow = 1;
name = "Kamehameha";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Ki";
break;

case "zKG1":
cD = "Increases Gohan's BP gain by 1 for 2 turns.";
bpNow = 1;
cooldownNow = 1;
name = "Hidden Power";
energy = 20;
type = 3;
target = "Self";
stype = "Power-Up";
break;

case "zKG2":
cD = "Deals 15 damage to one enemy.";
bpNow = 1;
cooldownNow = 1;
name = "Masenko";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Kai";
break;

case "zKG3":
cD = "Deals 20 damage to one enemy, but reduced Gohans defense by 5 the following turn.";
bpNow = 2;
cooldownNow = 0;
name = "Rushing Assualt";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "zPo1":
cD = "Piccolo strategically charges up his energy. Piccolo gains 20% more kai and \ngain 20 energy.";
bpNow = 1;
cooldownNow = 2;
name = "Charge";
energy = 0;
type = 3;
target = "Self";
stype = "Power-Up";
break;

case "zPo2":
cD = "Using one of his strongest techniques, Piccolo will deal 20 damage to one \nenemy.This lowers enemy defense by 10%.";
bpNow = 1;
cooldownNow = 0;
name = "Special Beam Cannon";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Kai";
break;

case "zPo3":
cD = "Piccolo increases one ally defense by 40% but Piccolo goes down in defense 20%.";
bpNow = 2;
cooldownNow = 4;
name = "Wall Of Defense";
energy = 20;
type = 4;
target = "Self/Support";
stype = "Power-Up";
break;

case "zKn1":
cD = "Targets one enemy, countering the first harmful skill they use for 1 turn.";
bpNow = 2;
cooldownNow = 1;
name = "High Velocity Kick";
energy = 15;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "zKn2":
cD = "Deals 15 piercing damage to one enemy. ";
bpNow = 2;
cooldownNow = 1;
name = "Destructo Disk";
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Ki";
break;

case "zKn3":
cD = "Deals 10 damage to all enemies.";
bpNow = 2;
cooldownNow = 3;
name = "Scattering Bullets";
energy = 30;
type = 2;
target = "Multiple Enemies";
stype = "Ki";
break;

case "zYa1":
cD = "Deals 10 damage to one enemy. This skill lasts 3 turns and ends if Yamacha becomes \ninvulnerable.";
bpNow = 2;
cooldownNow = 3;
name = "Wolf Fang Fist";
energy = 30;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "zYa2":
cD = "Stuns one enemy and lowers their defense by 5 for 1 turn.";
bpNow = 2;
cooldownNow = 3;
name = "Wolf Fang Fist";
energy = 30;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "zYa3":
cD = "Deals 10 damage to one enemy. This skill lasts 3 turns and ends if Yamacha becomes \ninvulnerable.";
bpNow = 2;
cooldownNow = 3;
name = "Spirit Ball";
energy = 30;
type = 1;
target = "Single Enemy";
stype = "Ki";
break;

case "g1":
cD = "Permanently increases the characters defense by 5 points.";
bpNow = 2;
name = "Afterimage";
cooldownNow = 2;
energy = 20;
type = 3;
target = "Self";
stype = "Defensive";
break;

case "g2":
cD = "The target becomes invulnerable to the first enemy ki based skill used on them for 1 \nturn.";
bpNow = 1;
name = "Energy Deflect";
cooldownNow = 1;
energy = 20;
type = 3;
target = "Self";
stype = "Defensive";
break;

case "g3":
cD = "Deals 10 strength and 10 ki damage to one enemy.";
bpNow = 1;
name = "Energy Punch";
cooldownNow = 2;
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Strength,Ki";
break;

case "g4":
cD = "The target becomes invulnerable to all enemy skills for 1 turn.";
bpNow = 2;
name = "Sonic Sway";
cooldownNow = 3;
energy = 20;
type = 3;
target = "Self";
stype = "Defensive";
break;

case "g5":
cD = "Decreases the targets strength and defense by 5 points for 2 turns.";
bpNow = 1;
name = "Solar Flare";
cooldownNow = 2;
energy = 30;
type = 1;
target = "Single Enemy";
stype = "Power-Down";
break;

case "g6":
cD = "This skill does 10 strength damage to one enemy.";
bpNow = 1;
name = "Punch";
cooldownNow = 0;
energy = 10;
type = 1;
target = "Single Enemy";
stype = "Strength";
break;

case "g7":
cD = "The target becomes invulnerable to the first enemy strength skill used on them for \none turn.";
bpNow = 1;
name = "Physical Block";
cooldownNow = 2;
energy = 20;
type = 3;
target = "Self";
stype = "Defensive";
break;

case "g8":
cD = "Deals 10 damage to one enemy.";
bpNow = 1;
name = "Ki Blast";
cooldownNow = 0;
energy = 20;
type = 1;
target = "Single Enemy";
stype = "Ki";
break;

case "g9":
cD = "Deals 5 damage to all enemies.";
bpNow = 1;
name = "Explosion";
cooldownNow = 1;
energy = 15;
type = 2;
target = "Multiple-Enemies";
stype = "Ki";
break;

case "ge1":
cD = "This skill lowers enemy defense by 10%";
bpNow = 1;
name = "Scouter";
cooldownNow = 1;
energy = 20;
type = 3;
target = "Single-Enemy";
stype = "Power-Down";
break;

case "zGu-t1":
cD = "Goku turns Kaioken.Strength increases by 70%.Kai increases by 60%.Defense \nby 20%. Goku (z) will lose 15 energy every turn.This skill ends if \nuser doesn't have enough energy or uses this skill while active.";
bpNow = 1;
name = "Kaio-Ken";
cooldownNow = 0;
energy = 0;
type = 3;
target = "Self";
stype = "Transformation";
break;

case "zKG-t1":
cD = "Kid Gohan powers are unlocked.Kai increases by 80%.Strength increases by 50%.\nDefense by 20%.Kid Gohan (z) will lose 15 energy every turn.This skill will lose 10 \nenergy every turn. This skill ends if user doesn't have enough energy or uses this skill \nwhile active. ";
bpNow = 1;
name = "Unlocked Potential";
cooldownNow = 0;
energy = 0;
type = 3;
target = "Self";
stype = "Transformation";
break;

case "zPo-t1":
cD = "Piccolo fuses with Nail.Kai increases by 70%.Strength increases by 50%.Defense by \n30%.Piccolo (z) will lose 15 energy every turn.This skill will lose 10 energy every turn. \nThis skill ends if user doesn't have enough energy or uses this skill while active.";
bpNow = 1;
name = "Fusion with Nail";
cooldownNow = 0;
energy = 0;
type = 3;
target = "Self";
stype = "Transformation";
break;

case "ge-t":
cD = "Increases the targets strength, ki, and defense by 5 points. Re-use of this skill \nwhile active will remove its current effects.";
bpNow = 1;
name = "Power Up";
cooldownNow = 0;
energy = 10;
type = 3;
target = "Self";
stype = "Transformation";
break;

default: 
alert("error");

}//end switch

} //End of skill check


} //End of function


function updateMoves(num)
{
 P1BlinkingBox1.visible = false;
 P1BlinkingBox2.visible = false;
 P1BlinkingBox3.visible = false;
 P2BlinkingBox1.visible = false;
 P2BlinkingBox2.visible = false;
 P2BlinkingBox3.visible = false;

 stage.removeChild(skills1);  
 stage.removeChild(skills2);  
 stage.removeChild(skills3);   
 stage.removeChild(skills4);   
 stage.removeChild(skills5);
 stage.removeChild(cooldown1text);
 stage.removeChild(cooldown2text);
 stage.removeChild(cooldown3text);
 stage.removeChild(cooldown4text);
 stage.removeChild(cooldown1);
 stage.removeChild(cooldown2);
 stage.removeChild(cooldown3);
 stage.removeChild(cooldown4);

if (num === 1)
{

   
   
   
  skills1.image = queue.getResult(p1character1.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character1.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character1.skills[2]);
  stage.addChild(skills3);


 skills4.image = queue.getResult(p1character1.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character1.skills[4]);
  stage.addChild(skills5);  
  
  

  
  switch (p1character1.cooldown[0])
  {
      case 0:
   
      skills1.addEventListener("click",function() {skillSelected(1,1,p1character1.skills[0]); });
      break;
      
      case 1:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 1;
      stage.addChild(cooldown1text);
      break;
      
      case 2:
    
      stage.addChild(cooldown1);
      cooldown1text.text = 2;
      stage.addChild(cooldown1text);  
      break;
      
      case 3:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 3;
      stage.addChild(cooldown1text); 
      break;
      
      case 4:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 4;
      stage.addChild(cooldown1text); 
      break;
      
      case 5:
     
      stage.addChild(cooldown1);
      cooldown1text.text = 5;
      stage.addChild(cooldown1text); 
      break;
      
      case 9:
      
      stage.addChild(cooldown1);
      cooldown1text.text = "∞";
      stage.addChild(cooldown1text); 
      break;
  }
  

  switch (p1character1.cooldown[1])
  {
      case 0:
      
      skills2.addEventListener("click",function() {skillSelected(1,2,p1character1.skills[1]); });
      break;
      
      case 1:
      
      stage.addChild(cooldown2);
      cooldown2text.text = 1;
      stage.addChild(cooldown2text);
      break;
      
      case 2:
      
      stage.addChild(cooldown2);
      cooldown2text.text = 2;
      stage.addChild(cooldown2text);
      break;
      
      case 3:
      
      stage.addChild(cooldown2);
      cooldown2text.text = 3;
      stage.addChild(cooldown2text);
      break;
      
      case 4:
      
      stage.addChild(cooldown2);
      cooldown2text.text = 4;
      stage.addChild(cooldown2text);
      break;
      
      case 5:
      
      stage.addChild(cooldown2);
      cooldown2text.text = 5;
      stage.addChild(cooldown2text);
      break;
  }
  

  switch (p1character1.cooldown[2])
  {
      case 0:
      
      skills3.addEventListener("click",function() {skillSelected(1,3,p1character1.skills[2]); }); 
      break;
      
      case 1:
     
      stage.addChild(cooldown3);
      cooldown3text.text = 1;
      stage.addChild(cooldown3text);
      break;
      
      case 2:
      
      stage.addChild(cooldown3);
      cooldown3text.text = 2;
      stage.addChild(cooldown3text);
      break;
      
      case 3:
      
      stage.addChild(cooldown3);
      cooldown3text.text = 3;
      stage.addChild(cooldown3text);
      break;
      
      case 4:
      
      stage.addChild(cooldown3);
      cooldown3text.text = 4;
      stage.addChild(cooldown3text);
      break;
      
      case 5:
   
      stage.addChild(cooldown3);
      cooldown3text.text = 5;
      stage.addChild(cooldown3text);
      break;
  }
  

  switch (p1character1.cooldown[3])
  {
      case 0:
      
      skills4.addEventListener("click",function() {skillSelected(1,4,p1character1.skills[3]); });
      break;
      
      case 1:
      
      stage.addChild(cooldown4);
      cooldown4text.text = 1;
      stage.addChild(cooldown4text);
      break;
      
      case 2:
      
      stage.addChild(cooldown4);
      cooldown4text.text = 2;
      stage.addChild(cooldown4text);
      break;
      
      case 3:
      
      stage.addChild(cooldown4);
      cooldown4text.text = 3;
      stage.addChild(cooldown4text);
      break;
      
      case 4:
      
      stage.addChild(cooldown4);
      cooldown4text.text = 4;
      stage.addChild(cooldown4text);
      break;
      
      case 5:
      
      stage.addChild(cooldown4);
      cooldown4text.text = 5;
      stage.addChild(cooldown4text);
      break;
  }
  skills5.addEventListener("click",function() {skillSelected(1,5,p1character1.skills[4]); });
}

else if (num === 2)
{
  skills1.image = queue.getResult(p1character2.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character2.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character2.skills[2]);
  stage.addChild(skills3);


 skills4.image = queue.getResult(p1character2.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character2.skills[4]);
  stage.addChild(skills5);   
  
  switch (p1character2.cooldown[0])
  {
      case 0:
     
      skills1.addEventListener("click",function() {skillSelected(2,1,p1character2.skills[0]); });
      break;
      
      case 1:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 1;
      stage.addChild(cooldown1text);
      break;
      
      case 2:
   
      stage.addChild(cooldown1);
      cooldown1text.text = 2;
      stage.addChild(cooldown1text);
      break;
      
      case 3:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 3;
      stage.addChild(cooldown1text);
      break;
      
      case 4:
     
      stage.addChild(cooldown1);
      cooldown1text.text = 4;
      stage.addChild(cooldown1text);
      break;
      
      case 5:
      
      stage.addChild(cooldown1);
      cooldown1text.text = 5;
      stage.addChild(cooldown1text);
      break;
  }
  

  switch (p1character2.cooldown[1])
  {
      case 0:
      
      skills2.addEventListener("click",function() {skillSelected(2,2,p1character2.skills[1]); });
      break;
      
      case 1:

      stage.addChild(cooldown2);
      cooldown2text.text = 1;
      stage.addChild(cooldown2text);
      break;
      
      case 2:
    
      stage.addChild(cooldown2);
      cooldown2text.text = 2;
      stage.addChild(cooldown2text);
      break;
      
      case 3:
     
      stage.addChild(cooldown2);
      cooldown2text.text = 3;
      stage.addChild(cooldown2text);
      break;
      
      case 4:
     
      stage.addChild(cooldown2);
      cooldown2text.text = 4;
      stage.addChild(cooldown2text);
      break;
      
      case 5:
      stage.addChild(cooldown2);
      cooldown2text.text = 5;
      stage.addChild(cooldown2text);
      break;
  }
  

  switch (p1character2.cooldown[2])
  {
      case 0:
      skills3.addEventListener("click",function() {skillSelected(2,3,p1character2.skills[2]); }); 
      break;
      
      case 1:
      stage.addChild(cooldown3);
      cooldown3text.text = 1;
      stage.addChild(cooldown3text);
      break;
      
      case 2:
      stage.addChild(cooldown3);
      cooldown3text.text = 2;
      stage.addChild(cooldown3text);
      break;
      
      case 3:
      stage.addChild(cooldown3);
      cooldown3text.text = 3;
      stage.addChild(cooldown3text);
      break;
      
      case 4:
      stage.addChild(cooldown3);
      cooldown3text.text = 4;
      stage.addChild(cooldown3text);
      break;
      
      case 5:
      stage.addChild(cooldown3);
      cooldown3text.text = 5;
      stage.addChild(cooldown3text);
      break;
  }
  

  switch (p1character2.cooldown[3])
  {
      case 0:
      skills4.addEventListener("click",function() {skillSelected(2,4,p1character2.skills[3]); });
      break;
      
      case 1:
      stage.addChild(cooldown4);
      cooldown4text.text = 1;
      stage.addChild(cooldown4text);
      break;
      
      case 2:
      stage.addChild(cooldown4);
      cooldown4text.text = 2;
      stage.addChild(cooldown4text);
      break;
      
      case 3:
      stage.addChild(cooldown4);
      cooldown4text.text = 3;
      stage.addChild(cooldown4text);
      break;
      
      case 4:
      stage.addChild(cooldown4);
      cooldown4text.text = 4;
      stage.addChild(cooldown4text);
      break;
      
      case 5:
      stage.addChild(cooldown4);
      cooldown4text.text = 5;
      stage.addChild(cooldown4text);
      break;
  }
  skills5.addEventListener("click",function() {skillSelected(2,5,p1character2.skills[4]); });
}

else 
{
  skills1.image = queue.getResult(p1character3.skills[0]);
  stage.addChild(skills1);

 skills2.image = queue.getResult(p1character3.skills[1]);
  stage.addChild(skills2); 

 skills3.image = queue.getResult(p1character3.skills[2]);
  stage.addChild(skills3);

 skills4.image = queue.getResult(p1character3.skills[3]);
  stage.addChild(skills4);
    
 skills5.image = queue.getResult(p1character3.skills[4]);
  stage.addChild(skills5);  
  
    switch (p1character3.cooldown[0])
  {
      case 0:
      skills1.addEventListener("click",function() {skillSelected(3,1,p1character3.skills[0]); });
      break;
      
      case 1:
      stage.addChild(cooldown1);
      cooldown1text.text = 1;
      stage.addChild(cooldown1text);
      break;
      
      case 2:
      stage.addChild(cooldown1);
      cooldown1text.text = 2;
      stage.addChild(cooldown1text);
      break;
      
      case 3:
      stage.addChild(cooldown1);
      cooldown1text.text = 3;
      stage.addChild(cooldown1text);
      break;
      
      case 4:
      stage.addChild(cooldown1);
      cooldown1text.text = 4;
      stage.addChild(cooldown1text);
      break;
      
      case 5:
      stage.addChild(cooldown1);
      cooldown1text.text = 5;
      stage.addChild(cooldown1text);
      break;
  }
  

  switch (p1character3.cooldown[1])
  {
      case 0:
      skills2.addEventListener("click",function() {skillSelected(3,2,p1character3.skills[1]); });
      break;
      
      case 1:
      stage.addChild(cooldown2);
      cooldown2text.text = 1;
      stage.addChild(cooldown2text);
      break;
      
      case 2:
      stage.addChild(cooldown2);
      cooldown2text.text = 2;
      stage.addChild(cooldown2text);
      break;
      
      case 3:
      stage.addChild(cooldown2);
      cooldown2text.text = 3;
      stage.addChild(cooldown2text);
      break;
      
      case 4:
      stage.addChild(cooldown2);
      cooldown2text.text = 4;
      stage.addChild(cooldown2text);
      break;
      
      case 5:
      stage.addChild(cooldown2);
      cooldown2text.text = 5;
      stage.addChild(cooldown2text);
      break;
  }
  

  switch (p1character3.cooldown[2])
  {
      case 0:
      skills3.addEventListener("click",function() {skillSelected(3,3,p1character3.skills[2]); }); 
      break;
      
      case 1:
      stage.addChild(cooldown3);
      cooldown3text.text = 1;
      stage.addChild(cooldown3text);
      break;
      
      case 2:
      stage.addChild(cooldown3);
      cooldown3text.text = 2;
      stage.addChild(cooldown3text);
      break;
      
      case 3:
      stage.addChild(cooldown3);
      cooldown3text.text = 3;
      stage.addChild(cooldown3text);
      break;
      
      case 4:
      stage.addChild(cooldown3);
      cooldown3text.text = 4;
      stage.addChild(cooldown3text);
      break;
      
      case 5:
      stage.addChild(cooldown3);
      cooldown3text.text = 5;
      stage.addChild(cooldown3text);
      break;
  }
  

  switch (p1character3.cooldown[3])
  {
      case 0:
      skills4.addEventListener("click",function() {skillSelected(3,4,p1character3.skills[3]); });
      break;
      
      case 1:
      stage.addChild(cooldown4);
      cooldown4text.text = 1;
      stage.addChild(cooldown4text);
      break;
      
      case 2:
      stage.addChild(cooldown4);
      cooldown4text.text = 2;
      stage.addChild(cooldown4text);
      break;
      
      case 3:
      stage.addChild(cooldown4);
      cooldown4text.text = 3;
      stage.addChild(cooldown4text);
      break;
      
      case 4:
      stage.addChild(cooldown4);
      cooldown4text.text = 4;
      stage.addChild(cooldown4text);
      break;
      
      case 5:
      stage.addChild(cooldown4);
      cooldown4text.text = 5;
      stage.addChild(cooldown4text);
      break;
  }
  skills5.addEventListener("click",function() {skillSelected(3,5,p1character3.skills[4]); });
}
// Selectable Moves Event 



 skills_box[0] = new createjs.Shape();
skills_box[0].graphics.setStrokeStyle(2).beginStroke('white').drawRect(50,410,76,76);
stage.addChild(skills_box[0]);

    skills_box[1] = new createjs.Shape();
    skills_box[1].graphics.setStrokeStyle(2).beginStroke('white').drawRect(141,410,76,76);
    stage.addChild(skills_box[1]);  
    
    skills_box[2] = new createjs.Shape();
    skills_box[2].graphics.setStrokeStyle(2).beginStroke('white').drawRect(232,410,76,76);
    stage.addChild(skills_box[2]);   
    
    skills_box[3] = new createjs.Shape();
    skills_box[2].graphics.setStrokeStyle(2).beginStroke('white').drawRect(323,410,76,76);
    stage.addChild(skills_box[3]);  
    
    skills_box[4] = new createjs.Shape();
    skills_box[4].graphics.setStrokeStyle(2).beginStroke('orange').drawRect(414,410,76,76);
    stage.addChild(skills_box[4]);  

}

function surrenderNow()
{
    stage.removeChild(surrender);
      this.endTurnImage = new createjs.Shape();
endTurnImage.graphics.beginFill("black").drawRect(0,0, 1100, 700);
endTurnImage.alpha = .2;
stage.addChild(endTurnImage); 
stage.addEventListener("click",nothing);



var in_surrenderhold = new createjs.Shape();
in_surrenderhold.graphics.beginFill('black').setStrokeStyle(2,"square").beginStroke('#ff6633');
in_surrenderhold.graphics.drawRoundRect(320,150,460,350,10);
in_surrenderhold.alpha = .7;
stage.addChild(in_surrenderhold);


var box = new createjs.Bitmap(queue.getResult("surrender"));
box.x = 400;
box.y = 210;
stage.addChild(box); 

var surrenderHold = new createjs.Shape();
surrenderHold.graphics.beginStroke("white").setStrokeStyle(2).drawRect(400, 210, 300, 212);
stage.addChild(surrenderHold); 

    //Surrender
var surrenderText = new createjs.Text("Do you want to surrender this game?", "20px Arial", "white");
    surrenderText.x = 390;
    surrenderText.y = 175;
    surrenderText.hitArea = hitArea5;
    stage.addChild(surrenderText);




var cancel = new createjs.Bitmap(queue.getResult("cancelLoad"));
cancel.x = 400;
cancel.y = 450;
cancel.cursor = "pointer";
stage.addChild(cancel);
cancel.addEventListener("click",cancel4); 

var done = new createjs.Bitmap(queue.getResult("done"));
done.x = 600;
done.y = 450;
done.cursor = "pointer";
stage.addChild(done); 
done.addEventListener("click",confirm_lost);

function nothing()
{
    
}



function cancel4()
{
    
select.play();    
  stage.removeChild(endTurnImage); 
stage.removeChild(box); 
stage.removeChild(cancel); 
stage.removeChild(done);  
stage.removeChild(in_surrenderhold); 
stage.removeChild(in_moveshold); 
stage.removeChild(surrenderText);
stage.removeChild(surrenderHold);
stage.addChild(surrender);
} 

function confirm_lost()
{
    select.play();
  clearInterval(gameTimer);    
var find = { action: "surrender", game_id: user.game_id, user_id: user.player_id};
ws.send(JSON.stringify(find));  
}
   


}

function endTurnNow()
{
select.play();

switch (turn)
{
case true:

if (p1character1.attacked === true ||p1character2.attacked === true || p1character3.attacked === true )
{
   sorting();  
}

else 
{
  battleEnd();
  var na = 0;
    if(p1character1.targeted === -1)
{
    na += 1;
}

if(p1character2.targeted === -1)
{
    na += 2;
}

if(p1character3.targeted === -1)
{
    na += 4;
}
   var find = { action: "end_turn", game_id: user.game_id,c: na, user_id: user.player_id};
   ws.send(JSON.stringify(find));
  
   
}
break;

case false:

break;
}
}


function sorting()
{ 
    //var hitAreatest = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,350,300)); 
stage.removeChild(endTurnImage);
stage.removeChild(done);

endTurnImage = new createjs.Shape();
endTurnImage.graphics.beginFill("black").drawRect(0,0, 1100, 700);
endTurnImage.alpha = .2;
stage.addChild(endTurnImage); 
stage.addEventListener("click",nothing);


in_moveshold = new createjs.Shape();
in_moveshold.graphics.beginFill('black').setStrokeStyle(2,"round").beginStroke('#ff6633');
in_moveshold.graphics.drawRoundRect(450,200,300,200,10);
in_moveshold.alpha = .6;
stage.addChild(in_moveshold); 

updateStorting();

doneNow = new createjs.Bitmap(queue.getResult("done"));
doneNow.x = 490;
doneNow.y = 350;
doneNow.cursor = "pointer";
stage.addChild(doneNow); 
doneNow.addEventListener("click",battleEnd);

exitMenu = new createjs.Bitmap(queue.getResult("cancelLoad"));
exitMenu.x = 610;
exitMenu.y = 350;
exitMenu.cursor = "pointer";
stage.addChild(exitMenu); 
exitMenu.addEventListener("click",function() {displayActions(1);});



}

function nothing()
{

}


function updateStorting ()
{
     console.log("P1: " + p1character1.order + "   P2: " + p1character2.order + "   P3: " + p1character3.order);
switch(p1character1.order)
{
    case -1:
    break;
    
    case 1:
    sortingMoves[0] = 1;
    var mv1 = p1character1.moveUsed;
    break;
    
    case 2:
    sortingMoves[1] = 1;
    var mv2 = p1character1.moveUsed;
    break;
    
    case 3:
    sortingMoves[2] = 1;
    var mv3 = p1character1.moveUsed;
    break;
}

switch(p1character2.order)
{
    case -1:
    break;
    
    case 1:
    sortingMoves[0] = 2;
    var mv1 = p1character2.moveUsed;
    break;
    
    case 2:
    sortingMoves[1] = 2;
    var mv2 = p1character2.moveUsed;
    break;
    
    case 3:
    sortingMoves[2] = 2;
    var mv3 = p1character2.moveUsed;
    break;
}

switch(p1character3.order)
{
    case -1:
    break;
    
    case 1:
    sortingMoves[0] = 3;
    var mv1 = p1character3.moveUsed;
    break;
    
    case 2:
    sortingMoves[1] = 3;
    var mv2 = p1character3.moveUsed;
    break;
    
    case 3:
    sortingMoves[2] = 3;
    var mv3 = p1character3.moveUsed;
    break;
}

if(sortingMoves[0] === -1 && sortingMoves[1] === -1 )
{
        sortingMoves[0] = sortingMoves[2];
        sortingMoves[2] = -1;
}

else if(sortingMoves[0] === -1 )
{
        sortingMoves[0] = sortingMoves[1];
        sortingMoves[1] = sortingMoves[2];
        sortingMoves[2] = -1;
}

else if (sortingMoves[1] === -1)
{
        sortingMoves[1] = sortingMoves[2];
        sortingMoves[2] = -1;
}


console.log(sortingMoves);



    sortSkill1 = new createjs.Bitmap(queue.getResult(mv1));
    sortSkill1.x = 475;
    sortSkill1.y = 250;
    sortSkill1.hitArea = hitArea6;
    sortSkill1.cursor = "pointer"
    stage.addChild(sortSkill1);
    sortSkill1.addEventListener("click",function(){changeOrder(1);});

    sortSkill2 = new createjs.Bitmap(queue.getResult(mv2));
    sortSkill2.x = 566;
    sortSkill2.y = 250;
    sortSkill2.hitArea = hitArea6;
    sortSkill2.cursor = "pointer"
    stage.addChild(sortSkill2);  
    sortSkill2.addEventListener("click",function(){changeOrder(2);});

    sortSkill3 = new createjs.Bitmap(queue.getResult(mv3));
    sortSkill3.x = 659;
    sortSkill3.y = 250;
    sortSkill3.hitArea = hitArea6;
    sortSkill3.cursor = "pointer"
    stage.addChild(sortSkill3);  
    sortSkill3.addEventListener("click",function(){changeOrder(3);});

changeBox1 = new createjs.Shape();
changeBox1.graphics.setStrokeStyle(2).beginStroke('white').drawRect(475,250,76,76);
stage.addChild(changeBox1);

changeBox2 = new createjs.Shape();
changeBox2.graphics.setStrokeStyle(2).beginStroke('white').drawRect(566,250,76,76);
stage.addChild(changeBox2);

changeBox3 = new createjs.Shape();
changeBox3.graphics.setStrokeStyle(2).beginStroke('white').drawRect(659,250,76,76);
stage.addChild(changeBox3);

}

function changeOrder(num)
{
    select.play();
    if(chold === 0)
    {
       
        switch(num)
        {
            case 1:
            chold = 1;
            break;
            
            case 2:
            chold = 2;
            break;
            
            case 3:
            chold = 3;
            break;
        }
    }
    
    else
    {
       
       if(num === 1)
       {
         switch(chold)
         {
             
             case 2:
             old = sortingMoves[0];  
             sortingMoves[0] = sortingMoves[1];  
             sortingMoves[1] = old;
             break;
             
             case 3:
             old = sortingMoves[0];  
             sortingMoves[0] = sortingMoves[2];  
             sortingMoves[2] = old;    
             break;
         }
         
       }
       
       else if(num === 2)
       {
          switch(chold)
         {
             case 1:
             this.old = sortingMoves[1];  
             sortingMoves[1] = sortingMoves[0];  
             sortingMoves[0] = this.old;
             break;
             
             case 3:
             this.old = sortingMoves[1];  
             sortingMoves[1] = sortingMoves[2];  
             sortingMoves[2] = this.old;    
             break;
         } 
       }
       else if(num === 3)
       {
            switch(chold)
         {
             case 1:
             old = sortingMoves[2];  
             sortingMoves[2] = sortingMoves[0];  
             sortingMoves[0] = old;
             break;
             
             case 2:
             old = sortingMoves[2];  
             sortingMoves[2] = sortingMoves[1];  
             sortingMoves[1] = old;    
             break;
         } 
       }
       chold = 0;
       
     
      var mv1,mv2,mv3;
      
      switch(sortingMoves[0])
      {
          case 1:
          mv1 = p1character1.moveUsed;
          break;
          
           case 2:
          mv1 = p1character2.moveUsed;
          break;
          
           case 3:
            mv1 = p1character3.moveUsed;
          break;
      }
      
       switch(sortingMoves[1])
      {
          case 1:
          mv2 = p1character1.moveUsed;
          break;
          
           case 2:
          mv2 = p1character2.moveUsed;
          break;
          
           case 3:
            mv2 = p1character3.moveUsed;
          break;
      }
       switch(sortingMoves[2])
      {
          case 1:
          mv3 = p1character1.moveUsed;
          break;
          
           case 2:
          mv3 = p1character2.moveUsed;
          break;
          
           case 3:
            mv3 = p1character3.moveUsed;
          break;
      }
    stage.removeChild(sortSkill1);
    stage.removeChild(sortSkill2);
    stage.removeChild(sortSkill3);
    sortSkill1 = new createjs.Bitmap(queue.getResult(mv1));
    sortSkill1.x = 475;
    sortSkill1.y = 250;
    sortSkill1.hitArea = hitArea6;
    stage.addChild(sortSkill1);
    sortSkill1.addEventListener("click",function(){changeOrder(1);});

    sortSkill2 = new createjs.Bitmap(queue.getResult(mv2));
    sortSkill2.x = 566;
    sortSkill2.y = 250;
    sortSkill2.hitArea = hitArea6;
    stage.addChild(sortSkill2);  
    sortSkill2.addEventListener("click",function(){changeOrder(2);});

    sortSkill3 = new createjs.Bitmap(queue.getResult(mv3));
    sortSkill3.x = 659;
    sortSkill3.y = 250;
    sortSkill3.hitArea = hitArea6;
    stage.addChild(sortSkill3);  
    sortSkill3.addEventListener("click",function(){changeOrder(3);});
    }
}

function displayActions(num)
{

select.play();
stage.removeChild(endTurnImage);    
stage.removeChild(display);
stage.removeChild(doneNow); 
stage.removeChild(exitMenu); 
stage.removeChild(doneText); 
stage.removeChild(exitMenuText); 
stage.removeChild(sortSkill1);
stage.removeChild(sortSkill2);
stage.removeChild(sortSkill3);
stage.removeChild(in_moveshold); 
stage.removeChild(changeBox1);
stage.removeChild(changeBox2);
stage.removeChild(changeBox3);
sortingMoves[0] = sortingMoves[1] = sortingMoves[2] = -1;


}



function battleEnd()
{
select.play();
var atC1,atC2, atC3, playerTarget1, playerTarget2,playerTarget3,move1, move2, move3, mu1, mu2, mu3, na;

p1character1.mu = p1character1.skills.indexOf(p1character1.moveUsed);
p1character2.mu = p1character2.skills.indexOf(p1character2.moveUsed);
p1character3.mu = p1character3.skills.indexOf(p1character3.moveUsed);

switch(p1character1.moveUsed)
{
  case -1:
  p1character1.moveUsed = -1;  
  break;
  
  case "g1":
  p1character1.moveUsed = 1;   
  break;
  
  case "g2":
  p1character1.moveUsed = 2;   
  break;
  
  case "g3":
  p1character1.moveUsed = 3;   
  break;
  
  case "g4":
  p1character1.moveUsed = 4;   
  break;
  
  case "g5":
  p1character1.moveUsed = 5;   
  break;
  
  case "g6":
  p1character1.moveUsed = 6;   
  break;
  
  case "g7":
  p1character1.moveUsed = 7;   
  break;
  
  case "g8":
  p1character1.moveUsed = 8;   
  break;
  
  case "g9":
  p1character1.moveUsed = 9;   
  break;
  
    case "zGu1":
  p1character1.moveUsed = 20;  
  break;
  
  case "zGu2":
  p1character1.moveUsed = 21;  
  break;
  
  case "zGu3":
  p1character1.moveUsed = 22;   
  break;
  
  case "zPo1":
  p1character1.moveUsed = 20;  
  break;
  
  case "zPo2":
  p1character1.moveUsed = 21;  
  break;
  
  case "zPo3":
  p1character1.moveUsed = 22;   
  break;
  
  case "zKG1":
  p1character1.moveUsed = 20;  
  break;
  
  case "zKG2":
  p1character1.moveUsed = 21;  
  break;
  
  case "zKG3":
  p1character1.moveUsed = 22;   
  break;
  
  case "zYa1":
  p1character1.moveUsed = 20;  
  break;
  
  case "zYa2":
  p1character1.moveUsed = 21;  
  break;
  
  case "zYa3":
  p1character1.moveUsed = 22;   
  break;
  
  case "zKn1":
  p1character1.moveUsed = 20;  
  break;
  
  case "zKn2":
  p1character1.moveUsed = 21;  
  break;
  
  case "zKn3":
  p1character1.moveUsed = 22;   
  break;

}

switch(p1character2.moveUsed)
{
 case -1:
  p1character2.moveUsed = -1;  
  break;
  
  case "g1":
  p1character2.moveUsed = 1;   
  break;
  
  case "g2":
  p1character2.moveUsed = 2;   
  break;
  
  case "g3":
  p1character2.moveUsed = 3;   
  break;
  
  case "g4":
  p1character2.moveUsed = 4;   
  break;
  
  case "g5":
  p1character2.moveUsed = 5;   
  break;
  
  case "g6":
  p1character2.moveUsed = 6;   
  break;
  
  case "g7":
  p1character2.moveUsed = 7;   
  break;
  
  case "g8":
  p1character2.moveUsed = 8;   
  break;
  
  case "g9":
  p1character2.moveUsed = 9;   
  break;
  
    case "zGu1":
  p1character2.moveUsed = 20;  
  break;
  
  case "zGu2":
  p1character2.moveUsed = 21;  
  break;
  
  case "zGu3":
  p1character2.moveUsed = 22;   
  break;
  
  case "zPo1":
  p1character2.moveUsed = 20;  
  break;
  
  case "zPo2":
  p1character2.moveUsed = 21;  
  break;
  
  case "zPo3":
  p1character2.moveUsed = 22;   
  break;
  
  case "zKG1":
  p1character2.moveUsed = 20;  
  break;
  
  case "zKG2":
  p1character2.moveUsed = 21;  
  break;
  
  case "zKG3":
  p1character2.moveUsed = 22;   
  break;
  
  case "zYa1":
  p1character2.moveUsed = 20;  
  break;
  
  case "zYa2":
  p1character2.moveUsed = 21;  
  break;
  
  case "zYa3":
  p1character2.moveUsed = 22;   
  break;
  
  case "zKn1":
  p1character2.moveUsed = 20;  
  break;
  
  case "zKn2":
  p1character2.moveUsed = 21;  
  break;
  
  case "zKn3":
  p1character2.moveUsed = 22;   
  break;
}

switch(p1character3.moveUsed)
{
  case -1:
  p1character3.moveUsed = -1;  
  break;
  
  case "g1":
  p1character3.moveUsed = 1;   
  break;
  
  case "g2":
  p1character3.moveUsed = 2;   
  break;
  
  case "g3":
  p1character3.moveUsed = 3;   
  break;
  
  case "g4":
  p1character3.moveUsed = 4;   
  break;
  
  case "g5":
  p1character3.moveUsed = 5;   
  break;
  
  case "g6":
  p1character3.moveUsed = 6;   
  break;
  
  case "g7":
  p1character3.moveUsed = 7;   
  break;
  
  case "g8":
  p1character3.moveUsed = 8;   
  break;
  
  case "g9":
  p1character3.moveUsed = 9;   
  break;
  
    case "zGu1":
  p1character3.moveUsed = 20;  
  break;
  
  case "zGu2":
  p1character3.moveUsed = 21;  
  break;
  
  case "zGu3":
  p1character3.moveUsed = 22;   
  break;
  
  case "zPo1":
  p1character3.moveUsed = 20;  
  break;
  
  case "zPo2":
  p1character3.moveUsed = 21;  
  break;
  
  case "zPo3":
  p1character3.moveUsed = 22;   
  break;
  
  case "zKG1":
  p1character3.moveUsed = 20;  
  break;
  
  case "zKG2":
  p1character3.moveUsed = 21;  
  break;
  
  case "zKG3":
  p1character3.moveUsed = 22;   
  break;
  
  case "zYa1":
  p1character3.moveUsed = 20;  
  break;
  
  case "zYa2":
  p1character3.moveUsed = 21;  
  break;
  
  case "zYa3":
  p1character3.moveUsed = 22;   
  break;
  
  case "zKn1":
  p1character3.moveUsed = 20;  
  break;
  
  case "zKn2":
  p1character3.moveUsed = 21;  
  break;
  
  case "zKn3":
  p1character3.moveUsed = 22;   
  break;
}

switch(sortingMoves[0])

{
  
case -1:
atC1 = -1;
break;

  case 1:
 atC1= 0;
 playerTarget1 = p1character1.targeted;
 move1 = p1character1.moveUsed;
 mu1 = p1character1.mu;
break;

case 2:
atC1= 1;
 playerTarget1 = p1character2.targeted;
 move1 = p1character2.moveUsed;
 mu1 = p1character2.mu;
break;

case 3:
 atC1= 2;
  playerTarget1 = p1character3.targeted;
  move1 = p1character3.moveUsed;
  mu1 = p1character3.mu;
break; 
  
}//end

switch(sortingMoves[1])

{
  
case -1:
atC2 = -1;
break;

  case 1:
 atC2= 0;
 playerTarget2 = p1character1.targeted;
 move2 = p1character1.moveUsed;
 mu2 = p1character1.mu;
break;

case 2:
atC2= 1;
 playerTarget2 = p1character2.targeted;
 move2 = p1character2.moveUsed;
 mu2 = p1character2.mu;
break;

case 3:
 atC2= 2;
  playerTarget2 = p1character3.targeted;
  move2 = p1character3.moveUsed;
  mu2 = p1character3.mu;
break; 
  
}//end

switch(sortingMoves[2])

{
  
case -1:
atC3 = -1;
break;

  case 1:
 atC3= 0;
 playerTarget3 = p1character1.targeted;
 move3 = p1character1.moveUsed;
 mu3 = p1character1.mu;
break;

case 2:
atC3= 1;
 playerTarget3 = p1character2.targeted;
 move3 = p1character2.moveUsed;
 mu3 = p1character2.mu;
break;

case 3:
 atC3= 2;
  playerTarget3 = p1character3.targeted;
  move3 = p1character3.moveUsed;
  mu3 = p1character3.mu;
break; 
  
}//end
if (move1 === undefined)
{move1 = -1;}
if (move2 === undefined)
{move2 = -1;}
if (move3 === undefined)
{ move3 = -1;}

na = 0;

console.log("p1character1.targeted: " + p1character1.targeted + "p1character2.targeted: "  + p1character2.targeted+ "p1character3.targeted: " + p1character3.targeted);
if(p1character1.targeted === -1)
{
    na += 1;
}

if(p1character2.targeted === -1)
{
    na += 2;
}

if(p1character3.targeted === -1)
{
    na += 4;
}
console.log("NA: " + na);

var file = { action: "attack", m1: move1, m2: move2, m3: move3, ofC1: atC1, ofC2: atC2, ofC3: atC3, target1: playerTarget1, target2: playerTarget2, target3: playerTarget3, ms1: mu1,ms2: mu2,ms3: mu3,c: na, game_id: user.game_id, user_id: user.player_id};
ws.send(JSON.stringify(file)); 
console.log(file); 

check = true;
displayActions(1);
turn = false;
//var find = { action: "end_turn", game_id: user.game_id, user_id: user.player_id};
//   ws.send(JSON.stringify(find));
}






//Timer Function
function updateTime()
{
    gameTime -= 1;
    
    
    if (gameTime > 59)
    {
     
       var currentTime1 = 1;
       var currentTime2 = gameTime - 60;
       timerText.text = "Time: " + currentTime1.toString() + ":" + currentTime2.toString();

       if(currentTime2 < 10) 
       {
        timerText.text = "Time: " + currentTime1.toString() + ":" + "0" + currentTime2.toString();
       }
    }

    else if (gameTime < 59)
    {
      
      var currentTime1 = 0;
       timerText.text = "Time: " + currentTime1.toString() + ":" + gameTime.toString();

       if(gameTime < 10) 
       {
        timerText.text = "Time: " + currentTime1.toString() + ":" + "0" + gameTime.toString();
       }
    }

    
//Restarts the bar.
if (gameTime === 0 )
    {
        
        //Change the nCount to change time
        //gameTime = clockCounter;
       
        
        if (turn === true && check === false)
        {
        battleEnd();
        
        var na = 0;
    if(p1character1.targeted === -1)
    {
    na += 1;
    }

    if(p1character2.targeted === -1)
    {
    na += 2;
    }

    if(p1character3.targeted === -1)
    {
    na += 4;
    }
        var end = { action: "end_turn", game_id: user.game_id,c: na, user_id: user.player_id};
        ws.send(JSON.stringify(end));
        clearInterval(gameTimer);
        }
       
      
    }
   

}



} //GameLoop ends


//This is for testing



function loadLadder()
{
$("#contents").fadeOut(1000);
$("#game").fadeIn(2000).removeClass( "hidden" );
//select.play();  
this.endTurnImage = new createjs.Shape();
endTurnImage.graphics.beginFill("black").drawRect(0,0, 1100, 700);
endTurnImage.alpha = .2;
stage.addChild(endTurnImage); 
stage.addEventListener("click",nothing);

var box = new createjs.Shape();
box.graphics.beginFill("black").beginStroke("orange").setStrokeStyle(2).drawRoundRect(290, 100, 500, 300,15);
box.alpha = .6;
stage.addChild(box); 


this.info = new createjs.Text("Finding Match...", "20px Arial", "white");
    info.x = 470;
    info.y = 110;
    stage.addChild(info);
    
var h_load = new createjs.Shape();
h_load.graphics.beginStroke("white").setStrokeStyle(2).drawRect(379, 149, 322, 181,15);
stage.addChild(h_load); 

cancelbutton = new createjs.Bitmap(queue.getResult("cancelLoad"));
cancelbutton.x = 490;
cancelbutton.y = 340;
stage.addChild(cancelbutton); 
cancelbutton.addEventListener("click",cancel); 



function nothing()
{
    
}
  
var data = {
    images: [queue.getResult('find')],
    frames: {width:320, height:179},
    animations: {
        run:[1,14],
        speed: 0.5,
    }
};

var spriteSheet = new createjs.SpriteSheet(data);
var animation = new createjs.Sprite(spriteSheet, "run");
 animation.x = 380;
 animation.y = 150;
stage.addChild(animation);



function cancel()    
{
  //select.play();
  $( "#game" ).addClass( "hidden" );
  $("#contents").fadeIn(1000);
  stage.removeChild(endTurnImage);   
  stage.removeChild(box);  
  stage.removeChild(done);
  stage.removeChild(h_load);
  //done.removeEventListener("click",cancel);
  stage.removeEventListener("click",nothing);
  stage.removeChild(animation);
  stage.removeChild(info);
 var bye = { action: "cancel_ladder", user_id: user.player_id};    
ws.send(JSON.stringify(bye));
console.log(bye);
}


function match()
{
 var find = { action: "new_ladder"};    
 ws.send(JSON.stringify(find));   
}

setTimeout(match,3000);

}

function Menu(n)
{
    
   var a =  $(n).attr("id");
   a = parseInt(a);
   console.log("link?");
   switch(a)
   {
       case 1:
       window.open(["/"]);    
       //$(content).load("/");
       break;
       
       case 2:
       window.open(["/forums"]); 
       break;
       
       case 3:
       $("#contents").load("/arena/team");
       $("#contents").hide();
       setTimeout(function(){ Team(); $("#contents").fadeIn(1000); }, 1000);
       
       break;
       
       case 4:
       loadLadder();
       break;
       
       case 5:
    $("#contents").load("/arena/menu");
    setTimeout(mainMenu,1000);
       break;
       
       case 6:
        var t_save = '["'+p1stats.c1+'","'+p1stats.c2+'","'+p1stats.c3+'"]';
        var m_save1 = p1stats.cS1;
        var m_save2 = p1stats.cS2;
        var m_save3 = p1stats.cS3;
      var send  = { action: "characters", team:t_save, m1: m_save1 ,m2: m_save2,m3: m_save3};
      console.log(send);
      ws.send(JSON.stringify(send)); 
      $("#save").modal("show");
       break;
       
       case 7:
       break;
       
       case 8:
       break;
       
       case 9:
       $("#contents").load("/arena/character");
       setTimeout(character,1000);
      
       break;
       
       case 10:
       break;
   }
   return false;
   
}