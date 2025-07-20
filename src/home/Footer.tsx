export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-8 mt-12 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-6 text-center space-y-3">
        <h2 className="text-xl font-semibold tracking-wide">Stay Connected with Us</h2>
        <p className="text-sm max-w-md mx-auto">
          &copy; {new Date().getFullYear()} BOOKTRACKR. All rights reserved.
        </p>
        <p className="text-sm italic">
          Crafted with passion by{" "}
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            Ananna Datta
          </a>
        </p>
        
      </div>
    </footer>
  );
}
