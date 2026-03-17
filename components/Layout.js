export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden max-w-[100vw]">
      {children}
    </div>
  );
}
