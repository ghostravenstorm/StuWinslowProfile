
//Constants
	var HIGHLIGHT_FCOLOR = "#003366";
	var HIGHLIGHT_BCOLOR = "#3399FF";
	var PURPLE_COLOR     = "#9966FF";
	var PINK_COLOR       = "#FF3399";
	var GREEN_COLOR      = "#00FF99";
	var ORANGE_COLOR     = "#FF9900";
	var BLUE_COLOR       = "#3399FF";
	var GRAY_COLOR       = "#777777";
	var YELLOW_COLOR     = "#FFFF00";
	var WHITE_COLOR      = "#FFFFFF";
	var BLACK_COLOR      = "#000000";
	var BACKGROUND_COLOR = "#14191f";


//Framework
function Button(name, nColor, sColor, win, siblings){

	//Object used to hold an achor element that is used as a button to 
	//execute other functions.

	//this button knows if it has been clicked on
	var isSelected = false;

	//arrays that hold the functions and their parameters that this button will execute
	var funcs = [];
	var params = [];

	//Checks if a window was passed. If so then create element for that window
	if (win == null){
		var elem = document.createElement("A");
		elem.appendChild(document.createTextNode(name));
	}
	else{
		var elem = win.document.createElement("A");
		elem.appendChild(win.document.createTextNode(name));	
	}

	//check that sets default normal color if no color specified
	if(nColor == null){ nColor = ORANGE_COLOR; }

	//check that sets default selected color if no color specified
	if(sColor == null){ sColor = BLUE_COLOR; }

	//set initial properties
	elem.style.cursor = "pointer";
	elem.style.color = nColor;

	//execute this button's functions
	function run(){
		
		//checks if any functions are present
		if (funcs[0] != null){
			console.log(name+": running functions");

			for(i = 0; i < funcs.length; i++){
				funcs[i].apply(this, params[i]);
			}
		}
		//if not then skip execution
		else{
			console.log(name+": no functions to run");
		}
	}

	//method that does stuff when the element is clicked
	elem.onclick = function(){

		//checks if this button has siblings
		if(siblings != undefined){

			//if so then set their selection colors back to normal
			for(i = 0; i < siblings.length; i++){
				siblings[i].setSel(false);
			}
		}
		else{
			console.log(name+" has no siblings");
		}

		//set this buttons seletion color
		isSelected = true;
		console.log(name+" selected: "+isSelected);

		//run this button's other functions
		run();
	}

	//set highlight color on hover
	elem.onmouseenter = function(){
		this.style.color = HIGHLIGHT_FCOLOR;
		this.style.backgroundColor = HIGHLIGHT_BCOLOR;
	}

	//remove highlight color
	elem.onmouseleave = function(){
		if (isSelected){ this.style.color = sColor; }
		else           { this.style.color = nColor; }
		this.style.backgroundColor = "transparent";
	}

	//returns the element node
	this.getElem = (function getElem(){
		return elem;
	});

	//method that stores an outside function for this button to execute
	this.addFunc = (function addFunc(param, func){
		params.push(param);
		funcs.push(func);
	});

	//Changes the isSelected state and 'elem' color
	this.setSel = (function setSel(bool){
		
		isSelected = bool;

		console.log(name+" selected: "+bool);

		if(bool){ elem.style.color = sColor; }
		else    { elem.style.color = nColor; }
	});

	//appends this object to another
	this.append = (function append(obj){
		obj.appendChild(elem);
	});
}

function ExLink(name, color, win, address){

	//Object used to hold achors that link to remote content.

	//checks for a child window, if so then create element for that window
	if(win == null) { 
		var elem = document.createElement("A");
		elem.appendChild(document.createTextNode(name));
	}
	else{
		var elem = win.document.createElement("A");
		elem.appendChild(win.document.createTextNode(name));	
	}
	
	//set initial properties
	elem.style.cursor = "pointer";
	elem.style.color = "inherit";
	elem.style.color = color;
	elem.style.textDecoration = "none";
	elem.setAttribute('href', address);
	elem.setAttribute('target', '_blank');

	//highlight button on mouse hover
	elem.onmouseenter = function(){
		this.style.color = HIGHLIGHT_FCOLOR;
		this.style.backgroundColor = HIGHLIGHT_BCOLOR;
	}

	//disable highlight when mouse leaves
	elem.onmouseleave = function(){
		this.style.color = color;
		this.style.backgroundColor = "transparent";
	}

	//returns the element node
	this.getElem = (function getElem(){
		return elem;
	});

	//appends this element to another
	this.append = (function append(obj){
		obj.appendChild(elem);
	});
}

