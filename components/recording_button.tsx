'use client'
import { useState, useRef, useEffect } from 'react';
// import { Button, XIcon, PlusIcon } from '@heroicons/react';

import { Button } from '@/components/ui/button';
// import { AudioRecorder, AudioRecoderButton } from './audio-recorder';
import { AudioRecoder } from './audio-recorder';


// interface LectureButtonProps {
//     addLecture: () => void;
// }

const LectureButton = ({ addLecture }) => {
  return (
    <div>
      <Button variant = 'secondary' className = "mr-5" onClick={addLecture}>Add Lecture</Button>
      {/* <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button> */}
      {/* <button onClick={pauseRecording} disabled={!isRecording || !isPaused && recorder.current && recorder.current.state !== 'recording'}>{isPaused ? "Resume" : "Pause"}</button> */}

    </div>
  );
};


const LectureRecordingButton = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [isRecorded, setIsRecorded] = useState(false);
    const gumStream = useRef(null);
    const recorder = useRef(null);
    const chunks = useRef([]);
    const extension = useRef('');

    useEffect(() => {
        // Check and set the supported audio format
        extension.current = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'webm' : 'ogg';
    }, []);

    const startRecording = () => {
        console.log("Record button clicked");
        const constraints = { audio: true };

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        console.log("getUserMedia() success, stream created, initializing MediaRecorder");
        gumStream.current = stream;

        const options = {
            audioBitsPerSecond: 256000,
            mimeType: 'audio/' + extension.current + ';codecs=opus'
        };

        recorder.current = new MediaRecorder(stream, options);

        recorder.current.ondataavailable = e => {
            chunks.current.push(e.data);
            if (recorder.current.state === 'inactive') {
            const blob = new Blob(chunks.current, { type: 'audio/' + extension.current });
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
            chunks.current = [];
            }
        };

        recorder.current.onerror = function(e) {
            console.error(e.error);
        };

        recorder.current.start(1000);
        setIsRecording(true);
        }).catch(err => {
        console.error("Failed to start recording:", err);
        setIsRecording(false);
        });
    };

    const pauseRecording = () => {
        if (recorder.current.state === "recording") {
        recorder.current.pause();
        setIsPaused(true);
        } else if (recorder.current.state === "paused") {
        recorder.current.resume();
        setIsPaused(false);
        }
    };

    const stopRecording = () => {
        if (recorder.current) {
        recorder.current.stop();
        }
        if (gumStream.current) {
        gumStream.current.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
        setIsPaused(false);
        setIsRecorded(true);
    };
    // return (

    //     <div>
    //         <Button variant = 'secondary' className = "mr-5" onClick={startRecording} disabled={isRecording}>Start Recording</Button> 
    //         <Button variant = 'secondary' className = "mr-5" onClick={stopRecording} disabled={!isRecording}>Stop Recording</Button>
    //         <Button variant = 'secondary' className = "mr-5" onClick={pauseRecording} disabled={!isRecording || !isPaused && recorder.current && recorder.current.state !== 'recording'}>{isPaused ? "Resume" : "Pause"}</Button>
    //         <audio src={audioURL} controls="controls" />
    //         {audioURL && <p>Download the recording <a href={audioURL} download={`recording.${extension.current}`}>here</a>.</p>}
    //         {/* {<audio src={audioURL} controls="controls" />}
    //         {audioURL && <p>Download the recording <a href={audioURL} download={`recording.${extension.current}`}>here</a>.</p>} */}
    //     </div>
    // )
    return (
        <div>
            {!isRecorded ? (
                <>
                    <Button variant='secondary' className="mr-5" onClick={startRecording} disabled={isRecording}>Start Recording</Button>
                    <Button variant='secondary' className="mr-5" onClick={stopRecording} disabled={!isRecording}>Stop Recording</Button>
                    <Button variant='secondary' className="mr-5" onClick={pauseRecording} disabled={!isRecording || (isPaused && recorder.current && recorder.current.state !== 'recording')}>{isPaused ? "Resume" : "Pause"}</Button>
                </>
            ) : (
                <>
                    <audio src={audioURL} controls="controls" />
                    {/* {audioURL && <p>Download the recording <a href={audioURL} download={`recording.${extension.current}`}>here</a>.</p>} */}
                </>
            )}
        </div>
    );
}

// export {
//     AudioRecorderButtons
// }

export {
    LectureButton, LectureRecordingButton
}

// export function LectureButton() {
//     const isClicked = false;

//     const handleClick = () => {
//         console.log('Button clicked');
//     };

