export default function AdminLayout({ children }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Back‑office</h1>
      {children}
    </div>
  );
}
