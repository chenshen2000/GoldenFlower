//已经玩过的牌
 var arr=[];
 //剩余牌数
 $("button:eq(1)").text("剩余牌数：54");
 //随机获取54张牌中的一张
 function Random(){
     var flag=true;
     var random;
     while(flag)
     {
         flag=false;
         random=Math.floor(Math.random()*54+1);
         arr.forEach(item=>{
             if(item==random)
                 flag=true;
         })
     }
     arr.push(random);
     $("button:eq(1)").text("剩余牌数："+(54-arr.length));
     return random;
 }
 //使用预加载图片
 $("#box img").each(function(index,item){
    item.src=images[0].src;
 })
 //点击翻牌
 function start(){
     $("#left img").unbind('click').bind("click",function(){
         var random=Random();
         $(this).css({"transform":"rotateY(360deg)"});
         setTimeout(function(){
             $(this).attr("src",images[random].src);
         }.bind(this),400);
         $(this).unbind("click");
         if(arr.length==54) {
             setTimeout(function(){
                 if(confirm("扑克牌已经发完！是否洗牌？"))
                 {
                     $("button:eq(1)").text("剩余牌数：54");
                     $("#left img").css("visibility","hidden");
                     arr.splice(0,arr.length);
                 }
                 else{
                     $("span").css({
                         "position":"fixed",
                         "top":"0",
                         "bottom":"0",
                         "left":"0",
                         "right":"0"
                     });
                 }
             },1000);
             // $("button").unbind("click");
         }
     })
     // setTimeout(function(){
     //     $("button:eq(0)").attr("disabled",false);;
     // },600*($("#left img").length));
 }
 //开始隐藏牌
 $("#left img").css("visibility","hidden");
 //发牌
 $("button:eq(0)").unbind("click").bind("click",function(){
     $(this).attr("disabled",true); //发牌时禁用发牌按钮
     $("button:eq(2)").attr("disabled",false);//发牌时启用自动开牌按钮
      $("#left img").css({"visibility":"hidden","transform":""}).attr("src",images[0].src);
      for(let i=0;i<$("#left img").length;i++)
      {
         let img;
         if(i%2==0)
             img=$(".up img")[i/2];
         else
             img=$(".down img")[(i-1)/2];
         setTimeout(function(){
             $(".backThird").css({"top":img.offsetTop+"px","left":img.offsetLeft+"px","margin":"0px","transition-property":""});
             setTimeout(function(){
                 $(".backThird").css({"top":"","left":"","margin":"","transition-property":"none"});
                 $(img).css("visibility","visible");
             },590);
         },600*i);
      }
     start();
 })
 //开始禁用自动开牌
 $("button:eq(2)").attr("disabled",true);
 // 自动翻牌
 $("button:eq(2)").unbind("click").bind("click",function(){
     $(this).attr("disabled",true);//自动开牌时禁用自动开牌按钮
     for(let i=0;i<$("#left img").length;i++)
      {
         let img;
         if(i%2==0)
             img=$(".up img")[i/2];
         else
             img=$(".down img")[(i-1)/2];
         setTimeout(function(){
             img.click();
         },500*i);
      }
      setTimeout(function(){
         $("button:eq(0)").attr("disabled",false);
      },500*$("#left img").length);
 })