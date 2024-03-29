/////// This video capture API uses both MediaDevices.getUserMedia() method and MediaRecorder() constructor

// Reference for MediaDevices.getUserMedia(): https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// Reference for MediaRecorder(): https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder


// Preview Video Variable
const previewVideo = document.getElementById("preview_video");

// Chunks Array for creating Video File
let chunks = [];


// Constraints for the Video Recording
const videoConstraints = {

	// Set the audio and video to true
	audio: true,
	video: true,
};

// Function for starting the Video Recording (get the start record, stop record, and fullscreen buttons)
function startRecord(startRecBtn, stopRecBtn, fullScreenBtn) {

	// Use the getUserMedia function for getting the access of User's Microphone and Camera
	// Pass in the VideoConstraints value
	navigator.mediaDevices.getUserMedia(videoConstraints)


		// If it works, pass the stream value
		.then((stream) => {

			// Define a new MediaRecorder instance with the stream value
			const mediaRecorder = new MediaRecorder(stream);

			// Make the stream and the new media recorder global
			window.mediaStream = stream;
			window.mediaRecorder = mediaRecorder;

			// Initialize the source of the preview video to the current stream
			previewVideo.srcObject = stream;

			// Start the mediaRecorder (starts the recording)
			mediaRecorder.start();

			// Set the Record Status to Recording and set the text color to lightgreen
			document.getElementById("record_status").innerHTML = '<b>Status:</b><br>Recording';
			document.getElementById("record_status").style.color = 'lightgreen';

			// Disable the Start Record Button and enable the Stop Record and Fullscreen Button
			startRecBtn.disabled = true;
			stopRecBtn.disabled = false;
			fullScreenBtn.disabled = false;

			// Check for the data available in mediaRecorder
			// (When data is available, mediaRecorder releases a event with the recorded video data)
			mediaRecorder.ondataavailable = (event) => {

				// Push the event data to the chunks array
				chunks.push(event.data);
			};

			// When the mediaRecorder stops, it releases a stop event
			mediaRecorder.onstop = () => {

				// Check for the value of the user's selected video format (either mp4, webm, or ogg)
				var selectedVideoFormat = document.querySelector('input[name = video_file_format]:checked').value;

				// Create a new blob for creating the video file
				// Set the file type to the user's selected video format
				const blob = new Blob(
					chunks, {
						type: `video/${selectedVideoFormat}`
					});
				chunks = [];

				// Create a recordedVideo variable for storing the recorded video
				// Use the createElement method to create a video element
				const recordedVideo = document.createElement("video");

				// Set the video controls to true
				recordedVideo.controls = true;

				// Set the source of the recorded video to the blob created
				// Take note that you cannot directly link it to the blob, so I have used the createObjectURL for the blob
				recordedVideo.src = URL.createObjectURL(blob);

				// Create a Video Name element using createElement method
				const videoName = document.createElement("h3");

				// Create a download link element using createElement method
				const downloadLink = document.createElement("a");

				// Check if the file name input text has an input
				if (document.getElementById("file_name").value.length > 0){

					// Set the Video Name to the value of file name input
					videoName.innerHTML = document.getElementById("file_name").value;
					
					// Set the file name of the downloadable to the value of file name input
					downloadLink.download = document.getElementById("file_name").value;
				}

				// The file name input text must be empty
				else {

					// Set the Video Name to "Untitled"
					videoName.innerHTML = "Untitled";

					// Set the file name of the downloadable to "Untitled"
					downloadLink.download = "Untitled";
				}

				// Set the href of the download link to the URL created for the blob
				downloadLink.href = URL.createObjectURL(blob);

				// Set the text of the download link to "Download Video"
				downloadLink.innerText = "Download Video";

				// When users click the download link
				downloadLink.onclick = () => {

					// Revoke the object URL of the recorded video
					URL.revokeObjectURL(recordedVideo);
				};

				// Add the Video Name, Recorded Video, and Download Link to the Recorded Videos DIV
				document.getElementById("recorded_videos").append(videoName, recordedVideo, downloadLink);
			};
		})
		
		// When the stream catches an error, an error event will emit
		.catch((err) => {
			
			// Set the record status to Permission Denied and change the text color to red
			document.getElementById("record_status").innerHTML = '<b>Status:</b><br>Permisssion Denied';
			document.getElementById("record_status").style.color = 'red';
		});
}

// Function for stopping the Video Recording (get the stop record, start record, and fullscreen buttons)
function stopRecord(stopRecBtn, startRecBtn, fullScreenBtn) {

	// Stop the recording by stopping the Global Media Recorder
	window.mediaRecorder.stop();

	// Stop every track in the Global Media Stream by using getTracks function and stopping it individually by stop() function
	window.mediaStream.getTracks()
	.forEach((track) => {
		track.stop();
	});

	// Set the record status to Recording Saved and change the text color to lightblue
	document.getElementById("record_status").innerHTML = "<b>Status:</b><br>Recording Saved!";
    document.getElementById("record_status").style.color = 'lightblue';

	// Set the preview video to null (to display the background of the video)
    previewVideo.srcObject = null;

	// Disable the Stop Record and Fullscreen Button and enable the Start Record Button
	stopRecBtn.disabled = true;
	fullScreenBtn.disabled = true;
	startRecBtn.disabled = false;

	// Display the Recorded Videos DIV by making the display to flex
    document.getElementById("recorded_videos").style.display = 'flex';
}