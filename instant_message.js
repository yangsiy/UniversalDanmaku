// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log('instant_message init');

// 模块互相调用的测试
call_room_storage();
call_danmaku_rendering();

var url = window.location.href;
var appId = '3v0yxbrcuatjjsplug51eou78dy77jsyrg63hdx9bytn2jmc';

// 每个客户端自定义的 id
var clientId = guid();

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

    // 当前用户离开这个 Conversation 
    // conv.leave(function(data) {
    //     console.log('当前用户成功离开 Conversation');
    // });

    // 当前 Conversation 接收到消息
    conv.receive(function(data) {
        ReceiveMessage(data);
    });
});

// 接收断线或者网络状况不佳的事件（断网可测试）
rt.on('reuse', function() {
    console.log('正在重新连接。。。');
});

function ReceiveMessage(data) {
	console.log('当前 Conversation 收到消息：', data)
};

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

