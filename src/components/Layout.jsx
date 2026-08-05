import { GraduationCap } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-white/10 px-6 py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold">ZIYO Education</p>
            <p className="text-xs text-slate-400">English Learning Academy</p>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
