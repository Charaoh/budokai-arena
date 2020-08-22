var createdSkills = 0;
var allSkills;
var charactersAlternatives = [];
var allSkillsAlter = {};
var cA;
(function () {
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var create = document.getElementById('create');


  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    var text = createTxt();
    link.href = makeTextFile(text);
    link.style.display = 'block';
  }, false);
})();

function updatePanel(a)
{
    var b;
    b = $(a).attr("id");
    b = Number(b);
    console.log("B: " + b);
    //<input type="text" class="form-control" name="username" id="user" placeholder="Enter username" required> <br>
    //<input type="password" class="form-control" name="password" id="text" placeholder="Enter password" required> <br>
    switch(b)
    {
        case 1:
        $("#Update1").empty().append('<input type="text" class="form-control" name="username" id="user" placeholder="Enter username" required> <br> <input type="password" class="form-control" name="password" id="text" placeholder="Enter password" required> <br>');
        $("#title").text("Change User Password");
        $("#panelchoice").modal("show");
        $("#send").attr("id2","20")
        break;
        
        case 2:
        $("#Update1").empty().append('<input type="text" class="form-control" name="username" id="user" placeholder="Enter username" required> <br>');
        $("#title").text("Ban User or Unban User");
        $("#panelchoice").modal("show");
        $("#send").attr("id2","21")
        break;
        
        case 3:
        $("#title").text("Mod or Demote Mod");
        $("#panelchoice").modal("show");
        $("#Update1").empty().append('<input type="text" class="form-control" name="username" id="user" placeholder="Enter username" required> <br><input type="text" class="form-control" name="group" id="text" placeholder="Enter Group Name" required> <br>');
        $("#send").attr("id2","22")
        break;
        
        case 4:
        $("#title").text("Admin or Demote Admin");
        $("#panelchoice").modal("show");
        $("#Update1").empty().append('<input type="text" class="form-control" name="username" id="user" placeholder="Enter username" required> <br>');
        $("#send").attr("id2","23")
        break;
        
        case 5:
        console.log("In here");
        $( "#news").load( "/admin-only/news" );
        break;
        
        case 6:
         $("#title").text("Update Characters");
        $("#panelchoice").modal("show");
        $("#Update1").empty().append('<input type="text" class="form-control" name="username" id="user" placeholder="Character Name" required> <br><input type="text" class="form-control" name="group" id="text" placeholder="Enter Skills" required>');
        $("#send").attr("id2","25")
        break;
        
        default:
        console.log("Error");
        
        
    }
}

function sendServer(a)
{
    var b,c,d;
    b = $(a).attr("id2")
    b = Number(b);
    c = $("#text").val()
    d = $("#user").val()
    console.log("b: " + b);
    
    switch(b)
    {
        case 20:
        console.log("Password");
        $.ajax({
            type: "POST",
  url: "/admin-only/password",
  data: {
    username: d,
    password: c
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
     $("#panelchoice").modal("hide");
  }
});
break;
        case 21:
        console.log("Ban");    
        $.ajax({
            type: "POST",
  url: "/admin-only/ban",
  data: {
    username: d
   
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
      $("#panelchoice").modal("hide");
  }
});
break;
        case 22:
        $.ajax({
        type: "POST",
  url: "/admin-only/mod",
  data: {
    username: d,
    group: c
   
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
      $("#panelchoice").modal("hide");
  }
});
break;
        case 23:
         $.ajax({
    type: "POST",
  url: "/admin-only/admin",
  data: {
    username: d
   
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
      $("#panelchoice").modal("hide");
  }
});
break;
        case 24:
         $.ajax({
    type: "POST",
  url: "/admin-only/admin",
  data: {
    username: d
   
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
      $("#panelchoice").modal("hide");
  }
});
break;
        case 25:
                $.ajax({
        type: "POST",
  url: "/admin-only/characters",
  data: {
    name: d,
    skills: c.split(',')
   
  },
  success: function( data ) {
     console.log(data);
     $("#infoUpdate").text(data.report);
      $("#panelchoice").modal("hide");
  }
});
            break;
    }
        
}
    
    
function editCategory(a)
{
   var d =  $(a).attr("id");
   var b =  $(a).data("id2");
   var c =  $(a).data("id3");
   var e =  $(a).data("id4");
   var h;
   
   e = Boolean(e);
   
   if (e)
   {
       console.log("Working");
      h = 1;
   }
   else
   {
      h = 0;
   }

   $("#id").val(d);
   $("#changename").val(b);
   $("#changeorder").val(c);
   $("#changestaff").prop("selectedIndex", h);
    $("#Edit-Category").modal("show");
}

   

