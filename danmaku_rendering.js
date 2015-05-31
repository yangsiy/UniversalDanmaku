var win_Wid= $(window).width();//窗口宽
var win_Hei= $(window).height();//窗口宽

console.log('danmaku rendering init'+win_Wid);
DM_init();

//下一条弹幕显示的Y轴坐标
var next_top = 10;
//当前板上的弹幕总数
var num_on_board = 0;

//调整浏览器后重排元素
$(window).resize(function () {
    win_Hei = $(window).height();
    win_Wid = $(window).width();
    console.log('fuck change:'+win_Wid);
    $("#enter").css({
        "margin-top":win_Hei-100+"px",
        "margin-left":win_Wid/2-175+"px"
    })
    $("#DM").css({
            "width":"98%",
            });
});


//初始化幕布
function DM_init() {
    var init = {
        fontsize:'20px',
        fontcolor:'black',
        type:'left',
        };

    $("body").append("<div id='DM' onselectstart='return false;'></div>");
    $("#DM").html("")
        .css({
            "overflow-x":"hide",
            "pointer-events":"none",
            "-moz-user-select":"none",
            "position":"fixed",
            "top":"0px",
            "left":"0px",
            "width":"98%",
            "height":"500px",
            "z-index":"99999"
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
    
    for (var i =0;i<50;i++)
    {
        setTimeout(function(){
            test();
        },300*i);
    }
};

function test(){

    var myDate = new Date();//时间种子
    var mytime=myDate.getTime(); 
    var data2 = {
        id:mytime,
        color:randomColor,
        text:'亮瞎眼亮瞎眼亮瞎眼'+mytime
    };

    var dm2 = createDM(data2);
    if(dm2 != false)
    {
        dm2.show();
    }
    
}


function createDM(DM_data){
    console.log(danmaku_is_on);
    if(danmaku_is_on != true) return false;
    if (next_top>=220)
    {
        next_top = 10;
    }
    var dm = new Object();
    dm.id = DM_data.id;
    dm.color = DM_data.color;
    dm.text = DM_data.text;
    var left_length = 0 - dm.text.length * 20;
    //显示弹幕
    dm.show = function(){
        var select = "#"+dm.id;
        $("#DM").append("<div id='"+dm.id+"'></div>");
        num_on_board += 1;
        $(select).html(dm.text)
            .css({
            "position":"absolute",
            "float":"auto",
            "left":win_Wid+"px",
            "font-size":25+"px",
            "color":dm.color,
            "margin-top":next_top + "px",
            "margin-left":"0px",
            "width":"60px",
            "overflow":"visible",
            "white-space":"nowrap",
            "z-index":"99999"
        }) 
    .stop(true,false).animate({'left': left_length +'px'},8000,"linear",
        setTimeout(function(){
            $(select).remove();
            num_on_board -= 1;
            if(num_on_board<=7)
            {
                next_top = 10;
            }
        },8000))
    };
    next_top += 30;
    return dm;
};

function randomColor()
{
    var i = rd();
    switch(i)
    {
        case 1:
        return 'orange';
        break;
        case 2:
        return 'green';
        break;
        case 3:
        return 'red';
        break;
        case 4:
        return 'black';
        break;
        case 5:
        return 'purple';
        break;
        default:
        return 'blue';
        break;
    }
}