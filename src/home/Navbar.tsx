import { useState } from "react";
import { Menu, X } from "lucide-react"; // icon library

const links = [
  { name: "Home", href: "#" },
  { name: "Books", href: "#books" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">📚 BookTrackr</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
