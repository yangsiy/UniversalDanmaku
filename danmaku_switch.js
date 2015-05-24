// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var danmaku_is_on = true;

function call_danmaku_switch() {
	console.log("danmaku switch get called.");
}

function initSwitch() {
	chrome.runtime.sendMessage({req: "current_switch"}, function(response) {
		danmaku_is_on = response.danmaku_is_on;
		console.log("current_switch: " + danmaku_is_on);
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.req = "change_switch") {
			danmaku_is_on = request.danmaku_is_on;
			console.log('change_switch: ' + request.danmaku_is_on);
		}
	}
);

console.log("danmaku switch init");
initSwitch();
