var movieWidth;
var movieHeight;
var canvas;
var scalePercentagew;
var scalePercentageh;
var lcap;
var no_of_attempts;
var no_of_tries;
var handle;
var finishedarray
var entertime;
var gameMode;
var update = true;
var myscore = 0;
resourceUse1 = {
	onLoad: function() {
		if (!this.captivate) return;
		lcap = this.captivate;
		handle = this.captivate.CPMovieHandle;
		if (handle.isWidgetVisible() == true) {
			var lInteractiveWidgetHandle = this.captivate.CPMovieHandle.getInteractiveWidgetHandle();
			if (lInteractiveWidgetHandle) {
				if (lInteractiveWidgetHandle.shouldDisable()) this.disable();
				var btnElement = document.getElementById('puzzleCreate');
				if (btnElement) {
					// btnElement.onmouseover = function(e)
					// {
					// lInteractiveWidgetHandle.setShowHint();
					// }
					// btnElement.onmouseout = function(e)
					// {
					// lInteractiveWidgetHandle.setHideHint();
					// }
					btnElement.onclick = function(e) {
						//Handle Click inside Widget
						//lInteractiveWidgetHandle.setSuccess(true);
					}
				}

			}
			this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
			if (!this.movieProps) return;
			this.varHandle = this.movieProps.variablesHandle;
			m_VariableHandle = this.varHandle;
			this.eventDisp = this.movieProps.eventDispatcher;
			this.xmlStr = this.captivate.CPMovieHandle.widgetParams();

			this.externalImage = '';
			this.description = '';
			this.myVar = '';
			this.myVar1 = '';
			no_of_attempts = this.captivate.CPMovieHandle.getCPQuestionData().maxAttempts

			if (no_of_attempts == -1) {
				no_of_attempts = 1
			}
			no_of_tries = this.captivate.CPMovieHandle.getCPQuestionData().numTries

			var size = this.OpenAjax.getSize();
		
       		//movieWidth = 800//parseInt(size.width.split("px")[0]);
        	//movieHeight = 600//parseInt(size.height.split("px")[0]);
			movieWidth = this.movieProps.contentWidth//parseInt(size.width.split("px")[0]);
        	movieHeight = this.movieProps.contentHeight//parseInt(size.height.split("px")[0]);

			this.updateData();
			this.doUpdate();
			if (parent.cpInQuizScope == true){
				id = setInterval(checkval, 100)
				//checkval();
				window.quizscope = 1
			}else{
			   // if (window.quizscope == 0)
				//return;
				id = setInterval(checkval, 100)
				//checkval();
			}
		}

	},

	//To be implemented by a QUESTION WIDGET to be part of Captivate's Quizzing framework
	enable: function() {
		var btnElement = document.getElementById('canvas');
		btnElement.disabled = false;
	},
	//To be implemented by a QUESTION WIDGET to be part of Captivate's Quizzing framework
	disable: function() {
		var btnElement = document.getElementById('canvas');
		btnElement.disabled = 'disabled';
	},
	//Captivate App will not recognize a Question Widget unless this function is implemented and returns true
	getInteractionQuestionState: function() {
		var lResult_Str = finished + ":quiz";
		
		//Append with mins
		lResult_Str =  lResult_Str+":"+exportRoot.ge_mc.entertimemin.text;
		
		//Append with seconds
		lResult_Str =  lResult_Str+":"+exportRoot.ge_mc.entertimesec.text;
	
		//Append with score
		lResult_Str =  lResult_Str+":"+exportRoot.ge_mc.enterscore.text;

		return lResult_Str;
	},

	setInteractionQuestionState: function(aVal) {
		//Implements this to set Widget State from input String(aVal)
		var lArray = [];
		lArray = aVal.split(",");

		if (lArray[0] != ""){
			finished = lArray[0];
		}else{
			finished = "notdone"
		}

		if (lArray.length < 2) return;
	},

	getCorrectAnswerAsArray: function() {
		//Return correct answer as string
		return ["1"];
	},

	getCurrentAnswerAsString: function() {
		//Return current answer as string
	},

	//Handle Click, if Clicked Outside Widget ( will be called from captivate internally)
	onClickExternal: function(e) {
		var lMsg = 'On Click Received in Widget';
		if (e) {
			lMsg += "x=" + e.pageX + "y=" + e.pageY;
		}

		if (!this.captivate) return;

		var lInteractiveWidgetHandle = this.captivate.CPMovieHandle.getInteractiveWidgetHandle();
	},
	updateData: function() {
		var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
		var myFrameName = window.name;
		var myWidgetiFrame = window.parent.document.getElementById(window.name);
		if (myWidgetiFrame) {
			myWidgetiFrame.style.width = movieWidth + "px";
			myWidgetiFrame.style.height = movieHeight + "px";

		}


		var id = 0;
		var result = jQuery.parseXML(this.xmlStr);
		var resultDoc = jQuery(result);
		var strProp = resultDoc.find('string').text();

		var res = resultDoc.find('#resultVariable');

		if (res) {
			if (res.find('string')) {
				resultVariable = res.find('string').text();

			}
		}
		var internalImageProp = resultDoc.find('#internalImageId');
		if (internalImageProp) {
			if (internalImageProp.find('number')) {
				id = parseInt(internalImageProp.find('number').text());
				internalImage = this.movieProps.ExternalResourceLoader.getResourcePath(id);
			}
		}
		var rswidthprop = resultDoc.find('#rswidth');

		if (rswidthprop) {
			if (rswidthprop.find('number')) {
				rswidth = parseInt(rswidthprop.find('number').text());

			}
		}
		var titlename = resultDoc.find('#titlename');

		if (titlename) {
			if (titlename.find('string')) {
				title = titlename.find('string').text();

			}
		}
		var Irowsprop = resultDoc.find('#Irows');

		if (Irowsprop) {
			if (Irowsprop.find('number')) {
				Irows = parseInt(Irowsprop.find('number').text());
			}
		}
		var entertimepropmin = resultDoc.find('#entertimemin');

		if (entertimepropmin) {
			if (entertimepropmin.find('string')) {
				entertimemin = entertimepropmin.find('string').text();

			}
		}
		var entertimepropsec = resultDoc.find('#entertimesec');
		
		if (entertimepropsec) {
			if (entertimepropsec.find('string')) {
				entertimesec = entertimepropsec.find('string').text();
			}
		}
		var presetprop = resultDoc.find('#preset');

		if (presetprop) {
			if (presetprop.find('number')) {
				preset = parseInt(presetprop.find('number').text());
			}
		}
		var clicimageprop = resultDoc.find('#clickedimageflag');

		if (clicimageprop) {
			if (clicimageprop.find('number')) {
				clickedimageflag = parseInt(clicimageprop.find('number').text());
				primg = this.movieProps.ExternalResourceLoader.getResourcePath(clickedimageflag);
			}
		}
		var clicbckimageprop = resultDoc.find('#clickedbckimageflag');

		if (clicbckimageprop) {
			if (clicbckimageprop.find('number')) {
				clickedbckimageflag = parseInt(clicbckimageprop.find('number').text());

			}
		}
		var typeprop = resultDoc.find('#type');

		if (typeprop) {
			if (typeprop.find('number')) {
				type = typeprop.find('string').text();

			}
		}
	},

	doUpdate: function() {
		var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
		var myFrameName = window.name;
		//alert(myFrameName);
		var myWidgetiFrame = window.parent.document.getElementById(window.name);
		if (myWidgetiFrame) {
			myWidgetiFrame.parentElement.parentElement.style.top = "0px";
			myWidgetiFrame.parentElement.parentElement.style.left = "0px";
		}
		var elem = document.getElementById('textarea_display');
		if (elem) {
			elem.innerHTML = this.myVar;
			//$(elem).width(document.width - 15);
			//$(elem).height(document.height - 15);
		}
		
		if (internalImage && internalImage.length > 1) {
			var internal_image_elem = document.getElementById("internal_image");
			if (internal_image_elem) {
				var img1 = new Image();
				img1.src = internalImage;
				img1.width = 25;
				img1.height = 16;
				internal_image_elem.appendChild(img1);
			}
		}
		elem = null;
	}
};



