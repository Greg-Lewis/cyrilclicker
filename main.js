var USD = 0;
var tourists = 0; 
var mallCops = 0;
var touristDPS = .1;
var baseTouristCost = 10;
var mallCopDPS = .4;
var baseMallCopCost = 100;
var peopleSaved = 0;
var WHDSAVE = {
	USD : USD,
	tourists: tourists,
	mallCops: mallCops,
	peopleSaved: peopleSaved
}
//unused vars mallCopDPS, studentBPS intended for upgrades

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
	var tDPS = tourists*touristDPS;
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
	var tDPS = mallCops*mallCopDPS;
	USD += tDPS;
	peopleSaved += tDPS;
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
	localStorage.setItem("WHDSAVE", JSON.stringify(WHDSAVE));
},30000);



function getDPS(){
	return ((mallCops*mallCopDPS) + (tourists*touristDPS));
}
function getSaved(){
	return peopleSaved;
}
function load(){
	var saveGame = JSON.parse(localStorage.getItem("WHDSAVE"));
	if (typeof saveGame.USD !== "undefined"){
		USD = saveGame.USD;
	}
	if (typeof saveGame.tourists !== "undefined"){
		tourists = saveGame.tourists;
	}
	if (typeof saveGame.mallCops !== "undefined"){
		mallCops = saveGame.mallCops;
	}
	if (typeof saveGame.peopleSaved !== "undefined"){
		peopleSaved = saveGame.peopleSaved;
	}
}

function deleteLocalSave(){
	localStorage.removeItem("WHDSAVE");
}
