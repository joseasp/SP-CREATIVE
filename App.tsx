import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight,
  Instagram, Globe, Palette, Shirt,
  Layout, MessageCircle
} from 'lucide-react';
import GlassCard from './components/GlassCard';
import NeonButton from './components/NeonButton';
import Logo from './components/Logo';

// Utility component for Scroll Animations
const RevealOnScroll = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Initial Animation Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-[#050A30] z-[100] flex flex-col items-center justify-center transition-opacity duration-500">
        <div className="relative animate-logo-intro">
           {/* New Logo in Intro - Neon Variant */}
           <div className="w-32 h-32 flex items-center justify-center">
             <Logo variant="neon" animated className="w-full h-full drop-shadow-[0_0_20px_rgba(79,255,176,0.5)]" />
           </div>
        </div>
        <p className="mt-8 text-white/50 text-sm tracking-[0.3em] font-heading uppercase animate-pulse">Design Digital</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#050A30] font-body selection:bg-[#4FFFB0] selection:text-[#050A30] relative overflow-hidden">
      
      {/* BACKGROUND BUBBLES / INDIRECT LIGHTS - Dynamic & Floating */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right - Green/Cyan Glow */}
        <div className="blob blob-neon w-[600px] h-[600px] top-[-15%] right-[-15%]"></div>
        
        {/* Bottom Left - Purple Glow */}
        <div className="blob blob-purple w-[700px] h-[700px] bottom-[-20%] left-[-10%]"></div>
        
        {/* Center - Blue Glow Moving */}
        <div className="blob blob-blue w-[500px] h-[500px] top-[30%] left-[30%] opacity-50"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo in Navbar - Dark variant for contrast against light glass */}
            <div className="w-10 h-10">
              <Logo variant="dark" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#050A30] font-heading">SP DIGITAL</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-[#050A30]">
            <a href="#services" className="hover:text-[#2563eb] transition-colors">O QUE FAZEMOS</a>
            <a href="#portfolio" className="hover:text-[#2563eb] transition-colors">PORTFÓLIO</a>
            <NeonButton size="medium" variant="primary" onClick={() => window.location.href='#contact'}>
              Pedir Orçamento
            </NeonButton>
          </div>

          <button className="md:hidden text-[#050A30]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-enter">
            <a href="#services" className="text-lg font-bold text-[#050A30]" onClick={() => setIsMenuOpen(false)}>O QUE FAZEMOS</a>
            <a href="#portfolio" className="text-lg font-bold text-[#050A30]" onClick={() => setIsMenuOpen(false)}>PORTFÓLIO</a>
            <NeonButton className="w-full justify-center" onClick={() => setIsMenuOpen(false)}>Pedir Orçamento</NeonButton>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center overflow-hidden z-10">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-enter relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/30 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4FFFB0] shadow-[0_0_10px_#4FFFB0] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#050A30]">Para brasileiros nos EUA</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[#050A30]">
              Soluções Visuais <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#050A30] to-[#2563eb]">Para Seu Negócio.</span>
                <span className="absolute bottom-3 left-0 w-full h-4 bg-[#4FFFB0]/30 -rotate-1 z-0 rounded-full blur-[2px]"></span>
              </span>
            </h1>
            
            <p className="text-lg text-[#050A30]/70 max-w-lg font-medium leading-relaxed">
              Sites, logotipos e materiais gráficos feitos sob medida. 
              Entendemos sua necessidade e entregamos com agilidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <NeonButton size="large" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                Ver Exemplos
              </NeonButton>
              <NeonButton size="large" variant="outline" icon={<MessageCircle className="w-5 h-5" />}>
                WhatsApp
              </NeonButton>
            </div>
          </div>

          <div className="relative perspective-1000 animate-enter" style={{animationDelay: '0.2s'}}>
             {/* 3D Bubble/Card Effect */}
             <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Floating Elements */}
                <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-gradient-to-br from-[#4FFFB0] to-transparent rounded-full opacity-60 blur-xl animate-float-delayed"></div>
                <div className="absolute bottom-[-10px] left-[-10px] w-32 h-32 bg-gradient-to-tr from-[#3b82f6] to-transparent rounded-full opacity-40 blur-xl animate-float"></div>
                
                {/* Main Card */}
                <GlassCard className="w-full h-full p-3 bg-gradient-to-br from-white/80 to-white/30 border border-white/80 shadow-2xl relative overflow-hidden">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Modern Design Concept" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Floating UI Elements over image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/60">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-[#050A30]">Design Profissional</h3>
                          <Logo className="w-6 h-6" variant="dark" />
                        </div>
                        <p className="text-sm text-gray-600">Qualidade de agência, agilidade de parceiro.</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#050A30]">Serviços Práticos</h2>
              <p className="text-[#050A30]/60 text-lg">
                Seja para começar do zero ou renovar sua imagem, nós entregamos o que você precisa.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RevealOnScroll delay={100} className="lg:col-span-2">
              <ServiceCard 
                icon={<Palette className="w-6 h-6" />}
                title="Identidade Visual & Logos"
                desc="Criação de marcas completas para empresas, igrejas e profissionais autônomos. Seu nome com peso e profissionalismo."
              />
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} className="lg:col-span-2">
              <ServiceCard 
                icon={<Layout className="w-6 h-6" />}
                title="Websites"
                desc="Páginas rápidas e otimizadas para celular. Perfeito para apresentar seus serviços ou portfólio online."
              />
            </RevealOnScroll>

            <RevealOnScroll delay={300} className="lg:col-span-2">
              <ServiceCard 
                icon={<Shirt className="w-6 h-6" />}
                title="Uniformes & Impressos"
                desc="Artes para uniformes de times, fardas de trabalho, cartões de visita e adesivagem de veículos."
              />
            </RevealOnScroll>

            <RevealOnScroll delay={400} className="lg:col-span-2">
              <ServiceCard 
                icon={<Instagram className="w-6 h-6" />}
                title="Mídias Sociais"
                desc="Pacotes de artes para Instagram e Facebook. Mantenha suas redes ativas com design de qualidade."
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Bento Grid Portfolio / Carousel */}
      <section id="portfolio" className="py-24 relative z-10">
        {/* Section Background Glass */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md border-y border-white/40 z-[-1]"></div>
        
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#050A30]">Galeria de <span className="text-[#059669]">Ideias</span></h2>
              <p className="mt-4 text-[#050A30]/60 max-w-xl">
                 Explore diferentes formatos e possibilidades para sua empresa.
              </p>
            </div>
          </RevealOnScroll>

          {/* Bento Grid Layout */}
          <div className="flex overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-4 md:grid-rows-2 md:gap-6 md:h-[600px] snap-x snap-mandatory scrollbar-hide">
            
            {/* Card 1: CTA Main Feature */}
            <div className="min-w-[85vw] md:min-w-0 md:col-span-2 md:row-span-2 snap-center">
              <GlassCard className="h-full bg-[#050A30] !border-none overflow-hidden relative group !rounded-[2rem]">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626785774573-4b7993143d2d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050A30] via-[#050A30]/50 to-transparent"></div>
                 
                 <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <div className="inline-block bg-[#4FFFB0] text-[#050A30] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider shadow-[0_0_15px_rgba(79,255,176,0.5)]">
                        Destaque
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Sua Marca <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FFFB0] to-white">Em Outro Nível</span>
                      </h2>
                    </div>
                    <div className="mt-8">
                       <NeonButton variant="primary" size="large" onClick={() => window.location.href='#contact'}>
                          SOLICITAR ORÇAMENTO
                       </NeonButton>
                    </div>
                 </div>
              </GlassCard>
            </div>

            {/* Card 2: Uniforms */}
            <div className="min-w-[70vw] md:min-w-0 md:col-span-2 md:row-span-1 snap-center">
              <GlassCard className="h-full group overflow-hidden !p-0 border-0 bg-white !rounded-[2rem]">
                 <img src="https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050A30]/80 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-[#4FFFB0] text-xs font-bold uppercase tracking-wider">Vestuário</span>
                      <h3 className="text-white font-bold text-2xl">Uniformes Profissionais</h3>
                    </div>
                 </div>
              </GlassCard>
            </div>

            {/* Card 3: Social Media */}
            <div className="min-w-[70vw] md:min-w-0 md:col-span-1 md:row-span-1 snap-center">
               <GlassCard className="h-full bg-[#E0F2FE] group overflow-hidden relative !p-0 !rounded-[2rem]">
                   <div className="absolute inset-0 flex items-center justify-center p-6">
                       <img src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover rounded-2xl shadow-lg transform group-hover:-rotate-3 transition-transform duration-500" />
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md">
                      <h4 className="text-[#050A30] font-bold text-sm">Social Media</h4>
                   </div>
               </GlassCard>
            </div>

            {/* Card 4: Branding/Logo */}
            <div className="min-w-[70vw] md:min-w-0 md:col-span-1 md:row-span-1 snap-center">
               <GlassCard className="h-full bg-[#050A30] group overflow-hidden !p-0 flex items-center justify-center relative !rounded-[2rem]">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4FFFB0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className="text-center z-10 flex flex-col items-center">
                      <div className="w-20 h-20 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        {/* Logo used inside the card */}
                        <Logo variant="neon" className="w-full h-full" />
                      </div>
                      <div className="text-white/50 text-xs uppercase tracking-widest mt-2">Identidade</div>
                   </div>
               </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="method" className="py-24 relative overflow-hidden z-10">
        <div className="container mx-auto px-6">
           <RevealOnScroll>
             <div className="bg-[#050A30]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl text-white border border-white/10">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4FFFB0] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#3b82f6] rounded-full blur-[100px] opacity-20"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                   <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Como Trabalhamos</h2>
                      <p className="text-lg text-white/70 mb-8 leading-relaxed">
                         Simplificamos o processo criativo. Você diz o que precisa, nós executamos com qualidade e entregamos os arquivos prontos. Sem complicação.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                         <div>
                            <div className="text-[#4FFFB0] font-bold text-xl mb-2">01. Ideia</div>
                            <p className="text-sm text-white/60">Você nos conta o que precisa (logo, uniforme, site).</p>
                         </div>
                         <div>
                            <div className="text-[#4FFFB0] font-bold text-xl mb-2">02. Criação</div>
                            <p className="text-sm text-white/60">Desenvolvemos o design e você aprova.</p>
                         </div>
                         <div>
                            <div className="text-[#4FFFB0] font-bold text-xl mb-2">03. Entrega</div>
                            <p className="text-sm text-white/60">Receba tudo pronto para usar.</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="w-full md:w-auto min-w-[300px]">
                      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-8 text-center shadow-lg">
                          <h3 className="text-xl font-bold mb-2">Vamos conversar?</h3>
                          <p className="text-sm text-white/60 mb-6">Orçamento sem compromisso.</p>
                          <NeonButton variant="primary" className="w-full justify-center">Chamar no WhatsApp</NeonButton>
                      </div>
                   </div>
                </div>
             </div>
           </RevealOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#050A30] text-white pt-20 pb-8 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="flex flex-col items-center text-center mb-16">
               <div className="w-24 h-24 mb-6 relative">
                 <div className="absolute inset-0 bg-[#4FFFB0] blur-[40px] opacity-20 rounded-full"></div>
                 <Logo variant="neon" className="w-full h-full relative z-10" />
               </div>
               <h2 className="text-4xl font-bold mb-4">Solicite seu Orçamento</h2>
               <p className="text-white/60 max-w-lg mb-8">
                 Dê o próximo passo para profissionalizar sua imagem. 
                 Entre em contato conosco hoje mesmo.
               </p>
               <div className="flex gap-4">
                  <NeonButton variant="primary" size="large">WhatsApp</NeonButton>
                  <NeonButton variant="outline" className="text-white border-white hover:bg-white hover:text-[#050A30]">Email</NeonButton>
               </div>
            </div>
          </RevealOnScroll>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
             <div className="flex items-center gap-2 mb-4 md:mb-0">
               <Logo variant="neon" className="w-6 h-6" />
               <span className="font-bold text-white tracking-widest">SP DIGITAL</span>
             </div>
             <p>© 2024 SP Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Component for Service Cards
const ServiceCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <GlassCard className="p-8 h-full flex flex-col items-start gap-4 hover:border-[#4FFFB0]/50 bg-white/70 transition-all duration-300 hover:-translate-y-1 shadow-lg">
    <div className="w-14 h-14 bg-gradient-to-br from-[#050A30]/5 to-transparent rounded-full flex items-center justify-center text-[#050A30] mb-2 group-hover:bg-[#4FFFB0] group-hover:text-[#050A30] transition-colors border border-[#050A30]/5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#050A30]">{title}</h3>
    <p className="text-[#050A30]/60 leading-relaxed text-sm">
      {desc}
    </p>
  </GlassCard>
);

export default App;