resource_use = function() {
	return resourceUse1;
}
function checkval(){
	clearInterval(id);
	jiginit();
}
function jiginit() {
	canvas = document.getElementById("canvas");
    createjs.Ticker.setFPS(30);
	exportRoot = new lib.changedforHTML();
	exportRoot.ge_mc.enterscore.visible = false;
	exportRoot.ge_mc.theme.score_txt.visible=false;
	var acW = 640;
	var acH = 480;

	canvas.width = movieWidth;
	canvas.height = movieHeight;
	stage = new createjs.Stage(canvas);
	stage.scaleX = movieWidth / acW;
	stage.scaleY = movieHeight / acH;
	scalePercentagew = movieWidth / acW;
	scalePercentageh = movieHeight / acH;
	
	//if(createjs.Touch.isSupported()){
		//createjs.Touch.enable(stage);
	//}
	stage.enableMouseOver();
	//stage.mouseMoveOutside = true;
	
	if (parent.cpInQuizScope == true) {
		score = lcap.CPMovieHandle.getCPQuestionData().weightage.toString();
		exportRoot.ge_mc.enterscore.visible = true;
		exportRoot.ge_mc.enterscore.text="0";
		exportRoot.ge_mc.theme.score_txt.visible=true;
	} else {
		score = "0";
	}
	$('#hintimage').css({
		position: "relative",
		top: (300 * scalePercentageh + 35 * scalePercentageh) + "px",
		left: (456 * scalePercentagew + 50 * scalePercentagew) + "px",
		//left: "900px",
		width: 90 * scalePercentagew + "px",
		height: 90 * scalePercentageh + "px",
		zIndex: 5
	}).show();
	
	finishedarray = finished.split(":");
	exportRoot.ge_mc.nm.titletext.text = title;
	if (parent.cpInQuizScope == true) {
		myscore=lcap.CPMovieHandle.getCPQuestionData().weightage.toString();
		if (lcap.CPMovieHandle.getQuizController().m_QuizzingData.isInReviewMode == true) {
			if (finishedarray[0] == "success") {
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setsuccessmode();
			} else if (finishedarray[0] == "failuretimeout") {
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setfailuremode();
			}
		} else if (no_of_tries < no_of_attempts) {
			if (finishedarray[0] == "notdone") {
				setnotdonemode();
			} else if (finishedarray[0] == "success") {
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setsuccessmode();
			} else if (finishedarray[0] == "failuretimeout") {
				//Learner should be able to try the question again if they fail
				setnotdonemode();
			}
		} else if (no_of_tries >= no_of_attempts) {
			if (finishedarray[0] == "notdone") {
				//Learner should be marked as failed as they have finished all attempts
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setfailuremode();
			} else if (finishedarray[0] == "success") {
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setsuccessmode();
			} else if (finishedarray[0] == "failuretimeout") {
				gameMode = "Review"
				exportRoot.ge_mc.enterscore.visible = true;
				exportRoot.ge_mc.theme.score_txt.visible=true;
				setfailuremode();
			}
		}
	} else {
		if (lcap.CPMovieHandle.getQuizController().m_QuizzingData != null) {
			if (lcap.CPMovieHandle.getQuizController().m_QuizzingData.isInReviewMode == true) {
				if (finishedarray[0] == "notdone") {
					if (finishedarray[1] == "quiz") {
						gameMode = "Review"
						exportRoot.ge_mc.enterscore.visible = true;
						exportRoot.ge_mc.theme.score_txt.visible=true;
						setfailuremode();
					} else {
						setnotdonemode();
					}
				} else if (finishedarray[0] == "success") {
					gameMode = "Review"
					exportRoot.ge_mc.enterscore.visible = true;
					exportRoot.ge_mc.theme.score_txt.visible=true;
					setsuccessmode();
				} else if (finishedarray[0] == "failuretimeout") {
					gameMode = "Review"
					exportRoot.ge_mc.enterscore.visible = true;
					exportRoot.ge_mc.theme.score_txt.visible=true;
					setfailuremode();
				}
			} else if (no_of_tries < no_of_attempts) {
				if (finishedarray[0] == "notdone") {
					setnotdonemode();
				} else if (finishedarray[0] == "complete") {
					gameMode = "Review"
					exportRoot.ge_mc.enterscore.visible = true;
					exportRoot.ge_mc.theme.score_txt.visible=true;
					setsuccessmode();
				}
			} else if (no_of_tries >= no_of_attempts) {
				if (finishedarray[0] == "notdone") {
					setnotdonemode();
				} else if (finishedarray[0] == "success") {
					gameMode = "Review"
					exportRoot.ge_mc.enterscore.visible = true;
					exportRoot.ge_mc.theme.score_txt.visible=true;
					setsuccessmode();
				} else if (finishedarray[0] == "failuretimeout") {
					gameMode = "Review"
					exportRoot.ge_mc.enterscore.visible = true;
					exportRoot.ge_mc.theme.score_txt.visible=true;
					setfailuremode();
				}
			}
		} else {
			if (finishedarray[0] == "notdone") {
				if (finishedarray[1] == "quiz") {
					gameMode = "Review"
					setfailuremode();
				} else {
					setnotdonemode();
				}
			} else if (finishedarray[0] == "success") {
				gameMode = "Review"
				setsuccessmode();
			} else if (finishedarray[0] == "failuretimeout") {
				gameMode = "Review"
				setfailuremode();
			}
		}
	}
	stage.addChild(exportRoot);
	stage.update();
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", stage);
}

