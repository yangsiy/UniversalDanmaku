// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log('instant_message init');

// 模块互相调用的测试
call_room_storage();

var url = window.location.href;
var appId = '3v0yxbrcuatjjsplug51eou78dy77jsyrg63hdx9bytn2jmc';

// 每个客户端自定义的 id
var clientId = guid();

console.log('my client id is :'+clientId);
// 如果想加入一个已有房间，可以传入 roomId
var roomId;
var rt;
var conv;
var convOld;
var firstFlag = true;

// 创建聊天实例（支持单页多实例）
rt = AV.realtime({
    appId: appId,
    clientId: clientId,
    // 是否开启 HTML 转义，防止 XSS
    encodeHTML: true
    // 是否开启服务器端认证
    // auth: authFun
});

// 当前 SDK 版本
console.log('欢迎使用 LeanCloud 实时通信，当前 SDK 版本是 ' + AV.realtime.version);

// 实时通信服务连接成功
rt.on('open', function() {
    console.log('实时通信服务建立成功！');
    findRoomId(url,function(result){
    	console.log('call back get result:'+result);
    	if(result == 'none')
    	{
	    		conv = rt.conv({
	            name: url,

	            transient: false,

	            attr: {
	            }
	        }, function(data) {
	            if (data) {
	            	roomId = data.id;
	                console.log('新的群组创建成功：', data.id);
	                setRoomId(url,roomId,function(result){
	                	console.log('storage get result:'+result);
	                });
	            }
	        });
    	}
    	else if(result == 'failed')
    	{
    		console.log('call back get failed');
    	}
    	else
    	{
    		roomId = result;
    		rt.conv(roomId, function(obj) {
        
        		// 判断这个 conv 是否在服务器端存在
        		if (obj) {
            		console.log('已经获取已有房间的实例');
            		convOld = obj;
            		convOld.join(function(data) {
        				console.log('加入现有群组。。当前用户成功加入 Conversation');
    				});
            		console.log('房间名字： ', convOld.name);
            		console.log('获取房间的初始化数据', convOld.attr);
            		conv = convOld;
            		convOld.receive(function(data) {
        				ReceiveMsg(data);
    				});
        		} else {
            		console.log('你想获取的房间不存在');
        		}
    		});
    	}
    });
});

// 当聊天断开时触发
rt.on('close', function() {
    console.log('实时通信服务被断开！');
});

// 当 Conversation 被创建时触发，当然您可以使用回调函数来处理，不一定要监听这个事件
rt.on('create', function(data) {
    
    // 当前用户加入这个 Conversation 
    conv.join(function(data) {
        console.log('当前用户成功加入 Conversation');
    });

    // 当前 Conversation 接收到消息
    conv.receive(function(data) {
        ReceiveMsg(data);
    });
});

// 接收断线或者网络状况不佳的事件（断网可测试）
rt.on('reuse', function() {
    console.log('正在重新连接。。。');
});

// 监听所有用户加入的情况
rt.on('join', function(data) {
    console.log('有用户加入某个当前用户在的 Conversation：', data.initBy);
    //sendMsg('fuck');
});

document.onkeydown=function(event){
var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==113){ 
		// 按 F2
		msg = prompt("请输入弹幕:","");
		console.log('your fucking input is :'+msg);
		sendMsg(msg);
		//要做的事情
	}
}; 

function sendMsg(msg){
    conv.send({
        text: msg 
    },{
        type: 'text'
    }, function(data) {
        console.log('发送的消息服务端已收到：', msg);
        var myDate = new Date();//时间种子
    	var mytime=myDate.getTime(); 
    	var data2 = {
        	id:mytime,
        	color:'red',
        	text:msg
    	};
    	var dm2 = createDM(data2);
    	dm2.show();
    });
}

function ReceiveMsg(data) {
	console.log('当前 Conversation 收到消息：', data);
	var myDate = new Date();//时间种子
    var mytime=myDate.getTime(); 
    var data2 = {
        id:mytime,
        color:'red',
        text:data.msg.text
    };
    var dm2 = createDM(data2);
    dm2.show();
};

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