function PElement(text, color, win, wdt, hgt){

	//Object used to hold bulk text

	//check for missing parameters
	if(text == null)  { text = "Default string."; }
	if(color == null) { color = "#FFFFFF"; }

	//create element for window if specified
	if(win == null){
		var elem = document.createElement("P");
		elem.appendChild(document.createTextNode(text));
	}
	else{
		var elem = win.document.createElement("P");
		elem.appendChild(win.document.createTextNode(text));
	}
	
	//set initial properties
	elem.style.color = color;
	elem.style.overflow = "auto";
	elem.style.whiteSpace = "pre-wrap";


	//set element width and height if specified
	if(wdt != null){ elem.style.width = wdt.toString()+"px"; }
	if(hgt != null){ elem.style.height = hgt.toString()+"px"; }

	//returns the element node
	this.getElem = (function getElem(){
		return elem;
	});

	//appends this element to another
	this.append = (function append(obj){
		obj.appendChild(elem);
	});
}

function ItemFrame(wdt, hgt, address){

	//Object that holds an iframe element which is used to display 
	//projects in their own html environment.

	if(address == null){ address = 'blank'; }

	var elem = document.createElement("IFRAME");
	elem.setAttribute('width', wdt);
	elem.setAttribute('height', hgt);
	elem.setAttribute('scrolling', 'no');
	elem.setAttribute('frameborder', '0');
	elem.setAttribute('src', address);


	//returns the element node
	this.getElem = (function getElem(){
		return elem;
	});

	//appends this element to another node
	this.append = (function append(obj){
		obj.appendChild(elem);
	});
}

function Container(id, win){

	//Object that holds a DIV element which is used to hold other created elements.

	//checks for a child window, if so then append this dic to that window
	if(win == null){
		var elem = document.createElement("DIV");
	}
	else{
		var elem = win.document.createElement("DIV");
	}
	elem.setAttribute("id", id);


	//sets html id of the div
	this.setID = (function setID(id){
		elem.setAttribute("id", id);
	})

	//appends a node to this container
	this.addChild = (function addChild(obj){
		elem.appendChild(obj);
	});

	//appends this container to another node
	this.append = (function append(obj){
		obj.appendChild(elem);
	});

	//returns the element node of this interface
	this.getElem = (function getElem(){
		return elem;
	})

	//clears all nodes in this container
	this.clearNodes = (function clearNodes(){
		console.log(id+": clearing all nodes");
		while( elem.hasChildNodes()){
			elem.removeChild(elem.lastChild);
		}
	})
}

function ButtonList(container, names, funcs, params, nColor, sColor){

	//Object that holds an array of buttons that all belong together in the same category.
	//This method also controls the selection color of each button in siblings[] by passing
	//the array to each button that is created so each button knows who its siblings are.

	siblings = [];

	for(i = 0; i < names.length; i++){
		siblings[i] = new Button(names[i], nColor, sColor, null, siblings);

		siblings[i].addFunc(params[i], funcs[i]);

		container.addChild(siblings[i].getElem());

		container.addChild(makeNewSpace());
	}

	//returns a single button from the list
	this.getButton = (function getButton(i){
		return siblings[i];
	});
}

function LinkList(container, win, names, links){

	//Structure that manages and displays all links created for it. 
	//used only once in the AboutMe section

	elements = [];

	for (i = 0; i < names.length; i++){
		elements[i] = new ExLink(names[i], ORANGE_COLOR, win, links[i]);

		container.addChild(elements[i].getElem());

		container.addChild(makeNewSpace());
	}
}

