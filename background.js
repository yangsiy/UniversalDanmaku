// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log('init background');

var danmaku_is_on = true;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.req = "current_switch") {
			sendResponse({danmaku_is_on: danmaku_is_on});
		}
	}
);

function changeSwitch(status) {
	danmaku_is_on = status;
	console.log('change called: ' + status);
	//chrome.runtime.sendMessage({req: "change_switch", danmaku_is_on: status}, function(response) {
	//	//
	//});
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			chrome.tabs.sendMessage(tabs[i].id, {req: "change_switch", danmaku_is_on: status}, null);
		}
	});
}
