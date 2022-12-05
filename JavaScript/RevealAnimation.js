////-- JAVASCRIPT FOR REVEALING CONTENT ANIMATIONS
// (Partnered by Reveal Animation CSS)

function revealContent() { // Function for Revealing Content

    var revealContents = document.getElementsByClassName("reveal"); // Get all Elements that has "reveal" Class Name

    for (var i = 0; i < revealContents.length; i++) { // For loop that iterates through all the Reveal Contents

        var height = window.innerHeight; // Get Window Inner Height
        var contentTop = revealContents[i].getBoundingClientRect().top; // Get the top value of content

        if (contentTop < height) { // If content top is less than window height
            
            revealContents[i].classList.add("active"); // Assign the "active" Class to the Revealed Contents
        }
        else { // The content must not be revealed yet

            revealContents[i].classList.remove("active"); // Remove the "active" Class to the Unrevealed Contents
        }
    }
}



window.addEventListener('scroll', revealContent); // Call the Reveal Content function when user scrolls