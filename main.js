
function main(){
	setFormat();

	var resumeButton = new Button("[Resume]", BLUE_COLOR, document.getElementById("resume"), resumeLink);
	var projectsButton = new Button("[Projects]", BLUE_COLOR, document.getElementById("projects"));
	var aboutmeButton = new Button("[About]", BLUE_COLOR, document.getElementById("aboutme"));

	projectsButton.addFunction(projectsButtonFunction);
	aboutmeButton.addFunction(aboutmeButtonFunction);
}

function setFormat(){
	document.body.style.fontFamily = "monospace";
	document.body.style.fontSize = "16px";
	document.body.style.color = WHITE_COLOR;
	document.body.style.backgroundColor = BACKGROUND_COLOR;
}

function aboutmeButtonFunction(){
	cleanUpChildNodes(document.getElementById("bodycontent"));
	var aboutmeContainer = new Container("aboutmeContainer", document.getElementById("bodycontent"));
	document.getElementById("bodyheaderid").innerHTML = "About Me ";

	var text = new TextBlock(fetchFile("AboutMe.txt"), WHITE_COLOR, aboutmeContainer, 500, 300);

	var list = [];

	for(var i = 0; i < linkList.length; i++){
		var link = new Button("["+linkList[i]+"]", BLUE_COLOR, aboutmeContainer, linkLinkAddress[i]);
		list.push(link);
		addSpace(aboutmeContainer);
	}

	addBreak(aboutmeContainer);

	var email = new Button("[stu.winslow@outlook.com]", PURPLE_COLOR, aboutmeContainer, emailLink);
}

function projectsButtonFunction(){
	cleanUpChildNodes(document.getElementById("bodycontent"));
	var projectContainer = new Container("projectContainer", document.getElementById("bodycontent"));
	document.getElementById("bodyheaderid").innerHTML = "Projects ";

	//var text = new TextBlock("projects", WHITE_COLOR, projectContainer);

	var list = [];
	addBreak(projectContainer.getElement());

	for(var i = 0; i < projectList.length; i++){
		list.push(new Button("["+projectList[i]+"]", BLUE_COLOR, projectContainer ));
		list[i].addFunction(buttonFunction, [projectLinks[i]]);
		addBreak(projectContainer.getElement());
	}

	function buttonFunction(address){
		window.location.href = address;
	}

	/*
	function buttonFunction(projectName, containerNode){
		containerNode.getElement().removeChild(containerNode.getElement().lastChild);

		var container = new Container(projectName, containerNode);
		var header = new TextBlock("// " + projectName + " -----", GRAY_COLOR, container);

		container.appendChild(header);
	}
	*/
}

