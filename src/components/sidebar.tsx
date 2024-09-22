// components/Sidebar.js
'use client'

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from "@/components/ui/button"
import { FileType2, Home, ImagePlus, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  // State to toggle between minimized and expanded
  const [isMinimized, setIsMinimized] = useState(false);

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      // Sidebar container with transition
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isMinimized ? 'w-20' : 'w-64'
      } flex flex-col justify-between`}
    >
      {/* Top part (Logo and Menu Items) */}
      <div className="p-4">
        {/* Logo or Branding */}
        <div className="text-center mb-6 transition-all duration-300">
          <h1 className={`text-xl font-bold ${isMinimized ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            Logo
          </h1>
        </div>

        {/* Menu items */}
        <ul className="space-y-4">
          <li className={`text-sm ${isMinimized ? 'text-center' : ''} transition-all duration-300`}>
            {isMinimized ? <Button variant="outline" asChild><Link href='/home'><Home className="mr-2 h-4 w-4"/></Link></Button>: (<Button variant="outline" className='sidebar-button' asChild><Link href='/home'><Home className="mr-2 h-4 w-4"/> Projects</Link></Button>)}
          </li>
          <li className={`text-sm ${isMinimized ? 'text-center' : ''} transition-all duration-300`}>
            {isMinimized ? <Button variant="outline" asChild><Link href='/imageto3d'><ImagePlus className="mr-2 h-4 w-4"/> </Link></Button>: (<Button variant="outline" className='sidebar-button' asChild><Link href='/imageto3d'><ImagePlus className="mr-2 h-4 w-4"/> Image To 3D </Link></Button>)}
          </li>
          <li className={`text-sm ${isMinimized ? 'text-center' : ''} transition-all duration-300`}>
            {isMinimized ?  <Button variant="outline" asChild><Link href='/imageto3d'><FileType2 className="mr-2 h-4 w-4"/></Link></Button>: (<Button variant="outline" className='sidebar-button' asChild><Link href='/imageto3d'><FileType2 className="mr-2 h-4 w-4"/> Text To 3D </Link></Button>)}
          </li>
        </ul>
      </div>

      {/* Bottom part (Toggle Button) */}
      <div className="p-4">
        <Button onClick={toggleSidebar} className="w-full flex justify-center items-center">
          {isMinimized ? <FiChevronRight /> : <FiChevronLeft />}
        </Button>
      </div>
    </div>
  );
}