function transform()
{
      $("#alternativeSkillsArea").empty().append('  <label>Transformation ID </label><input class="form-control" id="transformationID" value="10000"> <label>Character Name (Please Space Saga Letter)</label><input class="form-control" id="characterName1" value="Kaioken Goku Z"><label>Description</label><input class="form-control" id="characterDescription1"><br><button class="btn-block" onclick="transformUpdate();">Add Transformations Alternatives</button>');
    $("#alternativeSkills").modal("show");
}

function transformUpdate()
{
  
    charactersAlternatives.push([$("#characterName1").val(), $("#characterDescription1").val(),$("#transformationID").val()]);
    $("#alternativeSkills").modal("hide");

}

function transformClear()
{
    charactersAlternatives = [];
}
function addAlternativeSkill(num,num2)
{
    cA = num;
    console.log(num);
     $("#alternativeSkillsArea").empty().append('<div class="panel-body"><label>Transformation ID</label><input id="transformationAlter" class="form-control"><label>Name of Skill</label><input id="skillName" class="form-control"><label>Description</label><input id="skillDescription" class="form-control"> <label>BP Cost</label><input id="skillBP" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control"> <label>Cooldown Cost</label><input id="skillCooldown" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control"> <label>Energy Cost</label><input id="skillEnergy" class="form-control" onkeypress="return event.charCode >= 48 && event.charCode <= 57"><label>Type of skill</label>  <select class="form-control" id="skillType"> <option value="Ki">Ki</option><option value="Strength">Strength</option><option value="Power-Up">Power-Up</option><option value="Power-Down">Power-Down</option><option value="Transformation">Transformation</option><option value="Afflication">Afflication</option><option value="Defensive">Defensive</option> </select> <label>Name of Skill</label><select class="form-control" id="skillTarget"> <option value="Enemy">Enemy</option><option value="Multiple-Enemies">Multiple-Enemies</option><option value="Self">Self</option><option value="Ally">Ally</option> <option value="Other-Allies">OTHER ALLIES</option><option value="Any-Ally">Any Ally</option><option value="All-Allies">All-Allies</option><option value="All">All</option></select> <label>Rarity</label> <select class="form-control" id="skillRarity"> <option value="C">Common</option><option value="R">Rare</option><option value="S">SuperRare</option><option value="L">Legendary</option></select><label>Alternative Skill IDs (Seperate by commas )</label><input value="none" id="skillAlternative" class="form-control"><label>Add Alternative Skills</label><button class="btn-block" onclick="alternativeSkillUpdate('+ num+','+num2+');">Add Alternative Skill</button><input id="skillName" type="hidden" class="form-control"></div>');
    $("#alternativeSkills").modal("show");
   
    $("#skillDescription").val($("#skillDescription"+cA).val());
         $("#skillName").val($("#skillName"+cA).val());
         $("#skillRarity").val($("#skillRarity"+cA).val());
         $("#skillBP").val($("#skillBP"+cA).val()); 
         $("#skillCooldown").val($("#skillCooldown"+cA).val());
         $("#skillEnergy").val($("#skillEnergy"+cA).val());
         $("#skillType").val($("#skillType"+cA).val());
         $("#skillTarget").val($("#skillTarget"+cA).val());
         $("#skillID").val($("#skillID"+cA).val());
         $("#skillAlternative").val($("#skillAlternative"+cA).val());
         
}

