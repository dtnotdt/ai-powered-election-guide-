import "./tailwind.css";

export default function TestLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans antialiased">
      {children}
    </div>
  );
}
