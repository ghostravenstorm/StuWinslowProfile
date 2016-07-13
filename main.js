
//Constants
	var HIGHLIGHT_FCOLOR = "#000000" /*"#003366"*/;
	var HIGHLIGHT_BCOLOR = "#00ff00" /*"#3399FF"*/;
	var PURPLE_COLOR     = "#AA80FF";
	var PINK_COLOR       = "#FF3399";
	var GREEN_COLOR      = "#00FF00";
	var ORANGE_COLOR     = "#FF9900";
	var BLUE_COLOR       = "#00BBCC";
	var GRAY_COLOR       = "#777777";
	var YELLOW_COLOR     = "#FFFF00";
	var WHITE_COLOR      = "#FFFFFF";
	var BLACK_COLOR      = "#000000";
	var BACKGROUND_COLOR = "#262626" /*"#28313e"*/;

//Color Themes
/*
 	var Button_DefaultColor = ;
 	var Button_DefaultHColor = ;
 	var Links_DefaultColor = ;
 	var Email_StaticColor = ;

 	var UnityProjects_StaticColor
 	var JavaScriptProjects_StaticColor
 	var ProcessingProjects_StaticColor
 	var JavaScriptProjects_HighlightColor
 	var UnityProjects_HighlightColor
 	var ProcessingProjects_HighlightColor
 	*/




// ------------ Framework ----------------
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

function Container(id, wdt, hgt, win){

	//Object that holds a DIV element which is used to hold other created elements.

	//checks for a child window, if so then append this div to that window
	if(win == null){
		var elem = document.createElement("DIV");
	}
	else{
		var elem = win.document.createElement("DIV");
	}

	elem.setAttribute("id", id);

	if(wdt != null){ elem.style.width = wdt; }
	if(hgt != null){ elem.style.height = hgt; }

	this.setDimensions = (function setDimensions(wdt, hgt){
		if(wdt != null){ elem.style.width = wdt; }
		if(hgt != null){ elem.style.height = hgt; }
	});

	//sets html id of the div
	this.setID = (function setID(id){
		elem.setAttribute("id", id);
	});

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
	});

	//clears all nodes in this container
	this.clearNodes = (function clearNodes(){
		console.log(id+": clearing all nodes");
		while( elem.hasChildNodes()){
			elem.removeChild(elem.lastChild);
		}
	});
}

function ButtonList(container, names, funcs, params, nColor, sColor, newLines){

	//Object that holds an array of buttons that all belong together in the same category.
	//This method also controls the selection color of each button in siblings[] by passing
	//the array to each button that is created so each button knows who its siblings are.

	if(newLines == null)
		newLines = false;

	siblings = [];

	for(i = 0; i < names.length; i++){
		siblings[i] = new Button(names[i], nColor, sColor, null, siblings);

		siblings[i].addFunc(params[i], funcs[i]);

		container.addChild(siblings[i].getElem());

		if(newLines)
			newBreak(container);
		else
			container.addChild(makeNewSpace());
	}

	//returns a single button from the list
	this.getButton = (function getButton(i){
		return siblings[i];
	});
}

function LinkList(container, win, names, links, color){

	//Structure that manages and displays all links created for it. 
	//used only once in the AboutMe section

	//there must be a link[] for each name[] that must also be in an array structure.

	elements = [];

	for (i = 0; i < names.length; i++){
		elements[i] = new ExLink(names[i], color, win, links[i]);

		container.addChild(elements[i].getElem());

		container.addChild(makeNewSpace());
	}
}

