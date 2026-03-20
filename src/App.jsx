import React from 'react'
import NeonEntrance from './components/NeonEntrance'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import WhyJoin from './components/WhyJoin'
import CTASection from './components/CTASection'
import ApplicationForm from './components/ApplicationForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <NeonEntrance />
      <ParticleBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <WhyJoin />
        <CTASection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