//     return (
//         <Button className="font-semibold text-lg rounded-lg h-11 bg-green-400 text-white px-4 py-2 flex items-center space-x-2" onClick={handleClick}>
//             <PlusIcon className="text-white" />
//             <span>Add new lecture</span>
//         </Button>
//     );
// }



// export default function LectureButton() {
//   const [isClicked, setIsClicked] = useState(false);
//   const [recordedUrl, setRecordedUrl] = useState('');
//   const mediaStream = useRef(null);
//   const mediaRecorder = useRef(null);
//   const chunks = useRef([]);

//   const handleClick = () => {
//     setIsClicked(!isClicked);
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaStream.current = stream;
//       mediaRecorder.current = new MediaRecorder(stream);
//       mediaRecorder.current.ondataavailable = e => {
//         if (e.data.size > 0) {
//           chunks.current.push(e.data);
//         }
//       };
//       mediaRecorder.current.onstop = () => {
//         const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' });
//         const url = URL.createObjectURL(recordedBlob);
//         setRecordedUrl(url);
//         chunks.current = [];
//       };
//       mediaRecorder.current.start();
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
//       mediaRecorder.current.stop();
//     }
//     if (mediaStream.current) {
//       mediaStream.current.getTracks().forEach(track => track.stop());
//     }
//   };

//   useEffect(() => {
//     if (isClicked) {
//       startRecording();
//     } else {
//       stopRecording();
//     }

//     return () => {
//       if (mediaStream.current) {
//         mediaStream.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isClicked]);

//   if (isClicked) {
//     return (
//       <Button className="w-full h-11 rounded-lg bg-red-600 relative overflow-hidden" onClick={handleClick}>
//         {/* Conditional UI components for recording state */}
//         <span className="relative z-10 font-semibold text-lg">Recording...</span>
//       </Button>
//     );
//   } else {
//     return (
//       <Button className="font-semibold text-lg rounded-lg h-11 bg-green-400 text-white px-4 py-2 flex items-center space-x-2" onClick={handleClick}>
//         <PlusIcon className="text-white" />
//         <span>Add new lecture</span>
//       </Button>
//     );
//   }
// }

// function download() {
//     const blob = new Blob(recordedChunks, {
//       type: "video/webm",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     document.body.appendChild(a);
//     a.style = "display: none";
//     a.href = url;
//     a.download = "test.webm";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }


// const LectureButton = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const mediaStream = useRef(null);
//     const mediaRecorder = useRef(null);
//     const chunks = useRef([]);

//     // Start recording audio
//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaStream.current = stream;
//             mediaRecorder.current = new MediaRecorder(stream);
//             chunks.current = []; // Clear previous recorded chunks

//             mediaRecorder.current.ondataavailable = (e) => {
//                 if (e.data.size > 0) {
//                     chunks.current.push(e.data);
//                 }
//             };

//             mediaRecorder.current.onstop = async () => {
//                 const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 // Here you might handle the recorded audio URL (e.g., saving it or playing it)
//                 console.log('Recording stopped, URL:', audioUrl);
//             };

//             mediaRecorder.current.start();
//             setIsRecording(true);
//         } catch (error) {
//             console.error('Error accessing microphone:', error);
//         }
//     };

//     // Stop recording audio
//     const stopRecording = () => {
//         if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
//             mediaRecorder.current.stop();
//             if (mediaStream.current) {
//                 mediaStream.current.getTracks().forEach(track => track.stop());
//             }
//             setIsRecording(false);
//         }
//     };

//     return (
//         <div>
//             {isRecording ? (
//                 <Button className="w-full h-11 rounded-lg bg-red-600 relative overflow-hidden" onClick={stopRecording}>
//                     <div className="absolute inset-0">
//                         {/* Optional background, e.g., waveform */}
//                     </div>
//                     <span className="relative z-10 font-semibold text-lg">Recording</span>
//                     <XIcon className="text-white" />
//                 </Button>
//             ) : (
//                 <Button className="font-semibold text-lg rounded-lg h-11 bg-green-400 text-white px-4 py-2 flex items-center space-x-2" onClick={startRecording}>
//                     <PlusIcon className="text-white" />
//                     <span>Add new lecture</span>
//                 </Button>
//             )}
//         </div>
//     );
// };

// export {
//     LectureRecordingButton
// }


// export {
//     LectureButton
// }

function PlusIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }

function XIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 6l12 12" /> {/* Diagonal line from top-left to bottom-right */}
        <path d="M18 6l-12 12" /> {/* Diagonal line from top-right to bottom-left */}
      </svg>
    )
}
