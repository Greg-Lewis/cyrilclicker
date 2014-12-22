var USD = 0;
var tourists = 0; 
var mallCops = 0;
var touristDPS = .1;
var touristMult = 1.0;
var baseTouristCost = 10;
var mallCopDPS = .4;
var baseMallCopCost = 100;
var mallCopMult = 1.0;
var peopleSaved = 0;
var saveTime = 0;
var tu1Bought = false;
var mcu1Bought = false


var WHDSAVE = {
	USD : USD,
	tourists: tourists,
	mallCops: mallCops,
	peopleSaved: peopleSaved,
	saveTime: saveTime,
	tu1Bought: tu1Bought,
	mcu1Bought: mcu1Bought
}

//click
function cyrilClick(number){
	USD +=number;
	peopleSaved+=number;
	document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
	document.getElementById("peopleSaved").innerHTML = Math.floor(peopleSaved);
}
//tourists and dps interval update
function buyTourist(){
	var touristCost = Math.floor(baseTouristCost * Math.pow(1.1, tourists));
	if (USD >= touristCost){
		tourists++;
		USD -=touristCost;
		document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
		document.getElementById("tourists").innerHTML = tourists;
	}
	var nextCost = Math.floor(baseTouristCost*Math.pow(1.1,tourists));
	document.getElementById("touristCost").innerHTML = nextCost;
	document.getElementById("DPS").innerHTML = Math.round(getDPS()*10)/10;
}
function touristsPerSecond(){
	var tDPS = tourists*touristDPS * touristMult;
	USD += tDPS;
	peopleSaved += tDPS;
}

//l33t hackers and dps interval update
function buyMallCop(){
	var mallCopsCost = Math.floor(baseMallCopCost*Math.pow(1.1,mallCops));
	if (USD >= mallCopsCost){
		mallCops++;
		USD -=mallCopsCost;
		document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
		document.getElementById("mallCops").innerHTML = mallCops;
	}
	var nextCost = Math.floor(baseMallCopCost*Math.pow(1.1,mallCops));
	document.getElementById("mallCopsCost").innerHTML = nextCost;
	document.getElementById("DPS").innerHTML = Math.round(getDPS()*10)/10;
}
function mallCopsPerSecond(){
	var tDPS = mallCops * mallCopDPS * mallCopMult;
	USD += tDPS;
	peopleSaved += tDPS;
}


window.onload = function init() {
	var currentTime = Date.now();
	load(currentTime);
}


//interval update
window.setInterval(function(){
	//cyrilClick(tourists);
	touristsPerSecond();
	mallCopsPerSecond();
	document.getElementById("peopleSaved").innerHTML = Math.floor(getSaved());
	document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
	
}, 1000);

//saving every 30 seconds
window.setInterval(function(){	
	saveGame();
},30000);


function saveGame(){
	saveTime = Date.now();
	WHDSAVE = {
		USD : USD,
		tourists: tourists,
		mallCops: mallCops,
		peopleSaved: peopleSaved,
		saveTime: saveTime,
		tu1Bought: tu1Bought,
		mcu1Bought: mcu1Bought
	}

	localStorage.setItem("WHDSAVE", JSON.stringify(WHDSAVE));
}
function getDPS(){
	return ((mallCops*mallCopDPS*mallCopMult) + (tourists*touristDPS*touristMult));
}
function getSaved(){
	return peopleSaved;
}
function load(currentTime){
	var saveGame = JSON.parse(localStorage.getItem("WHDSAVE"));
	if (typeof saveGame.USD !== "undefined"){
		USD = saveGame.USD;

	}
	if (typeof saveGame.tourists !== "undefined"){
		tourists = saveGame.tourists;
		document.getElementById("tourists").innerHTML = tourists;
		document.getElementById("touristCost").innerHTML = Math.floor(baseTouristCost * Math.pow(1.1, tourists));

	}
	if (typeof saveGame.mallCops !== "undefined"){
		mallCops = saveGame.mallCops;
		document.getElementById("mallCops").innerHTML = mallCops;
		document.getElementById("mallCopsCost").innerHTML = Math.floor(baseMallCopCost * Math.pow(1.1, mallCops));
	}
	if (typeof saveGame.peopleSaved !== "undefined"){
		peopleSaved = saveGame.peopleSaved;
	}
	
	if (typeof saveGame.saveTime !== "undefined"){
		if (saveGame.saveTime <= currentTime){
			var secondsPassed = ((currentTime/1000) - (saveGame.saveTime/1000));
			var passedValues = secondsPassed * getDPS() * .5;
			USD += passedValues;//half DPS while closed
			peopleSaved +=passedValues;
		}
	}

	
	if (typeof saveGame.tu1Bought !== "undefined"){
		if (saveGame.tu1Bought == true){
			touristMult += 1;
			document.getElementById("tu1").style.visibility = 'hidden';
		}
	}
	if (typeof saveGame.tu1Bought !== "undefined"){
		if (saveGame.tu1Bought == true){
			mallCopMult += 3;
			document.getElementById("mcu1").style.visibility = 'hidden';
		}
	}
	document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
	document.getElementById("peopleSaved").innerHTML = Math.floor(peopleSaved);
	document.getElementById("DPS").innerHTML = Math.round(getDPS()*10)/10;




}

function deleteLocalSave(){
	localStorage.removeItem("WHDSAVE");
}

//upgrade amount = to 1 less than desired multiplier. ie. 4x bonus means touristmult +=3
function touristUpgrade1(){
	if (USD > 100 && tu1Bought == false){
		tu1Bought = true;
		touristMult += 1;
		USD -= 100;
		document.getElementById("tu1").style.visibility = 'hidden';
		document.getElementById("DPS").innerHTML = Math.round(getDPS()*10)/10;
		document.getElementById("USD").innerHTML = Math.round(USD*10)/10;
	}
	
}
function mallCopUpgrade1(){
	if (USD > 1000 && mcu1Bought == false){
		mcu1Bought = true;
		mallCopMult += 3;
		USD -=1000;
		document.getElementById("mcu1").style.visibility = 'hidden';
		document.getElementById("DPS").innerHTML = Math.round(getDPS()*10)/10;
		document.getElementById("USD").innerHTML = Math.round(USD*10)/10;

	}

}
