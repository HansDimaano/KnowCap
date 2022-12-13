/////// This fullscreen API uses Element.requestFullscreen() method (with some additional prefixes for browser support)

// Reference for Element.requestFullscreen(): https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_APIia


// Function for Toggling any Element to Fullscreen
function toggleFullscreen(element) {

	// Check if FullScreen is supported
	if (element.requestFullscreen) { /* For any browser except Safari and Internet Explorer */

	  element.requestFullscreen(); // Request Fullscreen for the chosen element
	} 
	
	// Check if WebKit FullScreen is supported
	else if (element.webkitRequestFullscreen) { /* For Safari */

	  element.webkitRequestFullscreen(); // Request webkit Fullscreen for the chosen element
	} 
	
	// Check if MS FullScreen is supported
	else if (element.msRequestFullscreen) { /* for Internet Explorer 11 */

	  element.msRequestFullscreen(); // Request MS Fullscreen for the chosen element
	}
}