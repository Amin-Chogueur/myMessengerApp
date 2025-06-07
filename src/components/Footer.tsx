export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-8 mt-5">
      {/* Branding */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">ChatApp</h2>
        <p className="text-sm">
          Connect with us securely. Messages are responded to within 24 hours.
        </p>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ChatApp. All rights reserved.
      </div>
    </footer>
  );
}
