$(document).ready(function(){
   $("#slider").slider({
       min: 3,
       max: 30,
       slide: function(event, ui){
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
       }
   }); 
    
    //declare variables
        var paint = false; // paintingerasing or not
        var paint_erase = "paint"; // painting or erasing
        //get the canvas and context
        var canvas= document.getElementById("paint"); 
        var context = canvas.getContext("2d");
    
        //get the canvas container
        var container = $("#container");
        
        //mouse position
        var mouse = {x: 0, y: 0};
    
        //onload load saved work from localStorage
        if(localStorage.getItem("imgCanvas") != null){
            var img = new Image();
            img.onload = function(){
                context.drawImage(img, 0, 0);
            }
            //we cant take the source of our image before we onload image RULE
            img.src= localStorage.getItem("imgCanvas");
        };
        
        //set drawing parameters (lineWidth, lineJoin, lineCap)
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
    
        //click inside container
        container.mousedown(function(e){
            paint=true;
            context.beginPath();
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.moveTo(mouse.x,mouse.y);
        });
    
        //move the mouse while holding mouse key
    
        container.mousemove(function(e){
           mouse.x=e.pageX-this.offsetLeft;
           mouse.y=e.pageY-this.offsetTop;
           if(paint == true){
               if(paint_erase == "paint"){
                   //get color input
                   context.strokeStyle = $("#paintColor").val();
               }
               else{
                   //we are eraseing so the color is going to be white
                   context.strokeStyle = "white";
               }
               context.lineTo(mouse.x, mouse.y);
               context.stroke();
           }
        });
    
        //mouse up => we are not paintingerasing anymore
        container.mouseup(function(){
            paint=false;
        });
    
        //if we leave the container we are not paintingerasing anymore
        container.mouseleave(function(){
            paint=false;
        });
        
        //slick on the reset button
        $("#reset").click(function(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            paint_erase = "paint";
            $("#erase").removeClass("eraseMode");
            
        });
        
        //click on the erase button
        $("#erase").click(function(){
            if(paint_erase=="paint"){
                paint_erase="erase";
            }
            else{
                paint_erase="paint";
            }
            $(this).toggleClass("eraseMode");
        });
    
        //click on save button
        
        $("#save").click(function(){
           if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());
              
           }else{
            window.alert("Your browser does not support local storage!");
            } 
        });
    
        //change color input
        $("#paintColor").change(function(){
            $("#circle").css("background-color", $(this).val());
        });
    
        //change lineWidth using slider
        $("#slider").slider({
           min:3,
           max: 30,
           slide: function(event, ui){
               $("#circle").height(ui.value);
               $("#circle").width(ui.value);
               context.lineWidth = ui.value;
           }
        });
});
    
    
    
    
    
    
    
//   var canvas = document.getElementById("paint");
//   var context = canvas.getContext('2d');
//    
//   //draw a line
//   //declare new path
//   context.beginPath();
//   
//   //set line width
//    context.lineWidth = 40;
//    
//    //set line color
//    context.strokeStyle = "#42e565";
//    
//    //set cap to the line (round, butt, square);
//    context.lineCap="round";
//    
//    //set line join style (bevel, round, miter);
//    context.lineJoin = "round";
//    
//   //position the context point-> witch is the start point
//   context.moveTo(50,50);
//    
//   //draw a straigh line from a starting point to a new position
//   context.lineTo(200,200);    
//    
//    //draw another line
//    context.lineTo(400,100);
//    
//   //make line visible
//    context.stroke();