/*function tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		console.log("Stage Updated")
		update = false; // only update once
		stage.update(event);
	}
}*/

function setfailuremode() {
	exportRoot.ge_mc.enterscore.text = "0";
	var canv = self.document.getElementById('puzzleCanvas');
	canv.style.zIndex = 4;
	var fi = self.document.getElementById('finalimage');

	if (preset == 0) {
		fi.src = internalImage;
	} else {
		fi.src = primg;
	}
	$('#finalimage').css({
		position: "absolute",
		top: (exportRoot.ge_mc.y * scalePercentageh / 2 + 50) + "px",
		left: (exportRoot.ge_mc.x * scalePercentagew / 2 - 100) + "px",
		width: 330 * scalePercentagew + "px",
		height: 330 * scalePercentageh + "px",
		zIndex: -1
	}).show();

	exportRoot.ge_mc.reset.visible = false;
	var hi = self.document.getElementById('hintimage');
	hi.style.visibility = "hidden";
	
	if(gameMode!="Review"){
		if (resultVariable != "") {
			m_VariableHandle[resultVariable] = exportRoot.ge_mc.enterscore.text;
		}
		setFailure();
	}else{
		if(finishedarray[2]!=undefined){
			exportRoot.ge_mc.entertimemin.text = finishedarray[2]
			exportRoot.ge_mc.entertimesec.text = finishedarray[3]
			exportRoot.ge_mc.enterscore.text = finishedarray[4];
		}else{
			exportRoot.ge_mc.entertimemin.text = "00"
			exportRoot.ge_mc.entertimesec.text = "00"
			exportRoot.ge_mc.enterscore.text = "0"
		}
	}
}

