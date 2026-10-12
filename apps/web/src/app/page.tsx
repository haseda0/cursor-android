import React from 'react'
import { ArrowRight, Code2, Zap, MessageSquare, GitBranch, Share2, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: Code2, title: 'AI Code Assistant', desc: 'Smart completions & generations' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed' },
  { icon: MessageSquare, title: 'Real-time Chat', desc: 'AI-powered conversations' },
  { icon: GitBranch, title: 'Version Control', desc: 'Built-in Git integration' },
  { icon: Share2, title: 'Easy Sharing', desc: 'Collaborate seamlessly' },
  { icon: Lock, title: 'Secure', desc: 'Enterprise-grade encryption' },
]

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg" />
              Cursor
            </div>
            <div className="flex gap-4">
              <a href="#features" className="text-sm text-slate-300 hover:text-white">
                Features
              </a>
              <a href="#pricing" className="text-sm text-slate-300 hover:text-white">
                Pricing
              </a>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
                Get Started
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full mb-6 border border-slate-700/50">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              AI-Powered Code Editor
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Code Smarter with AI
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              The next-generation code editor powered by artificial intelligence. Works on mobile, web, and desktop.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition"
              >
                Launch App
              </motion.button>
              <button className="px-8 py-4 border border-slate-600 rounded-lg font-semibold hover:bg-slate-800/50 transition">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-slate-800/50">
        <Container>
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 transition"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Code Smarter?</h2>
            <p className="text-slate-300 mb-8">Join thousands of developers using Cursor</p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
              Start Free Trial <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-950/50">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Docs</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2024 Cursor AI. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
