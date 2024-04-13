'use client'
import Image from 'next/image';
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { LectureButton } from "@/components/recording_button"
import { GearIcon, BarChartIcon } from "@radix-ui/react-icons"
import { TalkButton } from "@/components/talkbutton"
// import { GearIcon } from "@radix-ui/react-icons"
import { AudioRecorder } from "@/components/audio-recorder"
import { LectureRecordingButton } from "@/components/recording_button"

// import { TestComp } from "@/components/flask_test"

import { useState } from "react"
import DevelopmentTable from "../studentFeedback/DevelopmentTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../studentFeedback/variables/columnsData";
import tableDataDevelopment from "../studentFeedback/variables/tableDataDevelopment.json";
import { Box, SimpleGrid } from "@chakra-ui/react"
import img1 from '../screen.png'
import img2 from '../screen3.png'
export default function Dashboard() {
  const [showPerformance, setShowPerformance] = useState(false);
  const [lectures, setLectures] = useState([
    {
      date: "April 2nd",
      title: "Vectors, Norms, Cross-Product"
    },
    {
      date: "March 3rd",
      title: "Matrix Calculations, Vector Spaces"
    },
    {
      date: "April 2nd",
      title: "Vectors, Norms, Cross-Product"
    }
  ]);
  const [imageSrc, setImageSrc] = useState(img1); // Remplacez par votre source d'image initiale

  const toggleImage = () => {
    if (imageSrc === img1) {
      setImageSrc(img2); // Remplacez par la source de votre seconde image
    } else {
      setImageSrc(img1); // Remet l'image initiale
    }
  };

  // Function to add a new lecture
  const addLecture = () => {
    const newLecture = {
      date: getCurrentDate(),
      title: getKeyPoints()
    };
    setLectures([newLecture, ...lectures]); // Add the new lecture to the list of lectures
  };

  const getKeyPoints = () => {
    // Placeholder for functionality to get key points
    return "Record a new lecture to get Key Points";
  }

  const getCurrentDate = () => {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${monthNames[date.getMonth()]} ${day}${getOrdinalSuffix(day)}`;
  };
  return (
    <div className="min-h-screen bg-white py-5">
      <div className="container mx-auto px-4">
        <div className="flex gap-10 mt-8">
          <aside className="w-64">
            <div className="p-7 bg-white p-4 rounded-lg">
              <h2 className="font-semibold text-gray-800 text-xl mb-7">Courses</h2>
              <nav className="flex flex-col gap-4">
                <Button className="justify-start text-green-600 font-medium text-lg p-4" variant="secondary">
                  Maths 2023
                </Button>
                <Button className="justify-start font-medium text-lg p-4" variant="ghost">
                  Physics 2023
                </Button>
              </nav>
            </div>
          </aside>
          <main className="flex-1">
            <header className="p-4 flex justify-between items-center py-4">
              <h1 className="text-3xl font-bold text-gray-800">Course Overview</h1>
              <div className="flex space-x-4">
                <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><InfoIcon className="text-gray-700 w-5 mr-2" />Course Information</Button>
                <Button onClick={() => setShowPerformance(true)} className="flex items-center space-x-2" variant="secondary"><BarChartIcon className="text-gray-700 w-5 mr-2" />Student Performance</Button>
                <Link href="/">
                <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><MessageCircleIcon className="text-gray-700 w-5 mr-2" />Chat</Button>
                </Link>
                <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><GearIcon className="text-gray-700 w-5 mr-2" />Settings</Button>
              </div>
            </header>
            <div className="bg-white p-4 rounded-lg">
              {showPerformance ? (
                <div onClick={toggleImage} style={{ cursor: 'pointer' }}>
                  <Image
                    src={imageSrc} // Assuming this refers to a React component 'Image' from a library like 'next/image'
                    alt="description of image"
                    width={300}  // Desired width of the image
                    height={300} // Desired height of the image
                    layout="responsive" // This makes the image responsive
                  />
                </div>
              ) : (
                <div className="mt-6">
                  <LectureButton addLecture={addLecture} />
                  {lectures.map((lecture, index) => (
                    <div key={index} className="flex items-center justify-between p-6 rounded-lg bg-gray-50 mb-7">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{lecture.date}</h3>
                        <p className="text-gray-600">{lecture.title}</p>
                      </div>
                      <span className="text-gray-400"></span>
                      <LectureRecordingButton/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

//   return (
//     <div className="min-h-screen bg-white py-5">
//       <div className="container mx-auto px-4 ">
//         <div className="flex gap-10 mt-8">
//           <aside className="w-64">
//             <div className="p-7 bg-white p-4 rounded-lg">
//               <h2 className="font-semibold text-gray-800 text-xl mb-7">Courses</h2>
//               <nav className="flex flex-col gap-4">
//                 <Button className="justify-start text-green-600 font-medium text-lg p-4" variant="secondary">
//                   Maths 2023
//                 </Button>
//                 <Button className="justify-start font-medium text-lg p-4" variant="ghost">
//                   Physics 2023
//                 </Button>
//               </nav>
//             </div>
//           </aside>
//           <main className="flex-1">
//             <header className="p-4 flex justify-between items-center py-4">
//               <h1 className="text-3xl font-bold text-gray-800">Course Overview</h1>
//               <div className="flex space-x-4">
//                 <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><InfoIcon className="text-gray-700 w-5 mr-2" />Course Information</Button>
//                 <Button onClick={() => setShowPerformance(true)} className="flex items-center space-x-2" variant="secondary"><BarChartIcon className="text-gray-700 w-5 mr-2" />Student Performance</Button>
//                 <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><MessageCircleIcon className="text-white-700 w-5 mr-2" />Chat</Button>
//                 <Button onClick={() => setShowPerformance(false)} className="flex items-center space-x-2" variant="secondary"><GearIcon className="text-white-700 w-5 mr-2" />Settings</Button>
//               </div>
//             </header>
//             <div className="bg-white p-4 rounded-lg">
//               {showPerformance ? (
//                 <div onClick={toggleImage} style={{ cursor: 'pointer' }}>
//                   <Image
//                     src={imageSrc} // Chemin relatif ou URL absolue
//                     alt=" de l'image"
//                     width={300}  // Largeur désirée de l'image
//                     height={300} // Hauteur désirée de l'image
//                     layout="responsive" // Cela rend l'image responsive
//                   />
//             <div className="bg-white p-4 rounded-lg ">
//               {/* <Button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
//                 <PlusIcon className="text-white" />
//                 <span>Add new lecture</span>
//               </Button> */}
//               {/* <AudioRecoderButton></AudioRecoderButton> */}
//               {/* <LectureButton></LectureButton> */}
//               <LectureButton addLecture={addLecture}></LectureButton>
//               {/* <TalkButton></TalkButton> */}
//               <div className="mt-8">
//                 {lectures.map((lecture, index) => (
//                   <div key={index} className="flex items-center justify-between p-6 rounded-lg bg-gray-50 mb-7">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">{lecture.date}</h3>
//                       <p className="text-gray-600">{lecture.title}</p>
//                     </div>
//                     <span className="text-gray-400"></span>
//                     <LectureRecordingButton></LectureRecordingButton>
//                   </div>
//                   // <ChevronRightIcon className="text-gray-400" />
//                 ))}
//               </div>
//               <div className="mt-6">
//                 <div className="flex items-center justify-between p-6 rounded-lg bg-gray-50 mb-7">
//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">April 2nd</h3>
//                     <p className="text-gray-600">Vectors, Norms, Cross-Product</p>
//                   </div>
//                   <ChevronRightIcon className="text-gray-400" />
//                 </div>
//               ) : (
//                 <div className="mt-6">
//                   <LectureButton addLecture={addLecture}></LectureButton>
//                   {lectures.map((lecture, index) => (
//                     <div key={index} className="flex items-center justify-between p-6 rounded-lg bg-gray-50 mb-7">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-3">{lecture.date}</h3>
//                         <p className="text-gray-600">{lecture.title}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   )
// }

function InfoIcon(props) {
  return (
    <svg
      {...props}
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  )
}