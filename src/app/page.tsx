import Link from "next/link";
import { ArrowRight, Settings, ShieldCheck, Factory, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-48 flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-70 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10 text-sm font-medium text-white/80 tracking-wide uppercase shadow-[0_0_20px_rgba(232,193,90,0.1)]">
            <Zap className="w-4 h-4 text-accent" /> 25+ Years of Excellence
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.1]">
            Precision Fasteners for <br />
            <span className="text-gradient">Industrial Excellence</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Promoted by industry professionals with over 25 years of combined experience, we provide reliable, compliant, and precision-engineered industrial components.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/products" className="btn-glow bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold transition-all shadow-[0_0_30px_rgba(232,193,90,0.3)] hover:shadow-[0_0_50px_rgba(232,193,90,0.5)] flex items-center gap-2 hover:-translate-y-1">
              Explore Catalog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="glass px-8 py-4 rounded-lg font-bold text-white hover:bg-white/10 transition-all hover:-translate-y-1">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">A Disciplined <span className="text-gradient-purple">Trading Foundation</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
              We serve a diversified B2B customer base across infrastructure, construction, engineering, oil & gas, pharmaceuticals, and industrial manufacturing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-2xl text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] group-hover:bg-accent/20 transition-colors duration-500 rounded-full" />
              <div className="bg-primary/20 text-accent w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(99,49,168,0.3)] group-hover:shadow-[0_0_40px_rgba(232,193,90,0.4)] relative z-10">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-accent transition-colors relative z-10">Quality Consistency</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">Strict procurement control and quality checks ensure reliability for repeat institutional demand.</p>
            </div>
            
            <div className="glass-card p-10 rounded-2xl text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] group-hover:bg-accent/20 transition-colors duration-500 rounded-full" />
              <div className="bg-primary/20 text-accent w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(99,49,168,0.3)] group-hover:shadow-[0_0_40px_rgba(232,193,90,0.4)] relative z-10">
                <Settings className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-accent transition-colors relative z-10">Extensive Portfolio</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">MS, GI, PTFE, brass, high-tensile, ASTM-grade, titanium, and precision fasteners for specialized applications.</p>
            </div>

            <div className="glass-card p-10 rounded-2xl text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] group-hover:bg-accent/20 transition-colors duration-500 rounded-full" />
              <div className="bg-primary/20 text-accent w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(99,49,168,0.3)] group-hover:shadow-[0_0_40px_rgba(232,193,90,0.4)] relative z-10">
                <Factory className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-accent transition-colors relative z-10">Manufacturing Shift</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">Phased expansion into manufacturing to improve margins, control quality, and reduce lead times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 mt-12 mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-card p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden border-accent/20 shadow-[0_20px_60px_rgba(99,49,168,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">Partner With Us</h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you need customized sourcing, compliance support, or standard bulk orders, our digital e-commerce platform and dedicated team are ready to scale with you.
              </p>
              <Link href="/contact" className="btn-glow bg-white text-primary px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/90 transition-all inline-flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                Contact Sales Team <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
