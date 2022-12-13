/////// This audio capture API uses both MediaDevices.getUserMedia() method and MediaRecorder() constructor

// Reference for MediaDevices.getUserMedia(): https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// Reference for MediaRecorder(): https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

// Variable for the Microphone Button Element
const micButton = document.getElementById("mic_button");

// Chunks Array for creating Audio File
let chunks = [];

// Boolean to tell if the API is currently recording
let isRecording = false;

// Constraints for the Audio Recording
const audioConstraints = {

	// Set the audio to true and video to false
	audio: true,
	video: false,
};

// Function for starting the Audio Recording
function startRecord() {

	// Use the getUserMedia function for getting the access of User's Microphone and Camera
	// Pass in the AudioConstraints value
	navigator.mediaDevices.getUserMedia(audioConstraints)


		// If it works, pass the stream value
		.then((stream) => {

			// Define a new MediaRecorder instance with the stream value
			const mediaRecorder = new MediaRecorder(stream);

			// Make the stream and the new media recorder global
			window.mediaStream = stream;
			window.mediaRecorder = mediaRecorder;

			// Start the mediaRecorder (starts the recording)
			mediaRecorder.start();

			// Set the Instruction to Click the Microphone to Stop Recording and set the text color to red
			document.getElementById("instruction").innerHTML = 'Click the Microphone to <b>Stop</b> Recording';
			document.getElementById("instruction").getElementsByTagName("b")[0].style.color = 'red';

			// Set the Record Status to Recording and set the text color to lightgreen
			document.getElementById("record_status").innerHTML = '<b>Status:</b><br>Recording';
			document.getElementById("record_status").style.color = 'lightgreen';

			// Add the class "isRecording" to the Mic Button Element
			micButton.classList.add("isRecording");

			// Set the isRecording Boolean to True
			isRecording = true;

			// Check for the data available in mediaRecorder
			// (When data is available, mediaRecorder releases a event with the recorded audio data)
			mediaRecorder.ondataavailable = (event) => {

				// Push the event data to the chunks array
				chunks.push(event.data);
			};

			// When the mediaRecorder stops, it releases a stop event
			mediaRecorder.onstop = () => {

				// Check for the value of the user's selected audio format (either mp4, webm, or ogg)
				var selectedAudioFormat = document.querySelector('input[name = audio_file_format]:checked').value;

				// Create a new blob for creating the audio file
				// Set the file type to the user's selected audio format
				const blob = new Blob(
					chunks, {
						type: `audio/${selectedAudioFormat}`
					});
				chunks = [];

				// Create a recordedAudio variable for storing the recorded audio
				// Use the createElement method to create a audio element
				const recordedAudio = document.createElement("audio");

				// Set the audio controls to true
				recordedAudio.controls = true;

				// Set the source of the recorded audio to the blob created
				// Take note that you cannot directly link it to the blob, so I have used the createObjectURL for the blob
				recordedAudio.src = URL.createObjectURL(blob);

				// Create a Audio Name element using createElement method
				const audioName = document.createElement("h3");

				// Set the Audio Name to the value of file name input
				audioName.innerHTML = document.getElementById("file_name").value;

				// Create a download link element using createElement method
				const downloadLink = document.createElement("a");

				// Check if the file name input text has an input
				if (document.getElementById("file_name").value.length > 0){
					
					// Set the file name of the downloadable to the value of file name input
					downloadLink.download = document.getElementById("file_name").value;
				}

				// The file name input text must be empty
				else {

					// Set the file name of the downloadable to "Untitled"
					downloadLink.download = "Untitled";
				}

				// Set the href of the download link to the URL created for the blob
				downloadLink.href = URL.createObjectURL(blob);

				// Set the text of the download link to "Download Audio"
				downloadLink.innerText = "Download Audio";

				// When users click the download link
				downloadLink.onclick = () => {

					// Revoke the object URL of the recorded audio
					URL.revokeObjectURL(recordedAudio);
				};

				// Add the Audio Name, Recorded Audio, and Download Link to the Recorded Audios DIV
				document.getElementById("recorded_audios").append(audioName, recordedAudio, downloadLink);
			};
		})
		
		// When the stream catches an error, an error event will emit
		.catch((err) => {
			
			// Set the record status to Permission Denied and change the text color to red
			document.getElementById("record_status").innerHTML = '<b>Status:</b><br>Permisssion Denied';
			document.getElementById("record_status").style.color = 'red';

			// Remove the class "isRecording" to the Mic Button Element
			micButton.classList.remove("isRecording");

			// Set the isRecording Boolean to False
			isRecording = false;
		});
}

// Function for stopping the Audio Recording (get the stop record and start records buttons)
function stopRecord() {

	// Stop the recording by stopping the Global Media Recorder
	window.mediaRecorder.stop();

	// Stop every track in the Global Media Stream by using getTracks function and stopping it individually by stop() function
	window.mediaStream.getTracks()
	.forEach((track) => {
		track.stop();
	});

	// Set the Instruction to Click the Microphone to Start Recording and set the text color to ligthgreen
	document.getElementById("instruction").innerHTML = 'Click the Microphone to <b>Start</b> Recording';
	document.getElementById("instruction").getElementsByTagName("b")[0].style.color = 'lightgreen';

	// Set the record status to Recording Saved and change the text color to lightblue
	document.getElementById("record_status").innerHTML = "<b>Status:</b><br>Recording Saved!";
    document.getElementById("record_status").style.color = 'lightblue';

	// Display the Recorded Audios DIV by making the display to flex
    document.getElementById("recorded_audios").style.display = 'flex';

	// Remove the class "isRecording" to the Mic Button Element
	micButton.classList.remove("isRecording");

	// Set the isRecording Boolean to False
	isRecording = false;
}

// Click Event Listener for the Microphone Button Element
micButton.addEventListener("click", (e) =>{

	// Check if the API is not currently recording
	if (!isRecording){

		// Call the Start Record Function
		startRecord();
	} 

	// The API must be recording
	else {

		// Call the Stop Record Function
		stopRecord();
	}
});