/* //old system usde for popup windows
function projectWindow(name, wdt, hgt, aboutText, address){

	//address must be in an array structure even if only 1 frame is being made.

	//Method that creates a single window instance that holds a project
	//and other information about it. 

	//checks for initially missing parameters
	if(name == null)       { name = "Default Name"; }
	if(wdt == null)        { wdt = 500; }
	if(hgt == null)        { hgt = 500; }

	//create the window element and set initial properties
	var win = window.open("", "_blank", "width="+((wdt+20)*address.length).toString()+", height="+(hgt+100).toString());
	console.log(address.length);
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

	//create the iframe elements based on number of addresses passed in
	var iFrames = [];
	for(i = 0; i < address.length; i++){
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

	//method that clears the project div and displays about info
	function showAbout(obj){
		projContainer.clearNodes();
		makeNewLines(projContainer, 1);
		projContainer.addChild(obj.getElem());
	}

	//separate show content function that handles multiple iframes specifically
	function showFrame(arry){
		projContainer.clearNodes();
		makeNewLines(projContainer, 1);

		for(i = 0; i < address.length; i++){
			projContainer.addChild(arry[i].getElem());
		}
	}

	//run initial functions to display the project on open
	showFrame(iFrames);
	buttonList.getButton(0).setSel(true);
}
*/

function projectContainer(name, container, wdt, hgt, aboutText, address){

	container.clearNodes();

	var subContainer = new Container("subContainer", "550px");
	
	var name = new PElement("// " + name + " ------", GRAY_COLOR);
	var text = new PElement(aboutText, WHITE_COLOR);

	var iFrames = [];
	for(i = 0; i < address.length; i++){
		iFrames[i] = new ItemFrame(wdt, hgt, address[i]);
	}

	container.addChild(name.getElem());

	//arrays that hold info for ButtonList to make buttons for this window
	buttonNames = ["[This.Project]", "[This.About]"];
	buttonFuncs = [showFrame, showAbout];
	buttonParams = [[iFrames], [text]];

	//makes the buttons
	var buttonList = new ButtonList(container, buttonNames, buttonFuncs, buttonParams, BLUE_COLOR, GREEN_COLOR);

	//append div container and nodes
	subContainer.append(container.getElem());
	

	//method that clears the project div and displays about info
	function showAbout(obj){
		subContainer.clearNodes();
		subContainer.setDimensions("550px");
		makeNewLines(subContainer, 1);
		subContainer.addChild(obj.getElem());
	}

	//separate show content function that handles multiple iframes specifically
	function showFrame(arry){
		subContainer.clearNodes();
		subContainer.setDimensions("1200px");
		makeNewLines(subContainer, 1);

		for(i = 0; i < address.length; i++){
			subContainer.addChild(arry[i].getElem());
		}
	}

	showFrame(iFrames);
	buttonList.getButton(0).setSel(true);
}

function fetchFile(file){

	//Does not work in Chrome with file:/// requests
	//except when actaully running from a websevrer and not locally.

	//concatenate file path with file name
	file = "abouttext/"+file;
	
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

	//returns a string
	return textData;
}



//Macros

function makeNewSpace(){ return document.createTextNode(" "); }

function makeNewLines(interfaceObj, num){

	// 'interfaceObj' is the div container object that needs line breaks and 'num' being how many to add.
	// this macro calls the 'addChild' method in the 'Conatiner' class.

	// checks if no number was passed in. If so default to 1.
	if(num == null){ num = 1; }

	for(i = 0; i < num; i++){
		interfaceObj.addChild(document.createElement("BR"));
	}
}

function newBreak(container){
	container.addChild(document.createElement("BR"));
}

function closeWindow(win){ win.close(); }


//Experimental. Currently unused. Designed to clean up potential memory leaks.
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

// -------- CONTENT GENERATORS -----------