function projectWindow(name, wdt, hgt, aboutText, address, numOfFrames){

	//address must be in an array structure even if only 1 frame is being made.

	//Method that creates a single window instance that holds a project
	//and other information about it. 

	//checks for initially missing parameters
	if(name == null)       { name = "Default Name"; }
	if(numOfFrames == null){ numOfFrames = 1; }
	if(wdt == null)        { wdt = 500; }
	if(hgt == null)        { hgt = 500; }	


	//create the window element and set initial properties
	var win = window.open("", "_blank", "width="+(wdt+(15*numOfFrames)).toString()+", height="+(hgt+(100*numOfFrames)).toString());
	win.document.open();
	win.document.write("<hmtl><body>");
	win.document.close();
	win.document.body.style.backgroundColor = BACKGROUND_COLOR;
	win.document.body.style.fontFamily = "Courier New";
	win.document.title = name;

	
	
	//Create global div container for the window. All elements get appended to this instead of <body>
	var winContainer = new Container("windowContainer", win);

	//create the div container that the project and about info will share
	//this container gets cleared
	var projContainer = new Container("projectContainer", win);

	//top line header
	var name = new PElement("// "+name+" -----", GRAY_COLOR);

	//project description
	var text = new PElement(aboutText, WHITE_COLOR);

	//create the iframe elements based on numOfFrames
	var iFrames = [];
	for(i = 0; i < numOfFrames; i++){
		iFrames[i] = new ItemFrame(wdt, hgt, address[i]);
	}

	//append the peoject name text first
	winContainer.addChild(name.getElem());

	//arrays that hold info for ButtonList to make buttons for this window
	buttonNames = ["[This.Project]", "[This.About]", "[Window.Close()]"];
	buttonFuncs = [showFrame, showAbout, closeWindow];
	buttonParams = [[iFrames], [text], [win]];

	//makes the buttons
	var buttonList = new ButtonList(winContainer, buttonNames, buttonFuncs, buttonParams, PURPLE_COLOR, YELLOW_COLOR);

	//adds the div containers to the window
	winContainer.append(win.document.body);
	projContainer.append(winContainer.getElem());

	//method that clears the project div and displays either the project or about info
	function showAbout(obj){
		projContainer.clearNodes();
		makeNewLines(projContainer, 1);
		projContainer.addChild(obj.getElem());
	}

	//separate show content fuction that handles multiple iframes specifically
	function showFrame(arry){
		projContainer.clearNodes();
		makeNewLines(projContainer, 1);

		for(i = 0; i < arry.length; i++){
			projContainer.addChild(arry[i].getElem());
		}
	}

	//run initial functions to display the project on open
	showFrame(iFrames);
	buttonList.getButton(0).setSel(true);

	
}

function fetchFile(file){

	//Does not work in Chrome with file:/// requests
	//except when actaully running from a websevrer and not locally.
	
	var data = new XMLHttpRequest();
	var textData;

	data.open("GET", file, false);

	data.onreadystatechange = function(){
		if(data.readyState === 4){
			if(data.status === 200 || data.status == 0){
				textData = data.responseText;
				//console.log(textData);
			}
		}
	}
	data.send(null);
	
	
	//Experimental
	/* 
	var reader = new FileReader();

	reader.readAsText(file);

	return reader.result();
	*/
	
	

	return textData;
}



//Macros

function makeNewSpace(){ return document.createTextNode(" "); }

function makeNewLines(interfaceObj, num){

	// 'interfaceObj' is the div container object that needs line breaks and 'num' being how many to add.
	// this macro calls the 'addChild' method in the 'Conatiner' class.

	// checks if no number was passed in. If so, default to 1.
	if(num == null){ num = 1; }

	for(i = 0; i < num; i++){
		interfaceObj.addChild(document.createElement("BR"));
	}
}

function closeWindow(win){ win.close(); }


//Experimental; currently unused. Designed to clean up potential memory leaks.
/*
function cleanUp(){

	//deletes all objects passed in
	//checks if argument is object

	for(i = 0; i < arguments.length; i++){

		if(delete arguments[i]){ 
			console.log("CleanUp: "+arguments[i]+" deleted");
			delete arguments[i]; 
		}
		else{
			console.log("CleanUp: object cannot be deleted");
		}

	}
}
*/


//Load Content
function loadMainMenu(){

	//runs at onload

	document.body.style.backgroundColor = BACKGROUND_COLOR;

	var siblings = []

	//make the main central container for everything
	//gest cleared in between [Projects] and [About]
	var container = new Container("container", null);
	
	//make an external link
	var resume = new ExLink("[Resume]", PINK_COLOR, null, 'https://docs.google.com/document/d/1W5vlxahaXti1E5lYkPppVnmZTysEYAOz_HA5J8uHC-M/edit?usp=sharing');

	//make buttons that do stuff
	var projects = new Button("[Projects]", PINK_COLOR, GREEN_COLOR, null, siblings);
	var about = new Button("[About]", PINK_COLOR, GREEN_COLOR, null, siblings);

	//add buttons to an array
	siblings.push(projects);
	siblings.push(about);

	//append objects to the initially ccreated <span> tags in the html
	container.append(document.getElementById("bodyContent"));
	resume.append(document.getElementById("resume"));
	projects.append(document.getElementById("projects"));
	about.append(document.getElementById("about"));

	//add button functions
	projects.addFunc([container], loadCategories);
	about.addFunc([container], loadAboutMe);

}

