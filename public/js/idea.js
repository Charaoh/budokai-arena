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
    var a = characterStats(name);
    
    
    $("#cimage").attr("src",'/skills/' + name + '.png');
       stats =  user.stats[name];
       statsInfo.datasets[0].points[0].value = a[0] + stats[0];
       statsInfo.datasets[0].points[1].value = a[1] + stats[1];
       statsInfo.datasets[0].points[2].value = a[2] + stats[2];
       statsInfo.datasets[0].points[3].value = a[3] + stats[3];
    
       statsInfo.update();
       $("#points").text(stats[6]);
       p1stats.stats = name;
       p1stats.statshold[5] = stats[6];
       $(".lvl").text("Lv " + stats[4]);
    
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
               $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2 + " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3] );
               
           }
           break;
           
           case 2:
           if (p1stats.statshold[5]  !== 0)
           {
                p1stats.statshold[1] += 1;
                p1stats.statshold[5] -= 1;
               $("#points").text(p1stats.statshold[5]);
                $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2 + " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           
           case 3:
           if (p1stats.statshold[5]  !== 0)
           {
                p1stats.statshold[2] += 1;
                p1stats.statshold[5] -= 1;
                $("#points").text(p1stats.statshold[5]);
                $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2+ " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           case 4:
           if (p1stats.statshold[5]  !== 0)
           {
                p1stats.statshold[3] += 1;
                p1stats.statshold[5] -= 1;
                $("#points").text(p1stats.statshold[5]);
                $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2 + " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
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
               $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2+ " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
               
           }
           break;
           
           case 6:
           if (p1stats.statshold[1] > 0)
           {
                p1stats.statshold[1] -= 1;
                p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2+ " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           
           case 7:
           if (p1stats.statshold[2] > 0)
           {
                p1stats.statshold[2] -= 1;
                p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2+ " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
           }
           break;
           
           case 8:
           if (p1stats.statshold[3] > 0)
           {
                p1stats.statshold[3] -= 1;
                p1stats.statshold[5] += 1;
               $("#points").text(p1stats.statshold[5]);
               $("#newstats").text("Strength:" + p1stats.statshold[0] * 2 + " Ki:" + p1stats.statshold[1] * 2+ " Defense:" + p1stats.statshold[2] * 2  + " Speed:"+ p1stats.statshold[3]);
           }
           break;
       }
   }
   
   else
   {
       
   }
   
   
}