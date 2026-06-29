export default function About() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 pb-20">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full glass mb-8 border border-white/10 text-sm font-medium text-white/80 tracking-wide uppercase shadow-[0_0_20px_rgba(232,193,90,0.1)]">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8 text-white">
            About M. Mannan <span className="text-gradient">& Co.</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A disciplined trading foundation built for scalability, early-stage investor alignment, and a strategic shift towards manufacturing excellence.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 flex items-center gap-4">
              <span className="w-2 h-10 bg-accent rounded-full inline-block"></span>
              A Disciplined Trading Foundation
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                M. Mannan Pvt Ltd has built its current scale through a trading-led model focused on reliability, compliance, and repeat institutional demand. Rather than pursuing aggressive topline growth, the company has emphasized capital discipline, selective credit exposure, and supplier diversification. This approach has allowed the business to remain cash-flow conscious while steadily expanding its customer base.
              </p>
              <p>
                At its current stage, the company&apos;s strength lies not in size, but in process maturity &mdash; procurement control, quality consistency, and strong promoter-led relationships across the value chain.
              </p>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 flex items-center gap-4">
              <span className="w-2 h-10 bg-accent rounded-full inline-block"></span>
              Planned Shift Toward Manufacturing
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                With demand visibility improving, the company is now preparing for backward integration into manufacturing, as outlined in its Detailed Project Report (DPR). The planned investment focuses on:
              </p>
              <ul className="grid gap-4 ml-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0 shadow-[0_0_10px_rgba(232,193,90,0.8)]"></div>
                  <span>Direct import of raw materials to reduce cost leakage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0 shadow-[0_0_10px_rgba(232,193,90,0.8)]"></div>
                  <span>Small-scale manufacturing of high-demand nut and bolt categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0 shadow-[0_0_10px_rgba(232,193,90,0.8)]"></div>
                  <span>Improved control over quality, lead times, and customization</span>
                </li>
              </ul>
              <p>
                This transition is expected to enhance gross margins over time and reduce dependence on third-party suppliers, while allowing the company to move up the value chain. Importantly, the expansion is designed to be phased and capital-efficient, avoiding undue leverage in the early stages.
              </p>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 flex items-center gap-4">
              <span className="w-2 h-10 bg-accent rounded-full inline-block"></span>
              E-Commerce as a Parallel Growth Engine
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Alongside manufacturing, M. Mannan Pvt Ltd is developing e-commerce as a complementary and scalable distribution channel, rather than a replacement for its core B2B operations. The company&apos;s e-commerce strategy is structured around a B2B ordering platform, presence on established B2B marketplaces, and a selective B2C offering targeting SME buyers who prefer prepaid, standardized purchases.
              </p>
              <p>
                This digital channel is expected to deliver three strategic advantages: improved working-capital efficiency, wider geographic reach, and data-driven demand visibility supporting inventory planning and manufacturing decisions.
              </p>
            </div>
          </div>

          <div className="glass-card p-10 md:p-14 rounded-3xl border-accent/20 relative overflow-hidden mt-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FFF0B3] to-accent drop-shadow-sm">
                An Early-Stage, Investor-Aligned Opportunity
              </h2>
              <div className="space-y-6 text-white/90 text-lg md:text-xl leading-relaxed">
                <p>
                  India&apos;s industrial fastener market continues to grow, driven by infrastructure spending, manufacturing localization, defence procurement, EV ecosystems, and global supply-chain diversification.
                </p>
                <p>
                  M. Mannan Private Limited represents an early-stage but structurally sound opportunity with a clearly defined roadmap toward manufacturing-led margins and an e-commerce strategy designed for cash efficiency, not vanity metrics. As the company progresses from a trading foundation toward an integrated manufacturing and digital distribution platform, it aims to scale methodically, profitably, and transparently.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
