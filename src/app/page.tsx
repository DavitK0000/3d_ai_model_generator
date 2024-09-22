
'use client'

import Image from "next/image";
import { useDispatch } from 'react-redux';
import { AppDispatch, setTripoApiKey, setTripoClientId, store } from './store/store';
import { useEffect } from 'react';

export default function Home() {

  return (
    <div>Welcome to the Landing Page!</div>
  );
}