function setsuccessmode() {
	var fi = self.document.getElementById('finalimage');
	
	if (preset == 0) {
		fi.src = internalImage;
	} else {
		fi.src = primg;
	}

	var canv = self.document.getElementById('puzzleCanvas');
	canv.style.zIndex = 4;
	exportRoot.ge_mc.reset.visible = false;
	var hi = self.document.getElementById('hintimage');
	hi.style.visibility = "hidden";

	$('#finalimage').css({
		position: "absolute",
		top: (exportRoot.ge_mc.y * scalePercentageh / 2 + 50) + "px",
		left: (exportRoot.ge_mc.x * scalePercentagew / 2 - 100) + "px",
		width: 330 * scalePercentagew + "px",
		height: 330 * scalePercentageh + "px",
		zIndex: -1
	}).show();
	
	if(gameMode!="Review"){
		if (resultVariable != ""){
			m_VariableHandle[resultVariable] = exportRoot.ge_mc.enterscore.text;
		}
		setSuccess();
	}else{
		if(finishedarray[2]!= undefined){
			exportRoot.ge_mc.entertimemin.text = finishedarray[2]
			exportRoot.ge_mc.entertimesec.text = finishedarray[3]
			exportRoot.ge_mc.enterscore.text = finishedarray[4];
		}else{
			exportRoot.ge_mc.entertimemin.text = "00"
			exportRoot.ge_mc.entertimesec.text = "00"
			exportRoot.ge_mc.enterscore.text = "0"
		}
	}
}

