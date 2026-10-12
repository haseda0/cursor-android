'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Github, ArrowRight, Code2, Zap, Users } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'AI-Powered Editor',
    description: 'Write code faster with intelligent suggestions and completions'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for smooth, responsive editing experience'
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together with teammates in real-time on shared projects'
  },
]

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Cursor</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {isLoaded && (
        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-300">AI-Powered Code Editor</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Code Smarter with AI
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience the future of coding with our AI-powered editor. Available on mobile, web, and desktop.
            </p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Start Coding Now
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.section>
      )}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-slate-800"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your coding?</h2>
        <p className="text-slate-400 mb-8">Join developers worldwide using Cursor for smarter, faster coding</p>
        <button
          onClick={() => router.push('/auth/signup')}
          className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
        >
          Sign Up Free
        </button>
      </motion.section>
    </div>
  )
}
