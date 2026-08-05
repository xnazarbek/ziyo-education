import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, UserRound, Mail, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AnimatedRegistrationForm() {
  const [phase, setPhase] = useState('intro');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('spin');
      setTimeout(() => {
        setPhase('form');
        setShowForm(true);
      }, 1100);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.surname || !formData.email) return;
    setIsSubmitted(true);
    setPhase('success');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(109,40,217,0.35),_transparent_40%),linear-gradient(135deg,#0f172a_0%,#111827_55%,#312e81_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center gap-8"
      >
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-fuchsia-300" />
            Premium Registration Experience
          </div>
          <h1 className="text-4xl font-semibold sm:text-5xl">Register Now</h1>
          <p className="mt-3 text-lg text-slate-300">Secure your spot in the next Bright English journey.</p>
        </div>

        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative flex min-h-[420px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
          >
            <motion.div
              animate={phase === 'spin' ? { rotate: 360, scale: 1.08 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="relative flex h-[300px] w-[240px] items-center justify-center"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/30 via-violet-500/15 to-cyan-400/20 blur-3xl" />
              <motion.div
                animate={phase === 'form' || phase === 'success' ? { y: [-8, 8, -8] } : { y: 0 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-[280px] w-[200px]"
              >
                {/* Glow effect */}
                <div className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 blur-2xl" />
                
                {/* Head */}
                <div className="absolute left-[50px] top-[15px] h-[80px] w-[80px] rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-orange-300 shadow-lg shadow-orange-400/40" />
                
                {/* Hair/Top */}
                <div className="absolute left-[52px] top-[8px] h-[35px] w-[76px] rounded-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-md" />
                
                {/* Eyes */}
                <div className="absolute left-[62px] top-[40px] h-[12px] w-[10px] rounded-full bg-slate-950" />
                <div className="absolute left-[108px] top-[40px] h-[12px] w-[10px] rounded-full bg-slate-950" />
                
                {/* Smile */}
                <motion.div
                  animate={phase === 'form' || phase === 'success' ? { scaleY: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[70px] top-[58px] h-[8px] w-[30px] rounded-full bg-slate-950"
                />
                
                {/* Neck */}
                <div className="absolute left-[75px] top-[92px] h-[15px] w-[40px] bg-gradient-to-b from-amber-200 to-amber-100" />
                
                {/* Body */}
                <div className="absolute left-[30px] top-[105px] h-[120px] w-[140px] rounded-[50px] bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-600 shadow-2xl shadow-fuchsia-500/40" />
                
                {/* Left Arm */}
                <motion.div
                  animate={phase === 'form' || phase === 'success' ? { rotate: [-5, 5, -5] } : {}}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-[15px] top-[115px] h-[85px] w-[28px] rounded-full bg-gradient-to-b from-amber-100 to-amber-200 origin-top"
                />
                
                {/* Right Arm */}
                <motion.div
                  animate={phase === 'form' || phase === 'success' ? { rotate: [5, -5, 5] } : {}}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-[15px] top-[115px] h-[85px] w-[28px] rounded-full bg-gradient-to-b from-amber-100 to-amber-200 origin-top"
                />
                
                {/* Left Leg */}
                <div className="absolute left-[42px] top-[220px] h-[55px] w-[28px] rounded-full bg-slate-900" />
                
                {/* Right Leg */}
                <div className="absolute right-[42px] top-[220px] h-[55px] w-[28px] rounded-full bg-slate-900" />
                
                {/* Feet */}
                <div className="absolute left-[38px] bottom-[2px] h-[18px] w-[36px] rounded-full bg-slate-800" />
                <div className="absolute right-[38px] bottom-[2px] h-[18px] w-[36px] rounded-full bg-slate-800" />
              </motion.div>
            </motion.div>

            <AnimatePresence mode="wait">
              {phase !== 'form' && phase !== 'success' && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="absolute bottom-6 rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-sm text-slate-200"
                >
                  {phase === 'intro' ? 'Your guide is walking in...' : 'Turning around and opening the registration flow...'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-violet-950/50 p-8 shadow-2xl shadow-fuchsia-500/30 backdrop-blur-xl"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 p-4">
                    <UserRound className="h-6 w-6 text-fuchsia-300" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Create your account</h2>
                    <p className="mt-1 text-sm text-slate-300">Start your English journey with us today.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.label
                      whileFocus={{ scale: 1.02 }}
                      className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-fuchsia-500/50 hover:bg-white/10"
                    >
                      <span className="mb-2 block text-sm font-medium text-slate-300">Name</span>
                      <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-slate-500"
                        placeholder="Your name"
                        required
                      />
                    </motion.label>
                    <motion.label
                      whileFocus={{ scale: 1.02 }}
                      className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-500/50 hover:bg-white/10"
                    >
                      <span className="mb-2 block text-sm font-medium text-slate-300">Surname</span>
                      <input
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-slate-500"
                        placeholder="Your surname"
                        required
                      />
                    </motion.label>
                  </div>

                  <motion.label
                    whileFocus={{ scale: 1.01 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-fuchsia-500/50 hover:bg-white/10"
                  >
                    <Mail className="h-5 w-5 flex-shrink-0 text-fuchsia-300" />
                    <input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-slate-500"
                      placeholder="Email address"
                      type="email"
                      required
                    />
                  </motion.label>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-6 py-4 font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition hover:shadow-fuchsia-500/60"
                  >
                    {isSubmitted ? (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        Registration Complete
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-3"
                >
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Your data is protected and encrypted</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