//Load Content
function loadMainMenu(){

	//runs at onload

	document.body.style.backgroundColor = BACKGROUND_COLOR;

	//used to group [Projects] and [About] together
	var siblings = []

	//make the main central container for everything
	//gest cleared in between [Projects] and [About]
	var container = new Container("MainContainer", null);
	
	//make an external link
	var resume = new ExLink("[Resume]", BLUE_COLOR, null, 'https://docs.google.com/document/d/1W5vlxahaXti1E5lYkPppVnmZTysEYAOz_HA5J8uHC-M/edit?usp=sharing');

	//make buttons that do stuff
	var projects = new Button("[Projects]", BLUE_COLOR, GREEN_COLOR, null, siblings);
	var about = new Button("[About]", BLUE_COLOR, GREEN_COLOR, null, siblings);

	//add buttons to an array
	siblings.push(projects);
	siblings.push(about);

	//append objects to the initially created <span> tags in the html
	container.append(document.getElementById("bodyContent"));
	resume.append(document.getElementById("resume"));
	projects.append(document.getElementById("projects"));
	about.append(document.getElementById("about"));

	//add button functions
	projects.addFunc([container], loadProjects);
	about.addFunc([container], loadAboutMe);
}

function loadAboutMe(container){

	//Takes in the DIV interface 'container' and creates content for it.
	
	container.setID("AboutMe");
	container.clearNodes();

	container.setDimensions("550px");

	document.getElementById("bodyheaderid").innerHTML="About Me";

	//Containers for link names and their address.
	var names = ["[LinkedIn]", "[Itch.io]", "[Open Processing]"];

	var links = [
		'https://www.linkedin.com/pub/stuart-winslow/58/4b1/864',
		'http://ghostravenstorm.itch.io/',
		'http://www.openprocessing.org/user/47167'
	];

	var text = new PElement(fetchFile("AboutMe.txt"), WHITE_COLOR, null, 500, 300);
	container.addChild(text.getElem());

	//Creates a data structure for the ExLink interface that holds all the links.
	var linkList = new LinkList(container, null, names, links, BLUE_COLOR);

	makeNewLines(container, 1);

	//Creates the email link separate from the list structure in order to place it on a new line.
	var email = new ExLink("[stu.winslow@outlook.com]", PURPLE_COLOR, null, 'mailto:stu.winslow@outlook.com');
	container.addChild(email.getElem());
}

function loadProjects(container){

	container.setID("ProjectList");
	container.clearNodes();

	container.setDimensions("350px");

	document.getElementById("bodyheaderid").innerHTML="Projects";

	makeNewLines(container, 1);

	subContainer = new Container("ProjectContainer");

	buttonNames = [
		"[The Great Text Adventure]",
		"[Mr. Oogle]",
		"[Moving Dots]",
		"[Muffin Button]",
		"[Project.Nano]",
		"[Ship Game]",
		"[Doubloonacy]"
	];

	buttonFuncs = [
		projectContainer,
		projectContainer,
		projectContainer,
		projectContainer,
		projectContainer,
		projectContainer,
		projectContainer
	];

	buttonParams = [
		[ "The Great Text Adventure", subContainer, 980, 726, fetchFile("AboutTextAdventure.txt"), ["TextAdventure.html"] ],
		[ "Mr. Oogle", subContainer, 512, 524, fetchFile("AboutMrOogle.txt"), ["http://www.openprocessing.org/sketch/208246/embed/?width=500&height=500&border=true"] ],
		[ "Moving Dots", subContainer, 512, 524, fetchFile("AboutMovingDots.txt"), ["http://www.openprocessing.org/sketch/208247/embed/?width=500&height=500&border=true", "MovingDots_htmlCanvas/MovingCircles_Canvas.html"], 2 ],
		[ "Muffin Button", subContainer, 512, 524, fetchFile("AboutMuffinButton.txt"), ["http://www.openprocessing.org/sketch/185774/embed/?width=500&height=500&border=true"] ],
		[ "Project.nano", subContainer, 976, 556, fetchFile("AboutProjectNano.txt"), ["ProjectNanoWeb/ProjectNanoWeb.html"] ],
		[ "Ship Game", subContainer, 512, 524, fetchFile("AboutShipGame.txt"), ["http://www.openprocessing.org/sketch/190500/embed/?width=500&height=500&border=true"] ],
		[ "Doubloonacy", subContainer, 1512, 2024, fetchFile("AboutDoubloonacy.txt"), ["doubloonacy.html"] ]
	];

	buttonList = new ButtonList(container, buttonNames, buttonFuncs, buttonParams, BLUE_COLOR, GREEN_COLOR, true);

	subContainer.append(container.getElem());
}

