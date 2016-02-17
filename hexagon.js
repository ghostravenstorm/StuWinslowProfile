

function makeHex(numColor, numTotal, scale, container){

	for(var i = 0; i < numColor; i++){
		container.appendChild( hexagon(i, scale, "#0099ff") );
	}

	for(var i = numColor; i < numTotal; i++){
		container.appendChild( hexagon(i, scale, "#999999") );
	}

	var data = hexagon.getHexHeight();
}


function hexagon(id, scale, color){

	var scale = scale;
		if(scale == null){ scale = 6 };
	var hexSideWidth = 3.75 * scale;
	var hexSideHeight = 6.50 * scale;
	var hexMidWidth = 7.50 * scale;
	var hexMidHeight = 13 * scale;
	
	var hex = [];

	hex[0] = document.createElement("DIV");
	hex[1] = document.createElement("DIV");
	hex[2] = document.createElement("DIV");

	hex[0].style.float = "left";
	hex[0].style.borderRight = hexSideWidth.toString() + "px solid " + color;
	hex[0].style.borderTop = hexSideHeight.toString() + "px solid transparent";
	hex[0].style.borderBottom = hexSideHeight.toString() + "px solid transparent";
	hex[0].id = "HexLeft";

	hex[1].style.float = "left";
	hex[1].style.width = hexMidWidth.toString() + "px";
	hex[1].style.height = hexMidHeight.toString() + "px";
	hex[1].style.backgroundColor = color;
	hex[1].id = "HexMid";

	hex[2].style.float = "left";
	hex[2].style.borderLeft = hexSideWidth.toString() + "px solid " + color;
	hex[2].style.borderTop = hexSideHeight.toString() + "px solid transparent";
	hex[2].style.borderBottom = hexSideHeight.toString() + "px solid transparent";
	hex[2].id = "HexRight";

	var hexObject = document.createElement("DIV");
	hexObject.style.position = "absolute";
	hexObject.style.top = ((hexMidHeight / 2) * (id % 2)).toString() + "px";
	hexObject.style.left = ((hexSideWidth + hexMidWidth) * id).toString() + "px";
	hexObject.id = "HexObject";

	for(var i = 0; i < hex.length; i++){
		hexObject.appendChild(hex[i]);
	}

	function getHexHeight(){
		return hexMidHeight + (hexMidHeight/2);
	}

	return hexObject;
}