function alternativeSkillUpdate(num,num2)
{
    var sDescription,sName,sTags = [],sID,sRarity,sBp,sEp,sCd,sTy,sTt,sAt,sFc,sIsTrans,sCl;
     sDescription =  $("#skillDescription").val();
         sName =  $("#skillName").val();
         sRarity = $("#skillRarity").val();
        sBp =  $("#skillBP").val();
         sCd =  $("#skillCooldown").val();
         sEp = $("#skillEnergy").val();
        sTy =  $("#skillType").val();
         sTt =  $("#skillTarget").val();
         sID = $("#skillID").val();
         sAt = $("#skillAlternative").val();
         sCl = $("#transformationAlter").val();
         
         sID = num2;
         
         switch(sTt)
          {
              case "Enemy":
              sFc = 1;
              break;
              
              case "Multiple-Enemies":
              sFc = 2;
              break;
              
              case "Self":
              sFc = 3;
              break;
              
              case "Ally":
              sFc = 4;
              break;
              
              case "Other-Allies":
              sFc = 5;
              break;
              
              case "Any-Ally":
              sFc = 6;           
              break;
              
              case "All-Allies":
              sFc = 7;
              break;
              
              case "All":
              sFc = 8;  
              break;
              
              
          }
    
         allSkillsAlter[num2].push([sName,sRarity,sBp,sCd,sEp,sTy,sTt,sAt,sFc,sCl,sDescription]);
         
           $("#alternativeSkills").modal("hide");
}
function createSkills()
{
    var skillAmount = parseInt($("#createSkills").val());
    var skillId = $("#createSkillsIDs").val();
    var skillId = skillId.split(',');
    allSkills = skillId;
    createdSkills = skillAmount;
    console.log(skillId);
   $("#skillsArea").empty();
   console.log(skillAmount);
   

    for (var i= 0; i < skillAmount; i++) {
        console.log(i);
        $("#skillsArea").append('<div class="panel panel-default"><div class="panel-heading" id="skillID"><h3 class="panel-title">'+ skillId[i]+'</h3></div><div class="panel-body" ><label>Name of Skill</label><input id="skillName'+i+'"  class="form-control"><label>Description</label><input id="skillDescription'+i+'"  class="form-control"> <label>BP Cost</label><input onkeypress="return event.charCode >= 48 && event.charCode <= 57" id="skillBP'+i+'" class="form-control"> <label>Cooldown Cost</label><input onkeypress="return event.charCode >= 48 && event.charCode <= 57" id="skillCooldown'+i+'" class="form-control"> <label>Energy Cost</label><input onkeypress="return event.charCode >= 48 && event.charCode <= 57" id="skillEnergy'+i+'" class="form-control"><label>Type of skill</label>  <select class="form-control" id="skillType'+i+'"> <option value="Ki">Ki</option><option value="Strength">Strength</option><option value="Power-Up">Power-Up</option><option value="Power-Down">Power-Down</option><option value="Transformation">Transformation</option><option value="Afflication">Afflication</option><option value="Defensive">Defensive</option> </select> <label>Name of Skill</label><select class="form-control" id="skillTarget'+i+'"> <option value="Enemy">Enemy</option><option value="Multiple-Enemies">Multiple-Enemies</option><option value="Self">Self</option><option value="Ally">Ally</option> <option value="Other-Allies">OTHER ALLIES</option><option value="Any-Ally">Any Ally</option><option value="All-Allies">All-Allies</option><option value="All">All</option></select> <label>Rarity</label> <select class="form-control" id="skillRarity'+i+'"> <option value="C">Common</option><option value="R">Rare</option><option value="S">SuperRare</option><option value="L">Legendary</option></select><label>Is This a transformation?</label><select class="form-control" id="skillTransformation'+i+'"> <option value="T">Yes</option><option value="S">No</option></select><label>Alternative Skill IDs (Seperate by commas )</label><input value="none" id="skillAlternative'+i+'"  class="form-control"><label>Add Alternative Skills</label><button class="btn-block" onclick="addAlternativeSkill('+i+','+skillId[i]+');">Add Alternative Skill</button><input id="skillName'+i+'"  type="hidden" class="form-control"></div></div></div>');
    allSkillsAlter[skillId[i]] = [];
        
        
    }
    
}   