/*
function loadCategories(container){

	//Takes in DIV interface 'container' lists projects by type

	container.setID("ProjectCategoryContainer");
	container.clearNodes();

	document.getElementById("bodyheaderid").innerHTML="My Projects";

	makeNewLines(container, 1);

	//holds list of projects
	var projectListCont = new Container("projectListCont", null);

	buttonNames = [
		"[Processing]",
		"[JavaScript]",
		"[Unity]"
	];

	buttonFuncs = [
		loadProcessing,
		loadJavaScript,
		loadUnity
	];

	buttonParams = [
		[null],
		[null],
		[null]
	];

	//container.addChild(categoryCont.getElem());

	var buttonList = new ButtonList(container, buttonNames, buttonFuncs, buttonParams, BLUE_COLOR, GREEN_COLOR);

	//container.addChild(projectListCont.getElem());
}

function loadProcessing(){}
function loadJavaScript(){}



function loadUnity(container){

	container.setID("UnityProjects");
	container.clearNodes();

	makeNewLines(projectListCont, 1);

	var nano = new Button("[Project.nano]", BLUE_COLOR, GREEN_COLOR);
	container.addChild(nano.getElem());

	nano.addFunc(["Project.nano", 976, 556, fetchFile("AboutProjectNano.txt"), ["ProjectNanoWeb/ProjectNanoWeb.html"]], makeProjectContainer);
}

/*
function loadJavaScript(projectListCont){

	projectListCont.setID("javascriptProjects");
	projectListCont.clearNodes();

	//make new container to place project
	var projContainer = new Container("projectContainer", null);

	makeNewLines(projectListCont, 1);

	buttonNames = [
		"[This.Profile]",
		"[The Great Text Adventure]"
	];

	buttonFuncs = [
		makeProjectContainer,
		makeProjectContainer
	];

	buttonParams = [
		["This.Profile", projContainer, 600, 600, fetchFile("AboutProfile.txt"), ["index.html"]],
		["The Great Text Adventure", projContainer, 980, 726, fetchFile("AboutTextAdventure.txt"), ["TextAdventure.html"]]
	];

	var buttonList = new ButtonList(projectListCont, buttonNames, buttonFuncs, buttonParams, BLUE_COLOR, GREEN_COLOR);

	//append the empty container after appending the buttons to the parent
	projContainer.append(projectListCont.getElem());
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
		makeProjectContainer,
		makeProjectContainer,
		makeProjectContainer,
		makeProjectContainer
	];

	buttonParams = [
		["Mr. Oogle", projectListCont, 512, 524, fetchFile("AboutMrOogle.txt"), ["http://www.openprocessing.org/sketch/208246/embed/?width=500&height=500&border=true"]],
		["Moving Dots", projectListCont, 512, 524, fetchFile("AboutMovingDots.txt"), ["http://www.openprocessing.org/sketch/208247/embed/?width=500&height=500&border=true", "MovingDots_htmlCanvas/MovingCircles_Canvas.html"], 2],
		["Ship Game", projectListCont, 512, 524, fetchFile("AboutShipGame.txt"), ["http://www.openprocessing.org/sketch/190500/embed/?width=500&height=500&border=true"]],
		["Muffin Button", projectListCont, 512, 524, fetchFile("AboutMuffinButton.txt"), ["http://www.openprocessing.org/sketch/185774/embed/?width=500&height=500&border=true"]]
    ];

	var buttonList = new ButtonList(projectListCont, buttonNames, buttonFuncs, buttonParams, BLUE_COLOR, GREEN_COLOR);
}
*/