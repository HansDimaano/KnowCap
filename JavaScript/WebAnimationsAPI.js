/////// This web animations API uses the Element.animate() method from the API

// Reference for Element.animate(): https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API


// Get all the elements that has revealLeftOnce ID and store it in a variable
const revealLeftOnce = document.querySelectorAll("#revealLeftOnce");

// Check if the revealLeftOnce array has some values
if (revealLeftOnce.length > 0){

    // Use forEach method to animate all the values inside the array
    revealLeftOnce.forEach((reveal) => {

        // Animate the element using animate() method
        reveal.animate([
            {transform: 'translateX(-100px)', opacity: 0}, // from transform: 'translateX(-100px)', opacity: 0
            {transform: 'translateX(0)', opacity: 1} // to transform: 'translateX(0)', opacity: 1
        ],{
            duration: 1000, // set duration to 1 second (1000 milliseconds)
            easing: 'ease',  // set easing to ease
            iterations: 1, // set iterations to 1
        });
    });
}

// Get all the elements that has revealRightOnce ID and store it in a variable
const revealRightOnce = document.querySelectorAll("#revealRightOnce");

// Check if the revealRightOnce array has some values
if (revealRightOnce.length > 0){

    // Use forEach method to animate all the values inside the array
    revealRightOnce.forEach((reveal) => {

        // Animate the element using animate() method
        reveal.animate([
            {transform: 'translateX(100px)', opacity: 0}, // from transform: 'translateX(100px)', opacity: 0
            {transform: 'translateX(0)', opacity: 1} // to transform: 'translateX(0)', opacity: 1
        ],{
            duration: 1000, // set duration to 1 second (1000 milliseconds)
            easing: 'ease',  // set easing to ease
            iterations: 1, // set iterations to 1
        });
    });
}

// Get all the elements that has revealUpOnce ID and store it in a variable
const revealUpOnce = document.querySelectorAll("#revealUpOnce");

// Check if the revealUpOnce array has some values
if (revealUpOnce.length > 0){

    // Use forEach method to animate all the values inside the array
    revealUpOnce.forEach((reveal) => {

        // Animate the element using animate() method
        reveal.animate([
            {transform: 'translateY(100px)', opacity: 0}, // from transform: 'translateY(100px)', opacity: 0
            {transform: 'translateY(0)', opacity: 1} // to transform: 'translateY(0)', opacity: 1
        ],{
            duration: 1000, // set duration to 1 second (1000 milliseconds)
            easing: 'ease',  // set easing to ease
            iterations: 1, // set iterations to 1
        });
    });
}

// Get all the elements that has revealLCaptureIcon ID and store it in a variable
const revealCaptureIcon = document.querySelectorAll("#revealCaptureIcon");

// Check if the revealCaptureIcon array has some values
if (revealCaptureIcon.length > 0){

    // Use forEach method to animate all the values inside the array
    revealCaptureIcon.forEach((reveal) => {

        // Animate the element using animate() method
        reveal.animate([
            {transform: 'translateX(-20px)', opacity: 0}, // from transform: 'translateX(-20px)', opacity: 0
            {transform: 'translateX(0)', opacity: 1} // to transform: 'translateX(0)', opacity: 1
        ],{
            duration: 700, // set duration to 0.7 second (700 milliseconds)
            easing: 'ease',  // set easing to ease
            iterations: 1, // set iterations to 1
        });
    });
}

// Function for Revealing Content (partnered with Reveal Animation CSS)
function revealContent() { 

    // Get all Elements that has "reveal" Class Name
    var revealContents = document.getElementsByClassName("reveal"); 

    // For loop that iterates through all the Reveal Contents
    for (var i = 0; i < revealContents.length; i++) { 

        // Get Window Inner Height
        var height = window.innerHeight; 

        // Get the top value of content
        var contentTop = revealContents[i].getBoundingClientRect().top; 

        // Check if content top is less than window height
        if (contentTop < height) { 
            
            // Assign the "active" Class to the Revealed Contents
            revealContents[i].classList.add("active"); 
        }

        // The content must not be revealed 
        else { 

            // Remove the "active" Class to the Unrevealed Contents
            revealContents[i].classList.remove("active"); 
        }
    }
}

// Call the Reveal Content function when user scrolls
window.addEventListener('scroll', revealContent); 