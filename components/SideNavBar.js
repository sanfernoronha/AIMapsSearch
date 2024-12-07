import Image from 'next/image'
import React, { useState, useEffect } from 'react'

function SideNavBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    // Initialize theme from system preference or localStorage
    useEffect(() => {
        if (localStorage.theme === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        
        // Add transform transition to the icons
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    const menu = [
        {
            id: 1,
            name: 'search',
            logo: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        },
        {
            id: 2,
            name: 'Fav',
            logo: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        }
    ]

    return (
        <div className="p-2 items-center flex flex-col w-[80px] space-y-4 
        shadow-md shadow-purple-400 h-screen sticky top-0 
        bg-white dark:bg-gray-800 z-20">
            <Image src='/dayzy.png'
                alt='logo'
                width={700}
                height={700} />

            {menu.map((item, index) => (
                <svg xmlns="http://www.w3.org/2000/svg"
                    key={index}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => setActiveIndex(index)}
                    className={`w-10 h-10 hover:text-purple-500
                    hover:bg-purple-100 dark:hover:bg-purple-900
                    p-2 cursor-pointer rounded-lg ${index == activeIndex ?
                            'text-purple-500 bg-purple-100 dark:bg-purple-900' : 'dark:text-white'}`}>
                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.logo} />
                </svg>
            ))}

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="w-10 h-10 p-2 rounded-lg 
                         hover:bg-purple-100 dark:hover:bg-purple-900
                         text-gray-600 dark:text-white 
                         hover:text-purple-500 cursor-pointer 
                         mt-auto mb-4 relative overflow-hidden"
                aria-label="Toggle theme"
            >
                <div className="relative transform transition-transform duration-300 ease-in-out">
                    {darkMode ? (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor"
                            className="w-6 h-6 transform rotate-0 transition-transform duration-300"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" 
                            />
                        </svg>
                    ) : (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor"
                            className="w-6 h-6 transform rotate-0 transition-transform duration-300"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" 
                            />
                        </svg>
                    )}
                </div>
            </button>
        </div>
    )
}

export default SideNavBar