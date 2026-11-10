import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileConsultBar } from './components/layout/MobileConsultBar'
import { About } from './components/sections/About'
import { Consult } from './components/sections/Consult'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Programs } from './components/sections/Programs'
import { Quiz } from './components/sections/quiz/Quiz'
import { Results } from './components/sections/Results'
import { Testimonials } from './components/sections/Testimonials'
import type { ProgramId } from './data/programs'
import type { ProgramInterest } from './lib/consultForm'
import { scrollToSection } from './lib/scroll'

export default function App() {
  const [programInterest, setProgramInterest] = useState<ProgramInterest>('')

  const chooseProgram = (id: ProgramId) => {
    setProgramInterest(id)
    scrollToSection('consult', '#consult-name')
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-lime px-5 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero onStartQuiz={() => scrollToSection('quiz', 'input[type="radio"]')} />
        <Quiz onChooseProgram={chooseProgram} />
        <Programs onChooseProgram={chooseProgram} />
        <HowItWorks />
        <Results />
        <About />
        <Testimonials />
        <Faq />
        <Consult program={programInterest} onProgramChange={setProgramInterest} />
      </main>
      <Footer />
      <MobileConsultBar />
      </LazyMotion>
    </MotionConfig>
  )
}