// id="skillName"
 function createTxt()
      {   var welcome;
          var characterListJs;
          var skillListJs = "";
          var showSkillsJs = "";
          var characterCreateTeam;
          var cDescription,cName,cTags = [],cShort,cStats,cRarity,cNameCut;
          var sDescription,sName,sTags = [],sID,sRarity,sBp,sEp,sCd,sTy,sTt,sAt,sFc,sIsTrans,sCl,alterLength;
          var queueJs = "";
          var skillRB;
          
          
          console.log("Create Skills: " + createdSkills);
          
          var checkedBoxes = document.querySelectorAll('input[name=characterTags]:checked');
        // Character Variables
         cDescription =  $("#characterDescription").val();
         cName =  $("#characterName").val();
         cRarity = $("#characterRarity").val();
         cStats = $("#characterStats").val();
         cNameCut = cName.replace(/\s/g, '');
        //Character Variables
        
        //Skill Variables
        
         
        // sAt = $("#skillAlternative").val();
         
         // Character Variables
         console.log(checkedBoxes);
         var length = checkedBoxes.length;
                $("input[name=characterTags]:checked").each(function() {
       cTags.push($(this).val());
  });
         cShort = cName[cName.length-1].toLowerCase() + cName[0].toUpperCase() + cName[cName.length-3].toLowerCase();
           
          console.log(cShort);
          //character Variables 0.Description  1.Name 2.Tags 3.Rarity 4.Shorten Name
        
     
          var txtFile = "";
          
          welcome = "Welcome To character self made coder. Read the comments to get quick links in the brackets(using Ctrl - f) and just copy and paste!  \r\nVersion 1.0: Alpha \r\nLatest Update:Able to Create Basic Character Output!";
          characterListJs = '\r\n\r\n******GAME.JS File: This is for [function characterList]. Delete this comment after your done.******\r\n // '+ cName+'  \r\ncase "'+ cShort +'":\r\nif (d[0] === "none")\r\n{ \r\nb.push("'+cDescription+'");\r\nb.push("/skills/'+cShort+'.png"); \r\nb.push("'+ cName+'"); \r\nb.push("'+ cTags.toString()+'"); \r\nb.push("'+cRarity+'");\r\nb.push(['+ cStats+']);\r\n}\r\nbreak;';
          characterCreateTeam = '\r\n\r\n******GAME.RB File: This is for [def self.create_team]. Delete this comment after your done.******\r\nwhen "'+ cShort+'"\r\n team["'+cShort+'"] = GokuZ.new(controlling_player, s[i], stats["'+cShort+'"], 170, true, ['+ cStats +'],c[i],i,"'+cName+'")';
          skillListJs = "\r\n\r\n******GAME.JS File: This is for [function SkillList]. Delete this comment after your done.******\r\n";
          showSkillsJs += '\r\n\r\n******GAME.JS File: This is for [function showSkills]. Delete this comment after your done.******\r\n case "'+cShort+ '":\r\n genericSkills(1);\r\n ';
          queueJs += '\r\n\r\n******GAME.JS File: This is for [//Main Queue For Game].Remember to add Pictures to skill folder! Delete this comment after your done.******\r\n{id: "'+cShort+'", src: "skills/'+cShort+'.png"},';
          
 
          for (var i = 0; i < charactersAlternatives.length; i++) {
             
              characterListJs += '\r\nelse if (d[0] === '+charactersAlternatives[i][2]+')\r\n{ \r\nb.push("'+charactersAlternatives[i][1]+'");\r\nb.push("/skills/'+cShort+'.png"); \r\nb.push("'+charactersAlternatives[i][0]+'"); \r\nb.push("'+ cTags.toString()+'"); \r\nb.push("'+cRarity+'");\r\nb.push(['+ cStats+']);\r\n}\r\nbreak;\r\n';
          }
     
         
          for (var i = 0; i < createdSkills; i++) {
            sDescription =  $("#skillDescription"+i).val();
         sName =  $("#skillName"+i).val();
         sRarity = $("#skillRarity"+i).val();
        sBp =  $("#skillBP"+i).val();
         sCd =  $("#skillCooldown"+i).val();
         sEp = $("#skillEnergy"+i).val();
        sTy =  $("#skillType"+i).val();
         sTt =  $("#skillTarget"+i).val();
         sID = $("#skillID"+i).val();
         sAt = $("#skillAlternative"+i).val();
         
         if (sAt === "none")
         {
             sAt = '"none"';
         }
         switch(sTt)
          {
              case "Enemy":
              sFc = 1;
              break;
              
              case "Multiple-Enemies":
              sFc = 2;
              break;
              
              case "Self":
              sFc = 3;
              break;
              
              case "Ally":
              sFc = 4;
              break;
              
              case "Other-Allies":
              sFc = 5;
              break;
              
              case "Any-Ally":
              sFc = 6;           
              break;
              
              case "All-Allies":
              sFc = 7;
              break;
              
              case "All":
              sFc = 8;  
              break;
              
              
          }
         sIsTrans = $("#skillTransformation0"+i).val();
        
            skillListJs += 'case '+allSkills[i]+':\r\n\r\nif(d[0] === "none")\r\n{\r\nb.push("/skills/'+allSkills[i]+'.png");\r\nb.push('+sBp+');\r\nb.push('+sCd+');\r\nb.push( "'+sDescription+'");\r\nb.push('+sEp+');\r\nb.push("'+sName+'");\r\nb.push( "'+sTy+'");\r\nb.push( "'+sTt+'");\r\nb.push(['+sAt+']);\r\nb.push('+sFc+');\r\nb.push("'+sRarity+'");\r\n}\r\n';
           alterLength = allSkillsAlter[allSkills[i]].length;
     
          
            for (var x = 0; x < alterLength; x++) {   
                if (sAt === "none")
         {
             sAt = '"none"';
         }
            skillListJs += '\r\n else if(d[0] === "'+allSkillsAlter[allSkills[i]][x][9]+'"\r\n{\r\n\r\nb.push("/skills/'+allSkillsAlter[allSkills[i]][x][9]+'.png");\r\nb.push('+allSkillsAlter[allSkills[i]][x][2]+');\r\nb.push('+allSkillsAlter[allSkills[i]][x][3]+');\r\nb.push( "'+allSkillsAlter[allSkills[i]][x][10]+'");\r\nb.push('+allSkillsAlter[allSkills[i]][x][4]+');\r\nb.push("'+allSkillsAlter[allSkills[i]][x][0]+'");\r\nb.push( "'+allSkillsAlter[allSkills[i]][x][5]+'");\r\nb.push( "'+allSkillsAlter[allSkills[i]][x][6]+'");\r\nb.push(['+sAt+']);\r\nb.push('+allSkillsAlter[allSkills[i]][x][8]+');\r\nb.push("'+allSkillsAlter[allSkills[i]][x][1]+'");\r\n}\r\n';
            }
            
            skillListJs += 'break;\r\n\r\n';
            showSkillsJs += 'if (p1stats.us.hasOwnProperty("'+allSkills[i]+'") === true )\r\n{ \r\n$(".select").append("<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#" data-move="'+allSkills[i]+'" data-type="'+sIsTrans+'" onclick="skillD(this,false);return false;"><img class="img responsive  "  src="/skills/'+allSkills[i]+'.png" ></a> </div>");  \r\n}\r\nelse\r\n{\r\n$(".select").append("<div class="item-to-tag col-xs-3 col-sm-2 img" data-item-tags="unqiue"><a href="#"  ><img class="notunlocked img responsive  "  src="/skills/'+allSkills[i]+'.png" ></a> </div>"); \r\n}\r\n';
            queueJs += '\r\n{id: "'+allSkills[i]+'", src: "skills/'+allSkills[i]+'.png"},\r\n';
            console.log(allSkills[i]);
          }
         
         
         
          txtFile += welcome;
          txtFile += queueJs;
          txtFile += characterListJs;
          txtFile += characterCreateTeam;
          txtFile += skillListJs;
          txtFile += showSkillsJs + "\r\n break;\r\n";
          return txtFile;
      }
   
    
    /*
    <select class="form-control" id="skillRarity"> 
    <option value="C">Common</option>
    <option value="R">Rare</option>
    <option value="S">SuperRare</option>
    <option value="L">Legendary</option>
    </select>
    
    
    */
    
    