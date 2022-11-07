$("body").prepend($("<div class='loading'><div><img src='./扑克牌图片/load.gif'></div><div><div></div><span>图片资源加载(<span>0/55</span>)</span></div></div>"));
$(".loading").css({
    "background-color":"rgb(55,195,230)",
    "position":"fixed",
    "top":"0","bottom":"0",
    "left":"0","right":"0",
    "z-index":"1"
}).children("div:eq(0)").css("text-align","center").children("img").css({
    "width":"300px",
}).end().end().children("div:eq(1)").css({
    "width":"300px","height":"50px",
    "border":"1px solid green","border-radius":"25px",
    "margin":"auto",
    "overflow":"hidden"
}).children("div").css({
    "width":"0px","height":"50px",
    "background-color":"pink",
    "border-radius":"25px",
}).next().css({
    "position":"absolute",
    "left":"50%",
    "margin-left":"-71px"
})
var images = new Array();
var queue=[];
// var queue=[742, 0822, 0822, 373, 757, 073, 450, 578, 769, 521, 234, 037, 154, 217, 325, 423, 415, 661, 773, 93, 089, 665, 386, 477, 594, 717, 881, 965, 978, 245, 305, 741, 625, 662, 725, 769, 965, 0810, 202, 574, 464, 592, 681, 828, 681, 681, 281, 456, 941, 749, 1052,11,11,11,11]
for (var i = 0; i <= 54; i++) {
        images[images.length] = new Image();
        images[images.length - 1].src = "./扑克牌图片/downyi.com (" + i + ").jpg";
        imgLoad(images[images.length - 1], function (a) {
             let b=new Date();
            queue.push(b-a);
        })
}
function imgLoad(img, callback) {
    let a=new Date();
    var timer = setInterval(function (a) {
        if (img.complete) {
            callback(a)
            clearInterval(timer)
        }
    }, 1)
}

var queueFlag=true,count=0;
var queueTime=setInterval(function(){
    if(queue.length>0 && queueFlag==true)
    {   var time=queue.shift();
        count++;
        $(".loading>div>div").css({"width":""+Math.floor(300/55*count),"transition":"width "+ time +"ms ease 0s"});
        setTimeout(function(){ 
            $(".loading>div>span>span").text(count+"/55");
            queueFlag=true;
        },time);
        queueFlag=false;
    }
    if(count==55){
        clearInterval(queueTime);
        setTimeout(function(){ 
            $(".loading>div>span>span").text("完毕");
            setTimeout(function(){
                $(".loading").remove();
            },100);
        },500);
    }
},10)