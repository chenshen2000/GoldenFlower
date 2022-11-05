$("body").append($("<div class='loading'><img src='./扑克牌图片/load.gif'><div><div></div><span>图片资源加载(<span>0/55</span>)</span></div></div>"));
$(".loading").css({
    "background-color":"rgb(55,195,230)",
    "position":"fixed",
    "top":"0","bottom":"0",
    "left":"0","right":"0"
}).children("img").css({
    "width":"300px",
    "position":"absolute",
    "top":"10%",
    "left":"50%","margin-left": "-150px",
}).end().children("div").css({
    "width":"300px","height":"50px",
    "border":"1px solid green","border-radius":"25px",
    "position":"absolute",
    "top":"60%",
    "left":"50%","margin-left": "-150px",
}).children("div").css({
    "width":"0px","height":"50px",
    "background-color":"pink",
    "border-radius":"25px",
}).next().css({
    "position":"absolute",
    "top":"100%",
    "left":"30%",
})
var images = new Array();
var queue=[];
// var queue=[29742, 30822, 30822, 37373, 42757, 44073, 44750, 45785, 47169, 48521, 49234, 50537, 51954, 52717, 53425, 54123, 54615, 56661, 57773, 60093, 60849, 62565, 63486, 64677, 65694, 67217, 68581, 69965, 70978, 72145, 73005, 74901, 75625, 76462, 77245, 78669, 79265, 80810, 82202, 83574, 84964, 85992, 86981, 87828, 88681, 90681, 92781, 94556, 95941, 96749, 100052]
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
        $(".loading>div>div").css({"width":"300","transition":"width "+ time +"ms ease 0s"});
        setTimeout(function(){ 
            $(".loading>div>span>span").text(count+"/55");
            $(".loading>div>div").css({"width":"0","transition":""});
            queueFlag=true;
        },time);
        queueFlag=false;
    }
    if(count==55){
        clearInterval(queueTime);
        setTimeout(function(){ 
            $(".loading>div>div").css({"width":"300","transition":""});
            $(".loading>div>span>span").text("完毕");
            setTimeout(function(){
                $(".loading").remove();
            },100);
        },time+200);
    }
},10)