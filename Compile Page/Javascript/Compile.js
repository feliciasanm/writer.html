var inputA, resultA, savePasteB, countDisplay,
	regexa = /</gm,
	regexb = />/gm,
	regex1 = /((\\\\)*)\\n(?!&lt;\/pre&gt;)/gim,
	regex2 = /(\\n)&lt;\/pre&gt;/gim,
	regex3 = /^"/m,
	regex4 = /"$/m,
	regex5 = /&lt;(\/?(b|i|u|s))&gt;(?!&lt;\/pre&gt;)/gim,
	regex6 = /(&lt;(\/?(b|i|u|s))&gt;)&lt;\/pre&gt;/gim,
	regex7 = /&lt;pre&gt;(&lt;\/pre&gt;)&lt;\/pre&gt;/gim,
	regex8 = /\\\\/gim,
	regex9 = /<(\/)?s>/gim,
	savedText = "";
function compileOnClick() {
	var compiled = JSON.stringify(inputA.value); //stringified
	compiled = compiled.replace(regexa, "&lt;").replace(regexb, "&gt;"); //stripped
	compiled = compiled.replace(regex1, "$1<br />"); //breaked
	compiled = compiled.replace(regex8, "\\").replace(regex2, "$1").replace(regex5, "<$1>").replace(regex6, "$1").replace(regex7, "$1").replace(regex9, "<$1del>"); //restored
	compiled = compiled.replace(regex3, "").replace(regex4, ""); //cleaned
	resultA.innerHTML = compiled;
}
function clearOnClick() {
	resultA.innerHTML = "";
	inputA.value = "";
	countDisplay.value = 0;
}
function saveOnClick() {
	savedText = inputA.value;
	savePasteB.innerHTML = "Paste";
	savePasteB.onclick = pasteOnClick;
	inputA.focus();
}
function pasteOnClick() {
	inputA.value = savedText;
	savePasteB.innerHTML = "Save Current Text";
	savePasteB.onclick = saveOnClick;
	inputA.focus();
}
function init() {
	function DOM(ID) {
		return document.getElementById(ID);
	}
	inputA = DOM("inputA");
	resultA = DOM("resultA");
	savePasteB = DOM("savePasteB");
	countDisplay = DOM("wordCountDisplay");
	DOM("clearB").onclick = clearOnClick;
	DOM("compileB").onclick = compileOnClick;
	savePasteB.onclick = saveOnClick;
	Countable.live(inputA, function(counter) { countDisplay.value = counter.words.toString().replace(/\B(?=(\d{3})(?!\d))/g, "."); }, {stripTags: true});
}

window.onload = init;