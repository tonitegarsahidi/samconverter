// app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-primary text-white text-center py-4">
        <h1 className="display-4">SamConverter</h1>
        <p className="lead">Your one-stop solution for various conversions</p>
      </header>

      {/* Main Content */}
      <div className="container mt-5">
        <h2 className="mb-4">Available Converters</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <Link href="/base64-encode-decode">
              Base64 Encode/Decode
            </Link>
          </li>
          {/* Add more links to other converters when you develop them */}
          <li className="list-group-item">
            <span className="text-muted">More converters coming soon...</span>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <footer className="bg-light text-center py-4 mt-5">
        <p className="mb-0">&copy; {new Date().getFullYear()} SamConverter. All rights reserved.</p>
      </footer>
    </div>
  );
}
