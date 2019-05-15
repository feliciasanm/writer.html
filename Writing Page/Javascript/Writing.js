var nmLS = "text", // aka nameLocalStorage
interval = "none",
saveState = false, 
button, txtarea, countDisplay, counterArea;
var keymap = new Keymap({ctrl_alt_c: counterShortcutHandler});
function generateAdditionalUI() {
		var body = document.body;
		/*
			and rather not put UI that would be unusable
			before the page can ascertain whether Javascript is enabled
		*/
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "CSS/extendedWriting.css");
		document.getElementsByTagName("head")[0].appendChild(link);

		body.innerHTML = '' +
			'<button id="save" aria-label="Save on Browser"></button>' +
			'<button id="delete" aria-label="Delete Save and Stop Auto-Save"></button>' +
			'<button id="restart" aria-label="Restart Auto-Save"></button>' +
			'<button id="suspend" aria-label="Suspend Auto-Save"></button>' + 
			body.innerHTML + 
			'<div id="counterArea" class="displayNone" aria-live="polite" aria-hidden="true"><label for="wordCountDisplay">Words: </label><output for="textarea" id="wordCountDisplay"></output></div>';
}
/* 
	for some reason firefox refused to have it sized correctly
	if I opened dev tools while using the page. Sounds like a bug.
	So I had to put this code to ensure the buttons were all right.
*/
function resizeUI() {
	var innerHeight = window.innerHeight;
	var innerWidth = window.innerWidth;
	var ratio = innerHeight/innerWidth;
	var padding = (innerWidth - txtarea.offsetWidth);
	txtarea.style.height = (innerHeight - padding) + "px";
	var beSize = padding/2;
	var size = beSize + "px";
	for(var i = 0; button.length > i; i++) {
		var a = button[i].style;
		a.width = size;
		a.height = size;
	}
	var style = counterArea.style;
	style.left = size;
	style.bottom = beSize * (4/13) + "px";
}
function saveToLS() {
	localStorage.setItem(nmLS, txtarea.value);
}
function counterShortcutHandler() {
	var display = counterArea;
	var aria = "aria-hidden";
	if(Countable.enabled(txtarea)) {
		Countable.die(txtarea);
		countDisplay.value = '';
		display.classList.toggle("displayNone");
		display.setAttribute(aria, "true");
	} else {
		Countable.live(txtarea, function(counter) {
			countDisplay.value = counter.words.toString().replace(/\B(?=(\d{3})(?!\d))/g, ".");
		}, {stripTags: true});
		display.classList.toggle("displayNone");
		display.removeAttribute(aria);
		display.removeAttribute("class");
	}
}
function startInterval() { interval = setInterval(saveToLS, 120000); saveState = true; }
function stopInterval() { if(interval != "none") { clearInterval(interval); interval = "none"; saveState = false; } }

function init() {
	// want the UI up as quick as possible
	generateAdditionalUI();
	button = DOM1("button");
	txtarea = DOM1("textarea")[0];
	countDisplay = DOM("wordCountDisplay");
	counterArea = DOM("counterArea");
	resizeUI();
	window.onresize = resizeUI;
	function DOM(name) {
		return document.getElementById(name);
	}
	function DOM1(name) {
		return document.getElementsByTagName(name);
	}
	DOM("save").onclick = saveToLS;
	DOM("delete").onclick = function() { 
		stopInterval();
		localStorage.removeItem(nmLS);
	};
	DOM("restart").onclick = function() { 
		startInterval();
		saveToLS();
	};
	DOM("suspend").onclick = stopInterval;
	startInterval();
	window.onbeforeunload = function() { if(saveState) saveToLS(); };
	keymap.install(document);
	txtarea.value = localStorage.getItem(nmLS);
	txtarea.focus();
}
window.onload = init;