'use client'

import { useState } from 'react';
// import { Button, XIcon, PlusIcon } from '@heroicons/react';

import { Button } from '@/components/ui/button';

export default function LectureButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  if (isClicked) {
    return (
      <Button className="w-full h-11 rounded-lg bg-red-600 relative overflow-hidden" onClick={handleClick}>
        <div className="absolute inset-0">
          {/* <img alt="Audio Waveform" className="w-full h-full object-cover" src="/placeholder.svg" /> */}
        </div>
        <span className="relative z-10 font-semibold text-lg">Recording</span>
        {/* <Button><XIcon/></Button> */}
      </Button>
    );
  } else {
    return (
      <Button className="font-semibold text-lg rounded-lg h-11 bg-green-400  text-white px-4 py-2 flex items-center space-x-2" onClick={handleClick}>
        <PlusIcon className="text-white" />
        <span>Add new lecture</span>
      </Button>
    );
  }
}

export {
    LectureButton
}

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