function loadAboutMe(container){

	//Takes in the DIV interface 'container' and creates content for it.
	
	container.setID("AboutMe");
	container.clearNodes();

	document.getElementById("bodyheaderid").innerHTML="About Me";

	//Containers for link names and their address.
	var names = ["[LinkedIn]", "[Itch.io]", "[Open Processing]"];
	var links = ['https://www.linkedin.com/pub/stuart-winslow/58/4b1/864',
				 'http://ghostravenstorm.itch.io/',
				 'http://www.openprocessing.org/user/47167'
				];

	var text = new PElement(fetchFile("AboutMe.txt"), WHITE_COLOR, null, 700, 400);
	container.addChild(text.getElem());

	//Creates a data structure for the ExLink interface that holds all the links.
	var linkList = new LinkList(container, null, names, links);

	makeNewLines(container, 1);

	//Creates the email link separate from the list structure in order to place it on a new line.
	var email = new ExLink("[stu.winslow@outlook.com]", PURPLE_COLOR, null, 'mailto:stu.winslow@outlook.com');
	container.addChild(email.getElem());
}

function loadCategories(container){

	//Takes in DIV interface 'container' lists projects by type

	container.setID("mainContainer");
	container.clearNodes();

	document.getElementById("bodyheaderid").innerHTML="My Projects";

	makeNewLines(container, 1);

	//holds list of projects
	var projectListCont = new Container("projectListCont", null);
	var categoryCont = new Container("categoryCont", null);

	names = [
		"[Processing]",
		"[JavaScript]",
		"[Unity]"
	];

	funcs = [
		loadProcessing,
		loadJavaScript,
		loadUnity
	];

	params = [
		[projectListCont],
		[projectListCont],
		[projectListCont]
	];

	container.addChild(categoryCont.getElem());

	var buttonList = new ButtonList(categoryCont, names, funcs, params);

	container.addChild(projectListCont.getElem());
}	

function loadUnity(projectListCont){

	projectListCont.setID("unityProjects");
	projectListCont.clearNodes();

	makeNewLines(projectListCont, 1);

	var nano = new Button("[Project.nano]", ORANGE_COLOR, BLUE_COLOR);
	projectListCont.addChild(nano.getElem());
	nano.addFunc(["Project.nano", 976, 556, fetchFile("AboutProjectNano.txt"), ["ProjectNanoWeb/ProjectNanoWeb.html"]], projectWindow);
}

function loadJavaScript(projectListCont){

	projectListCont.setID("javascriptProjects");
	projectListCont.clearNodes();

	makeNewLines(projectListCont, 1);

	buttonNames = [
		"[This.Profile]",
		"[The Great Text Adventure]"
	];

	buttonFuncs = [
		projectWindow,
		projectWindow
	];

	buttonParams = [
		["This.Profile", 600, 600, fetchFile("AboutProfile.txt"), ["index.html"]],
		["The Great Text Adventure", 980, 726, fetchFile("AboutTextAdventure.txt"), ["TextAdventure.html"]]
	];

	var buttonList = new ButtonList(projectListCont, buttonNames, buttonFuncs, buttonParams);
}

function loadProcessing(projectListCont){

	projectListCont.setID("processingProjects");
	projectListCont.clearNodes();

	makeNewLines(projectListCont, 1);

	buttonNames = [
		"[Mr. Ooogle]",
		"[Moving Dots]",
		"[Ship Game]",
		"[Muffin Button]"
	];

	buttonFuncs = [
		projectWindow,
		projectWindow,
		projectWindow,
		projectWindow
	];

	buttonParams = [
		["Mr. Oogle", 512, 524, fetchFile("AboutMrOogle.txt"), ["http://www.openprocessing.org/sketch/208246/embed/?width=500&height=500&border=true"]],
		["Moving Dots", 512, 524, fetchFile("AboutMovingDots.txt"), ["http://www.openprocessing.org/sketch/208247/embed/?width=500&height=500&border=true", "MovingDots_htmlCanvas/MovingCircles_Canvas.html"], 2],
		["Ship Game", 512, 524, fetchFile("AboutShipGame.txt"), ["http://www.openprocessing.org/sketch/190500/embed/?width=500&height=500&border=true"]],
		["Muffin Button", 512, 524, fetchFile("AboutMuffinButton.txt"), ["http://www.openprocessing.org/sketch/185774/embed/?width=500&height=500&border=true"]]
    ];

	var buttonList = new ButtonList(projectListCont, buttonNames, buttonFuncs, buttonParams);
}