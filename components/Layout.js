export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6">
      {children}
    </div>
  );
}