function setSuccess() {
	var lInteractiveWidgetHandle = lcap.CPMovieHandle.getInteractiveWidgetHandle();
	lInteractiveWidgetHandle.setSuccess(true);
}

function setFailure() {
	var lInteractiveWidgetHandle = lcap.CPMovieHandle.getInteractiveWidgetHandle();
	lInteractiveWidgetHandle.setSuccess(false);
}

function setnotdonemode() {
	var hi = self.document.getElementById('finalimage');
	hi.style.visibility = "hidden";
	exportRoot.ge_mc.reset.addEventListener("mouseover",showmousehand);
	exportRoot.ge_mc.reset.addEventListener("mouseout",hidemousehand);
	exportRoot.ge_mc.reset.addEventListener("click",clearandthenshuffleAll);
	$('#finalimage').css({
		position: "absolute",
		top: (exportRoot.ge_mc.y * scalePercentageh / 2 + 50) + "px",
		left: (exportRoot.ge_mc.x * scalePercentagew / 2 - 100) + "px",
		width: 330 * scalePercentagew + "px",
		height: 330 * scalePercentageh + "px",
		zIndex: 1
	})

	if (entertimemin != "") {
		var timecheck = parseInt(entertimemin);
		if (entertimemin.toString().length > 1) {
			exportRoot.ge_mc.entertimemin.text = timecheck.toString();
		} else {
			exportRoot.ge_mc.entertimemin.text = "0" + entertimemin.toString();
		}
		if (entertimesec != 0) {
			if (entertimesec.toString().length > 1) {
				exportRoot.ge_mc.entertimesec.text = entertimesec.toString();
			} else {
				if (entertimemin != "") {
					exportRoot.ge_mc.entertimesec.text = "0" + entertimesec.toString();
				}else{
					entertimesec=0;
					exportRoot.ge_mc.entertimesec.text = "00";
				}
			}
		} else {
			entertimesec=0;
			exportRoot.ge_mc.entertimesec.text = "00";
		}

	} else {
		timecheck = 0;
		entertimemin =0;
		exportRoot.ge_mc.entertimemin.text = "00";
		if (entertimesec != 0) {
			if (entertimesec.toString().length > 1) {
				exportRoot.ge_mc.entertimesec.text = entertimesec.toString();
			} else {
				exportRoot.ge_mc.entertimesec.text = "0" + entertimesec.toString();
			}
		} else {
			exportRoot.ge_mc.entertimesec.text = 00;
		}
	}
	entertime = (parseInt(entertimemin)*60)+parseInt(entertimesec);
	if (resultVariable != "") {
		m_VariableHandle[resultVariable] = exportRoot.ge_mc.enterscore.text;
	}
	initAll();
}