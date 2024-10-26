"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Menu, X } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

interface NavItem {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const height = menuRef.current.scrollHeight;
      setHeight(height);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={`p-2.5 ${montserrat.className} bg-celadon text-champagne`}>
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl lg:text-4xl italic font-black">
          SHESHA.APP
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-white hover:text-gray-300 transition duration-300 ${
                isActive(item.href) ? "font-bold border-b-1 border-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X />  : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        style={{ maxHeight: `${height}px` }}
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-1 pl-1 text-base font-medium hover:bg-gray-700 transition duration-300 ${
                isActive(item.href) ? "bg-celadon text-white font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
