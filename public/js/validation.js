

function effectiveDeviceWidth() {
    var deviceWidth = window.orientation == 0 ? window.screen.width : window.screen.height;
    // iOS returns available pixels, Android returns pixels / pixel ratio
    // http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
    if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
        deviceWidth = deviceWidth / window.devicePixelRatio;
    }
    return deviceWidth;
}



var width = effectiveDeviceWidth();
if (width > 600)
{
    console.log(width);
    width = true;
}

else
{
    width = false;
}
console.log(width);
$(function(){var t=$(".upload-file"),e=t.data("max-size");$(".upload-form").submit(function(){if(!t.get(0).files.length)return alert("choose file, please"),!1;var o=t.get(0).files[0].size;return o>e?(alert("File size is to big!"),!1):void 0})});

function updateTextConverter(t){var $a=$(t).attr("id"),
$b=$(t).attr("id2"),
$c=$(t).attr("id3"),
$d=$(t).attr("id4"),
$e=$(t).attr("id5");
$d = Number($d);
 switch($d)
    {
        case 1:
             $(".newText").text("Edit Comment"),
             $(".modal-body #put").attr("value","put"),
           $(".modal-body #textUpdate").val($c),
$(".modal-body #form").attr("action","/news/"+$a+"/comment/"+$b),
$(".modal-body #form2").attr("action","/news/"+$a+"/comment/"+$b),
$(".modal-body #button").val("Edit Comment"),
           $(".modal-body #hidden").show();
$("#edit_reply").modal("show");
        break;
        
        case 2:
          if(width)
          {
          $(".newText").text("Edit Topic"),
             $(".modal-body #put").attr("value","put"),
           $(".modal-body #textUpdate").val($c),
$(".modal-body #form").attr("action",window.location.pathname),
$(".modal-footer #form2").attr("action",window.location.pathname),
$(".modal-body #button").val("Edit Comment"),
$(".modal-body #title").val($a).attr('required'),
$(".modal-body #titleHold").show();
$("#edit_reply").modal("show");
          }
          
          else
          {
               $("#moblieput").attr("value","put"),
          $("#mobileform").attr("action",window.location.pathname),
          document.getElementById("moblietitle").value = $a 
              document.getElementById("textUpdate").value = $c; 
 $('html, body').animate({
        scrollTop: $("#textUpdate").offset().top
    }, 2000);  
          }
        break;
        
        case 3:
        $("#moblieput").attr("value",""),
          $("#mobileform").attr("action",window.location.pathname),
          document.getElementById("textUpdate").value += ">" + $a + " wrote: \n\n>" + $b.replace(/\s+/g, '   ') + "\n\n"; 
 $('html, body').animate({
        scrollTop: $("#textUpdate").offset().top
    }, 2000); 
        break;
        
        case 4:
            if(width)
            {
          $(".newText").text("Edit Comment"),
             $(".modal-body #put").attr("value","put"),
           $(".modal-body #textUpdate").val($c),
$(".modal-body #form").attr("action",window.location.pathname + "/" + $b),
$(".modal-footer #form2").attr("action",window.location.pathname + "/" + $b),
$(".modal-body #button").val("Edit Comment"),
$(".modal-body #title").val("").removeAttr('required'),
           $(".modal-body #hidden").show();
$("#edit_reply").modal("show");
$(".modal-body #titleHold").hide();

            }
            
            else
            
            {
                               $("#moblieput").attr("value","put"),
          $("#mobileform").attr("action",window.location.pathname + "/" + $b),
              document.getElementById("textUpdate").value = $c; 
 $('html, body').animate({
        scrollTop: $("#textUpdate").offset().top
    }, 2000);  
            }
        break;
        
        case 5:
            if(width)
            {
               $("#create_topic").modal("show") ;
                $("#mobiletopic").remove();
            }
            else{
                
             $("#create_topic").remove();
             $("#textUpdate").attr("id","textUpdate");
             $("#mobiletopic").removeClass("hidden");
            $('html, body').animate({
        scrollTop: $("#title").offset().top
    }, 2000);  
   

}
        break;
        
        case 6:
           
             if(width)
          {
          $(".newText").text("Private Message"),
             $(".modal-body #put").attr("value",""),
           $(".modal-body #textUpdate").val(""),
           $("#location").val(window.location.pathname),
$(".modal-body #form").attr("action","/messages"),
$(".modal-body #button").val("Send Message"),
$(".modal-body #user").val($a),
$(".modal-body #title").val("").attr('required'),
$(".modal-body #titleHold").show();
$("#edit_reply").modal("show");
          }
          
          else
          {
          
          }
        break;
        
        case 7:
           $(".newText").text("Private Message"),
          
           $("#location").val(window.location.pathname),
$(".modal-body #form").attr("action","/messages"),
$(".modal-body #button").val("Send Message"),
$(".modal-body #user").val($a).show()
$(".modal-body #hideuser").show(),
$(".modal-body #titlehold").show(),
$("#edit_reply").modal("show");
$("#textUpdate").val('');          
            break;
            
             case 8:
           $(".newText").text("Advance Comment"),
          
           $("#location").val(window.location.pathname),
$(".modal-body #form").attr("action",window.location.pathname + "/comment"),
$(".modal-body #hideuser").hide(),
$(".modal-body #titlehold").hide(),
$(".modal-body #title").val("").removeAttr('required'),
$("#edit_reply").modal("show");
$("#textUpdate").val('');
            
            break;
            
            case 9:
            $(".newText").text("Edit Comment"),
          
           $("#location").val(window.location.pathname),
$(".modal-body #form").attr("action",window.location.pathname + "/edit"),
$(".modal-body #hideuser").hide(),
$(".modal-body #titlehold").hide(),
$(".modal-body #title").val("").removeAttr('required'),
$("#edit_reply").modal("show");
console.log($c);
$("#comment_id").val($c);
$("textarea").val($b);         
            break;
            
            case 10:
            $(".newText").text("Change Signature"),
          
           $("#location").val(window.location.pathname),
$(".modal-body #form").attr("action","/change_signature"),
$(".modal-body #hideuser").hide(),
$(".modal-body #titlehold").hide(),
$(".modal-body #title").val("").removeAttr('required'),
$("#edit_reply").modal("show");
$("#comment_id").val($b);
$("textarea").val($c);         
            break;
    }
    
    


}



function changeText(t) {
     var a = $(t).attr("id");
     a = Number(a);
     var b = $(t).attr("id2");
     b = Number(b);
     
     
     
    switch(a)
    {
    case 1:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ' **Your_Text**');
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() + ' **Your_Text**');
        }
    break;
    
    case 2:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ' *Your_Text*');
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() + ' *Your_Text*');
        }
    break;
    
    case 3:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + ">Name wrote: \n\n>Quote >");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  ">Name \n >>Quote\n\n ");
        }
      
    break;
    
    case 4:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "[Words](linkhere)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "[Words](linkhere)");
        }
       
    break;
    
    case 5:
      if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "~~Yourword~~");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "~~Yourword~~");
        }   
    
    break;
    
    case 6:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Title](/path/to/img.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Title](/path/to/img.png)");
        }   
   
    break;
    
    case 7:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "#Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #Text");
        }   
      
    break;
    
    case 8:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ##Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ##Text");
        }        
    break;
    
    case 9:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ###Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ###Text");
        }      
    break;
    
    case 10:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " ####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " ####Text");
        }       
    break;
    
    case 11:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " #####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #####Text");
        }         
    break;
    
    case 12:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + " #####Text");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  " #####Text");
        }   
    break;
    
    case 13:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "[![Title][2]][1]\n[1]: https://link/to/site\n[2]: https://link/to/image");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "[![Title][2]][1]\n[1]: https://link/to/site\n[2]: https://link/to/image");
        }   
       
    break;
    
    

  
  

    
    }
    
   
}

function smiley(t) {
     var a = $(t).attr("id");
     a = Number(a);
     var b = $(t).attr("id2");
     b = Number(b);
     console.log("Smile?");
 
console.log($("#textUpdate").val());
    switch(a)
    {
    case 1:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Umm](/images/smileys/s1.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Umm](/images/smileys/s1.png)");
        }
   
    break;
    
    case 2:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![w/e](/images/smileys/s2.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![w/e](/images/smileys/s2.png)");
        }
    
    break;
    
    case 3:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![hehe](/images/smileys/s3.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![hehe](/images/smileys/s3.png)");
        } 
    break;
    
    case 4:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![zzz](/images/smileys/s4.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![zzz](/images/smileys/s4.png)");
        }
    break;
    
    case 5:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Grr](/images/smileys/s5.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Grr](/images/smileys/s5.png)");
        }
    break;
    
    case 6:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Grin](/images/smileys/s6.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Grin](/images/smileys/s6.png)");
        }   
    break;
    
    case 7:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![GO](/images/smileys/s7.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![GO](/images/smileys/s7.png)");
        }    
    break;
    
    case 8:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![haha](/images/smileys/s8.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![haha](/images/smileys/s8.png)");
        }       
    break;
    
    case 9:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![happy](/images/smileys/s9.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![happy](/images/smileys/s9.png)");
        }   
    break;
    
    case 10:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![What?!](/images/smileys/s10.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![happy](/images/smileys/s10.png)");
        } 
   
    break;
    
    case 11:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Yea..](/images/smileys/s11.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Yea..](/images/smileys/s11.png)");
        } 
    
    break;
    
    case 12:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Confused](/images/smileys/s12.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Confused](/images/smileys/s12.png)");
        } 
    break;
    
    case 13:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Glorious](/images/smileys/s13.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Glorious](/images/smileys/s13.png)");
        } 
    break;
    
    case 14:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![cry](/images/smileys/s14.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![cry](/images/smileys/s14.png)");
        } 
    break;
    
    case 15:
     if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![angryhuh](/images/smileys/s15.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![angryhuh](/images/smileys/s15.png)");
        }  
    break;
    
    case 16:
         if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![tsundre](/images/smileys/s16.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![tsundre](/images/smileys/s16.png)");
        } 
   
    break;
    
    case 17:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![wow...](/images/smileys/s17.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![wow...](/images/smileys/s17.png)");
        }     
    break;
    
    case 18:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![love](/images/smileys/s18.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![love](/images/smileys/s18.png)");
        } 
    break;
    
    case 19:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![huh?](/images/smileys/s19.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![huh?](/images/smileys/s19.png)");
        }     
    break;
    
    case 20:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![smile](/images/smileys/s20.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![smile](/images/smileys/s20.png)");
        } 
      
    break;
    
    case 21:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Yea...](/images/smileys/s21.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Yea...](/images/smileys/s21.png)");
        } 
    break;
    
    case 22:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![ploting](/images/smileys/s22.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![ploting](/images/smileys/s22.png)");
        }   
    break;
    
    case 23:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![hmm?](/images/smileys/s23.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![hmm?](/images/smileys/s23.png)");
        }     
    break;
    
    case 24:
        if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![Yea I know](/images/smileys/s24.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![Yea I know](/images/smileys/s24.png)");
        } 
       
    break;
    
    case 25:
    if(b == 1)
        {
    $('#textUpdate').val($('#textUpdate').val() + "![no...](/images/smileys/s25.png)");
        }
        
        else
        {
          $('.modal-body #textUpdate').val($('.modal-body #textUpdate').val() +  "![no...](/images/smileys/s25.png)");
        }     
    break;
    
    }
   
}

function message2(t){var a=$(t).attr("id");var b=$(t).attr("id2");
$(".modal-body #user").val(a);$(".modal-body #previous").val(b);
$("#new_message").modal("show")}$

   $(function(){
          var content = $('#textUpdate').val();
          $('#textUpdate').keyup(function () {
              if (this.value != content) {
                content = this.value.replace(/\n/g, "<br />");
                   $('#preview').html(content );            
               }
          });
    })
    
$(function(){
       // select the first 3 hidden divs
    
    $( ".comment-box" ).each(function( index ) {
 $(this).children(".user-comment-box").slice(-3).show();
});
    
        $(".see-more").click(function(e){ // click event for load more
            e.preventDefault();
            var done = $('');
            $(this).siblings(".user-comment-box:hidden").slice(-3).show(); // select next 5 hidden divs and show them
            if($(this).siblings(".user-comment-box:hidden").length == 0){ // check if any hidden divs
                $(this).replaceWith(done); // if there are none left
            }
        });
        
           
    
    
        
});
$('.carousel').carousel({
  interval: 4000
});

$('div.tagsort-tags-container').tagSort({
  selector: '.item-to-tag',

});

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



function showCharacter(n)
{
    var a = $(n).attr("id");
    var b = characterList(a);
 
    console.log(a);
    $('.character').contents().remove();
    $("#skill").contents().remove();
    //$("#skill").hide().fadeIn(1000);
    $("#skillavater").attr('src', "/ava/box.png");
$("#skilldescription").text("");
$("#skillname").text("Skill Name");
$("#skillinfo").text(" ");
$("#remove").removeClass("panel-text");
$("#alter").hide();

   $("#cName").text("");
   $("#characterInfo").text("");
   

showSkills(a);

$("#skilldescription").text("Description");

  $(".characterID").hide().fadeIn(1000);
    $("#cText").text(b[0]);
      $("#cAva").attr('src', b[1]);
    $("#cName").text(b[2]);
    $("#remove").addClass("panel-text");
    console.log(b[2]);
    var d = b[5];
    
    $("#characterInfo").empty().append("Health:" + d[4] + "<br>Energy:"+d[5] + "<br>Strength:" + d[0] + "<br>Ki:" + d[1] + "<br>Defense:" + d[2] + "<br>Speed:" + d[3]);
  
  $("#charactersUpdate").modal("show");
}

