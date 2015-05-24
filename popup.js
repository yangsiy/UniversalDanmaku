// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function openDanmaku() {
	var bgp = chrome.extension.getBackgroundPage();
	bgp.changeSwitch(true);
}

function closeDanmaku() {
	var bgp = chrome.extension.getBackgroundPage();
	bgp.changeSwitch(false);
}

console.log("popup init");
document.getElementById("openDanmaku").addEventListener('click', openDanmaku);
document.getElementById("closeDanmaku").addEventListener('click', closeDanmaku);
