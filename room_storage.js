// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function call_room_storage() {
	console.log('room storage get called.');
}

function initStorage() {
	AV.initialize("tkhx0sqjzpy2ciqfpk6qw4lp9qf3vhuz0anh7xae0szipuim", "x5wkgr9au4esvr96nqhtkww1cmjpbl9hqdyv1xwatsfqr7w9");
}

function setRoomId(url, roomId, callback) {
	var Room = AV.Object.extend("Room");
	var room = new Room();
	var data = {
		url: url,
		roomId: roomId
	};
	room.save(data, {
		success: function(room) {
			console.log("("+url+")setRoomId successfully");
			callback('success');
		}.bind(this),
		error: function(room, error) {
			console.log("("+url+")setRoomId error - " + error.code + ": " + error.message);
			callback('failed');
		}
	});
}

function findRoomId(url, callback) {
	var Room = AV.Object.extend("Room");
	var query = new AV.Query(Room);
	query.equalTo("url", url);
	query.find({
		success: function(results) {
			if (results.length == 0) {
				callback("none");
			} else {
				callback(results[0].get('roomId'));
			}
		},
		error: function(error) {
			console.log("("+url+")findRoomId error - " + error.code + ": " + error.message);
			callback("failed");
		}
	});
}

initStorage();
console.log('room_storage init');

//setRoomId("baidu.com", "123456", function(result) {
//	if (result == "success") {
//		//success
//	} else if (result == "failed") {
//		//failed
//	}
//});

//findRoomId("baidu.com", function(result) {
//	if (result == "none") {
//		//not found
//	} else if (result == "failed") {
//		//failed
//	} else {
//		//result is the roomId
//	}
//});