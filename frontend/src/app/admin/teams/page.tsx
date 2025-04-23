"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Định nghĩa các interface

export default function Admin() { 
    return(
        <div className=''>
            <NavBar/>
            <main className='h-screen w-screen flex '>
                <div className=''>

                </div>
            </main>
            <Footer/>
        </div>
        
    )
 };