/*
	use keycodes obtained from the demo at: http://api.jquery.com/keydown/
*/
var KeyStateHandler = function(){
	KeyStateHandler.KeyCodes = {
		ENTER : 13,
		SHIFT : 16,
		CONTROL : 17,
		SPACE : 32,
		LEFT_ARROW : 37,
		UP_ARROW : 38,
		RIGHT_ARROW : 39,
		DOWN_ARROW : 40,
		KEY_0 : 48,
		KEY_1 : 49,
		KEY_2 : 50,
		KEY_3 : 51,
		KEY_4 : 52,
		KEY_5 : 53,
		KEY_6 : 54,
		KEY_7 : 55,
		KEY_8 : 56,
		KEY_9 : 57,
		A : 65,
		B : 66,
		C : 67,
		D : 68,
		E : 69,
		F : 70,
		G : 71,
		H : 72,
		I : 73,
		J : 74,
		K : 75,
		L : 76,
		M : 77,
		N : 78,
		O : 79,
		P : 80,
		Q : 81,
		R : 82,
		S : 83,
		T : 84,
		U : 85,
		V : 86,
		W : 87,
		X : 88,
		Y : 89,
		Z : 90,
		KEYPAD_0 : 96,
		KEYPAD_1 : 97,
		KEYPAD_2 : 98,
		KEYPAD_3 : 99,
		KEYPAD_4 : 100,
		KEYPAD_5 : 101,
		KEYPAD_6 : 102,
		KEYPAD_7 : 103,
		KEYPAD_8 : 104,
		KEYPAD_9 : 105
	};
	this._prevKeys = {};
	this._currKeys = {};
	this._keyBuffer = {};//true = keydown event, false = keyup event
}
KeyStateHandler.prototype.updateKeys = function(){
	this._prevKeys = jQuery.extend({}, this._currKeys);
	//_currKeys = _keyBuffer;
	for(var keyCode in this._keyBuffer){
		if(this._keyBuffer[keyCode] == true){
			this._currKeys[keyCode] = true;
		}else{
			if(typeof this._currKeys[keyCode] != 'undefined'){
				delete this._currKeys[keyCode];
			}
		}
	}
	this._keyBuffer = {};
}
KeyStateHandler.prototype.registerKeyState = function(keyCode, state){
	this._keyBuffer[keyCode] = state;
}
KeyStateHandler.prototype.keyDown = function(keyCode){
	if(typeof this._currKeys[keyCode] != 'undefined'){
		return true;
	}
	return false;
}
KeyStateHandler.prototype.keyUp = function(keyCode){
	if(typeof this._currKeys[keyCode] == 'undefined'){
		return true;
	}
	return false;
}
KeyStateHandler.prototype.keyNewPress = function(keyCode){
	if(typeof this._currKeys[keyCode] != 'undefined' &&
			typeof this._prevKeys[keyCode] == 'undefined'){
		return true;
	}
	return false;
}
KeyStateHandler.prototype.keyNewRelease = function(keyCode){
	if(typeof this._currKeys[keyCode] == 'undefined' &&
			typeof this._prevKeys[keyCode] != 'undefined'){
		return true;
	}
	return false;
}