function showSkills(name){
  var  a, b,c;
    switch (name)
{

case "zGu":
genericSkills();
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="31" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/31.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="32" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/32.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="34" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/34.png" ></a> </div>');  
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10001" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/10001.png" ></a> </div>');  
break;

case "zKG":
genericSkills();
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="36" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/36.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="37" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/37.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="38" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/38.png" ></a> </div>');  
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10003" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/10003.png" ></a> </div>');  
break;

case "bKG":
genericSkills();
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="109" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/109.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="110" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/110.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="111" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/111.png" ></a> </div>');  
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10018" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/10018.png" ></a> </div>');  
break;

case "zPo":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="46" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/46.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="47" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/47.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="48" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/48.png" ></a> </div>');  
break;

case "zRi":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="100" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/100.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="101" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/101.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="102" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/102.png" ></a> </div>');  
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10012" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10012.png" ></a> </div>');  
break;

case "zNl":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="79" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/79.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="80" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/80.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="81" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/81.png" ></a> </div>');  
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10006" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10006.png" ></a> </div>');  
break;

case "zYa":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="52" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/52.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="53" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/53.png" ></a> </div>');
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="54" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/54.png" ></a> </div>');  
break;

case "zKn":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="42" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/42.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="43" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/43.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="45" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/45.png" ></a> </div>');
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10005" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10005.png" ></a> </div>');

break;

case "zRz":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="49" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/49.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="50" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/50.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="51" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/51.png" ></a> </div>');   
break;

case "zSn":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="55" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/55.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="56" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/56.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="57" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/57.png" ></a> </div>');   
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10009" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10009.png" ></a> </div>');
break;

case "zGy":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="94" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/94.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="95" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/95.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="96" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/96.png" ></a> </div>');   
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10011" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10011.png" ></a> </div>');
break;

case "zTn":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="58" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/58.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="59" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/59.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="60" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/60.png" ></a> </div>');   
break;

case "zCu":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="61" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/61.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="62" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/62.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="63" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/63.png" ></a> </div>');   
break;

case "zKk":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="67" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/67.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="68" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/68.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="69" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/69.png" ></a> </div>');   
break;

case "zGo":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="82" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/82.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="83" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/83.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="84" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/84.png" ></a> </div>');   
break;

case "zYe":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="64" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/64.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="65" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/65.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="66" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/66.png" ></a> </div>');   

break;

case "zNa":
genericSkills(1);

$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="70" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/70.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="71" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/71.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="72" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/72.png" ></a> </div>');   
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10007" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10007.png" ></a> </div>');

break;

case "zSV":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="73" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/73.png" ></a> </div>'); 
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="74" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/74.png" ></a> </div>');   
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="75" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/75.png" ></a> </div>');   
$("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10008" data-type="T" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/10008.png" ></a> </div>');
break;

case "zRe":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="85" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/85.png" ></a> </div>');
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="86" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/86.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="87" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/87.png" ></a> </div>');   
break;

case "zJe":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="88" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/88.png" ></a> </div>');
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="89" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/89.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="90" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/90.png" ></a> </div>');   
break;

case "zBr":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="91" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/91.png" ></a> </div>');
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="92" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/92.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="93" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/93.png" ></a> </div>');   
break;

case "zCi":
genericSkills(1);
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="97" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/97.png" ></a> </div>');
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="98" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/98.png" ></a> </div>');  
$("#skill").append('<div class="col-xs-3 col-sm-3"><a href="#" id="99" data-type="S" onclick="skillD(this,false);return false;"><img class="img-responsive"  src="/skills/99.png" ></a> </div>');   
break;




} //switch end

function genericSkills(){

        $("#generic").hide().fadeIn(1000);
        $("#transformations").empty();
        $("#generic").empty();
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="1" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/1.png" ></a> </div>');  
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="2" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/2.png" ></a> </div>');  
        //$("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="3" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/3.png" ></a> </div>');  
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="4" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/4.png" ></a> </div>');  
        //$("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="5" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/5.png" ></a> </div>');  
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="6" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/6.png" ></a> </div>');  
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="7" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/7.png" ></a> </div>');  
        $("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="8" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/8.png" ></a> </div>');  
        //$("#generic").append('<div class="col-xs-3 col-sm-2"><a href="#" id="9" onclick="skillD(this);return false;"><img class="img-responsive    "  src="/skills/9.png" ></a> </div>');  
        $("#transformations").append('<div class="col-xs-3 col-sm-1"><a href="#" id="10000" onclick="skillD(this);return false;"><img class="img-responsive"  src="/skills/10000.png" ></a> </div>');  
        
        
}

    
}

function alternative(num)
{
    var num2 = $(num).attr("id3");
   num = $(num).attr("id2");
 
     console.log(num2);
    if (Number(num2) >= 10000)
     {
     console.log("Num2: " + num2 + "   Num" + num);
        var b = skillList(num, [1, num2, 0, 0]);
        console.log("Num: " + num);
     
     }
     else
     {
          var b = skillList(Number(num),[0]);
     }
 
   
   $("#alter").attr("id2",b[8][0]);
       $("#alter").attr("id3",num);
$(".sd").hide().fadeIn(1000);
$("#skillavater").attr('src', b[0]);
$("#skilldescription").text(b[3]);
$("#skillinfo").text("Name:"+ b[5].replace(/\s+/g, '-') + " Energy:"+ b[4] + " Cooldown:" + b[2] + " BP:" + b[1] + " Focus:" + b[7] + " Type:" + b[6]);
   
}

function skillD(n)

{
    var a = $(n).attr("id");
    var b;
    
    console.log(a);
    b = skillList(a,[0]);
   console.log(b);
   
   if (b[8][0] === "None")
   {
       $("#alter").hide();
   }
   else
   {
       $("#alter").show();
       $("#alter").attr("id2",b[8][0]);
       $("#alter").attr("id3",a);
   }
$(".sd").hide().fadeIn(1000);
$("#skillavater").attr('src', b[0]);
$("#skilldescription").text(b[3]);
$("#skillinfo").text("Name:"+ b[5].replace(/\s+/g, '-') + " Energy:"+ b[4] + " Cooldown:" + b[2] + " BP:" + b[1] + " Focus:" + b[7] + " Type:" + b[6]);


}

function checkMessages()
{
    var checked = [];
    $("input:checkbox[name=messages]:checked").each(function(){
    
    //$(n).attr("id");
    checked.push($(this).attr("id"));
    
});
	
$.ajax({
   type: "POST",
   data: {messageid:checked},
   url: "/messages/delete",
   success: function(msg){
     location.reload();
   }
});
 
console.log("Checked Array: " + checked);
}

if ($('.first').length > 0) {
  var a = $( ".first" ).attr('id');
  $("."+a).removeClass('fa-plus-square').addClass('fa-minus-square'); 
$("#collapse"+a).collapse('show');
}

function newicon(n)
  {
         if ($(n).hasClass( "fa-minus-square" ))
         {
            $(n).removeClass('fa-minus-square').addClass('fa-plus-square');  
            $(".fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square'); 
            console.log("Working?");
         }
         else 
         {
             $(".fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square'); 
             $(n).removeClass('fa-plus-square').addClass('fa-minus-square'); 
         }
         
         
         
         
      return false;
  }


function planet(n)
{
    var a = $(n).attr("id");
    console.log(a);
    a = Number(a);
  
   
    switch(a)
    {
        case 1:
        $("#clancontent").load("/planet/mangement");
        break;
        
        case 2:
        $("#clancontent").load("/planet/enroll");
        break;
        
        case 3:
        $("#clancontent").load("/planet/arrangement");
        $("#textUpdate").val("Yo");
        break;
        
        case 4:
        $("#clancontent").load("/planet/request");
        break;
        
        case 5:
        $("#clancontent").load("/planet/create");
        break;
        
        case 6:
    $.post('/planet/abandon',
        {
      
        },
        function(data,status){
            console.log("WOrking?");
            location.reload();
        });
        break;
        
        case 7:
         $("#clancontent").load("/planet/mangement");
        break;
        
        case 8:
         $("#clancontent").load("/planet/find");
        break;
        
        case 9:
         $("#clancontent").load("/planet/alliance");
        break;
        
        case 10:
         $("#clancontent").load("/planet/profile");
        break;
        
        case 11:
         $("#clancontent").load("/planet/check");
        break;
        
        
        default:
        console.log("Error");
        
    }
    
   // $("#title").text("Registry");
      //  $("#race").modal('show');
    
}

function skillList(a)
{
a = Number(a);
    var b = [];
    console.log(a);
    switch (a)
    
    
{
    
  case 1:
            b.push("/skills/1.png"); //Image
            b.push(1); //BP Cost
            b.push(2); // Cooldown
            b.push("Increases the characters Speed by 3."); //Description
            b.push(20); //Energy
            b.push("Afterimage"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 2:
            b.push("/skills/2.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("The target becomes Ki Immune to the first enemy skill used on them for one turn.");
            b.push(20); //Energy
            b.push("Energy Deflect"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 4:
            b.push("/skills/4.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("The target gains full immunity to all enemy skills for 1 turn.");
            b.push(20); //Energy
            b.push("Sonic Sway"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 5:
            b.push("/skills/5.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("Decreases the targets Strength and Defense by 5 for two turns.");
            b.push(20); //Energy
            b.push("Solar Flare"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 6:
            b.push("/skills/6.png"); //Image
            b.push(1); //BP Cost                                                                       
            b.push(1); //Cooldown
            b.push("Deals 10 strength damage to one enemy.");
            b.push(20); //Energy
            b.push("Punch"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 7:
            b.push("/skills/7.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("The target becomes Strength Immune to the first enemy skill used on them for one turn.");
            b.push(20); //Energy
            b.push("Strength Block"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 8:
            b.push("/skills/8.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("Deals 10 ki damage to one enemy.");
            b.push(20); //Energy
            b.push("Ki Blast"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Goku Z
        case 31:
            console.log(c);
            if (c[1] === 10001) {
               
                b.push("/skills/31.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("Deals strength 10 damage to one enemy and decreases their Ki and Strength by 2."); //Description
                b.push(20); //Energy
                b.push("Punishing Blow"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([31]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/31.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("Deals 10 strength damage to one enemy and will ignore immunity if they become immune during the battle phase."); //Description
                b.push(25);
                b.push("Punishing Blow"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push(["10001",31]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
             
            }
            break;

        case 32:
            b.push("/skills/32.png"); //Image
            b.push(3); //BP Cost
            b.push(3); //Cooldown
            b.push("After two turns this skill deals 30 piercing ki damage to one enemy. If Goku is stunned during its duration, this skill will end and deal 5 less damage to the enemy. When sucessfully used on a character this will ignore future immunity skills and fully stun for 1 turn when hit by the damage.");
            b.push(40); //Energy
            b.push("Spirit Bomb"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([33]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 33:
            b.push("/skills/33.png"); //Image
            b.push(3); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill charges for 3 turns, dealing 40 piercing ki damage on the fourth turn. If Goku is ki/full stunned during its duration, this skill will end and deal 10 less damage to the enemy. When sucessfully used on a character they will ignore future immunity skills.");
            b.push(40); //Energy
            b.push("Large Spirit Bomb"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([32]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 34:
            b.push("/skills/34.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("This has a clash effect. If ki is higher than the enemy this skill deals 20 piercing ki damage and ignores counters.If lower this skill deals 15 damage and increasing your strength by 2.");
            b.push(30); //Energy
            b.push("Kamehameha"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([35]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 35:
            b.push("/skills/35.png"); //Image
            b.push(2); //BP Cost
            b.push(0); // Cooldown
            b.push("This skill has a clash effect. One enemy receives 20 ki damage and if Goku's Ki is higher than the enemy's, this skill's damage becomes piercing."); //Description
            b.push(20); //Energy
            b.push("Kaioken Kamehameha"); //Name of skill
            b.push("Ki"); //Focus
            b.push("Enemy"); //Type
            b.push([34]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Kid Gohan
        case 36:
        
            if (c[1] === "10003") {
                b.push("/skills/36.png");
                b.push(0);
                b.push(2);
                b.push("Kid Gohan increases his BP gain by 1 for 2 turns.");
                b.push(20);
                b.push("Hidden Power");
                b.push("Power-Up");
                b.push("Self");
                b.push([39]);
                b.push(3);
                b.push("C");
            }
            
            else {
                b.push("/skills/36.png"); //Image
                b.push(0); //BP Cost
                b.push(2); //Cooldown
                b.push("Kid Gohan increases his BP gain by 1 for 1 turn.");
                b.push(30); //Energy
                b.push("Hidden Power"); //Name of skill
                b.push("Power-Up"); //Type
                b.push("Self"); //Focus
                b.push(["10003"]); //Alternate
                b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 37:
            if (c[1] === "10003") {
                b.push("/skills/37.png");
                b.push(2);
                b.push(0);
                b.push("One enemy receives 25 ki damage. This skill deals 10 more ki damage if used consecutively on the same target the following turn.");
                b.push(30);
                b.push("Masenko");
                b.push("Ki");
                b.push("Enemy");
                b.push([40]);
                b.push(1);
                b.push("C");
            }
            else {
                b.push("/skills/37.png"); //Image
                b.push(2); //BP Cost
                b.push(0); //Cooldown
                b.push("One enemy receives 20 ki damage. This skill deals 5 more ki damage if used consecutively on the same target the following turn.");
                b.push(30); //Energy
                b.push("Masenko"); //Name of skill
                b.push("Ki"); //Type
                b.push("Enemy"); //Focus
                b.push(["10003"]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 38:
            if (c[1] === "10003") {
                b.push("/skills/38.png");
                b.push(1);
                b.push(1);
                b.push("Ignoring Speed, Gohan attacks dealing 20 strength damage to one enemy.");
                b.push(20);
                b.push("Rushing Assualt");
                b.push("Strength");
                b.push("Enemy");
                b.push(["41"]);
                b.push(1);
                b.push("C");
            }
            else {
                b.push("/skills/38.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("Ignoring Speed, Gohan attacks dealing 15 strength damage to one enemy.");
                b.push(20); //Energy  
                b.push("Rushing Assualt"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push(["10003"]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 39:
            b.push("/skills/39.png"); //Image
            b.push(2); //BP Cost
            b.push(2); // Cooldown
            b.push("Kid Gohan's Strength and Ki  increases by 5"); //Description
            b.push(10); //Energy
            b.push("Howl"); //Name of skill
            b.push("Power-Up"); //Focus
            b.push("Self"); //Type
            b.push([36]); //Alternate
            b.push(3); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 40:
            b.push("/skills/40.png"); //Image
            b.push(2); //BP Cost
            b.push(0); // Cooldown
            b.push("One enemy receives 25 ki damage. This skill deals 10 more ki damage if used consecutively on the same target the following turn."); //Description
            b.push(30); //Energy
            b.push("Mouth Blast"); //Name of skill
            b.push("Ki"); //Focus
            b.push("Enemy"); //Type
            b.push([37]); //Alternate
            b.push(1); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 41:
            b.push("/skills/41.png"); //Image
            b.push(2); //BP Cost
            b.push(1); // Cooldown
            b.push("One enemy receives 20 strength damage and has their Speed  lowered by 3."); //Description
            b.push(10); //Energy
            b.push("Oozaru Assualt"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([38]); //Alternate
            b.push(1); //Target: 1=enemy | 2=multiPle-Enemies | 3=self | 4=ally | 5=Multiple-AlliEs | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Krillin Z
        case 42:
          if (c[1] === "10005") {
                b.push("/skills/42.png");
                b.push(1);
                b.push(1);
                b.push("Targets one enemy, countering ki the first skill that enemy uses for the battle phase.If the enemy is effected by Scattering Bullets this skill will last for one turn. This skill is invisible.");
                b.push(15);
                b.push("High Velocity Kick");
                b.push("Strength");
                b.push("Enemy");
                b.push([42]);
                b.push(1);
                b.push("C");
            }
             else {
                b.push("/skills/42.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("Targets one enemy, countering ki skills they use for the battle phase. If the enemy is effected by Scattering Bullets this skill will last for one turn.");
                b.push(25); //Energy
                b.push("High Velocity Kick"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([10005]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 43:
            b.push("/skills/43.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("Deals 10 piercing ki damage to one enemy. If the enemy is effected by Scattering Bullets this skill will deal 15 piercing.");
            b.push(20); //Energy
            b.push("Destructo Disk"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([44]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 44:
            b.push("/skills/44.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("Krillin throws multiple Destructo Disk's dealing 15 piercing ki damage to one enemy for 1 turn.If the enemy is effected by Scattering Bullets this skill will deal additional 5 damage.");
            b.push(25); //Energy
            b.push("Destructo Disk Barrage"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([43]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 45:
           if (c[1] === "10005") {
                b.push("/skills/45.png");
                b.push(2);
                b.push(1);
                b.push("Deals 15 ki damage to all enemies and marks all enemies for 2 turns.");
                b.push(25);
                b.push("Scattering Bullets");
                b.push("Ki");
                b.push("Multiple-Enemies");
                b.push([45]);
                b.push(2);
                b.push("C");
            }
             else {
                b.push("/skills/45.png"); //Image
                b.push(2); //BP Cost
                b.push(1); //Cooldown
                b.push("Deals 10 ki damage to all enemies and marks all enemies for 1 turn.");
                b.push(30); //Energy
                b.push("Scattering Bullets"); //Name of skill
                b.push("Ki"); //Type
                b.push("Multiple-Enemies"); //Focus
                b.push([10005]); //Alternate
                b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Piccolo Z
        case 46:
            b.push("/skills/46.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Piccolo gains 25 HP and his Defense is increased by 5.");
            b.push(20); //Energy
            b.push("Regeneration"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 47:
            b.push("/skills/47.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 15 ki damage. If that enemy is full/strength stunned they will instead take double the damage. One random enemy skill's will be put on a cooldown of 2.");
            b.push(30); // Energy
            b.push("Special Beam Cannon"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 48:
            b.push("/skills/48.png"); //Image
            b.push(1); //BP Cost
            b.push(4); //Cooldown
            b.push("This skill reflects all enemies skill used on one ally to Piccolo for one turn. The protected ally gains immunity to power-down skills for 1 turn and 2 strength.");
            b.push(30); //Energy
            b.push("Sacrifice"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Support"); //Focus
            b.push(["None"]); //Alternate
            b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Raditz Z
        case 49:
            b.push("/skills/49.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("One enemy receives 15 strength damage and if the target uses a skill they will have their Ki  reduced by 2. This skill's effects are doubled if the enemy is affected by Double Sunday.");
            b.push(35); //Energy
            b.push("Tuesday Assault"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 50:
            b.push("/skills/50.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 10 piercing ki damage for 2 turns. If Tuesday Assault was used the previous turn, then this skill lasts 1 additional turn.");
            b.push(35); //Energy
            b.push("Double Sunday"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 51:
            b.push("/skills/51.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Scouter Analysis this skill increases all allies excluding Raditiz's EP by 10. For 2 turns all of Raditiz skills will ignore counters and reflects.");
            b.push(25); //Energy
            b.push("Scouter Analysis"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Multiple-Allies"); //Focus
            b.push(["None"]); //ALternate
            b.push(5); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Yamcha Z
        case 52:
            b.push("/skills/52.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 15 strength damage for 2 turns. During this time that enemy's Defense is lowered by 3.");
            b.push(30); //Energy
            b.push("Wolf Fang Fist"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 53:
            b.push("/skills/53.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy is ki stunned for 1 turn. Wolf Fang Fist or Spirit Ball will last 1 additional turn if used on this character the following turn.");
            b.push(20); //Energy
            b.push("Suprise Attack"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 54:
            b.push("/skills/54.png"); //Image
            b.push(2); //BP Cost
            b.push(3); //Cooldown
            b.push("One enemy receives 15 ki damage for 2 turns. During this time that enemy's Speed is reduced by 2.");
            b.push(30); //Energy
            b.push("Spirit Ball"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Saibamen Z
        case 55:
           if (c[1] === "10009") {
                b.push("/skills/55.png");
                b.push(1);
                b.push(2);
                b.push("This skill targets one enemy and all damage Saibamen receives will be shared with that target for 2 turns. During this time if the target uses a skill, the cooldown on that skill will be increased by 2.");
                b.push(30);
                b.push("Saibamen Grab");
                b.push("Strength");
                b.push("Enemy");
                b.push([55]);
                b.push(1);
                b.push("C");
            }
             else {
                b.push("/skills/55.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("This skill targets one enemy and all damage Saibamen receives will be shared with that target for 1 turn. During this time if the target uses a skill, the cooldown on that skill will be increased by 2.");
                b.push(30); //Energy
                b.push("Saibamen Grab"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([10009]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 56:
           if (c[1] === "10009") {
                b.push("/skills/56.png");
                b.push(1);
                b.push(0);
                b.push("All enemies  receives 3 affliction damage and also has their Defense  lowered by 3. This skill stacks and ends if Saibmamen dies.");
                b.push(30);
                b.push("Acid");
                b.push("Affliction");
                b.push("Multiple-Enemies");
                b.push(56);
                b.push(2);
                b.push("C");
            }
            
             else {
                b.push("/skills/56.png"); //Image
                b.push(0); //BP Cost
                b.push(1); //Cooldown
                b.push("One enemy receives 3 affliction damage and has their Defense  lowered by 3.This skill stacks and ends if Saibmamen dies.");
                b.push(30); //Energy
                b.push("Acid"); //Name of skill
                b.push("Affliction"); //Type
                b.push("Enemy"); //Focus
                b.push([10009]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 57:
             if (c[1] === "10009") {
                b.push("/skills/57.png");
                b.push(4);
                b.push(99);
                 b.push("Targets one enemy for 1 turn, the target will lose 50% of their current HP after the end of the turns and Saibaman will be killed. If the enemy is effected by Saibaman's Grab this skill will deal 75%. This skill is invisible.");
                b.push(40);
                b.push("Self Destruct");
                b.push("Affliction");
                b.push("Enemy");
                b.push(57);
                b.push(1);
                b.push("C");
            }
             else{
                b.push("/skills/57.png"); //Image
                b.push(4); //BP Cost
                b.push(99); //Cooldown
                b.push("Targets one enemy for 2 turns, the target will lose 50% of their current HP after the end of the turns and Saibaman will be killed. If the enemy is effected by Saibaman's Grab this skill will deal 75%. This skill is invisible.");
                b.push(40); //Energy
                b.push("Self Destruct"); //Name of skill
                b.push("Affliction"); //Type
                b.push("Enemy"); //Focus
                b.push([10009]); //Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Tien Z
        case 58:
            b.push("/skills/58.png"); //Image
            b.push(3); //BP Cost
            b.push(3); // Cooldown
            b.push("Tien releases his signature move Neo-Tri Beam dealing 20 Affliction per Tri-Beam Charge stack on Tien and fully stunning the enemy for 2 turns and fully stunning Tien for 1 turn.This skill removes one stack of Tri-Beam Charge.");
            b.push(50); //Energy
            b.push("Neo Tri-Beam"); //Name of skill
            b.push("Affliction"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 59:
            b.push("/skills/59.png"); //Image
            b.push(1); //BP COst
            b.push(1); //Cooldown
            b.push("Tien fires dealing 10 Affliction damage and prevents healing effects for 1 turn on the enemy. Tien will be also be prevented from healing for 1 turn.This skill adds 5 more damage per stack of Tri-Beam Charge.");
            b.push(30); //Energy
            b.push("Tri-Beam"); //Name of skill
            b.push("Affliction"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 60:
            b.push("/skills/60.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill creates one Tri-Beam Charge stack on tien.For 1 turn Tien gains immunity to Power Down skills.");
            b.push(30); //Energy
            b.push("Tri Beam Charge"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Chiaotzu Z
        case 61:
            b.push("/skills/61.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill targets one enemy for 1 turn, stunning their friendly skills and lowering their stats by 3.");
            b.push(20); //Energy
            b.push("Psychokinesis - Grab"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 62:
            b.push("/skills/62.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("One enemy has 1 BP removed, their strength skills stunned for 1 turn, and their Defense lowered by 5.");
            b.push(30); //Energy
            b.push("Psychokinesis - Control"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 63:
            b.push("/skills/63.png"); //Image
            b.push(2); //BP Cost
            b.push(4); //Cooldown
            b.push("For two turns if the enemy targets the selected target of this skill it will be reflected to one random enemy's ally. This skill is invisible.");
            b.push(50); //Energy
            b.push("Psychokinesis - Revoke"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Any Ally"); //Focus
            b.push(["None"]); //Alternate
            b.push(6); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Yajirobe Z
        case 64:
            b.push("/skills/64.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("One enemy takes 15 strength damage and has their Defense  lowered by 3.");
            b.push(30); //Energy
            b.push("Miracle Ka-Blam Slash"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 65:
            b.push("/skills/65.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill targets Yajirobe and one ally, granting them immunity to ki skills for 1 turn.");
            b.push(30); //Energy
            b.push("Yajirobe Flees"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Any aLly"); //Focus
            b.push(["None"]); //Alternate
            b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 66:
            var count = 0;
            var length;
            if (c[0] === 1) {
                var effects = c[2];
                length = effects.length;
                for (var i = 0; i < length; i++) {
                    if (effects[i] === "66") {
                        count += 1;
                    }
                }
            }
            b.push("/skills/66.png"); //Image
            b.push(2); //BP Cost
            b.push(0 + count); //Cooldown
            b.push("This skill can be used on one ally or Yajirobe. The target has 25% of their HP and EP recovered. Each time this skill is used it's cooldown will increase by 1.");
            b.push(40); //Energy
            b.push("Senzu Supply"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Any Ally"); //Focus
            b.push(["None"]); //Alternate
            b.push(6); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // King Kai Z
        case 67:
            b.push("/skills/67.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill increases strength and defense by 20%. For 1 turn all counters on this character will be removed at the end of the phases.");
            b.push(30); //Energy
            b.push("King Kai's Training"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Any Ally"); //Focus
            b.push(["None"]); //Alternate
            b.push(6); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 68:
            b.push("/skills/68.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill increases ki and speed by 20%. For 1 turn all stuns on this character will be removed at the end of the phases.");
            b.push(30); //Energy
            b.push("Bubbles's Training"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Any Ally"); //Focus
            b.push(["None"]); //Alternate
            b.push(6); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 69:
            b.push("/skills/69.png"); //Image
            b.push(2); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill targets all enemies, their ki is reduced by 20%, and lose 15 EP. All allies gain immunity to power-down skills for 1 turn. ");
            b.push(40); //Energy
            b.push("Telepathy"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nappa Z
        case 70:
            b.push("/skills/70.png"); //Image
            b.push(2); //BP Cooldown
            b.push(2); //Cooldown
            b.push("One enemy receives 30 affliction damage and if they are affected by Exploding Wave, they will be fully stunned for 1 turn.");
            b.push(35); //Energy
            b.push("Bomber DX"); //Name of skill
            b.push("Affliction"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 71:
            b.push("/skills/71.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("All enemies receive 10 affliction damage. The following turn they will be marked by Exploding Wave.");
            b.push(30); //Energy
            b.push("Exploding Wave"); //Name of skill
            b.push("Affliction"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(["None"]); //Alternate
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 72:
            b.push("/skills/72.png"); //Image
            b.push(1); //BP COst
            b.push(1); //Cooldown
            b.push("One enemy receives 15 strength damage and is infinitely marked by Surging Assault, receiving 3 Affliction damage each turn after. If the enemy is affected by Exploding Wave, that enemy's friendly skills will be stunned for 1 turn. The affliction damage this skill deals stacks.");
            b.push(30); //Energy
            b.push("Surging Assault"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Scouter Vegeta Z
        case 73:
            b.push("/skills/73.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("This skill has a clash effect. One enemy receives 15 ki damage and if Scouter Vegeta's Ki is higher than target of this skill, the damage it deals is doubled.");
            b.push(30); //Energy
            b.push("Galick-Gun"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([76]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 74:
            b.push("/skills/74.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill blocks friendly skills on one enemy and that enemy's friendly skills are stunned for 1 turn."); //Description
            b.push(20); //Energy
            b.push("Scouter Analysis"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push([77]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 75:
            b.push("/skills/75.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("One enemy receives 15 strength damage and Scouter Vegeta's Speed increases by 2."); //Description
            b.push(30); //Energy
            b.push("Aerial Smash"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([78]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 76:
            b.push("/skills/76.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("This skill has a clash effect. One enemy receives 20 ki damage and if Scouter Vegeta's Ki is higher than the target this skill, the damage it deals is doubled."); //Description
            b.push(30); //Energy
            b.push("Mouth Blast"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([73]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 77:
            b.push("/skills/77.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("Scouter Vegeta's Ki and Strength increases by 10. The effects of this skill lasts until Great Ape ends"); //Description
            b.push(10); //Energy
            b.push("Howl"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push([74]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 78:
            b.push("/skills/78.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("Great Ape Vegeta smashes the terrain dealing 20 strength damage to one enemy and  lowers their Speed by 2."); //Description
            b.push(20); //Energy
            b.push("Great Ape Smash"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([75]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nail Z 
        case 79:
            b.push("/skills/79.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("Nail chops an enemy in the neck stunning their strength skills for 1 turn and doing 10 strength damage to that enemy."); //Description
            b.push(30); //Energy
            b.push("Neck Chop"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 80:
            b.push("/skills/80.png"); //Image
            b.push(1); //Bp Cost
            b.push(2); //Cooldown
            b.push("Nail this skill deals 15 ki damage and taunting the target for 1 turn. Nail gains immunity to power-down skills for the battle phase."); //Description
            b.push(35); //Energy
            b.push("Mystic Flasher"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S");
            break;

        case 81:
            b.push("/skills/81.png"); //Image
            b.push(2); //Bp Cost
            b.push(4); //Cooldown
            b.push("Nail removes all stacks currently affecting him and heals for 50 hp. Each time this skill is used nail gains 3 defense but loses 2 strength and ki. "); //Description
            b.push(30); //Energy
            b.push("Regeneration"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Ally"); //Focus
            b.push(["None"]);
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Guldo Z 
        case 82:
            b.push("/skills/82.png"); //Image
            b.push(1); //Bp Cost
            b.push(2); //Cooldown
            b.push("All enemies lose 10 EP and defenses are lowered by 3. Each character that is effected by paralysis will have their energy lowered by 20."); //Description
            b.push(30); //Energy
            b.push("Time-Freezing"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(["None"]);
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 83:
            b.push("/skills/83.png"); //Image
            b.push(3); //Bp Cost
            b.push(2); //Cooldown
            b.push("This skill does 20 strength damage to all enemies. If the enemy is effected by time-freezing this skill will lower their energy by 20. If the enemy is effected by paralysis this will also be a Full Stun to all enemies."); //Description
            b.push(40); //Energy
            b.push("Guldo's Special"); //Name of skill
            b.push("Strength"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(["None"]);
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 84:
            b.push("/skills/84.png"); //Image
            b.push(2); //Bp Cost
            b.push(1); //Cooldown
            b.push("All enemies friendly skills are stunned for 1 turn. If the enemy is affected by time-freeze this will also stun Ki based skills."); //Description
            b.push(30); //Energy
            b.push("Paralysis"); //Name of skill
            b.push("Ki"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(["None"]);
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Recoome Z
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        case 85:
            b.push("/skills/85.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("Recoome smashes an enemy to the ground dealing 15 strength damage and stunning their strength skills for one turn."); //Description
            b.push(30); //Energy
            b.push("Recoome Punch"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 86:
            b.push("/skills/86.png"); //Image
            b.push(2); //Bp Cost
            b.push(4); //Cooldown
            b.push("Reccoome catches the enemy during their attack countering all skills used on him for one turn. The countered enemy will take double damage from Recoome Punch or Eraser Gun the following turn. This skill is invisible."); //Description
            b.push(30); //Energy
            b.push("Reccoome Grapple"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Self"); //Focus
            b.push(["None"]);
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;

        case 87:
            var count = 0;
            var length;
            if (c[0] === 1) {
                var effects = c[2];
                length = effects.length;
                for (var i = 0; i < length; i++) {
                    if (effects[i] === "87") {
                        count += 1;
                    }
                }
            }
            b.push("/skills/87.png"); //Image
            b.push(2); //Bp Cost
            b.push(1); //Cooldown
            b.push("Reccoome fires Eraser Gun at the enemy dealing 15 ki damage. This skill increases Reccoome's Ki by 5 and 5 energy every time it is used.");
            b.push(30 + count * 5); //Energy
            b.push("Eraser Gun"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Jeice Z
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        case 88:
            b.push("/skills/88.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("Jeice moves swiftly increasing his Speed and Ki by 3. If used with Blue Hurricane Crasher this skill will last 2 turns instead and any counters or reflects used on jeice will be removed.");
            b.push(20); //Energy
            b.push("Red Magma Crasher"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("All Allies"); //Focus
            b.push(["None"]);
            b.push(5); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 89:
            b.push("/skills/89.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("This skill has a clash effect. Aiming his crusher ball at an enemy, Jeice hits one enemy dealing 10 ki damage and if Jeice's speed is higher than the enemy this skill will go be before all skills. If used during Red Magama Crasher this skill this will give him immunity to strength skills for one turn. If the enemy has G-force on him they will lose 10 energy.If this skill is used in combination with Mach Punch the target will recieve 1 G-Force Mark.");
            b.push(30); //Energy
            b.push("Crusher Ball"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;

        case 90:
            b.push("/skills/90.png"); //Image
            b.push(2); //Bp Cost
            b.push(2); //Cooldown
            b.push("Burter and Jeice combine to attack the enemy team. This skill does 10 ki damage to all enemies and an additional 5 damage if the enemy has a G-force mark.If Red Magma Crasher is on this character all allies gain 3 ki.");
            b.push(40); //Energy
            b.push("Purple Spiral Flash"); //Name of skill
            b.push("Ki"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(["None"]);
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Burter Z
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        case 91:
            b.push("/skills/91.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("Burter moves at high speed increasing his Speed and strength by 3. If used with Red Magma Crasher this skill last 2 turns instead and stuns will be removed on Burter.");
            b.push(20); //Energy
            b.push("Blue Hurricane Crasher"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Multiple-Allies"); //Focus
            b.push(["None"]);
            b.push(5); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C");
            break;

        case 92:
            b.push("/skills/92.png"); //Image
            b.push(1); //Bp Cost
            b.push(1); //Cooldown
            b.push("This skill has a clash effect. This skill dealing 15 strength damage to one enemy and if Burters speed is higher than his opponent, this skill deals piercing. If Blue Hurricane Crasher is in effect this skill will stun friendly skills for 1 turn. This skill will do an additional 10 damage to an enemy affected by G-force. If this skill is used in combination with Crusher Ball the target will recieve 1 G-Force Mark.");
            b.push(30); //Energy
            b.push("Mach Punch"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;

        case 93:
            b.push("/skills/93.png"); //Image
            b.push(2); //Bp Cost
            b.push(2); //Cooldown
            b.push("If used on enemy, that enemy receives 15 strength damage and their speed is decreased by 3. If Blue Hurricane Crasher is in effect, Burter's team gains 3 strength. If G-force is on the enemy this will lower all stats by 5 and deals 35 damage.");
            b.push(40); //Energy
            b.push("Purple Comet Crush"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]);
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginyu Z
        case 94:
            b.push("/skills/94.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("This causes Ginyu to lose 20% of his health. Ginyu cannot die for 1 turn. The targeted character will be friendly stunned for 1. During this time it will be possible to body change on this target for 1 turn.");
            b.push(30); //Energy
            b.push("Self Harm"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 95:
            b.push("/skills/95.png"); //Image
            b.push(2); //BP Cost
            b.push(3); //Cooldown
            b.push("You can use this skill on an ally or yourself. If the selected character is attacked by a skill then the enemy will be strength stunned for two turns. This skill lasts on an ally or yourself for one turn.");
            b.push(30); //Energy
            b.push("Tornado Kick"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(6); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 96:
            b.push("/skills/96.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Ginyu deals 10 damage and removes 10 energy from the enemy. This skills effects are doubled if used consecutively  This doesn't stack.");
            b.push(30); //Energy
            b.push("Milky Cannon"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Cui Z
        case 97:
            b.push("/skills/97.png"); //Image
            b.push(0); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill removes all current defense on one enemy during the battle phase and will be friendly blocked for 2 turns.");
            b.push(30); //Energy
            b.push("Explosion Punch"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 98:
            b.push("/skills/98.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill puts the target in a dazed state for 1 turn and Cui's ki increases by 5.");
            b.push(30); //Energy
            b.push("Ah! Lord Frieza!"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            break;

        case 99:
            b.push("/skills/99.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("This has a clash effect.If Cui's ki is higher than the enemy's defense this skill does 25 ki damage and lowers enemy's defense by 5.If less this skill does 15 damage and lowers enemy's defense by 3.");
            b.push(30); //Energy
            b.push("Energy Bullet"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Roshi Z
        case 100:
            b.push("/skills/100.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("Roshi releases his highly practiced Kamehameha dealing 15 ki damage to one enemy and  reducing their Ki by 3.");
            b.push(35); //Energy
            b.push("Kamehameha"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([103]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 101:
            b.push("/skills/101.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Roshi uses a technique which consists of a series of slow hand movements to lay his opponent to sleep, fully stunning them for 1 turn.");
            b.push(30); //Energy
            b.push("Sleepy Boy Technique"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push([104]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 102:
            b.push("/skills/102.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("Roshi loses 5 HP each turn,Roshi cannot use his transformation while this skill is active, and the enemy will lose 10 EP every turn. If this skill was used on a target affected by Sleepy Boy Technique, Roshi's Defense will increase by 5 and they will lose 15 EP each turn, and if the target is in a transformation state, they are reverted back to their normal state. Re-use of this skill while active has no costs and will remove its current effects.");
            b.push(30); //Energy
            b.push("Evil Containment Wave"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push([105]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 103:
            b.push("/skills/103.png"); //Image
            b.push(3); //BP Cost
            b.push(3); //Cooldown
            b.push("Roshi fires his Kamehameha at maximum power dealing 35 piercing ki damage to one enemy. After this skill is used, Roshi's Transformation state ends and Roshi cannot use his Kamehameha for 1 turn.");
            b.push(40); //Energy
            b.push("Max Kamehameha"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([100]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 104:
            b.push("/skills/104.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Roshi directly punches an enemy with an immensely strong blow to the body dealing 15 strength damage and stunning the targets friendly skills for 1 turn.");
            b.push(20); //Energy
            b.push("Max Punch"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([101]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 105:
            b.push("/skills/105.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("Roshi deals 20 strength damage to one enemy and dazes them for 1 turn. This skill can only be used 2 times within a match as Roshi's stick breaks upon multiple uses.");
            b.push(25); //Energy
            b.push("Roshi's Stick"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([102]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Garlic Jr.
        case 106:
            b.push("/skills/106.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill causes one enemy to become dazed and friendly stunned for 1 stun. The targeted character also gains for 1 turn 10 ki and strength.");
            b.push(20); //Energy
            b.push("Mind Break"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push([117]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 107:
            b.push("/skills/107.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("This targets one enemy and for 2 turns the target is friendly blocked.");
            b.push(25); //Energy
            b.push("Sealed Light Beam"); //Name of skill
            b.push("Power-Down"); //Type
            b.push("Enemy"); //Focus
            b.push([118]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 108:
            b.push("/skills/108.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill does 15 ki damage to one enemy. If this enemy uses a skill next turn enemy will permentally take 5 Affliction damage and will be strength stunned for one turn. This skill Affliction damage ends if Garlic Jr dies and doesn't stack.  ");
            b.push(25); //Energy
            b.push("Death Impact"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([116]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Kid Goku 
        case 109:
            b.push("/skills/109.png"); //Image
            b.push(2); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill is marks all allies for 1 turn. If that ally uses a skill that ally's defense is increased by 3 and they will heal 15 health. Any reflects affecting your allies are removed.");
            b.push(30); //Energy
            b.push("Teamwork"); //Name of skill
            b.push("Power-Up"); //Trpe
            b.push("Multiple-Allies"); //Focus
            b.push([112]); //Alternate
            b.push(5); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 110:
            b.push("/skills/110.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill targets one ally and places a full counter on them for the rest of the battle phase. Any enemy that targets this ally will be ki stunned for 2 turns.");
            b.push(30); //Energy
            b.push("Power Pole"); //Name of skill
            b.push("Defensive"); //Type
            b.push("Ally"); //Focus
            b.push([113]); //Alternate
            b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 111:
            b.push("/skills/111.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill has a clash effect. If Kid Goku has higher ki than the enemy, the enemy will take 15 piercing ki damage and their strength and speed will be lowered by 3. If Kid Goku's ki is lower this skill does 15 damage and increases Kid Goku's ki by 3.");
            b.push(30); //Energy
            b.push("Amature Kamehameha"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([114]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 112:
            b.push("/skills/112.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This increases your team strength by 5. This skill removes all stuns and dazed conditions on all allies . All of Kid Goku Oozaaru skills next turn have there alternative effects.");
            b.push(25); //Energy
            b.push("Oozaru's Lick"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Multiple-Allies"); //Focus
            b.push([109]); //Alternate
            b.push(5); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 113:
            b.push("/skills/113.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill targets one enemy and counters their strength skills for 1 turn. If the enemy uses any skill they will take 25 strength damage. If Oozaru Roar was used the previous turn this skill will deal 35 damage instead.");
            b.push(30); //Energy
            b.push("Oozaru's Destruction"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([110]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 114:
            b.push("/skills/114.png"); //Image
            b.push(3); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill does 30 damage while also lowering ki and speed by 15%.If Oozaru Roar was used the previous turn this skill will deal 40 ki damage and lowers ki and speed by 20%.");
            b.push(40); //Energy
            b.push("Mouth Blast"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([111]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Garlic Jr. Cont.
        case 115:
                b.push("/skills/115.png"); //Image
                b.push(3); //BP Cost
                b.push(0); //Cooldown
                b.push("This skill prevents Garlic Jr from dying.For Garlic Jr to die he must be killed twice.When killed the first time he will be reborn with 60 hp and fully immune for the following turn.This skill can only be used once successfully.");
                b.push(40); //Energy
                b.push("Immortality"); //Name of skill
                b.push("Power-Up"); //Type
                b.push("Self"); //Focus
                b.push([115]); // Alternate
                b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("S"); //Rarity
            break;

        case 116:
            b.push("/skills/116.png"); //Image
            b.push(4); //BP Cost
            b.push(0); //Cooldown
            b.push("This skill removes all immortality stacks. During this time Garlic Jr is permanentally friendly stunned. All enemies are instantly killed in 5 turns. Deadzone can't be blocked when used on enemies successfully effected. This skill can only be used once and ends if Garlic Jr dies. Garic Jr is friendly stunned and friendly blocked infinity.");
            b.push(50); //Energy
            b.push("Dead Zone"); //Name of skill
            b.push("Ki"); //Type
            b.push("All Enemies"); //Focus
            b.push([106]); // Alternate skill, if any
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            break;

        case 117:
            b.push("/skills/117.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("This skill does 20 damage to one enemy. If this enemy uses a skill next turn enemy will permentally take 5 Affliction damage and will be strength stunned for one turn. This skill does Affliction damage ends if Garlic Jr dies. ");
            b.push(25); //Energy
            b.push("Death Impact"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([108]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 118:
            b.push("/skills/118.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill targets one enemy and counters there strength skills for 1 turn. If the enemy is countered the enemy will take 15 damage and Super Garlic Jr gains immunity to strength skills for 1 turn.");
            b.push(25); //Energy
            b.push("Darkness Illusion"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([107]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Dodoria Z
        case 119:
            b.push("/skills/119.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill has a clash effect: Dodoria charges at one enemy headfirst stunning their strength skills for one turn and doing 15 strength damage. This skill has a clash effect. If the enemy's defense is lower than Dodorias speed, they will take 25 damage instead.");
            b.push(30); //Energy
            b.push("Full Force Headbutt"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push("None"); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;


        case 120:
            b.push("/skills/120.png"); //Image
            b.push(1); //BP Cost
            b.push(3); //Cooldown
            b.push("Dodoria counters all skills used on him during the battle phase. The following battle phase, any enemy who attacked Dodoria will take 10 more damage from Dodoria's skills for 1 turn. If a skill was successfully countered, Dodoria's speed is increased by 3.");
            b.push(30); //Energy
            b.push("Tri-Form Afterimage"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push("None"); // Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 121:
            var checkHealth, a = 1;
            if (c[0] === 1) {

                if (c[3].current === 1 && c[3].player) {
                    checkHealth = phealth1[0];

                }

                else if (c[3].current === 2 && c[3].player) {
                    checkHealth = phealth1[1];
                }

                else if (c[3].current === 3 && c[3].player) {
                    checkHealth = phealth1[2];
                }

                else if (c[3].current === 1 && !c[3].player) {
                    checkHealth = phealth2[0];

                }

                else if (c[3].current === 2 && !c[3].player) {
                    checkHealth = phealth2[1];
                }

                else if (c[3].current === 3 && !c[3].player) {
                    checkHealth = phealth2[2];
                }


                console.log("checkHealth: " + checkHealth);
                console.log(c[3]);
                if (checkHealth >= 120) {
                    a = 1;
                }
                else if (checkHealth >= 71) {
                    a = 2;
                }
                else if (checkHealth >= 21) {
                    a = 3;
                }

                else if (checkHealth <= 20) {
                    a = 4;
                }

            }
            b.push("/skills/121.png"); //Image
            b.push(a); //BP Cost
            b.push(0); //Cooldown
            b.push("Dodoria targets one enemy dealing 15 ki damage to them. This skill's damage increases by 10 and it's BP by 1 for every 50 HP Dodoria has lost.");
            b.push(30); //Energy
            b.push("Laser Mouth Beam"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push("None"); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 122:
            b.push("/skills/122.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("If one enemy's HP is 25 or less, they will be Executed.");
            b.push(30); //Energy
            b.push("Neck Breaker"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push("None"); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Cooler
        case 123:
            b.push("/skills/123.png"); //Image
            b.push(0); //BP Cost
            b.push(2); //Cooldown
            b.push("Cooler rushes through the battlefield with a veil, increasing his ki by 3. The following turn, if Cooler is targeted by an enemy skill he gains 1 BP. ");
            b.push(30); //Energy
            b.push("Nova Chariot"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push("None"); // Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 124:
            b.push("/skills/124.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("Cooler uses his own variation of death beam dealing 20 ki damage to one enemy. If that enemy's HP is 15 or less they will be Executed.");
            b.push(30); //Energy
            b.push("Death Laser"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push("None"); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 125:
            b.push("/skills/125.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Cooler sets up his supernova by distracting the enemy with particle bomb. This skill deals 10 ki damage to one enemy and allows Supernova to be used for 2 turns. If Particle Bomb is used during this time, it deals 5 additional damage.");
            b.push(30); //Energy
            b.push("Particle Bomb"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push("None"); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 126:
            b.push("/skills/126.png"); //Image
            b.push(3); //BP Cost
            b.push(2); //Cooldown
            b.push("Cooler fires a supernova dealing 20 ki damage to all enemies.");
            b.push(40); //Energy
            b.push("Supernova"); //Name of skill
            b.push("Ki"); //Type
            b.push("All Enemies"); //Focus
            b.push("None"); // Alternate
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

             case 127:
b.push("/skills/127.png");
b.push(1);
b.push(1);
b.push( "This skill heals one ally permanently by 3 hp every turn. This ally defense increase by 3 and this doesn't increase every turn. This skill stacks.");
b.push(20);
b.push("Dende Basic Healing");
b.push( "Power-Up");
b.push( "Ally");
b.push(["None"]);
b.push(4);
b.push("C");

break;

case 128:

b.push("/skills/128.png");
b.push(1);
b.push(2);
b.push( "Dende can heal an ally or himself 20 hp and 15 ep for 1 turn. This skill remove any negative conditions on character on initial use.");
b.push(30);
b.push("Dende Advance Healing");
b.push( "Power-Up");
b.push( "Any-Ally");
b.push(["None"]);
b.push(6);
b.push("R");

break;

case 129:

b.push("/skills/129.png");
b.push(3);
b.push(3);
b.push( "If the enemy targets an ally of yours the ally will gain 30 HP and 20 EP. This skill is invisible and last for 1 turn.");
b.push(40);
b.push("Quick Recovery");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("S");

break;

            // Zarbon Z
        case 130:
            b.push("/skills/130.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Zarbon kicks an enemy at full force dealing 10 damage and doing 3 additional damage with each consecutive use. If Zarbon becomes immune or is stunned this effect resets.");
            b.push(30); //Energy
            b.push("Ruthless Blow"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([133]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 131:
            b.push("/skills/131.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("Zarbon relentlessly pummels an enemy for 2 turns. This skill drops the enemy's defense by 2 then deals 10 strength damage each turn.");
            b.push(30); //Energy
            b.push("Bloody Dance"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([134]); // Alternate skill, if any
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 132:
            b.push("/skills/132.png"); //Image
            b.push(1); //BP Cost
            b.push(1); //Cooldown
            b.push("Zarbon fires his signature one handed ki blast at one enemy. The following turn that enemy receives 20 ki damage. If Zarbon is full/ki stunned before the damage applies, that enemy will take 10 damage instead.");
            b.push(30); //Energy
            b.push("Elegant Blaster!"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([135]); // Alternate skill, if any
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Monster Zarbon Z
        case 133:
            b.push("/skills/133.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("Monster Zarbon blasts an enemy with an empowered elegant blaster, dealing 20 ki damage and reducing their strength by 2.");
            b.push(30); //Energy
            b.push("Possibility Cannon!"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([130]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 134:
            b.push("/skills/134.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("Monster Zarbon rushes one enemy dealing 25 strength damage and reducing their defense by 3.");
            b.push(30); //Energy
            b.push("Monster Break"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([131]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;

        case 135:
            b.push("/skills/135.png"); //Image
            b.push(3); //BP Cost
            b.push(3); //Cooldown
            b.push("Monster Zarbon uses his most powerful skill, grabbing an enemy and fully stunning them for 1 turn. The following turn Zarbon piledrives the enemy, dealing 30 piercing strength damage to them. Zarbon cannot use other skills while this skill is active.");
            b.push(35); //Energy
            b.push("Piledriver"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([132]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("R"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Sansho Z
        case 136:
            if (c[1] === "10013") {
                b.push("/skills/136.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("Sansho deals 5 piercing strength damage to one enemy for 1 turn. While affected is this enemy uses a new damaging skill during their battle phase, they will be stunned for 1 turn.");
                b.push(20); //Energy
                b.push("Shoulder Ram"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push(136); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/136.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("Sansho deals 5 piercing strength damage to one enemy for 1 turn. While affected is this enemy uses a new damaging skill during their battle phase, they will be stunned for 1 turn.");
                b.push(30); //Energy
                b.push("Shoulder Ram"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push("10013"); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 137:
            if (c[1] === "10013") {
                b.push("/skills/137.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("This skill has a clash effect. If Sansho’s Speed is higher than the targets, that enemy will have their cooldowns increased by 2 for 1 turn. If Sansho’s speed is lower, this skill taunts the enemy for 1 turn.");
                b.push(20); //Energy
                b.push("Sanso Spinning Vortex"); //Name of skill
                b.push("Power-Down"); //Type
                b.push("Enemy"); //Focus
                b.push(137); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/137.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("This skill has a clash effect. If Sansho’s Speed Stat is higher than the enemy, the target will have their cooldowns increased by 2 for 1 turn. If Sansho’s speed is Lower, this skill taunts the enemy for 1 turn.");
                b.push(30); //Energy
                b.push("Sanso Spinning Vortex"); //Name of skill
                b.push("Power-Down"); //Type
                b.push("Enemy"); //Focus
                b.push(10013); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 138:
            if (c[1] === "10013") {
                b.push("/skills/138.png"); //Image
                b.push(2); //BP Cost
                b.push(3); //Cooldown
                b.push("One enemy receives 10 piercing ki damage for 2 turns. During this time that enemy's base stats are temporary reduced by 5. This skill lasts 1 additional turn if the target is effected by Sanso Spinning Vortex.");
                b.push(25); //Energy
                b.push("Una Zhu Fire"); //Name of skill
                b.push("Ki"); //Type
                b.push("Enemy"); //Focus
                b.push(138); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/138.png"); //Image
                b.push(2); //BP Cost
                b.push(3); //Cooldown
                b.push("One enemy receives 10 piercing ki damage for 2 turns. During this time that enemy's base stats are reduced by 5. This skill lasts 1 additional turn if the target is effected by Sanso Spinning Vortex.");
                b.push(35); //Energy
                b.push("Una Zhu Fire"); //Name of skill
                b.push("Ki"); //Type
                b.push("Enemy"); //Focus
                b.push(10013); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nicky Z
        case 139:
            if (c[1] === "10013") {
            b.push("/skills/139.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 15 strength damage and is Strength Stunned for 1 turn. This skill adds one Lozenges Charge Stack to Nicky.");
            b.push(35); //Energy
            b.push("Katana Kogeki"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([139]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            }
            else
            {
              b.push("/skills/139.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 15 strength damage and is Strength Stunned for 1 turn. This skill adds one Lozenges Charge Stack to Nicky.");
            b.push(35); //Energy
            b.push("Katana Kogeki"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push([10013]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity   
            }
            break;

        case 140:
            if (c[1] === "10013") {
            b.push("/skills/140.png"); //Image
            b.push(0); //BP Cost
            b.push(0); //Cooldown
            b.push("Nicky charges his ki, gaining 1 Lozenges Charge stack and 2 speed. Lozenges Blast gains 5 additional damage for each Lozenges Charge stack on Nicky.At the end of the battle phase this skill will remove all stuns effecting him.");
            b.push(20); //Energy
            b.push("Lozenges Charge"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push([140]); // Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            }
            else
            {
             b.push("/skills/140.png"); //Image
            b.push(0); //BP Cost
            b.push(0); //Cooldown
            b.push("Nicky charges his ki, gaining 1 Lozenges Charge stack and 2 speed. Lozenges Blast gains 5 additional damage for each Lozenges Charge stack on Nicky.At the end of the battle phase this skill will remove all stuns effecting him.");
            b.push(20); //Energy
            b.push("Lozenges Charge"); //Name of skill
            b.push("Power-Up"); //Type
            b.push("Self"); //Focus
            b.push([10013]); // Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            }   
            
            break;

        case 141:
            if (c[1] === "10013") {
            b.push("/skills/141.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 20 piercing ki damage.If this target is currently affected by Nicky’s Katana Kōgeki, this skill will stun ki skills for 2 turns. Upon use, this skill resets all stacks on Lozenges Blast to 0.");
            b.push(35); //Energy
            b.push("Lozenges Blast"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([141]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            }
            else 
            {
               b.push("/skills/141.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("One enemy receives 20 piercing ki damage.If this target is currently affected by Nicky’s Katana Kōgeki, this skill will stun ki skills for 2 turns. Upon use, this skill resets all stacks on Lozenges Blast to 0.");
            b.push(35); //Energy
            b.push("Lozenges Blast"); //Name of skill
            b.push("Ki"); //Type
            b.push("Enemy"); //Focus
            b.push([10013]); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginger Z
        case 142:
            if (c[1] === "10013") {
                b.push("/skills/142.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("One enemy receives 15 strength damage and gains immunity to friendly skills for 1 turn. If the target is affected by Ginger Buster, this skill's damage becomes piercing and it ignores immunity.");
                b.push(35); //Energy
                b.push("Katana Kogeki"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([142]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else

            {
                b.push("/skills/142.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("One enemy receives 15 strength damage and gains immunity to friendly skills for 1 turn. If the target is affected by Ginger Buster, this skill's damage becomes piercing and it ignores immunity.");
                b.push(35); //Energy
                b.push("Katana Kogeki"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([10013]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 143:
            if (c[1] === "10013") {
                b.push("/skills/143.png"); //Image
                b.push(1); //BP Cost
                b.push(1); //Cooldown
                b.push("One enemy has the costs of their skills increased by 10 EP for 1 turn. If the target is affected by Ginger Buster, that enemy's speed is reduced by 2.");
                b.push(30); //Energy
                b.push("Ginger Spinning Vortex"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([143]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/143.png"); //Image
                b.push(1); //BP Cost
                b.push(2); //Cooldown
                b.push("One enemy has the costs of their skills increased by 10 EP for 1 turn. If the target is affected by Ginger Buster, that enemy's speed is reduced by 2.");
                b.push(30); //Energy
                b.push("Ginger Spinning Vortex"); //Name of skill
                b.push("Strength"); //Type
                b.push("Enemy"); //Focus
                b.push([10013]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            break;

        case 144:
            if (c[1] === "10013") {
                b.push("/skills/144.png"); //Image
                b.push(2); //BP Cost
                b.push(2); //Cooldown
                b.push("This skill targets one enemy for 2 turns. During this time if the target doesn't use a skill, they will take 10 piercing ki damage. If the target performs a skill, Ginger's strength is increased by 3.");
                b.push(40); //EP
                b.push("Ginger Buster"); //Name of skill
                b.push("Ki"); //Type
                b.push("Enemy"); //Focus
                b.push([144]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity
            }
            else {
                b.push("/skills/144.png"); //Image
                b.push(2); //BP Cost
                b.push(3); //Cooldown
                b.push("This skill targets one enemy for 2 turns. During this time if the target doesn't use a skill, they will take 10 piercing ki damage. If the target performs a skill, Ginger's strength is  increased by 3.");
                b.push(40); //EP
                b.push("Ginger Buster"); //Name of skill
                b.push("Ki"); //Type
                b.push("Enemy"); //Focus
                b.push([10013]); // Alternate
                b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
                b.push("C"); //Rarity 
            }
            break;
            
            case 145:


b.push("/skills/145.png");
b.push(1);
b.push(2);
b.push( "This skill causes a character to become dazed and friendly stunned for 1 turn. During this time the character will have its ki and strength increased by 10. This skill can only be used 3 times.");
b.push(30);
b.push("Mind Grasp");
b.push( "Power-Down");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;

case 146:
b.push("/skills/146.png");
b.push(3);
b.push(3);
b.push( "This marks one ally or himself with this skill permentenally.If the ally has any stuns on them the ally will  gain 2 defense every turn he is stunned. If the ally uses a skill he will gain 2 strength and if doesn't he gains 2 speed. If the ally takes damage the character will gain 2 ki. Wheelo can not target an ally or himself if already effected. All effects by this skill will end if Wheelo is killed.");
b.push(40);
b.push("Bio Modification");
b.push( "Power-Up");
b.push( "Any-Ally");
b.push(["None"]);
b.push(6);
b.push("R");
break;

case 147:
b.push("/skills/147.png");
b.push(3);
b.push(2);
b.push( "This skill deals 15 damage and makes random skill on that target put on cooldown for 3 turns. The character also will have defense stats cut by 25% after being hit by this skill.");
b.push(40);
b.push("Planet Geyser");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("S");
break;

case 148:
  var count = 0;
            var length;
            if (c[0] === 1) {
                var effects = c[2];
                length = effects.length;
                for (var i = 0; i < length; i++) {
                    if (effects[i] === "148") {
                        count += 1;
                    }
                }
            }
            
b.push("/skills/148.png");
b.push(2 + count);
b.push(0);
b.push( "Turles carries 3 of these, the first fruit grants 30 HP,20 EP, and speed/defense is increased by 3, the second fruit grants 50 HP, 25 EP, and ki/strength is increased by 5, and the third fruit grants 60 HP,30 EP, and all stats are increased by 5. The BP cost of this skill increases with each fruit used. This skill can be used on himself or on an ally.");
b.push(30);
b.push("Fruit of Might");
b.push( "Power-Up");
b.push( "Any-Ally");
b.push(["None"]);
b.push(6);
b.push("R");
break;

case 149:

b.push("/skills/149.png");
b.push(1);
b.push(2);
b.push("Turles shoots multiple ki blasts at an enemy from behind dealing 10 ki damage and is prevented from healing for 1 turn. If Kill Driver was used the previous turn on the enemy this skill will deal additional 5 damage.");
b.push(30);
b.push("Sudden Storm");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("R");
break;

case 150:
b.push("/skills/150.png");
b.push(2);
b.push(2);
b.push("Turles shoots a donut shaped beam at an enemy, stunning their ki skills for 1 turn and dealing 15 ki damage.If the enemy is effected by Sudden Storm this skill will deal double damage and ignore immunity.");
b.push(35);
b.push("Kill Driver");
b.push( "Ki");
b.push( "Enemy");
b.push(["None"]);
b.push(1);
b.push("C");
break;



            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            //Madematcha
        case 162:
            b.push("/skills/162.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("All enemies take 5 ki damage. For 1 turn the enemy will have one Meda Clone applied during the phases.");
            b.push(30); //EP
            b.push("Evil Comet"); //Name of skill
            b.push("Ki"); //Type
            b.push("Multiple-Enemies"); //Focus
            b.push(""); // Alternate
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 163:
            b.push("/skills/163.png"); //Image
            b.push(0); //BP Cost
            b.push(0); //Cooldown
            b.push("Using his clones Medamatcha applies 2 permanent Meda Stack to each enemy.");
            b.push(20); //EP
            b.push("Parasitic Meda Clones "); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(""); // Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 164:
            b.push("/skills/164.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Medamatcha uses his clones to absorb his enemy’s EP. This skill removes two stacks of Meda Clones. Medamatcha steals 5 ep from this enemy for each Meda Clone active.This skill requires at least 2 stacks.");
            b.push(35); //EP
            b.push("Meda Clone Consumption "); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(""); // Alternate skill, if any
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;

        case 165:
            b.push("/skills/165.png"); //Image
            b.push(3); //BP Cost
            b.push(3); //Cooldown
            b.push("Medamatcha re-absorbs his clones into his body, removing all stacks of parasitic Meda Clones on the enemy team. Medamatcha recovers 5 health per stack removed this way and his team will gain half the amount.");
            b.push(50); //EP
            b.push("Revitalization"); //Name of skill
            b.push("Strength"); //Type
            b.push("Enemy"); //Focus
            b.push(""); // Alternate
            b.push(2); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Generic Transformation
        case 10000:
            b.push("/skills/10000.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Increases all stats by 25% but reduces the users EP by 10 each turn. Re-use of this skill while active or EP hitting 0 will remove its current effects.");
            b.push(10); //EP
            b.push("Power-Up"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["b",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Goku Trans 1
        case 10001:
            b.push("/skills/10001.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Goku's Strength, Ki, and Speed increases by 4 each turn but his Defense decreases by 1. During this time Goku loses 15 EP. Re-use of this skill or EP hitting zero while active will remove its current effects.");
            b.push(15); //EP
            b.push("Kaio-ken"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["r",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Goku Trans 2
        case 10002:
            b.push("/skills/10002.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("");
            b.push(15); //EP
            b.push("Super Saiyan Goku"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["s",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Kid Gohan Trans 1
        case 10003:
            b.push("skills/10003.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("Kid Gohan's Strength, Ki, and Defense increases by 60% but his EP is reduced by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Oozaru Kid Gohan"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Target
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["b",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


            // Kid Gohan Trans 2
        case 10004:
            b.push("/skills/10004"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Kid Gohan increases his stats by 50% but reduces his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Empowered Kid Gohan"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Krillin Trans 1
        case 10005:
            b.push("/skills/10005.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Krillin increases his stats by 50% but reduces his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Empowered Krillin"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Piccolo/Nail Transformation
        case 10006:
            b.push("/skills/10006.png"); //Image
            b.push(2); //BP Cost
            b.push(1); //Cooldown
            b.push("Nail can use this skill to sync with any Namekian ally. Once this skill is used successfully, Nail dies and the ally this skill is used on will regain 100 hp, 50 EP and increases all stats by 10.");
            b.push(40); //EP
            b.push("Fuse with Nail"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Ally"); //Focus
            b.push(["None"]); //Alternate
            b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["b",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nappa Transformation
        case 10007:
            b.push("/skills/10007.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("Nappa increases his stats by 30% but reduces his EP by 15 each turn. During this time any enemy who uses a new skill on Nappa will be infinitely marked by Surging Assault. This effect stacks and re-use of this skill while active or EP hitting 0 will remove its current effects.");
            b.push(15); //EP
            b.push("Power Amp"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["y",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Scouter Vegeta Transformation
        case 10008:
            b.push("/skills/10008.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Scouter Vegeta's Strength, Ki, and Defense increases by 60% but his EP is reduced by 20 each turn. Re-use of this skill while active or EP hitting 0 will remove its current effects.");
            b.push(20); //EP
            b.push("Oozaru Vegeta"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["b",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Saibaman Z Transformation
        case 10009:
            b.push("/skills/10009.png"); //Image
            b.push(2); //BP Cost
            b.push(2); //Cooldown
            b.push("This skill targets one ally, granting them 1 Defense each turn. Saibamen gains 5 HP for every Plant Seed on an ally. This skill is only removed if it is not targeting any allies.");
            b.push(40); //EP
            b.push("Plant Seed"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(4); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Zarbon Transformation
        case 10010:
            b.push("/skills/10010.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Zarbon transforms into his less aesthetic but very powerful monster form changing all his skills and increasing zarbons ki, strength, and defense by 8 When Zarbon runs out of EP or reuses this skill, these effects are reverted.Zarbon loses 15 EP each turn this is active.");
            b.push(15); //EP
            b.push("Monster Zarbon"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginyu Transformation
        case 10011:
            b.push("/skills/10011.png"); //Image
            b.push(4); //BP Cost
            b.push(3); //Cooldown
            b.push("This skill makes Ginyu swap body with one character on the enemy team. All skills,stats,hp,ep, cooldowns,effects and character are swapped.This skill can only be used be at 60 or below health and requires self harm to be used. This can only be used once successfully and counts as an offensive skill.");
            b.push(50); //EP
            b.push("Body Change"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Enemy"); //Focus
            b.push(["None"]); //Alternate
            b.push(1); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["b",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Roshi Transformation
        case 10012:
            b.push("/skills/10012.png"); //Image
            b.push(1); //BP Cost
            b.push(2); //Cooldown
            b.push("Roshi's Strength, Ki and Defense is increased by 10 but his EP is reduced by 15 each turn. This skill cannot be used while Evil Containment Wave is active. Re-use of this skill while active or EP hitting 0 will remove its current effects.");
            b.push(15); //EP
            b.push("Max Power"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        case 10013:
            b.push("/skills/10013.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push(" Sansho’s Ki and Defense stat are raised by 50% and his skills cost 10 less ep. During this time Sansho receives 5 affliction damage. Re use of this skill, or EP hitting 0 will end this skill and it's effects.");
            b.push(15); //EP
            b.push("Super Sansho"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]);
            break;

        case 10014:
            b.push("/skills/10014.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push(" Nicky’s Ki and Speed, and stat are raised by 50%. While active Nicky receives 5 affliction damage and loses 10 EP . Re-use of this skill or EP hitting zero while active will remove its current effects. During this time Lozenges Blast will not reset Lozenges Charge to 0. ");
            b.push(10); //EP
            b.push("Super Nicky"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]);
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;

        case 10015:
            b.push("/skills/10015.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push(" Ginger's, Defense, and Strength stat are raised by 50%. While active Nicky receives 5 affliction damage and loses 10 EP each turn. Re-use of this skill or EP hitting zero while active will remove its current effects. During this time Ginger's unique skills have their cool-downs reduced by 1.  ");
            b.push(10); //EP
            b.push("Super Ginger"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;

            // Garlic Jr Trans.
        case 10016:
            b.push("/skills/10016.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Increases Garlic Jr's stats by 30% but decreases his EP by 10 each turn. This skill can't be canceled by Re-use or EP hitting zero. This skill can be stopped by moves that remove transformations and  will remove its current effects. If this used is used after in transformation state this skill will do nothing");
            b.push(10); //EP
            b.push("Super Garlic Jr"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("S"); //Rarity
            b.push(["w",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Cooler Trans 1.
        case 10017:
            b.push("/skills/10017.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Cooler transforms increasing his power significantly gaining 50% to all stats but decreases his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Final Form Cooler"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["b",true]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Kid Goku Trans. 1
        case 10018:
            b.push("/skills/10018.png"); //Image
            b.push(2); //BP Cost
            b.push(0); //Cooldown
            b.push("Increases Kid Goku's Strength, Ki, and Defense by 50% but decreases his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Oozaru Goku"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["b",true]); //Transformation Settings
            break;
            
            case 10020:
b.push("/skills/10020.png");
b.push(1);
b.push(0);
b.push( "Dr wheelo stores up power to boost Planet Geyser . For every turn this active Planet Geyser will deal an extra 5 damage and gains 3 defense every turn  but decreases the users EP by 10. Re-use of this skill , EP hitting zero while active or Planet Geyser being used will remove its current effects.");
b.push(10);
b.push("Geyser Build");
b.push( "Transformation");
b.push( "Self");
b.push(["None"]);
b.push(3);
b.push("R");
b.push(["b",true]); //Transformation Settings
break;


        case "None":
            b.push("/skills/10018.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Increases Kid Goku's Strength, Ki, and Defense by 50% but decreases his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Oozaru Goku"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["b",false]); //Transformation Settings
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginyu Force Stack
        case "G":
            b = ["/skills/G.png", 0, 0, 0, 0, "G-Force", 0, 0]; //
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        default:
            b.push("/skills/10018.png"); //Image
            b.push(1); //BP Cost
            b.push(0); //Cooldown
            b.push("Increases Kid Goku's Strength, Ki, and Defense by 50% but decreases his EP by 15 each turn. Re-use of this skill while active or EP hitting zero will remove its current effects.");
            b.push(15); //EP
            b.push("Oozaru Goku"); //Name of skill
            b.push("Transformation"); //Type
            b.push("Self"); //Focus
            b.push(["None"]); //Alternate
            b.push(3); //Target: 1=Enemy | 2=Multiple-Enemies | 3=Self | 4=Ally | 5=Multiple-Allies | 6=Any-Ally
            b.push("C"); //Rarity
            b.push(["b",false]); //Transformation Settings
    } //end switch
return b;
}
function characterList(a)
{
    var b = [];
      switch (a) {

        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Chiaotzu
        case "zCu":
           
                b.push("A fellow member of the Z warriors who shares a strong bond with Tien."); //description
                b.push("/skills/zCu.png"); //Image
                b.push("Chiaotzu (Z)"); //Name 
                b.push("Hero,Human"); // Tags
                b.push("C"); //Rarity
                b.push([7, 9, 8, 10, 130, 100]); //Stats
                b.push("zCu");
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Cui Z
        case "zCi":
                b.push("Cui, a soldier for Frieza. Cui is more or less a coward and thus he uses trickery in order to combat enemies that tend to be stronger than him.");
                b.push("/skills/zCi.png");
                b.push("Cui (Z)");
                b.push("Villain,Frieza's Army");
                b.push("C");
                b.push([10, 10, 10, 10, 150, 100]);
                b.push("zCi");
            
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
          // Turles Z  
        case "zTs":
b.push("Turles is a space-pirate Saiyan who was once a member of the Saiyan Army under the Galactic Frieza Army, but he went defunct and off into the cosmos to conquer planets for himself with his group of henchmen known as the Turles Crusher Corps.");
b.push("/skills/zTs.png"); 
b.push("Turles Z"); 
b.push("Villian,Saiyan,Frieza's Army"); 
b.push("R");
b.push([7,9,9,9,160,100]);
b.push("zTs");
        break;


         // Dr. Wheelo Z  
case "zDo":
if (c[1] === "10020")
{ 
b.push("Dr. Wheelo's cyborg body is shown to be far more powerful than most armored robots in the series. It is able to withstand Goku, Krillin and Master Roshi's combined Kamehameha without receiving a single scratch.");
b.push("/skills/zDo.png"); 
b.push("Dr. Wheelo Z"); 
b.push("Bio"); 
b.push("R");
b.push([9,8,11,8,180,100]);
b.push("10020");

}

else
{ 
b.push("Dr. Wheelo is a scientist who performs experiments in biotechnology. Dr. Wheelo's goal is to rule the world, using a modified Human army via his science to do so.");
b.push("/skills/zDo.png"); 
b.push("Dr. Wheelo Z"); 
b.push("Bio"); 
b.push("R");
b.push([9,8,11,8,180,100]);
b.push("zDo");
}
break;

            // Goku Z
        case "zGu":
            if (c[1] === "10001") {
                b.push("It's Goku's Kaio-ken! He gains a massive upsurge of EP. Everything is heightened: power, speed, even hearing.However, it seems to take a toll on his body.");
                b.push("/skills/zGu.png");
                b.push("Kaio-ken Goku (Z)");
                b.push("Hero,Saiyan");
                b.push("C");
                b.push([13, 10, 10, 9, 170, 100]);
                b.push("10001");
            }
            else
            {
                  b.push("Goku is one of the strongest Saiyans alive and the main character of the series. Though born into the Saiyan race, he has never once tried to destroy earth. Data says he seems to possess incredible power.");
                b.push("/skills/zGu.png");
                b.push("Goku (Z)");
                b.push("Hero,Saiyan");
                b.push("C");
                b.push([13, 10, 10, 9, 170, 100]);
                b.push("zGu");
            }
            
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        case "zDe":
b.push("Dende is a Namekian with a unique gift that allows him to heal others. He is the 108th son of Grand Elder Guru. On Goku's request, Dende becomes the Earth's Guardian in Kami's place. ");
b.push("/skills/zDe.png"); 
b.push("Dende Z"); 
b.push("Hero,Namekian"); 
b.push("S");
b.push([5,6,12,11,160,100]);
b.push("zDe");
break;

    case "zBa":
b.push("Dende is a Namekian with a unique gift that allows him to heal others. He is the 108th son of Grand Elder Guru. On Goku's request, Dende becomes the Earth's Guardian in Kami's place. ");
b.push("/skills/zDe.png"); 
b.push("Bulma Z"); 
b.push("Hero,Namekian"); 
b.push("L");
b.push([5,6,12,11,160,100]);
b.push("zDe");
break;

            // Kid Gohan
        case "zKG":
            if (c[1] === "10003") {
                b.push("Gohan powers has been unlocked. Analysis of scouter data shows overall power has increased by a great margin. It seems he is getting serious now!");
                b.push("/skills/zKG.png");
                b.push("Empowered Kid Gohan (Z)");
                b.push("Hero,Saiyan,Human");
                b.push("C");
                b.push([10, 10, 9, 8, 150, 100]);
                b.push("10003");
            }
            else if (c[1] === "10002") {
                b.push("Gohan has turn into a giant great ape and is on a rampage. Power level has increased greatly and seems only focus on destroying.");
                b.push("/skills/zKG.png");
                b.push("Oozaru Kid Gohan (Z)");
                b.push("Hero,Saiyan,Human");
                b.push("S");
                b.push([10, 10, 9, 8, 150, 100]);
                b.push("10002");
            }
            else {
               b.push("Gohan is the son of Goku. Gohan has shown amazing potential at such a young age. Analysis of scouter data indicated untapped potential not yet revealed.");
                b.push("/skills/zKG.png");
                b.push("Kid Gohan (Z)");
                b.push("Hero,Saiyan,Human");
                b.push("C");
                b.push([10, 10, 9, 8, 150, 100]);
                b.push("zKG"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Krillin
        case "zKn":
             if (c[1] === "10005") {
                b.push("Krillin powers have been unlocked. Analysis of scouter data determines that power has jumped quite a bit. Is this really the same Krillin?");
                b.push("/skills/zKn.png");
                b.push("Empowered Krillin (Z)");
                b.push("Hero,Human");
                b.push("C");
                b.push([10, 12, 9, 9, 160, 100]);
                b.push("10005"); 
            }
            else
            {
                    b.push("Krillin is a powerful earthling who also happens to be one of Goku's best friends.Krillin prefers to use long distance skills to attack his enemies and attack enemies in their blind spots.");
                b.push("/skills/zKn.png");
                b.push("Krillin (Z)");
                b.push("Hero,Human");
                b.push("C");
                b.push([10, 12, 9, 9, 160, 100]);
                b.push("zKn"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nappa
        case "zNa":
           if (c[1] === "10007") {
                b.push("Nappa has a huge Power-Up and becomes dangerous to attack. It seems attacking him now will lead to your own death.");
                b.push("/skills/zNa.png");
                b.push("Power Amp Nappa (Z)");
                b.push("Villain,Saiyan");
                b.push("R");
                b.push([11, 11, 12, 8, 170, 100]);
                b.push("10007"); 
            }
             else  {
                b.push("Nappa is an elite Saiyan warrior from Planet Vegeta, and Vegeta's partner in combat. Nappa is destructive and cocky which makes him fight in a powerhouse style of fighting.");
                b.push("/skills/zNa.png");
                b.push("Nappa (Z)");
                b.push("Villain,Saiyan");
                b.push("R");
                b.push([11, 11, 12, 8, 170, 100]);
                b.push("zNa"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Piccolo Z
        case "zPo":
            if (c[1] === "10000") {
                b.push("Piccolo is a wise strategist who was originally a ruthless enemy of Goku. He later becomes a permanent member of the Z Fighters during Dragon Ball Z."); //Description
                b.push("/skills/zPo.png");
                b.push("Piccolo (Z)");
                b.push("Hero,Namekian");
                b.push("C");
                b.push([8, 8, 15, 10, 190, 100]);
                b.push("zPo");
            }
            else
            {
                b.push("Piccolo is a wise strategist who was originally a ruthless enemy of Goku. He later becomes a permanent member of the Z Fighters during Dragon Ball Z."); //Description
                b.push("/skills/zPo.png");
                b.push("Piccolo (Z)");
                b.push("Hero,Namekian");
                b.push("C");
                b.push([8, 8, 15, 10, 190, 100]);
                b.push("zPo"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Recoome
        case "zRe":
       
                b.push("Recoome is a ruthless member of the Ginyu Force. He specializes in countering enemy attacks and finishing them off with devastating attacks.");
                b.push("/skills/zRe.png");
                b.push("Recoome");
                b.push("Villain,Frieza's Army");
                b.push("C");
                b.push([10, 11, 10, 9, 160, 100]);
                b.push("zRe"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Jeice
        case "zJe":
           
                b.push("A member of the infamous mercenary squad known as the Ginyu force. Burter is often partnered with Jeice and they combine their powers to perform deadly signature attacks.");
                b.push("/skills/zJe.png");
                b.push("Jeice");
                b.push("Villain,Frieza's Army");
                b.push("R");
                b.push([10, 11, 10, 9, 170, 100]);
                b.push("zJe"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Burter
        case "zBr":
           
                b.push("A member of the infamous mercenary squad known as the Ginyu force. Burter is often partnered with Jeice and they combine their powers to perform deadly signature attacks.Nicknamed the blue hurricane, he was once known as the fastest person in the universe next to Frieza.");
                b.push("/skills/zBr.png");
                b.push("Burter");
                b.push("Villain,Frieza's Army");
                b.push("R");
                b.push([11, 7, 10, 12, 170, 100]);
                b.push("zBr"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginyu
        case "zGy":
           
                b.push("Ginyu is the Captain of The Ginyu Force and one of Frieza's right-hand men. Ginyu is frightfully powerful, able to fight with overpowering strength and when things get too hot, changes bodies.");
                b.push("/skills/zGy.png");
                b.push("Ginyu");
                b.push("Villain,Frieza's Army");
                b.push("S");
                b.push([11, 7, 10, 12, 170, 100]);
                b.push("zGy"); 
            
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nail
        case "zNl":
                b.push("Nail is the most powerful Namekian and bodyguard of Grand Elder Guru. He is adept in most Namekian techniques, being able to regenerate instantly and fuse with other fighters to increase their power significantly.");
                b.push("/skills/zNl.png");
                b.push("Nail");
                b.push("Hero,Namekian");
                b.push("S");
                b.push([8, 8, 15, 10, 190, 100]);
                b.push("zNl"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Raditz
        case "zRz":
            
                b.push("Raditz is the brother of Goku, but with completely different personalities. He's heartless and mocks weak enemies,He has a strong build and dangerous EP beams to destroy his opponents.");
                b.push("/skills/zRz.png");
                b.push("Raditz (Z)");
                b.push("Villain,Saiyan");
                b.push("R");
                b.push([10, 10, 11, 11, 170]);
                b.push("zRz"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Saibamen
        case "zSn":
            if (c[1] === "10009") {
                b.push("Saibamen are on the field from planted seeds. With numbers these creatures become more dangerous and effective. ");
                b.push("/skills/zSn.png");
                b.push("Saibamen (Z)");
                b.push("Villain,Creature");
                b.push("C");
                b.push([5, 5, 5, 10, 130, 100]);
                b.push("10009"); 
            }
            else{
                b.push("A Saibaman is a green, humanoid creatures that grow from a planted seed placed in the ground. Saibaman possess only enough intelligence to understand orders and will do whatever it takes to kill there target.");
                b.push("/skills/zSn.png");
                b.push("Saibaman (Z)");
                b.push("Villain,Creature");
                b.push("C");
                b.push([5, 5, 5, 10, 130, 100]);
                b.push("zSn"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Scouter Vegeta
        case "zSV":
           if (c[1] === "10008") {
                b.push("Vegeta turns into a great ape and gains tremendous power. Watch out for his mouth blast as it may be the last thing you see.");
                b.push("/skills/zSV.png");
                b.push("Oozaru Vegeta (Z)");
                b.push("Villain,Saiyan");
                b.push("S");
                b.push([12, 13, 9, 9, 170, 100]);
                b.push("10008"); 
            }
             else{
                b.push("Vegeta is the son of King Vegeta and a ruthless Saiyan, slaying even those who are loyal to him. He later has a change of heart and assists Goku and friends against the threats that target planet earth.");
                b.push("/skills/zSV.png");
                b.push("Scouter Vegeta (Z)");
                b.push("Villain,Saiyan");
                b.push("S");
                b.push([12, 13, 9, 9, 170, 100]);
                b.push("zSV"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Tien Z
        case "zTn":
        
                b.push("Tien is one of the strongest humans in the Z universe and a close friend of Chiaotzu. He is proficient in ki and uses martial arts to his advantage.");
                b.push("/skills/zTn.png");
                b.push("Tien (Z)");
                b.push("Hero,Human");
                b.push("C");
                b.push([10, 13, 10, 9, 150, 100]);
                b.push("zTn"); 
                
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Yajirobe
        case "zYe":
           
                b.push("Yajirobe is a gallant warrior who trains mostly at Korin's Tower. Though not the strongest warrior, his swordsmanship and supportive capabilities aids the Z warriors through some of their toughest experiences.");
                b.push("/skills/zYe.png");
                b.push("Yajirobe (Z)");
                b.push("Hero,Human");
                b.push("C");
                b.push([10, 7, 12, 7, 150, 100]);
                b.push("zYe"); 
            
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Yamcha
        case "zYa":
            
                b.push("Yamcha is a human on planet Earth and a Z fighter who aids Goku and his friends in upcoming battles. He is cocky and arrogant but has ferocious abilities.");
                b.push("/skills/zYa.png");
                b.push("Yamcha (Z)");
                b.push("Hero,Human");
                b.push("C");
                b.push([10, 10, 10, 11, 150, 100]);
                b.push("zYa"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // King Kai
        case "zKk":
            
                b.push("King Kai is a humorous kai that possesses great intelligence and knowledge about the universe and specializes in universal telepathic links. King Kai uses his range of knowledge to teach others to become stronger.Scouter Data indicates that he is willing to train warriors if they tell a good joke.");
                b.push("/skills/zKk.png");
                b.push("King Kai");
                b.push("Hero,God");
                b.push("C");
                b.push([8, 10, 11, 9, 160, 100]);
                b.push("zKk"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Guldo
        case "zGo":
        
                b.push("Guldo is a member of the Ginyu Force and is considered the weakest in the group. Guldo uses a combination of psychic powers and time-like powers to overpower those who appose the Ginyu Force.");
                b.push("/skills/zGo.png");
                b.push("Guldo");
                b.push("Villain,Frieza's Army");
                b.push("C");
                b.push([8, 10, 11, 9, 160, 100]);
                b.push("zGo"); 
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Roshi
        case "zRi":
           if (c[1] === "10012") {
                b.push("Roshi using his full power becomes not only powerful but has new tricks to use. It seems this form kamahamaha was about to destroy mountains.");
                b.push("/skills/zRi.png");
                b.push("Max Power Roshi");
                b.push("Hero,Human");
                b.push("S");
                b.push([6, 12, 9, 9, 160, 100]);
                b.push("10012"); 
            }
             else{
                b.push("Roshi is a legendary martial artist. Along with being an expert martial artist, he was also the teacher of Goku and Krillin.");
                b.push("/skills/zRi.png");
                b.push("Roshi");
                b.push("Hero,Human");
                b.push("C");
                b.push([6, 12, 9, 9, 160, 100]);
                b.push("zRi"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Kid Goku 
        case "bKG":
              if (c[1] === "10018") {
                b.push("Goku has transformed into a great ape and has become focused on nothing more than destruction. Goku powers seems to have greatly increased and threat to his enemies.");
                b.push("/skills/bKG.png");
                b.push("Oozaru Kid Goku");
                b.push("Hero,Saiyan");
                b.push("S");
                b.push([6, 12, 9, 9, 160, 100]);
                b.push("10018"); 
            }
            
              else {
                b.push("A young boy who trains under a lengendary martial artist named Roshi. He is powerful fighter who will do whatever it takes to protect his friends.");
                b.push("/skills/bKG.png");
                b.push("Kid Goku");
                b.push("Hero,Saiyan");
                b.push("S");
                b.push([6, 12, 9, 9, 160, 100]);
                b.push("bKG"); 
            }
            break;

        case "zGJ":
             if (c[1] === "10016") {
                b.push("Garlic Jr releases his full power.");
                b.push("/skills/bKG.png");
                b.push("Super Garlic Jr");
                b.push("Villain");
                b.push("L");
                b.push([9, 9, 9, 9, 160, 100]);
                b.push("10016"); 
            }
              else {
                b.push("This is a test character");
                b.push("/skills/zGJ.png");
                b.push("Garlic Jr");
                b.push("Villain");
                b.push("L");
                b.push([9, 9, 9, 9, 160, 100]);
                b.push("zGJ"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Cooler
        case "zCr":
           if (c[1] === "10017") {
                b.push("Cooler releases his full power and transforms into his final form.");
                b.push("/skills/zCr.png");
                b.push("Final Form Cooler");
                b.push("Villain");
                b.push("S");
                b.push([9, 10, 9, 9, 170, 100]);
                b.push("10017"); 
            }
             else {
                b.push("Cooler is the older brother of Frieza. He is the more arrogant of the two believing his power tops anyone else in their particular universe.");
                b.push("/skills/zCr.png");
                b.push("Cooler");
                b.push("Villain");
                b.push("R");
                b.push([9, 10, 9, 9, 170, 100]);
                b.push("zCr"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Dodoria
        case "zDa":
           
                b.push("Dodoria is a ruthless warrior that serves as Friezas henchmen alongside Zarbon. While Dodoria and Zarbon are both tyrants Dodoria is a lot more brash.");
                b.push("/skills/zDa.png");
                b.push("Dodoria");
                b.push("Villain,Frieza's Army");
                b.push("C");
                b.push([8, 10, 9, 9, 170, 100]);
                b.push("zDa"); 
            
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Zarbon
        case "zZn":
          if (c[1] === "10010") {
                b.push("Zarbons Big Daddy form.");
                b.push("/skills/10010.png");
                b.push("Monster Zarbon");
                b.push("Villain,Frieza's Army");
                b.push("S");
                b.push([8, 10, 9, 11, 160, 100]);
                b.push("10010"); 
            }
            
              else{
                b.push("Zarbon description goes here.");
                b.push("/skills/zZn.png");
                b.push("Zarbon (Z)");
                b.push("Villain,Frieza's Army");
                b.push("R");
                b.push([8, 10, 9, 11, 160, 100]);
                b.push("zZn"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Sansho
        case "zSo":
            if (c[1] === "10013") {
                b.push("Sansho gains a brief buff in his stats.");
                b.push("/skills/10013.png");
                b.push("Super Sansho");
                b.push("Villain,Henchmen");
                b.push("S");
                b.push([9, 10, 10, 9, 170, 100]);
                b.push("10013"); 
            }
            
            else{
                b.push("Sansho is first seen when he attacks Piccolo with Ginger and Nicky. Later, Sansho and Ginger find and bring the last Dragon Balls to Garlic Jr. who summons Shenron and wishes for immortality.");
                b.push("/skills/zSo.png");
                b.push("Sansho (Z)");
                b.push("Villain,Henchmen");
                b.push("C");
                b.push([9, 10, 10, 9, 170, 100]);
                b.push("zSo"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Ginger
        case "zGr":
            if (c[1] === "10015") {
                b.push("Ginger gains a brief buff in his stats.");
                b.push("/skills/10015.png");
                b.push("Super Ginger");
                b.push("Villain,Henchmen");
                b.push("S");
                b.push([9, 9, 9, 9, 160, 100]);
                b.push("10015"); 
            }
              else {
                b.push("Ginger is one of Garlic Jr.'s original trio of henchmen in Dragon Ball Z: Dead Zone.");
                b.push("/skills/zGr.png");
                b.push("Ginger (Z)");
                b.push("Villain,Henchmen");
                b.push("C");
                b.push([9, 9, 9, 9, 160, 100]);
                b.push("zGr"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Nicky
        case "zNy":
            
            if (c[1] === "10014") {
                b.push("Nicky gains a brief buff in his stats.");
                b.push("/skills/10014.png");
                b.push("Super Nicky");
                b.push("Villain,Henchmen");
                b.push("S");
                b.push([11, 11, 9, 9, 160, 100]);
                b.push("10014"); 
            }
            
            else {
                b.push("Nicky is a tall, white-haired, blue-skinned henchman of Garlic Jr. from the movie Dragon Ball Z: Dead Zone. Nicky also appears to have a fondness for fruit, as shown when he and the others kidnapped Gohan, he was seen plucking several pears into his mouth.");
                b.push("/skills/zNy.png");
                b.push("Nicky (Z)");
                b.push("Villain,Henchmen");
                b.push("C");
                b.push([11, 11, 9, 9, 160, 100]);
                b.push("zNy"); 
            }
            break;
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // Medamatcha
        case "zMa":
            
                b.push("Upon arriving on Earth, Medamatcha locates the Dragon Balls for Lord Slug along with Angila, Wings, and three other soldiers in less than one hour, finding the One-Star Ball in a nest.");
                b.push("/skills/zMa.png");
                b.push("Medamatcha (Z)");
                b.push("Villain,Demon");
                b.push("C");
                b.push([8, 9, 9, 6, 170, 100]);
                b.push("zMa"); 
            break;

        default:
            b.push("Description");
            b.push("/ava/box.png");
            b.push("None");
    } //end switch



return b;
} //switch end


$(function () {
  $('[data-toggle="popover"]').popover()
})

function onSelectChange(a){
var b = $(a).attr("id2");
console.log("Hello?: " + b);
var x;
    if (confirm("Are you sure?") == true) {
       document.getElementById(b).submit();
    } else {
        
    }

 
}

$('#buttona').click(function() {
    var radio = $('input[name=avater]:checked').val();
    $("#approveAvater").val(radio);
    $("#approve").submit();
    console.log(radio);
});

$('#buttond').click(function() {
    var radio = $('input[name=avater]:checked').val();
    $("#disapproveAvater").val(radio);
   $("#disapprove").submit();
    console.log(radio);
});

$('#button1').click(function() {
    var radio = $('input[name=avater1]:checked').val();
    $("#approveAvater1").val(radio);
    $("#approve1").submit();
    console.log(radio);
});

$('#button2').click(function() {
    var radio = $('input[name=avater1]:checked').val();
    $("#disapproveAvater1").val(radio);
   $("#disapprove1").submit();
    console.log(radio);
});

function itemList(a)
{
    var b = [];
     switch (a)
{
    case "c1":
    b.push("Tempura Bowl");
    b.push("Heals one character by 20 HP.");
    b.push(0);
    b.push(1);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c2":
    b.push("Fried Pork Bowl");
    b.push("Heals one character by 30 HP.");
    b.push(1);
    b.push(1);  
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c3":
    b.push("Chicken & Egg Bowl");
    b.push("Heals one character by 40 HP.");
    b.push(2);
    b.push(1); 
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c4":
    b.push("Chilled Drink");
    b.push("Recovers 20 EP on one character.");
    b.push(0);
    b.push(1);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c5":
    b.push("Well Chilled Drink");
    b.push("Recovers 30 EP on one character.");
    b.push(0);
    b.push(1); 
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c6":
    b.push("Extremely Chilled Drink");
    b.push("Recovers 40 EP on one character.");
    b.push(2);
    b.push(1); 
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "c7":
    b.push("King Kai’s Water");
    b.push("The highest cooldown on one character is reduced by 1.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "c8":
    b.push("Super Holy Water Drop");
    b.push("Increases on character's Strength by 5 for one turn.");
    b.push(0);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "c9":
    b.push("Hercule Drink");
    b.push("Increases one character's Defense by 10 for one turn.");
    b.push(0);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "c10":
    b.push("Super Kami Water Drop");
    b.push("Increases one character's Ki by 5 for one turn.");
    b.push(1);
    b.push(1); 
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "c11":
    b.push("Magic Pot");
    b.push("The target ally will have one random effect applied to them.");
    b.push(2);
    b.push(1);
    b.push("Restoration");
    b.push("Support");
    break;
  
    case "c12":
    b.push("Pills");
    b.push("Increases BP by 1 for one turn.");
    b.push(0);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "c13":
    b.push("Dragon Soul!");
    b.push("Increases Zenny by 20% after winning one match.");
    b.push(0);
    b.push(0);
    b.push("None");
    b.push("None");
    break;
    
    case "c14":
    b.push("Dragon Soul!!");
    b.push("Increases Zenny by 40% after winning one match.");
    b.push(0);
    b.push(0); 
    b.push("None");
    b.push("None");
    break;
    
    case "c15":
    b.push("Dynamic!");
    b.push("Increases all character's experience by 20% after winning one match.");
    b.push(0);
    b.push(0);  
    b.push("None");
    b.push("None");
    break;
    
    case "c16":
    b.push("Dynamic!!");
    b.push("Increases all character's experience by 40% after winning one match.");
    b.push(0);
    b.push(0); 
    b.push("None");
    b.push("None");
    break;
    
    case "o1":
    b.push("Senzu Bean: Fourth");
    b.push("Recovers a fourth of one character's HP and EP.");
    b.push(2);
    b.push(2);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "o2":
    b.push("Senzu Bean:Third");
    b.push("Recovers a third of one character's HP and EP.");
    b.push(3);
    b.push(2);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "o3":
    b.push("Supreme Kai’s Water");
    b.push("The highest cooldown on one character is reduced by 2.");
    b.push(1);
    b.push(2);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "o4":
    b.push("Super Holy Water Bottle");
    b.push("Increases one character's Strength by 10 for one turn.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "o5":
    b.push("Hercule Drink DX");
    b.push("Increases one character's Defense by 15 for one turn.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "o6":
    b.push("Super Kami Water Bottle");
    b.push("Increases one character's Ki by 10 for one turn.");
    b.push(1);
    b.push(1);
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "o7":
    b.push("Baba's Pot");
    b.push("The target ally will have two random effects applied to them.");
    b.push(3);
    b.push(1);    
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "o8":
    b.push("Vaccine");
    b.push("Removes one enemy or ally debuff from the target.");
    b.push(3);
    b.push(0);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "o9":
    b.push("Dragon Soul!!!");
    b.push("Increases Zenny by 60% after winning one match.");
    b.push(0);
    b.push(0); 
    b.push("None");
    b.push("None");
    break;
    
    case "o10":
    b.push("Dragon Soul!!!!");
    b.push("Increases Zenny by 80% after winning one match.");
    b.push(0);
    b.push(0); 
    b.push("None");
    b.push("None");
    break;
    
    case "o11":
    b.push("Dynamic!!!");
    b.push("Increases all character's experience by 60% after winning one match.");
    b.push(0);
    b.push(0); 
    b.push("None");
    b.push("None");
    break;
    
    case "o12":
    b.push("Dynamic!!!!");
    b.push("Increases all character's experience by 80% after winning one match.");
    b.push(0);
    b.push(0);
    b.push("None");
    b.push("None");
    break;
    
    case "o13":
    b.push("Lord Slug's Pills");
    b.push("Increases bp by 1 for two turns.");
    b.push(3);
    b.push(0);
    b.push("None");
    b.push("None");
    break;
    
    case "r1":
    b.push("Senzu Bean: Half");
    b.push("Recovers half of one character's HP and EP.");
    b.push(4);
    b.push(4); 
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "r2":
    b.push("Senzu Bean");
    b.push("Fully restores one character's HP and EP.");
    b.push(5);
    b.push(5);
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "r3":
    b.push("Grand Supreme Kai’s Water");
    b.push("All cooldowns on one character is reduced to 0.");
    b.push(2);
    b.push(2);  
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "r4":
    b.push("Super Holy Water");
    b.push("Increases one character's Strength by 15 for one turn.");
    b.push(1);
    b.push(2);  
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "r5":
    b.push("Hercule Drink SP");
    b.push("Increases one character's Defense by 20 for one turn.");
    b.push(1);
    b.push(2);   
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "r6":
    b.push("Super Kami Water");
    b.push("Increases one character's Ki by 15 for one turn.");
    b.push(1);
    b.push(2); 
    b.push("Power-Up");
    b.push("Support");
    break;
    
    case "r7":
    b.push("Bibidi’s Pot");
    b.push("The target ally will have three random effects applied to them.");
    b.push(2);
    b.push(2); 
    b.push("Restoration");
    b.push("Support");
    break;
    
    case "r8":
    b.push("Dragon Soul!!!!!");
    b.push("Increases zenny by 100% after winning one match.");
    b.push(0);
    b.push(0);
    b.push("None");
    b.push("None");
    break;
    
    case "r9":
    b.push("Dynamic!!!!!");
    b.push("Increases all characters experience by 100% after winning one match.");
    b.push(0);
    b.push(0);
    b.push("None");
    b.push("None");
    break;
    
    default:
    b.push("None");
    b.push("None");
    b.push(0);
    b.push(0);    
    
}
return b;

}

function changeItem(a)
{
    var b = $(a).val();
    var c = itemList(b);
    console.log(c);
    $("#itemdescription").text(c[1]);
    $("#iteminfo").text("Bp:"+ c[2] + " Cooldown:" + c[3] + " Type:" + c[4] + " Focus:" + c[5]);
    $("#itemname").text(c[0]);
   
}

$("#file").change(function(e) {
    var file, img;
var _URL = window.URL || window.webkitURL;

    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
            if (this.width == 100 &&  this.height == 100)
            {
                alert("Successfully Size");
            }
            else
            {
                alert("Image isn't the right size. Your image should be 100 by 100.");
             
                  $('#uploadimage')[0].reset();

  // Prevent form submission
  e.stopPropagation();
  e.preventDefault();
                
            }
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
         $('#uploadimage')[0].reset();

  // Prevent form submission
  e.stopPropagation();
  e.preventDefault();
        };
        img.src = _URL.createObjectURL(file);


    }

});

var c = window.location.pathname;
if ( c === "/how_to_play")
{
    var show;
    var title;
    var content;
    var canvas = document.getElementById('myCanvas');
    var canvas2 = document.getElementById('menu');
    
    var createjs;
    canvas.width = 963;
    canvas.height = 622;
    
    canvas2.width = 963;
    canvas2.height = 522; 
 
   
    var stage = new createjs.Stage(canvas);
    var stage2 = new createjs.Stage(canvas2);
    
    stage.textBaseline = "alphabetic";
    createjs.Touch.enable(stage);
    createjs.Touch.enable(stage2);
    stage.enableMouseOver();
    stage2.enableMouseOver();
    
    var queue = new createjs.LoadQueue(false);
    queue.loadManifest([
		{id: 'screen1', src: '/images/scn1.png'},
        {id: 'content', src: '/images/manualcontent.png'},
        {id: 'menu', src: '/images/mainMenu.png'},
    ]);
     
    queue.load();
    queue.on("complete", queueLoaded, this);

}

function queueLoaded()
{
    console.log(queue.getResult("screen1"));
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', stage2);
    
    var screenshot1 = new createjs.Bitmap(queue.getResult("screen1")); 
    stage.addChild(screenshot1);
    
    var menu = new createjs.Bitmap(queue.getResult("menu")); 
    stage2.addChild(menu);
    
    var hitArea5 = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,60,60));
    var n1 = new createjs.Text("1", "60px AV", "white");
    n1.x = 106;
    n1.y = 300;
    n1.textBaseline = "alphabetic";
    n1.hitarea = hitArea5;
    n1.addEventListener("mouseover",function() {interfaceHover(1); });
    stage.addChild(n1);
    
    var n2 = new createjs.Text("2", "60px AV", "white");
    n2.x = 76;
    n2.y = 150;
    n2.hitarea = hitArea5;
    n2.addEventListener("mouseover",function() {interfaceHover(2); });
    n2.textBaseline = "alphabetic";
    stage.addChild(n2);
    
    var n3 = new createjs.Text("3", "40px AV", "white");
    n3.x = 56;
    n3.y = 50;
    n3.hitarea = hitArea5;
    n3.addEventListener("mouseover",function() {interfaceHover(3); });
    n3.textBaseline = "alphabetic";
    stage.addChild(n3);
    
    var n4 = new createjs.Text("4", "40px AV", "white");
    n4.x = 156;
    n4.y = 50;
    n4.hitarea = hitArea5;
    n4.addEventListener("mouseover",function() {interfaceHover(4); });
    n4.textBaseline = "alphabetic";
    stage.addChild(n4);
    
    var n5 = new createjs.Text("5", "40px AV", "white");
    n5.x = 580;
    n5.y = 50;
    n5.hitarea = hitArea5;
    n5.addEventListener("mouseover",function() {interfaceHover(5); });
    n5.textBaseline = "alphabetic";
    stage.addChild(n5);
    
    var n6 = new createjs.Text("6", "40px AV", "white");
    n6.x = 700;
    n6.y = 50;
    n6.hitarea = hitArea5;
    n6.addEventListener("mouseover",function() {interfaceHover(6); });
    n6.textBaseline = "alphabetic";
    stage.addChild(n6);
    
    var n7 = new createjs.Text("7", "40px AV", "white");
    n7.x = 830;
    n7.y = 50;
    n7.hitarea = hitArea5;
    n7.addEventListener("mouseover",function() {interfaceHover(7); });
    n7.textBaseline = "alphabetic";
    stage.addChild(n7);
    
    var n8 = new createjs.Text("8", "60px AV", "white");
    n8.x = 806;
    n8.y = 300;
    n8.hitarea = hitArea5;
    n8.addEventListener("mouseover",function() {interfaceHover(8); });
    n8.textBaseline = "alphabetic";
    stage.addChild(n8);
    
    var n9 = new createjs.Text("9", "60px AV", "white");
    n9.x = 810;
    n9.y = 150;
    n9.hitarea = hitArea5;
    n9.addEventListener("mouseover",function() {interfaceHover(9); });
    n9.textBaseline = "alphabetic";
    stage.addChild(n9);
    
    var n10 = new createjs.Text("10", "60px AV", "white");
    n10.x = 810;
    n10.y = 600;
    n10.hitarea = hitArea5;
    n10.addEventListener("mouseover",function() {interfaceHover(10); });
    n10.textBaseline = "alphabetic";
    stage.addChild(n10);
    
    var n11 = new createjs.Text("11", "30px AV", "white");
    n11.x = 20;
    n11.y = 530;
    n11.hitarea = hitArea5;
    n11.addEventListener("mouseover",function() {interfaceHover(11); });
    n11.textBaseline = "alphabetic";
    stage.addChild(n11);
    
    var n12 = new createjs.Text("12", "60px AV", "white");
    n12.x = 106;
    n12.y = 480;
    n12.hitarea = hitArea5;
    n12.addEventListener("mouseover",function() {interfaceHover(12); });
    n12.textBaseline = "alphabetic";
    stage.addChild(n12);
    
    var n13 = new createjs.Text("13", "30px AV", "white");
    n13.x = 20;
    n13.y = 100;
    n13.hitarea = hitArea5;
    n13.addEventListener("mouseover",function() {interfaceHover(13); });
    n13.textBaseline = "alphabetic";
    stage.addChild(n13);
    
    var n14 = new createjs.Text("14", "30px AV", "white");
    n14.x = 680;
    n14.y = 560;
    n14.hitarea = hitArea5;
    n14.addEventListener("mouseover",function() {interfaceHover(14); });
    n14.textBaseline = "alphabetic";
    stage.addChild(n14);
    
    var ns1 = new createjs.Text("1", "60px AV", "black");
    ns1.x = 90;
    ns1.y = 350;
    ns1.textBaseline = "alphabetic";
    ns1.hitarea = hitArea5;
    ns1.addEventListener("mouseover",function() {interfaceHover2(1); });
    stage2.addChild(ns1);
    
    var ns2 = new createjs.Text("2", "60px AV", "black");
    ns2.x = 800;
    ns2.y = 350;
    ns2.hitarea = hitArea5;
    ns2.addEventListener("mouseover",function() {interfaceHover2(2); });
    ns2.textBaseline = "alphabetic";
    stage2.addChild(ns2);
    
    var ns3 = new createjs.Text("3", "60px AV", "black");
    ns3.x = 90;
    ns3.y = 220;
    ns3.textBaseline = "alphabetic";
    ns3.hitarea = hitArea5;
    ns3.addEventListener("mouseover",function() {interfaceHover2(3); });
    stage2.addChild(ns3);
    
    
    queue.on("complete", queueLoaded, this);
    
    
}

function interfaceHover (num)
{
    stage.removeChild(show);
    stage.removeChild(content);
    
    content = new createjs.Bitmap(queue.getResult("content"));
    content.x = 200;
    content.y=200;
    
    switch(num)
    {
        case 1:
        show = new createjs.Text("This area is for player stats. Remember that stats are affected by character skills and player items.", "19px TW", "white");
        title = new createjs.Text("PLAYER STATS", "30px TW", "white");
        break;
        case 2:
        show = new createjs.Text("This area shows the players team. Each character has a level which increases as players progress through the game. Characters also have HP (Health Points), EP (Energy Points), and can be changed via the Team Builder.", "19px TW", "white");
        title = new createjs.Text("TEAM PANEL", "30px TW", "white");
        break;
        case 3:
        show = new createjs.Text("The active turn time. Each turn lasts for perform specific skills or surrender the match.", "19px TW", "white");
        title = new createjs.Text("TIME", "30px TW", "white");
        break;
        case 4:
        show = new createjs.Text("The active battle points. Players are awarded 3 BP per turn which allows them to perform character skills.", "19px TW", "white");
        title = new createjs.Text("BP", "30px TW", "white");
        break;
        case 5:
        show = new createjs.Text("The end turn option is when a player decided they have concluded all action on their perspective turns. Upon ending your turn, players will see the skill box panel which shows them any skills they have used that turn.", "19px TW", "white");
        title = new createjs.Text("END TURN", "30px TW", "white");
        break;
        case 6:
        show = new createjs.Text("When a player clicks on surrender, they're choosing to forfeit the game which results in a loss.", "19px TW", "white");
        title = new createjs.Text("SURRENDER", "30px TW", "white");
        break;
        case 7:
        show = new createjs.Text("The ingame's battle chat. Players can use this to talk with their opponents.", "19px TW", "white");
        title = new createjs.Text("BATTLE CHAT", "30px TW", "white");
        break;
        case 8:
        show = new createjs.Text("This area shows all active skills that are currently affecting the selected character.", "19px TW", "white");
        title = new createjs.Text("ACTION PANEL", "30px TW", "white");
        break;
        case 9:
        show = new createjs.Text("This is your opponent. By clicking their avatar you can check out their player info.", "19px TW", "white");
        title = new createjs.Text("OPPOSING PLAYER", "30px TW", "white");
        break;
        case 10:
        show = new createjs.Text("This is you. By clicking on your avatar you will see your player info as well as the item you placed on your team.", "19px TW", "white");
        title = new createjs.Text("CURRENT USER", "30px TW", "white");
        break;
        case 11:
        show = new createjs.Text("This area shows the three action skills box. When a player targets a given character, those skills show up in order from left (Top Box), center (Middle Box), and right (Bottom Box). ", "19px TW", "white");
        title = new createjs.Text("SKILL ACTION BOX", "30px TW", "white");
        break;
        case 12:
        show = new createjs.Text("This area shows the characters skills. All skills are visible to each player. However some skills have hidden effects that are only visible to the player those characters belong too.", "19px TW", "white");
        title = new createjs.Text("SKILLS PANEL", "30px TW", "white");
        break;
        case 13:
        show = new createjs.Text("This area shows all effects that are currently affecting the given target. This is no limit to how many effects can affect a character.", "19px TW", "white");
        title = new createjs.Text("CURRENT EFFECTS", "30px TW", "white");
        break;
        case 14:
        show = new createjs.Text("This area shows both the opposing teams characters (Top Row) and the current players team (Bottom Row). When the current player uses an item, that item displays on the box that coresponds to the targets location. This is to show what character is being affected by the item.", "19px TW", "white");
        title = new createjs.Text("ITEM ACTION BOX", "30px TW", "white");
        break;
    }
    show.x = 230;
    show.y = 280;
    title.x = 230;
    title.y = 210;
    show.lineWidth = 540;
    
    stage.addChild(content);
    stage.addChild(show);
    stage.addChild(title);
}

function interfaceHover2 (num)
{
    stage2.removeChild(show);
    stage2.removeChild(content);
    
    content = new createjs.Bitmap(queue.getResult("content"));
    content.x = 200;
    content.y=200;
    
    switch(num)
    {
        case 1:
        show = new createjs.Text("This is the players team. It shows what characters are asigned via the Team Builder and their individual levels. When selecting a character this will update character skills area. This will allow you to see the current moves on the selected character.", "19px TW", "white");
        title = new createjs.Text("PLAYER TEAM", "30px TW", "white");
        break;
        case 2:
        show = new createjs.Text("This is the players item. When a user click this area, they have the option to choose which item they want to take into battle with them. Only one item can be used per match.", "19px TW", "white");
        title = new createjs.Text("PLAYER ITEM", "30px TW", "white");
        break;
        case 3:
        show = new createjs.Text("This shows an individual character's skills. When a user clicks on an assigned character, their skills will be displayed in this area.", "19px TW", "white");
        title = new createjs.Text("CHARACTER SKILLS", "30px TW", "white");
        break;
        
        
    }
    show.x = 230;
    show.y = 280;
    title.x = 230;
    title.y = 210;
    show.lineWidth = 540;
    
    stage2.addChild(content);
    stage2.addChild(show);
    stage2.addChild(title);
}
$(document).ready(function() {
    $('#myCarousel1').carousel({
        interval: 10000
	})
});

function screenshot(num)
{
    switch(num)
    {
        case 1:
        $("#changeScreenshot").attr("src","/images/screen1.png")
        break;
        
        case 2:
        $("#changeScreenshot").attr("src","/images/screen2.png")
        break;
        
        case 3:
        $("#changeScreenshot").attr("src","/images/screen3.png")
        break;
        
        case 4:
        $("#changeScreenshot").attr("src","/images/screen4.png")
        break;
    }
    $("#screenshot").modal("show");
}
function video(num)
{
    switch(num)
    {
        case 1:
        $("#changeVideo").empty().append('<iframe width="560" height="315" class="" src="https://www.youtube.com/embed/nXnRL3FdmH0" frameborder="0" allowfullscreen></iframe>');
        break;
        
        case 2:
        $("#changeVideo").empty().append('<iframe width="560" height="315" class="" src="https://www.youtube.com/embed/011JkRWcOJQ" frameborder="0" allowfullscreen></iframe>');
        break;
        
        case 3:
        $("#changeVideo").empty().append('<iframe width="560" height="315" class="" src="https://www.youtube.com/embed/UP1kBDiCAr4" frameborder="0" allowfullscreen></iframe>');
        break;
        
        case 4:
        break;
    }
    
    $("#video").modal("show");
}


function changePlay(num,num2)
{
   
    if (num2 === 1)
    {
        $(num).attr("src","/images/PlayNow4.png");
    }
    else
    {
        $(num).attr("src","/images/PlayNow3.png");
    }
    
    
}


(function(){function a(a){"use strict";var b={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Specify a prefix to generated header ids",type:"string"},ghCompatibleHeaderId:{defaultValue:!1,describe:"Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",type:"boolean"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},excludeTrailingPunctuationFromURLs:{defaultValue:!1,describe:"Excludes trailing punctuation from links generated with autoLinking",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix indentation in es6 strings",type:"boolean"},disableForced4SpacesIndentedSublists:{defaultValue:!1,description:"Disables the requirement of indenting nested sublists by 4 spaces",type:"boolean"},simpleLineBreaks:{defaultValue:!1,description:"Parses simple line breaks as <br> (GFM Style)",type:"boolean"},requireSpaceBeforeHeadingText:{defaultValue:!1,description:"Makes adding a space between `#` and the header text mandatory (GFM Style)",type:"boolean"},ghMentions:{defaultValue:!1,description:"Enables github @mentions",type:"boolean"}};if(a===!1)return JSON.parse(JSON.stringify(b));var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d].defaultValue);return c}function b(){"use strict";var b=a(!0),c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=!0);return c}function c(a,b){"use strict";var c=b?"Error in "+b+" extension->":"Error in unnamed extension",d={valid:!0,error:""};e.helper.isArray(a)||(a=[a]);for(var f=0;f<a.length;++f){var g=c+" sub-extension "+f+": ",h=a[f];if("object"!=typeof h)return d.valid=!1,d.error=g+"must be an object, but "+typeof h+" given",d;if(!e.helper.isString(h.type))return d.valid=!1,d.error=g+'property "type" must be a string, but '+typeof h.type+" given",d;var i=h.type=h.type.toLowerCase();if("language"===i&&(i=h.type="lang"),"html"===i&&(i=h.type="output"),"lang"!==i&&"output"!==i&&"listener"!==i)return d.valid=!1,d.error=g+"type "+i+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',d;if("listener"===i){if(e.helper.isUndefined(h.listeners))return d.valid=!1,d.error=g+'. Extensions of type "listener" must have a property called "listeners"',d}else if(e.helper.isUndefined(h.filter)&&e.helper.isUndefined(h.regex))return d.valid=!1,d.error=g+i+' extensions must define either a "regex" property or a "filter" method',d;if(h.listeners){if("object"!=typeof h.listeners)return d.valid=!1,d.error=g+'"listeners" property must be an object but '+typeof h.listeners+" given",d;for(var j in h.listeners)if(h.listeners.hasOwnProperty(j)&&"function"!=typeof h.listeners[j])return d.valid=!1,d.error=g+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+j+" must be a function but "+typeof h.listeners[j]+" given",d}if(h.filter){if("function"!=typeof h.filter)return d.valid=!1,d.error=g+'"filter" must be a function, but '+typeof h.filter+" given",d}else if(h.regex){if(e.helper.isString(h.regex)&&(h.regex=new RegExp(h.regex,"g")),!h.regex instanceof RegExp)return d.valid=!1,d.error=g+'"regex" property must either be a string or a RegExp object, but '+typeof h.regex+" given",d;if(e.helper.isUndefined(h.replace))return d.valid=!1,d.error=g+'"regex" extensions must implement a replace string or function',d}}return d}function d(a,b){"use strict";var c=b.charCodeAt(0);return"~E"+c+"E"}var e={},f={},g={},h=a(!0),i={github:{omitExtraWLInCodeBlocks:!0,prefixHeaderId:"user-content-",simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,disableForced4SpacesIndentedSublists:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghCompatibleHeaderId:!0,ghMentions:!0},vanilla:a(!0),allOn:b()};e.helper={},e.extensions={},e.setOption=function(a,b){"use strict";return h[a]=b,this},e.getOption=function(a){"use strict";return h[a]},e.getOptions=function(){"use strict";return h},e.resetOptions=function(){"use strict";h=a(!0)},e.setFlavor=function(a){"use strict";if(i.hasOwnProperty(a)){var b=i[a];for(var c in b)b.hasOwnProperty(c)&&(h[c]=b[c])}},e.getDefaultOptions=function(b){"use strict";return a(b)},e.subParser=function(a,b){"use strict";if(e.helper.isString(a)){if("undefined"==typeof b){if(f.hasOwnProperty(a))return f[a];throw Error("SubParser named "+a+" not registered!")}f[a]=b}},e.extension=function(a,b){"use strict";if(!e.helper.isString(a))throw Error("Extension 'name' must be a string");if(a=e.helper.stdExtName(a),e.helper.isUndefined(b)){if(!g.hasOwnProperty(a))throw Error("Extension named "+a+" is not registered!");return g[a]}"function"==typeof b&&(b=b()),e.helper.isArray(b)||(b=[b]);var d=c(b,a);if(!d.valid)throw Error(d.error);g[a]=b},e.getAllExtensions=function(){"use strict";return g},e.removeExtension=function(a){"use strict";delete g[a]},e.resetExtensions=function(){"use strict";g={}},e.validateExtension=function(a){"use strict";var b=c(a,null);return b.valid?!0:(console.warn(b.error),!1)},e.hasOwnProperty("helper")||(e.helper={}),e.helper.isString=function(a){"use strict";return"string"==typeof a||a instanceof String},e.helper.isFunction=function(a){"use strict";var b={};return a&&"[object Function]"===b.toString.call(a)},e.helper.forEach=function(a,b){"use strict";if("function"==typeof a.forEach)a.forEach(b);else for(var c=0;c<a.length;c++)b(a[c],c,a)},e.helper.isArray=function(a){"use strict";return a.constructor===Array},e.helper.isUndefined=function(a){"use strict";return"undefined"==typeof a},e.helper.stdExtName=function(a){"use strict";return a.replace(/[_-]||\s/g,"").toLowerCase()},e.helper.escapeCharactersCallback=d,e.helper.escapeCharacters=function(a,b,c){"use strict";var e="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(e="\\\\"+e);var f=new RegExp(e,"g");return a=a.replace(f,d)};var j=function(a,b,c,d){"use strict";var e,f,g,h,i,j=d||"",k=j.indexOf("g")>-1,l=new RegExp(b+"|"+c,"g"+j.replace(/g/g,"")),m=new RegExp(b,j.replace(/g/g,"")),n=[];do for(e=0;g=l.exec(a);)if(m.test(g[0]))e++||(f=l.lastIndex,h=f-g[0].length);else if(e&&!--e){i=g.index+g[0].length;var o={left:{start:h,end:f},match:{start:f,end:g.index},right:{start:g.index,end:i},wholeMatch:{start:h,end:i}};if(n.push(o),!k)return n}while(e&&(l.lastIndex=f));return n};e.helper.matchRecursiveRegExp=function(a,b,c,d){"use strict";for(var e=j(a,b,c,d),f=[],g=0;g<e.length;++g)f.push([a.slice(e[g].wholeMatch.start,e[g].wholeMatch.end),a.slice(e[g].match.start,e[g].match.end),a.slice(e[g].left.start,e[g].left.end),a.slice(e[g].right.start,e[g].right.end)]);return f},e.helper.replaceRecursiveRegExp=function(a,b,c,d,f){"use strict";if(!e.helper.isFunction(b)){var g=b;b=function(){return g}}var h=j(a,c,d,f),i=a,k=h.length;if(k>0){var l=[];0!==h[0].wholeMatch.start&&l.push(a.slice(0,h[0].wholeMatch.start));for(var m=0;k>m;++m)l.push(b(a.slice(h[m].wholeMatch.start,h[m].wholeMatch.end),a.slice(h[m].match.start,h[m].match.end),a.slice(h[m].left.start,h[m].left.end),a.slice(h[m].right.start,h[m].right.end))),k-1>m&&l.push(a.slice(h[m].wholeMatch.end,h[m+1].wholeMatch.start));h[k-1].wholeMatch.end<a.length&&l.push(a.slice(h[k-1].wholeMatch.end)),i=l.join("")}return i},"undefined"==typeof console&&(console={warn:function(a){"use strict";alert(a)},log:function(a){"use strict";alert(a)},error:function(a){"use strict";throw a}}),e.Converter=function(a){"use strict";function b(){a=a||{};for(var b in h)h.hasOwnProperty(b)&&(l[b]=h[b]);if("object"!=typeof a)throw Error("Converter expects the passed parameter to be an object, but "+typeof a+" was passed instead.");for(var c in a)a.hasOwnProperty(c)&&(l[c]=a[c]);l.extensions&&e.helper.forEach(l.extensions,d)}function d(a,b){if(b=b||null,e.helper.isString(a)){if(a=e.helper.stdExtName(a),b=a,e.extensions[a])return console.warn("DEPRECATION WARNING: "+a+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void f(e.extensions[a],a);if(e.helper.isUndefined(g[a]))throw Error('Extension "'+a+'" could not be loaded. It was either not found or is not a valid extension.');a=g[a]}"function"==typeof a&&(a=a()),e.helper.isArray(a)||(a=[a]);var d=c(a,b);if(!d.valid)throw Error(d.error);for(var h=0;h<a.length;++h){switch(a[h].type){case"lang":m.push(a[h]);break;case"output":n.push(a[h])}if(a[h].hasOwnProperty("listeners"))for(var i in a[h].listeners)a[h].listeners.hasOwnProperty(i)&&j(i,a[h].listeners[i])}}function f(a,b){"function"==typeof a&&(a=a(new e.Converter)),e.helper.isArray(a)||(a=[a]);var d=c(a,b);if(!d.valid)throw Error(d.error);for(var f=0;f<a.length;++f)switch(a[f].type){case"lang":m.push(a[f]);break;case"output":n.push(a[f]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}function j(a,b){if(!e.helper.isString(a))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof a+" given");if("function"!=typeof b)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof b+" given");o.hasOwnProperty(a)||(o[a]=[]),o[a].push(b)}function k(a){var b=a.match(/^\s*/)[0].length,c=new RegExp("^\\s{0,"+b+"}","gm");return a.replace(c,"")}var l={},m=[],n=[],o={};b(),this._dispatch=function(a,b,c,d){if(o.hasOwnProperty(a))for(var e=0;e<o[a].length;++e){var f=o[a][e](a,b,this,c,d);f&&"undefined"!=typeof f&&(b=f)}return b},this.listen=function(a,b){return j(a,b),this},this.makeHtml=function(a){if(!a)return a;var b={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:m,outputModifiers:n,converter:this,ghCodeBlocks:[]};return a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a=a.replace(/\u00A0/g," "),l.smartIndentationFix&&(a=k(a)),a="\n\n"+a+"\n\n",a=e.subParser("detab")(a,l,b),a=e.subParser("stripBlankLines")(a,l,b),e.helper.forEach(m,function(c){a=e.subParser("runExtension")(c,a,l,b)}),a=e.subParser("hashPreCodeTags")(a,l,b),a=e.subParser("githubCodeBlocks")(a,l,b),a=e.subParser("hashHTMLBlocks")(a,l,b),a=e.subParser("hashHTMLSpans")(a,l,b),a=e.subParser("stripLinkDefinitions")(a,l,b),a=e.subParser("blockGamut")(a,l,b),a=e.subParser("unhashHTMLSpans")(a,l,b),a=e.subParser("unescapeSpecialChars")(a,l,b),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),e.helper.forEach(n,function(c){a=e.subParser("runExtension")(c,a,l,b)}),a},this.setOption=function(a,b){l[a]=b},this.getOption=function(a){return l[a]},this.getOptions=function(){return l},this.addExtension=function(a,b){b=b||null,d(a,b)},this.useExtension=function(a){d(a)},this.setFlavor=function(a){if(i.hasOwnProperty(a)){var b=i[a];for(var c in b)b.hasOwnProperty(c)&&(l[c]=b[c])}},this.removeExtension=function(a){e.helper.isArray(a)||(a=[a]);for(var b=0;b<a.length;++b){for(var c=a[b],d=0;d<m.length;++d)m[d]===c&&m[d].splice(d,1);for(var f=0;f<n.length;++d)n[f]===c&&n[f].splice(d,1)}},this.getAllExtensions=function(){return{language:m,output:n}}},e.subParser("anchors",function(a,b,c){"use strict";a=c.converter._dispatch("anchors.before",a,b,c);var d=function(a,b,d,f,g,h,i,j){e.helper.isUndefined(j)&&(j=""),a=b;var k=d,l=f.toLowerCase(),m=g,n=j;if(!m)if(l||(l=k.toLowerCase().replace(/ ?\n/g," ")),m="#"+l,e.helper.isUndefined(c.gUrls[l])){if(!(a.search(/\(\s*\)$/m)>-1))return a;m=""}else m=c.gUrls[l],e.helper.isUndefined(c.gTitles[l])||(n=c.gTitles[l]);m=e.helper.escapeCharacters(m,"*_",!1);var o='<a href="'+m+'"';return""!==n&&null!==n&&(n=n.replace(/"/g,"&quot;"),n=e.helper.escapeCharacters(n,"*_",!1),o+=' title="'+n+'"'),o+=">"+k+"</a>"};return a=a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g,d),a=a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,d),a=a.replace(/(\[([^\[\]]+)])()()()()()/g,d),b.ghMentions&&(a=a.replace(/(^|\s)(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gim,'$1<a href="https://www.github.com/$3">$2</a>')),a=c.converter._dispatch("anchors.after",a,b,c)}),e.subParser("autoLinks",function(a,b,c){"use strict";function d(a,c,d,e,f){var g=c,h="";return/^www\./i.test(c)&&(c=c.replace(/^www\./i,"http://www.")),b.excludeTrailingPunctuationFromURLs&&f&&(h=f),'<a href="'+c+'">'+g+"</a>"+h}function f(a,b){var c=e.subParser("unescapeSpecialChars")(b);return e.subParser("encodeEmailAddress")(c)}a=c.converter._dispatch("autoLinks.before",a,b,c);var g=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)()(?=\s|$)(?!["<>])/gi,h=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?()]?)(?=\s|$)(?!["<>])/gi,i=/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,j=/(?:^|\s)([A-Za-z0-9!#$%&'*+-\/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|\s)/gi,k=/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;return a=a.replace(i,d),a=a.replace(k,f),b.simplifiedAutoLink&&(a=b.excludeTrailingPunctuationFromURLs?a.replace(h,d):a.replace(g,d),a=a.replace(j,f)),a=c.converter._dispatch("autoLinks.after",a,b,c)}),e.subParser("blockGamut",function(a,b,c){"use strict";a=c.converter._dispatch("blockGamut.before",a,b,c),a=e.subParser("blockQuotes")(a,b,c),a=e.subParser("headers")(a,b,c);var d=e.subParser("hashBlock")("<hr />",b,c);return a=a.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm,d),a=a.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm,d),a=a.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm,d),a=e.subParser("lists")(a,b,c),a=e.subParser("codeBlocks")(a,b,c),a=e.subParser("tables")(a,b,c),a=e.subParser("hashHTMLBlocks")(a,b,c),a=e.subParser("paragraphs")(a,b,c),a=c.converter._dispatch("blockGamut.after",a,b,c)}),e.subParser("blockQuotes",function(a,b,c){"use strict";return a=c.converter._dispatch("blockQuotes.before",a,b,c),a=a.replace(/((^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,d){var f=d;return f=f.replace(/^[ \t]*>[ \t]?/gm,"~0"),f=f.replace(/~0/g,""),f=f.replace(/^[ \t]+$/gm,""),f=e.subParser("githubCodeBlocks")(f,b,c),f=e.subParser("blockGamut")(f,b,c),f=f.replace(/(^|\n)/g,"$1  "),f=f.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /gm,"~0"),c=c.replace(/~0/g,"")}),e.subParser("hashBlock")("<blockquote>\n"+f+"\n</blockquote>",b,c)}),a=c.converter._dispatch("blockQuotes.after",a,b,c)}),e.subParser("codeBlocks",function(a,b,c){"use strict";a=c.converter._dispatch("codeBlocks.before",a,b,c),a+="~0";var d=/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;return a=a.replace(d,function(a,d,f){var g=d,h=f,i="\n";return g=e.subParser("outdent")(g),g=e.subParser("encodeCode")(g),g=e.subParser("detab")(g),g=g.replace(/^\n+/g,""),g=g.replace(/\n+$/g,""),b.omitExtraWLInCodeBlocks&&(i=""),g="<pre><code>"+g+i+"</code></pre>",e.subParser("hashBlock")(g,b,c)+h}),a=a.replace(/~0/,""),a=c.converter._dispatch("codeBlocks.after",a,b,c)}),e.subParser("codeSpans",function(a,b,c){"use strict";return a=c.converter._dispatch("codeSpans.before",a,b,c),"undefined"==typeof a&&(a=""),a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d){var f=d;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=e.subParser("encodeCode")(f),b+"<code>"+f+"</code>"}),a=c.converter._dispatch("codeSpans.after",a,b,c)}),e.subParser("detab",function(a){"use strict";return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b){for(var c=b,d=4-c.length%4,e=0;d>e;e++)c+=" ";return c}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,"")}),e.subParser("encodeAmpsAndAngles",function(a){"use strict";return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}),e.subParser("encodeBackslashEscapes",function(a){"use strict";return a=a.replace(/\\(\\)/g,e.helper.escapeCharactersCallback),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,e.helper.escapeCharactersCallback)}),e.subParser("encodeCode",function(a){"use strict";return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=e.helper.escapeCharacters(a,"*_{}[]\\",!1)}),e.subParser("encodeEmailAddress",function(a){"use strict";var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if("@"===a)a=b[Math.floor(2*Math.random())](a);else if(":"!==a){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">')}),e.subParser("escapeSpecialCharsWithinTagAttributes",function(a){"use strict";var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=e.helper.escapeCharacters(b,"\\`*_",!1)})}),e.subParser("githubCodeBlocks",function(a,b,c){"use strict";return b.ghCodeBlocks?(a=c.converter._dispatch("githubCodeBlocks.before",a,b,c),a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,d,f){var g=b.omitExtraWLInCodeBlocks?"":"\n";return f=e.subParser("encodeCode")(f),f=e.subParser("detab")(f),f=f.replace(/^\n+/g,""),f=f.replace(/\n+$/g,""),f="<pre><code"+(d?' class="'+d+" language-"+d+'"':"")+">"+f+g+"</code></pre>",f=e.subParser("hashBlock")(f,b,c),"\n\n~G"+(c.ghCodeBlocks.push({text:a,codeblock:f})-1)+"G\n\n"}),a=a.replace(/~0/,""),c.converter._dispatch("githubCodeBlocks.after",a,b,c)):a}),e.subParser("hashBlock",function(a,b,c){"use strict";return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(c.gHtmlBlocks.push(a)-1)+"K\n\n"}),e.subParser("hashElement",function(a,b,c){"use strict";return function(a,b){var d=b;return d=d.replace(/\n\n/g,"\n"),d=d.replace(/^\n/,""),d=d.replace(/\n+$/g,""),d="\n\n~K"+(c.gHtmlBlocks.push(d)-1)+"K\n\n"}}),e.subParser("hashHTMLBlocks",function(a,b,c){"use strict";for(var d=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],f=function(a,b,d,e){var f=a;return-1!==d.search(/\bmarkdown\b/)&&(f=d+c.converter.makeHtml(b)+e),"\n\n~K"+(c.gHtmlBlocks.push(f)-1)+"K\n\n"},g=0;g<d.length;++g)a=e.helper.replaceRecursiveRegExp(a,f,"^ {0,3}<"+d[g]+"\\b[^>]*>","</"+d[g]+">","gim");return a=a.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,e.subParser("hashElement")(a,b,c)),a=e.helper.replaceRecursiveRegExp(a,function(a){return"\n\n~K"+(c.gHtmlBlocks.push(a)-1)+"K\n\n"},"^ {0,3}<!--","-->","gm"),a=a.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,e.subParser("hashElement")(a,b,c))}),e.subParser("hashHTMLSpans",function(a,b,c){"use strict";for(var d=e.helper.matchRecursiveRegExp(a,"<code\\b[^>]*>","</code>","gi"),f=0;f<d.length;++f)a=a.replace(d[f][0],"~C"+(c.gHtmlSpans.push(d[f][0])-1)+"C");return a}),e.subParser("unhashHTMLSpans",function(a,b,c){"use strict";for(var d=0;d<c.gHtmlSpans.length;++d)a=a.replace("~C"+d+"C",c.gHtmlSpans[d]);return a}),e.subParser("hashPreCodeTags",function(a,b,c){"use strict";var d=function(a,b,d,f){var g=d+e.subParser("encodeCode")(b)+f;return"\n\n~G"+(c.ghCodeBlocks.push({text:a,codeblock:g})-1)+"G\n\n"};return a=e.helper.replaceRecursiveRegExp(a,d,"^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^ {0,3}</code>\\s*</pre>","gim")}),e.subParser("headers",function(a,b,c){"use strict";function d(a){var b,d;return d=h?a.replace(/ /g,"-").replace(/&amp;/g,"").replace(/~T/g,"").replace(/~D/g,"").replace(/[&+$,\/:;=?@"#{}|^~\[\]`\\*)(%.!'<>]/g,"").toLowerCase():a.replace(/[^\w]/g,"").toLowerCase(),c.hashLinkCounts[d]?b=d+"-"+c.hashLinkCounts[d]++:(b=d,c.hashLinkCounts[d]=1),f===!0&&(f="section"),e.helper.isString(f)?f+b:b}a=c.converter._dispatch("headers.before",a,b,c);var f=b.prefixHeaderId,g=isNaN(parseInt(b.headerLevelStart))?1:parseInt(b.headerLevelStart),h=b.ghCompatibleHeaderId,i=b.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,j=b.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm;a=a.replace(i,function(a,f){var h=e.subParser("spanGamut")(f,b,c),i=b.noHeaderId?"":' id="'+d(f)+'"',j=g,k="<h"+j+i+">"+h+"</h"+j+">";return e.subParser("hashBlock")(k,b,c)}),a=a.replace(j,function(a,f){var h=e.subParser("spanGamut")(f,b,c),i=b.noHeaderId?"":' id="'+d(f)+'"',j=g+1,k="<h"+j+i+">"+h+"</h"+j+">";return e.subParser("hashBlock")(k,b,c)});var k=b.requireSpaceBeforeHeadingText?/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm:/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;return a=a.replace(k,function(a,f,h){var i=e.subParser("spanGamut")(h,b,c),j=b.noHeaderId?"":' id="'+d(h)+'"',k=g-1+f.length,l="<h"+k+j+">"+i+"</h"+k+">";return e.subParser("hashBlock")(l,b,c)}),a=c.converter._dispatch("headers.after",a,b,c)}),e.subParser("images",function(a,b,c){"use strict";function d(a,b,d,f,g,h,i,j){var k=c.gUrls,l=c.gTitles,m=c.gDimensions;if(d=d.toLowerCase(),j||(j=""),""===f||null===f){if((""===d||null===d)&&(d=b.toLowerCase().replace(/ ?\n/g," ")),f="#"+d,e.helper.isUndefined(k[d]))return a;f=k[d],e.helper.isUndefined(l[d])||(j=l[d]),e.helper.isUndefined(m[d])||(g=m[d].width,h=m[d].height)}b=b.replace(/"/g,"&quot;"),b=e.helper.escapeCharacters(b,"*_",!1),f=e.helper.escapeCharacters(f,"*_",!1);var n='<img src="'+f+'" alt="'+b+'"';return j&&(j=j.replace(/"/g,"&quot;"),j=e.helper.escapeCharacters(j,"*_",!1),n+=' title="'+j+'"'),g&&h&&(g="*"===g?"auto":g,h="*"===h?"auto":h,n+=' width="'+g+'"',n+=' height="'+h+'"'),n+=" />"}a=c.converter._dispatch("images.before",a,b,c);var f=/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,g=/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;return a=a.replace(g,d),a=a.replace(f,d),a=c.converter._dispatch("images.after",a,b,c)}),e.subParser("italicsAndBold",function(a,b,c){"use strict";return a=c.converter._dispatch("italicsAndBold.before",a,b,c),b.literalMidWordUnderscores?(a=a.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm,"$1<strong>$2</strong>"),a=a.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm,"$1<em>$2</em>"),a=a.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")):(a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")),a=c.converter._dispatch("italicsAndBold.after",a,b,c)}),e.subParser("lists",function(a,b,c){"use strict";function d(a,d){c.gListLevel++,a=a.replace(/\n{2,}$/,"\n"),a+="~0";var f=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,g=/\n[ \t]*\n(?!~0)/.test(a);return b.disableForced4SpacesIndentedSublists&&(f=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm),a=a.replace(f,function(a,d,f,h,i,j,k){k=k&&""!==k.trim();var l=e.subParser("outdent")(i,b,c),m="";return j&&b.tasklists&&(m=' class="task-list-item" style="list-style-type: none;"',l=l.replace(/^[ \t]*\[(x|X| )?]/m,function(){var a='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return k&&(a+=" checked"),a+=">"})),l=l.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g,function(a){return"~A"+a}),d||l.search(/\n{2,}/)>-1?(l=e.subParser("githubCodeBlocks")(l,b,c),l=e.subParser("blockGamut")(l,b,c)):(l=e.subParser("lists")(l,b,c),l=l.replace(/\n$/,""),l=e.subParser("hashHTMLBlocks")(l,b,c),l=l.replace(/\n\n+/g,"\n\n"),l=l.replace(/\n\n/g,"~B"),l=g?e.subParser("paragraphs")(l,b,c):e.subParser("spanGamut")(l,b,c),l=l.replace(/~B/g,"\n\n")),l=l.replace("~A",""),l="<li"+m+">"+l+"</li>\n"}),a=a.replace(/~0/g,""),c.gListLevel--,d&&(a=a.replace(/\s+$/,"")),a}function f(a,c,e){var f=b.disableForced4SpacesIndentedSublists?/^ ?\d+\.[ \t]/gm:/^ {0,3}\d+\.[ \t]/gm,g=b.disableForced4SpacesIndentedSublists?/^ ?[*+-][ \t]/gm:/^ {0,3}[*+-][ \t]/gm,h="ul"===c?f:g,i="";return-1!==a.search(h)?!function j(a){var b=a.search(h);-1!==b?(i+="\n<"+c+">\n"+d(a.slice(0,b),!!e)+"</"+c+">\n",c="ul"===c?"ol":"ul",h="ul"===c?f:g,j(a.slice(b))):i+="\n<"+c+">\n"+d(a,!!e)+"</"+c+">\n"}(a):i="\n<"+c+">\n"+d(a,!!e)+"</"+c+">\n",i}return a=c.converter._dispatch("lists.before",a,b,c),a+="~0",a=c.gListLevel?a.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(a,b,c){var d=c.search(/[*+-]/g)>-1?"ul":"ol";return f(b,d,!0)}):a.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(a,b,c,d){var e=d.search(/[*+-]/g)>-1?"ul":"ol";return f(c,e,!1)}),a=a.replace(/~0/,""),a=c.converter._dispatch("lists.after",a,b,c)}),e.subParser("outdent",function(a){"use strict";return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,"")}),e.subParser("paragraphs",function(a,b,c){"use strict";a=c.converter._dispatch("paragraphs.before",a,b,c),a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");for(var d=a.split(/\n{2,}/g),f=[],g=d.length,h=0;g>h;h++){var i=d[h];i.search(/~(K|G)(\d+)\1/g)>=0?f.push(i):(i=e.subParser("spanGamut")(i,b,c),i=i.replace(/^([ \t]*)/g,"<p>"),i+="</p>",f.push(i))}for(g=f.length,h=0;g>h;h++){for(var j="",k=f[h],l=!1;k.search(/~(K|G)(\d+)\1/)>=0;){var m=RegExp.$1,n=RegExp.$2;j="K"===m?c.gHtmlBlocks[n]:l?e.subParser("encodeCode")(c.ghCodeBlocks[n].text):c.ghCodeBlocks[n].codeblock,j=j.replace(/\$/g,"$$$$"),k=k.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/,j),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(k)&&(l=!0)}f[h]=k}return a=f.join("\n"),a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,""),c.converter._dispatch("paragraphs.after",a,b,c)}),e.subParser("runExtension",function(a,b,c,d){"use strict";if(a.filter)b=a.filter(b,d.converter,c);else if(a.regex){var e=a.regex;!e instanceof RegExp&&(e=new RegExp(e,"g")),b=b.replace(e,a.replace)}return b}),e.subParser("spanGamut",function(a,b,c){"use strict";return a=c.converter._dispatch("spanGamut.before",a,b,c),a=e.subParser("codeSpans")(a,b,c),a=e.subParser("escapeSpecialCharsWithinTagAttributes")(a,b,c),a=e.subParser("encodeBackslashEscapes")(a,b,c),a=e.subParser("images")(a,b,c),a=e.subParser("anchors")(a,b,c),a=e.subParser("autoLinks")(a,b,c),a=e.subParser("encodeAmpsAndAngles")(a,b,c),a=e.subParser("italicsAndBold")(a,b,c),a=e.subParser("strikethrough")(a,b,c),a=b.simpleLineBreaks?a.replace(/\n/g,"<br />\n"):a.replace(/  +\n/g,"<br />\n"),a=c.converter._dispatch("spanGamut.after",a,b,c)}),e.subParser("strikethrough",function(a,b,c){"use strict";return b.strikethrough&&(a=c.converter._dispatch("strikethrough.before",a,b,c),a=a.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g,"<del>$1</del>"),a=c.converter._dispatch("strikethrough.after",a,b,c)),a}),e.subParser("stripBlankLines",function(a){"use strict";return a.replace(/^[ \t]+$/gm,"")}),e.subParser("stripLinkDefinitions",function(a,b,c){"use strict";var d=/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;return a+="~0",a=a.replace(d,function(a,d,f,g,h,i,j){return d=d.toLowerCase(),c.gUrls[d]=e.subParser("encodeAmpsAndAngles")(f),i?i+j:(j&&(c.gTitles[d]=j.replace(/"|'/g,"&quot;")),b.parseImgDimensions&&g&&h&&(c.gDimensions[d]={width:g,height:h}),"")}),a=a.replace(/~0/,"")}),e.subParser("tables",function(a,b,c){"use strict";function d(a){return/^:[ \t]*--*$/.test(a)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(a)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(a)?' style="text-align:center;"':""}function f(a,d){var f="";return a=a.trim(),b.tableHeaderId&&(f=' id="'+a.replace(/ /g,"_").toLowerCase()+'"'),a=e.subParser("spanGamut")(a,b,c),"<th"+f+d+">"+a+"</th>\n"}function g(a,d){var f=e.subParser("spanGamut")(a,b,c);return"<td"+d+">"+f+"</td>\n"}function h(a,b){for(var c="<table>\n<thead>\n<tr>\n",d=a.length,e=0;d>e;++e)c+=a[e];for(c+="</tr>\n</thead>\n<tbody>\n",e=0;e<b.length;++e){c+="<tr>\n";for(var f=0;d>f;++f)c+=b[e][f];c+="</tr>\n"}return c+="</tbody>\n</table>\n"}if(!b.tables)return a;var i=/^ {0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;return a=c.converter._dispatch("tables.before",a,b,c),a=a.replace(i,function(a){var b,c=a.split("\n");for(b=0;b<c.length;++b)/^ {0,3}\|/.test(c[b])&&(c[b]=c[b].replace(/^ {0,3}\|/,"")),/\|[ \t]*$/.test(c[b])&&(c[b]=c[b].replace(/\|[ \t]*$/,""));var i=c[0].split("|").map(function(a){return a.trim()}),j=c[1].split("|").map(function(a){return a.trim()}),k=[],l=[],m=[],n=[];for(c.shift(),c.shift(),b=0;b<c.length;++b)""!==c[b].trim()&&k.push(c[b].split("|").map(function(a){return a.trim()}));if(i.length<j.length)return a;for(b=0;b<j.length;++b)m.push(d(j[b]));for(b=0;b<i.length;++b)e.helper.isUndefined(m[b])&&(m[b]=""),l.push(f(i[b],m[b]));for(b=0;b<k.length;++b){for(var o=[],p=0;p<l.length;++p)e.helper.isUndefined(k[b][p]),o.push(g(k[b][p],m[p]));n.push(o)}return h(l,n)}),a=c.converter._dispatch("tables.after",a,b,c)}),e.subParser("unescapeSpecialChars",function(a){"use strict";return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)})});var k=this;"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){"use strict";return e}):k.showdown=e}).call(this);
//# sourceMappingURL=showdown.min.js.map

var converter = new showdown.Converter();

function previewShow()
{
    var a = $("#textUpdate").val();
    var b = converter.makeHtml(a);
    console.log(b);
    $("#planetDescError").empty().append(b);
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

function ladderChoice(num)
{
    if (num === 1)
    {
           $.ajax({
            type: "POST",
  url: "/ladder/dragonverse",
  success: function( data ) {
     console.log(data);
     var length = data.report.length - 1;
     data.report = JSON.parse(data.report);
     $("#importLadder").empty();
     for (var i = 0; i < length ; i++) {
       $("#importLadder").append(' <tr><td class="OB"> <div class="pull-left rank">#'+(i+1)+' </div><img class="img-message img-circle pointer" src="'+data.report[i].avater+'"></td><td><a  href="/user/'+data.report[i].name+'">'+data.report[i].name+'</a></td><td>  '+data.report[i].rank+'</td><td> '+data.report[i].power_level+'</td> <td>'+data.report[i].average+'%</td><td>'+data.report[i].wins+' - '+data.report[i].losses+'</td></tr>'); 
     }
     
    // $("#infoUpdate").text(data.report);
   
  }
});
    }
    else
    {
               $.ajax({
            type: "POST",
  url: "/ladder/user",
  success: function( data ) {
     console.log(data);
     $("#importLadder").empty();
      var length = data.report.length - 1;
      data.report = JSON.parse(data.report);
   for (var i = 0; i < length ; i++) {
       $("#importLadder").append(' <tr><td class="OB"> <div class="pull-left rank">#'+(i+1)+' </div><img class="img-message img-circle pointer" src="'+data.report[i].avater+'"></td><td><a  href="/user/">'+data.report[i].username+'</a></td><td>  '+data.report[i].rank+'</td><td> '+data.report[i].power_level+'</td> <td>'+data.report[i].average+'%</td><td>'+data.report[i].wins+' - '+data.report[i].losses+' ('+data.report[i].streak+')</td></tr>'); 
     }
     
  }
});
    }
}

function gameManuel(num)
{
    $("#gameManuel").modal("show");
    switch(num)
    {
        case 1:
        $("#gameManuelName").text("Game Logic");
        $("#gameManuelInfo").empty().append('<div class="panel noround " style="margin: 0px; border:black;"><div class="panel-body scrollList3" >  <h3 class="OB cb">How it works?</h3> <img src="/images/screen1.png" class="img-responsive"><div class="Gil" ><div>A.This Area is for character stats. Strength boost strength type skills damage by adding damage equal the strength stat.  Ki boost Ki type skills damage by adding damage equal the Ki  stat. Defense subtracts damage done to your character for each battle phase.Speed decides the order of attack with the higher speed characters taking priority.</div><div>B.This is a character in the game which can be clicked on to learn more about there skills. </div><div>C. This is BP. All moves require a certain amount of bp to use any skill. Each player will gain 3 bp every turn.  </div><div>D.This is the the time left in a game before the end of the turn.</div><div>E.This tells the player how many turns are left in the game.</div><div>F.This is for the chatroom.</div><div>G.This is for ending your turn and submitting your skills.</div><div>H.</div><div>I.To surrender hit the surrender button.</div><div>J.This is health or HP for short. If the character hits 0 he is declared dead.</div><div>K.This is the energy or EP for short in the game. Moves usually cost energy to be able to be used.</div><div>N.This is where you can cancel skills that are currently put on an target. Canceling a skill will give you back bp.</div><div>L.This is the skill area were you select the skill you want to use against an enemy or on an ally.</div><div>M.This is your item you use this to help your characters out. Items go before skills in the game.</div><div>O.This area for info on skills currently effecting the character and status effects.</div> </div></div></div>');
        break;
        
        case 2:
        $("#gameManuelName").text("Experience System"); 
        $("#gameManuelInfo").empty().append('<div class="panel-body scrollList3" >  <p class=" TW ">The experience system is a great way to set apart players and future characters. The best part about it is that you gain character and player experience just by playing the game. Gaining character experience allows players to build characters suited for their style of battle while player experience is used to display prestiege within the game. </p><br><section id="manual"> <h3 class="TW">Leaderboards</h3><br><p class="pfixed UP TW">Like most competitive games Budokai Online also follows the path of the top overall players. Increase your personal ranking to show your skill in the game. Increase your dragonverse ranking to prove your in the greatest society in dragonverse!</p><h3 class="TW">Grade Based Experience System</h3><br><p class="pfixed UP TW">Our ranking system is grade based, with promotional series to advance to the next rank! For every win you can recieve 3 different values of experience depending on your opponent s ranking. 150xp, 250xp and 350xp. If you beat an opponent of higher ranking, you will recieve more experience. If you beat an opponent of lower rating, you gain less. If you face an opponent of same ranking you gain the middle value. </p><br><div class="col-md-4"> <p><u><strong>Character Level Guide</strong></u> </p><p>Level 1->2=100 Exp</p><p>Level 2->3=200 Exp</p><p>Level 3->4=400 Exp</p><p>Level 4->5=800 Exp</p><p>Level 5->6=1600 Exp</p><p>Level 6->7=3200 Exp</p><p>Level 7->8=6400 Exp</p><p>Level 8->9=12800 Exp</p></div><div class="col-md-8"> <p><u><strong>Player Level Guide</strong></u> </p><p>0-5000 Experience - D - Unable to lose experience at this rank.</p><p>5001-10000 Experience - C - Lose 25% of the experience you could have gained </p><p>**Promotional Series! Win your next ⅗ games to promote to the next rank.**</p><p>After passing C Rank, you will then have to pass a 3 out of 5 game promotion series to advance to the next ranking. </p><p>15000-20000 Experience - B - Lose 40% of the experience you could have gained. </p><p>20001-30000 Experience - A - Lose 50% of what you would have gained.</p><p>30001-40000 Experience - S - Lose 75% of what you would have gained.</p><p>40001-50000 Experience - Z - Lose 100% of what you would have won rounded up.</p></div></div>');
        break;
        
        case 3:
        $("#gameManuelName").text("Skill Conditions");    
        $("#gameManuelInfo").empty().append("<div class='panel-body scrollList3' > <div class='panel-body' > <section id='manual'> <p class='Gil'>There are different types of damage that will be used on Budokai Online, each having a specific property.</p><br><h3 class='TW'>Immunity Conditions</h3> <div class='containerManual'> <p><u><strong>Power-Down Immunity</strong></u><br>The target becomes immune to all power-down skills. </p></div><div class='containerManual'> <p><u><strong>Full Immunity</strong></u><br>The target becomes immune to all skill types. </p></div><div class='containerManual'> <p><u><strong>Ki Immunity</strong></u><br>The target becomes immune to all Ki based skills. </p></div><div class='containerManual'> <p><u><strong>Strength Immunity</strong></u><br>The target becomes immune to all Strength based skills. </p></section> </div><div class='panel-body'><br><section id='manual'> <h3 class='TW'>Stun Conditions </h3> <div class='containerManual'> <p><u><strong>Friendly Stun</strong></u><br>The target cannot perform friendly skills which are power-ups,tranformations, and defensive skills. </p></div><div class='containerManual'> <p><u><strong>Full Stun</strong></u><br>The target cannot perform any skills. </p></div><div class='containerManual'> <p><u><strong>Ki Stun</strong></u><br>The targets Ki skills cannot be used. </p></div><div class='containerManual'> <p><u><strong>Strength Stun</strong></u><br>The target's Strength skills cannot be used.<p></div></section></div><section id='manual'> <h3 class='TW marginup2'>Conditions </h3><div class='containerManual'> <p><u><strong>Counter</strong></u><br>Counters has an immediate response to another skill or a specific effect, negating those skills in the process. <span class='badge3'>* Counters are prioritized over speed and if a skill has been countered, the performer still loses energy and BP.</span></p></div><div class='containerManual'> <p><u><strong>Immunity</strong></u><br>Immunity makes the target invulnerable to certain enemy skills and effects. <span class='badge3'>* Immunities are prioritized over speed but becomes void in certain cases. If a skill ignores immunity then the target becomes prone to the incoming effect.</span></p></div><div class='containerManual'> <p><u><strong>Leech</strong></u><br>Leeching is when the target has BP, HP, or EP drained, leaving them unable to perform certain skills.</p></div><div class='containerManual'> <p><u><strong>Passive</strong></u><br>Passives have effect that are automatically applied to a specific character or item.</p></div><div class='containerManual'> <p><u><strong>Reflect</strong></u><br>Reflections have their skills mirrored via an ally or enemies effect. <span class='badge3'>* Reflections prioritize speed and can target both enemies and allies, sometimes simultaneously.</span></p></div><div class='containerManual'> <p><u><strong>Removal</strong></u><br>A removal deletes a skill or item's effect from a given target. <span class='badge3'>* Skills that have been removed can be re-applied only if they aren't cancelled by another effect.</span></p></div><div class='containerManual'> <p><u><strong>Stun</strong></u><br>Stuns prevent a character from performing a certain effect or action. <span class='badge3'>* Stuns prioritize speed and can be ignored by skills with immunity effects, or general effects that allows the character to ignore stuns.</span></p></div><div class='containerManual'> <p><u><strong>Dazed</strong></u><br>The character will randomly target a character when using an attack. <span class='badge3'>* Dizzed prioritize speed and can be ignored by skills with immunity effects, or general effects that allows the character to ignore dizzed.</span></p></div></section><div class='containerManual'> <p><u><strong>Sleep</strong></u><br>Sleep has a character untargetable and the character himself isn't able to target.<span class='badge3'>* Sleep PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE sleep.<span></p></div><div class='containerManual'> <p><u><strong>Frighten</strong></u><br>Frighten makes the character in which gave them frighten untargetable from those affected.<span class='badge3'>* Frighten PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE frighten.<span></p></div><div class='containerManual'> <p><u><strong>Sabotage</strong></u><br>Sabotage makes all stat increases and decreases reversed on the character effected by this condition.<span class='badge3'>* Sabotage PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE Sabotage .<span></p></div><div class='containerManual'> <p><u><strong>Inspire</strong></u><br>Inspire increases the affected target's stat increases by any skill beside transformations effect by 2.<span class='badge3'>* Inspire PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE Inspire .<span></p></div><div class='containerManual'> <p><u><strong>Preventation from healing</strong></u><br>Stops healing effects on a character.<span class='badge3'>* Preventation from healing PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE Preventation from healing.<span></p></div><div class='containerManual'> <p><u><strong>Friendly Blocked</strong></u><br>The target can't be targeted by friendly skills which are Power-Ups,Defensive,Tranformations skills.<span class='badge3'>* Friendly Blocks PRIORITIZE SPEED AND CAN BE IGNORED BY SKILLS WITH IMMUNITY EFFECTS, OR GENERAL EFFECTS THAT ALLOWS THE CHARACTER TO IGNORE Friendly Blocks.<span></p></div> </div></div></div>");
        break;
        
        case 4:
        $("#gameManuelName").text("Game Terminology");    
        
        $("#gameManuelInfo").empty().append("<div class='panel-body scrollList3' > <p class='Gil'>Performing a skill and not knowing whats happening can be very upsetting, even more so when you see words and have no understanding of them. It is very important to know what these things are as well as the causes and effects behind them. Below is a list of various terms as well as a few examples to get the ball rolling.</p><div class='containerManual'> <p><u><strong>Active</strong></u><br>When skills are active, their effects are currently being displayed through the game. <span class='badge3'>* Active skills have varous effects which depends heavily on the duration it lasts.</span> </p><p><button class='btn btn-manual' type='button' role='tab' data-toggle='collapse' data-target='#active' aria-expanded='false' aria-selected='true' tabindex='0'> Skill Example</button></p><div class='collapse' id='active'> <div class='manual-pad' role='tabpanel' aria-hidden='false' style='display: block;'><u><strong>Kaio-ken</strong></u><br><span class='focus self'>Self</span> Alter <span class='skill'>Kamehameha</span>, <span class='skill'>Punishing Blow</span>, and <span class='skill'>Amateur Spirit Bomb</span>. Increases Goku's strength, speed, and ki by 4 <span class='duration'>each turn</span> but decreases his defense by 1 and his energy by 15. Re-use of this skill or energy hitting zero while active will remove its current effects. </div></div></div><div class='containerManual'> <p><u><strong>Alter</strong></u><br>Altering is when a skill's original use has been changed in terms of damage or effect. </p><p><button class='btn btn-manual' type='button' role='tab' data-toggle='collapse' data-target='#alter' aria-expanded='false' aria-selected='true' tabindex='0'> Skill Example</button></p><div class='collapse' id='alter'> <div class='manual-pad' role='tabpanel' aria-hidden='false' style='display: block;'> <p><u><strong>Kaio-ken</strong></u><br><span class='focus self'>Self</span> Alter's <span class='skill'>Kamehameha</span>, <span class='skill'>Punishing Blow</span>, and <span class='skill'>Amateur Spirit Bomb</span>. Increases Goku's strength, speed, and ki by 4 <span class='duration'>each turn</span> but decreases his defense by 1 and his energy by 15. Re-use of this skill or energy hitting zero while active will remove its current effects.</p><p><u><strong>Kamehameha</strong></u><br><span class='condition'>Default</span> <span class='focus enemy'>Enemy</span> Deals 15 damage to one enemy. <br><span class='condition'>Altered</span> <span class='focus enemy'>Enemy</span> Deals 20 damage to one enemy. </div></div></div><div class='containerManual'> <p><u><strong>BP</strong></u><br>Battle Points (Short for BP), are points used to control your characters. To keep the game balanced, each character requires a certain number of BP to perform a skill. <span class='badge3'>* You gain BP every turn and all un-used BP rollsover to the following turn.</span> </p></div><div class='containerManual'> <p><u><strong>Charge</strong></u><br>Charges are skills with effects that stacks upon use or effects that deplete after a specific number of stacks have been depleted. <span class='badge3'>* Charges can target both friendly and enemy target's.</span> </p></div><div class='containerManual'> <p><u><strong>Clashing</strong></u><br>Clashing is condition where one characters skill is altered by another characters stats. </p></div><div class='containerManual'> <p><u><strong>Cooldown</strong></u><br>Cooldowns are time intervals between <span class='duration'>turns</span> in which the selected skill can be used again. They range from <span class='duration'>none</span> to <span class='duration'>finite</span>; none means that the skill can be used an unlimited number of times during gameplay while finite skills permanently ends after their first time being used. </p></div><div class='containerManual'> <p><u><strong>Debuff</strong></u><br>A debuff is any negative effect that is applied to a specific target. <span class='badge3'>* Debuffs can be both friendly or non-friendly and target's all characters.</span> </p><p><button class='btn btn-manual' type='button' role='tab' data-toggle='collapse' data-target='#debuff' aria-expanded='false' aria-selected='true' tabindex='0'> Skill Example</button></p><div class='collapse' id='debuff'> <div class='manual-pad' role='tabpanel' aria-hidden='false' style='display: block;'><u><strong>Solar Flare</strong></u><br><span class='focus enemy'>Enemy</span> Decreases the target's strength and defense by 5 points for <span class='duration'>two turns.</span> </div></div></div><div class='containerManual'> <p><u><strong>Disable</strong></u><br>When a skill or specific type becomes disabled, the action will have no effect for the duration of the <span class='duration'>turn(s).</span> <span class='badge3'>* Disabled effects can last numerous turns. This applies to both friendly and enemy effects.</span> </p><p><button class='btn btn-manual' type='button' role='tab' data-toggle='collapse' data-target='#disable' aria-expanded='false' aria-selected='true' tabindex='0'> Skill Example</button></p><div class='collapse' id='disable'> <div class='manual-pad' role='tabpanel' aria-hidden='false' style='display: block;'><u><strong>Rushing Assault</strong></u><br><span class='focus enemy'>Enemy</span> Temporary increases Kid Gohan's speed by 5 then deals 15 damage to one enemy. Kid Gohan's defensive skills will be disabled the <span class='duration'>following turn.</span> </div></div></div><div class='containerManual'> <p><u><strong>EP</strong></u><br>Energy Power (Short for EP), is a characters energy level. Majority of the games skills uses energy and without enough energy a character cannot perform a certain skill.</p></div><div class='containerManual'> <p><u><strong>Focus</strong></u><br>A skills focus is the initial target the skill is being redirected towards, whether it is an enemy or an ally. To view more about target focusing, visit the <a class='fixed5' href='#targetsfocus'><strong>Targets & Focuses</strong></a> section.</p></div><div class='containerManual'> <p><u><strong>(G)</strong></u><br>A shorter term for Dragon Ball GT.</p></div><div class='containerManual'> <p><u><strong>Invisible</strong></u><br>Skills that are invisible have no active notifications for the enemy team. <span class='badge3 '>* All skills are visible while in battle. However, when an invisible skill is being used the effect remains hidden regardless if the skill is used or not.</span></p><p><button class='btn btn-manual' type='button' role='tab' data-toggle='collapse' data-target='#invisible' aria-expanded='false' aria-selected='true' tabindex='0'> Skill Example</button></p><div class='collapse' id='invisible'> <div class='manual-pad' role='tabpanel' aria-hidden='false' style='display: block;'><u><strong>High Velocity Kick</strong></u><br><span class='focus enemy'>Enemy</span> Targets one enemy, countering the first harmful skill they use for <span class='duration'>one turn.</span> This skill is invisible. </div></div></div><div class='containerManual'> <p><u><strong>(M)</strong></u><br>A shorter term for movie characters in the Dragon Ball Universe.</p></div><div class='containerManual'> <p><u><strong>LV</strong></u><br>A characters level. Leveling up characters increases their battle capabilities as well as enabling them to use more advance skills.</p></div><div class='containerManual'> <p><u><strong>(S)</strong></u><br>A shorter term for Dragon Ball Super.</p></div><div class='containerManual'> <p><u><strong>Skill Types</strong></u><br>Types of skills and effects that are being used on a given target. The game currently has 2 sets of classes: <span class='condition'>Main Types</span> and <span class='condition'>Sub Types</span>. To view more about types, visit the <a <a class='fixed5' href='#skilltypes'><strong>Skill Types</strong></a> section. </p></div><div class='containerManual'> <p><u><strong>Stats</strong></u><br>A characters battle stats, used to determine how much damage a character deals, receives, and which characters moves first during each <span class='duration'>turn.</span></p></div><div class='containerManual'> <p><u><strong>TP</strong></u><br>Training Points (Short for TP), are points used to level your character's stats. <span class='badge3'>* You gain TP each time you level your character up through missions or battles.</span></p></div><div class='containerManual'> <p><u><strong>(Z)</strong></u><br>A shorter term for Dragon Ball Z.</p></div><div class='containerManual'> <p><u><strong>Zenny</strong></u><br>A players ingame funds, used to purchase additional characters, items, and other miscellaneous options.</p></div></section></div>");
        break;
        
        case 5:
        $("#gameManuelName").text("Targets & Focus");    
        $("#gameManuelInfo").empty().append('<div class="panel-body scrollList3" <p class="Gil">All skills require a target in order to focus certain effects onto them.</p><div class="containerManual"> <p><span class="focus ally">Ally</span> Targets a single ally on the player team.</p></div><div class="containerManual"> <p><span class="focus enemy">Enemy</span> Targets a single enemy on the enemy team.</p></div><div class="containerManual"> <p><span class="focus ally">Multiple Allies</span> Targets all available allies.</p></div><div class="containerManual"> <p><span class="focus enemy">Multiple Enemies</span> Targets all available enemies.</p></div><div class="containerManual"> <p><span class="focus ally">Other Allies</span> Targets one or more allies on the player team. <span class="badge3">* This does not target the skills performer.</span></p></div><div class="containerManual"> <p><span class="focus enemy">Other Enemies</span> Targets one or more enemies on the enemy team but not the initial target. <span class="badge3">* Some effects vary or may not apply to the initial target.</span></p></div><div class="containerManual"> <p><span class="focus ally">Random Ally</span> Targets a random ally on the player team. <span class="badge3">* This includes the skills performer.</span></p></div><div class="containerManual"> <p><span class="focus enemy">Random Enemy</span> Targets a random enemy on the enemy team.</p></div><div class="containerManual"> <p><span class="focus self">Self</span> Targets the initial character of the skill.</p></div></div>');
        break;
        
        case 6:
        $("#gameManuelName").text("Skill Types"); 
        $("#gameManuelInfo").empty().append("<div class='panel-body scrollList3' <section id='manual'> <p class='Gil'>All skills have a specific type assigned to them and are categorized between two groups; <u>Main Types</u> and <u>Sub Types</u>. Main Type skills have an initial effect on the target, while Sub Type skills shows the type of connection the skill has between the target(s).</p><br><h3 class='TW'>Main Types</h3> <div class='containerManual'> <p><u><strong>Defense</strong></u><br>Defense Types increases a characters defensive capabilities. Most defensive skills are immunities and reflections.</p></div><div class='containerManual'> <p><u><strong>Power Down</strong></u><br>Power Downs decreases a characters stats or fighting capabilities. <span class='badge3'>* Power Downs are stackable upon each other and usually lasts long periods of time.</span></p></div><div class='containerManual'> <p><u><strong>Power Up</strong></u><br>Power Ups increases a characters energy, health, stats or fighting capabilities. <span class='badge3'>* Power Ups are stackable upon each other and usually lasts for long periods of time.</span></p></div><div class='containerManual'> <p><u><strong>Ki</strong></u><br>Skills that are based on the characters energy level. <span class='badge3'>* The defense stat reduces the amount of ki damage a character receives.</span></p></div><div class='containerManual'> <p><u><strong>Strength</strong></u><br>Skills that are based on the characters raw strength. <span class='badge3'>* The defense stat reduces the amount of strength damage a character receives.</span></p></div><div class='containerManual'> <p><u><strong>Transformation</strong></u><br>A characters physical change from one form to another, increasing their stats and allowing new capabilities. <span class='badge3'>* Transformations are not stackable and usually end after energy runs out.</span></p></div></section><div class='panel-body'><br> <section id='manual'> </div></div>");
        break;
        
        
    }
}



