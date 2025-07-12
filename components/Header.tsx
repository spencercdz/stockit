'use client';

import Image from 'next/image';
import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onBackgroundToggle: (isAnimated: boolean) => void;
    initialBackgroundState?: boolean;
}

export default function Header({ onBackgroundToggle, initialBackgroundState = true }: HeaderProps) {
    const [isAnimated, setIsAnimated] = useState(initialBackgroundState);
    const router = useRouter();

    // Load background preference from localStorage on component mount
    useEffect(() => {
        const savedBackground = localStorage.getItem('stockit-background-preference');
        if (savedBackground !== null) {
            const isAnimated = savedBackground === 'animated';
            setIsAnimated(isAnimated);
            onBackgroundToggle(isAnimated);
        }
    }, [onBackgroundToggle]);

    const handleToggle = () => {
        const newState = !isAnimated;
        setIsAnimated(newState);
        
        // Save preference to localStorage
        localStorage.setItem('stockit-background-preference', newState ? 'animated' : 'static');
        onBackgroundToggle(newState);
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div className="flex items-center container-default justify-between p-4">
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleLogoClick}
                    className="relative cursor-pointer transition-all duration-300 hover:scale-105 group"
                >
                    <Image
                        src="/favicon.ico"
                        alt="StockIt Logo"
                        width={64}
                        height={64}
                        className="rounded-xl shadow-lg transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
                <div className="flex flex-col">
                    <span className="font-bold text-3xl text-white drop-shadow-2xl tracking-wide">
                        StockIt
                    </span>
                    <span className="text-white/80 text-xs font-medium drop-shadow-lg italic">
                        Analyze Stock Trends with Real-Time Data.
                    </span>
                </div>
            </div>
            
            <div className="relative">
                <button
                    onClick={handleToggle}
                    className="relative p-3 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 hover:from-white/25 hover:to-white/10 transition-all duration-500 group shadow-xl hover:shadow-2xl"
                >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl blur-md transition-all duration-500 ${
                        isAnimated 
                            ? 'bg-yellow-400/30 animate-pulse' 
                            : 'bg-gray-400/20'
                    }`} />
                    
                    {/* Icon container */}
                    <div className="relative z-10">
                        {isAnimated ? (
                            <Lightbulb 
                                className="w-7 h-7 text-yellow-300 drop-shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:text-yellow-200" 
                            />
                        ) : (
                            <LightbulbOff 
                                className="w-7 h-7 text-gray-300 drop-shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:text-gray-200" 
                            />
                        )}
                    </div>
                    
                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-200" />
                </button>
            </div>
        </div>
    )
}