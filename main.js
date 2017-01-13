
function main(){
	setFormat();

	var resumeButton = new Button("[Resume]", BLUE_COLOR, document.getElementById("resume"), resumeLink);
	var projectsButton = new Button("[Projects]", BLUE_COLOR, document.getElementById("projects"));
	var aboutmeButton = new Button("[About]", BLUE_COLOR, document.getElementById("aboutme"));
	var sketchbook_A = new Button("[Sketch", BLUE_COLOR, document.getElementById("sketchbook_A"))
	var sketchbook_B = new Button("book]", BLUE_COLOR, document.getElementById("sketchbook_B"))


	projectsButton.addFunction(projectsButtonFunction);
	aboutmeButton.addFunction(aboutmeButtonFunction);
	sketchbook_A.addFunction(onSketchbook);
	sketchbook_B.addFunction(onSketchbook);
}

// Depreciated.
function setFormat(){
	document.body.style.fontFamily = "monospace";
	document.body.style.fontSize = "16px";
	document.body.style.color = WHITE_COLOR;
	document.body.style.backgroundColor = BACKGROUND_COLOR;
}

function aboutmeButtonFunction(){
	cleanUpChildNodes(document.getElementById("bodycontent"));
	cleanUpChildNodes(document.getElementById("stuff"));
	var aboutmeContainer = new Container("aboutmeContainer", document.getElementById("bodycontent"));
	document.getElementById("bodyheaderid").innerHTML = "About Me ";

	var text = new TextBlock(fetchFile("AboutMe.txt"), WHITE_COLOR, aboutmeContainer, 500, 300);

	var list = [];

	for(var i = 0; i < linkList.length; i++){
		var link = new Button("["+linkList[i]+"]", ORANGE_COLOR, aboutmeContainer, linkLinkAddress[i]);
		list.push(link);
		addSpace(aboutmeContainer);
	}

	addBreak(aboutmeContainer);

	var email = new Button("[stu.winslow@outlook.com]", PURPLE_COLOR, aboutmeContainer, emailLink);
}

function projectsButtonFunction(){
	cleanUpChildNodes(document.getElementById("bodycontent"));
	cleanUpChildNodes(document.getElementById("stuff"));
	var projectContainer = new Container("projectContainer", document.getElementById("bodycontent"));
	document.getElementById("bodyheaderid").innerHTML = "Projects ";

	//var text = new TextBlock("projects", WHITE_COLOR, projectContainer);

	var list = [];
	addBreak(projectContainer.getElement());

	function buttonFunction(address){
		//window.location.href = address;

		cleanUpChildNodes(document.getElementById("stuff"));

		var frame = document.createElement("IFRAME");
		frame.setAttribute('width', "100%");
		frame.setAttribute('height', "100%");
		frame.setAttribute('frameborder', 'no');
		frame.setAttribute('scrolling', 'auto');
		frame.setAttribute('src', address);

		document.getElementById("stuff").appendChild(frame);
	}

	for(var i = 0; i < projectList.length; i++){
		list.push(new Button("["+projectList[i]+"]", BLUE_COLOR, projectContainer ));
		list[i].addFunction(buttonFunction, [projectLinks[i]]);
		addBreak(projectContainer.getElement());
	}
}

function onSketchbook(){
	cleanUpChildNodes(document.getElementById("bodycontent"));
	cleanUpChildNodes(document.getElementById("stuff"));
	var sketchbookContainer = new Container("sketchbookContainer", document.getElementById("bodycontent"));
	document.getElementById("bodyheaderid").innerHTML = "Sketchbook ";

	var list = [];
	addBreak(sketchbookContainer.getElement());

	function buttonFunction(address){
		//window.location.href = address;
		cleanUpChildNodes(document.getElementById("stuff"));

		var frame = document.createElement("IFRAME");
		frame.setAttribute('width', "100%");
		frame.setAttribute('height', "100%");
		frame.setAttribute('frameborder', 'no');
		frame.setAttribute('scrolling', 'auto');
		frame.setAttribute('src', address);

		document.getElementById("stuff").appendChild(frame);
	}

	for(var i = 0; i < sketchbookList.length; i++){
		list.push(new Button("["+sketchbookList[i]+"]", BLUE_COLOR, sketchbookContainer ));
		list[i].addFunction(buttonFunction, [sketchbookLinks[i]]);
		addBreak(sketchbookContainer.getElement());
	}

}
