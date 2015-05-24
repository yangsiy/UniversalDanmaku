var win_Wid= $(window).width();//窗口宽
var win_Hei= $(window).height();//窗口宽

console.log('danmaku rendering init'+win_Wid);
DM_init();

//调整浏览器后重排元素
$(window).resize(function () {
    win_Hei = $(window).height();
    win_Wid = $(window).width();
    $("#enter").css({
        "margin-top":win_Hei-100+"px",
        "margin-left":win_Wid/2-175+"px"
    })
});


//初始化幕布
function DM_init() {
    var init = {
        fontsize:'20px',
        fontcolor:'black',
        type:'left',
        };

    $("body").css({
        //"overflow":"hidden"
        })
    .append("<div id='DM' onselectstart='return false;'></div>");
    $("#DM").html("")
        .css({
            "pointer-events":"none",
            "-moz-user-select": "none",
            "position":"absolute",
            "top":"0px",
            "left":"0px",
            "width":"98%",
            "height":"500px"
            });
    
    //输入框
    $("body").append("<div id='IN'></div>");
    $("#IN").append("<div id='enter'></div>");
    $("#enter").css({
        "height":"100px",
        "width":"350px",
        "margin":"10px",
        "background":"black",
        "bottom":"0px",
        "text-align":"center",
        "margin-top":win_Hei-100+"px",
        "margin-left":win_Wid/2-175+"px",
        "z-index":"0"
    });
    

    test();

};

function test(){

    console.log('test init');
    var myDate = new Date();//时间种子
    var mytime=myDate.getTime(); 
    var data2 = {
        id:mytime,
        color:'red',
        text:'测试弹幕'+mytime
    };

var dm2 = createDM(data2);
    dm2.show();
    
}


function createDM(DM_data){
    var dm = new Object();
    dm.id = DM_data.id;
    dm.color = DM_data.color;
    dm.text = DM_data.text;
    //显示弹幕
    dm.show = function(){
        console.log('ferferi');
    var select = "#"+dm.id;
    $("#DM").append("<div id='"+dm.id+"'></div>");
    $(select).html(dm.text)
        .css({
        "position":"relative",
        "float":"auto",
        "left":win_Wid+"px",
        "font-size":20+"px",
        "color":dm.color,
        "margin-top":"10px",
        "margin-left":"30px",
        "width":"60px",
        "overflow":"visible",
        "white-space":"nowrap",
        "z-index":"99999"
        })
    .stop(true,false).animate({'left':-1000+'px'},10000,"linear",
        function(){
            $(select).remove();
        })
    };
    return dm;
};