//to avoid getting closured down there
function makeLinkOnClick(href) {
	return function() {
		window.open(href);
	};
}
function init() {
	var linkWrappers = document.getElementsByClassName("linkWrappers");
	for(var i = 0; i < linkWrappers.length; i++) {
		var linkWrapper = linkWrappers[i];
		var mainLink = linkWrapper.getElementsByClassName("mainLinks")[0];
		var linkBox = document.createElement("button");
		linkBox.className = "linkBoxs";
		linkBox.setAttribute("role", "link");
		linkBox.onclick = makeLinkOnClick(mainLink.href);
		linkBox.innerHTML = mainLink.innerHTML;
		linkWrapper.replaceChild(linkBox, mainLink);
	}
}

window.onload = init;