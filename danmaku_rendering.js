var win_Hei= $(window).height();//���ڸ�
var win_Wid= $(window).width();//���ڿ�
DM_init();

//���������������Ԫ��
$(window).resize(function () {
    win_Hei = $(window).height();
    win_Wid = $(window).width();
    $("#enter").css({
        "margin-top":win_Hei-100+"px",
        "margin-left":win_Wid/2-175+"px"
    })
});


//��ʼ��Ļ��
function DM_init() {
    var init = {
        fontsize:'20px',
        fontcolor:'black',
        type:'left',
        };
        
    $("body").css({
        "overflow":"hidden"
        })
    .append("<div id='DM'></div>");
    $("#DM").html("����Ļ��")
        .css({
            "position":"relative",
            "top":"0px",
            "left":"0px",
            "width":"100%",
            "height":"500px"
            });
    
    //�����
    $("body").append("<div id='IN'></div>");
    $("#IN").append("<div id='enter'></div>");
    $("#enter").css({
        "height":"100px",
        "width":"350px",
        "margin":"10px",
        "background":"azure",
        "bottom":"0px",
        "text-align":"center",
        "margin-top":win_Hei-100+"px",
        "margin-left":win_Wid/2-175+"px",
        "z-index":"0"
    });
    

    test();

};

function test(){
    var myDate = new Date();//ʱ������
    var mytime=myDate.getTime(); 
    var data2 = {
        id:mytime,
        color:'red',
        text:'���Ե�Ļ'+mytime
    };
var dm2 = createDM(data2);
    dm2.show();
    
}


function createDM(DM_data){
    var dm = new Object();
    dm.id = DM_data.id;
    dm.color = DM_data.color;
    dm.text = DM_data.text;
    //��ʾ��Ļ
    dm.show = function(){
    var select = "#"+dm.id;
    $("#DM").append("<div id="+dm.id+"></div>");
    $(select).html(dm.text)
        .css({
        "position":"fixed",
        "float":"left",
        "left":win_Wid+"px",
        "font-size":20+"px",
        "color":dm.color,
        "margin-top":"10px",
        "margin-left":"30px",
        "width":"60px",
        "overflow":"visible",
        "white-space":"nowrap",
        "z-index":"900"
        })
    .stop(true,false).animate({'left':-200+'px'},8000,"linear",
        function(){$(select).remove()})
    };
    return dm;
};