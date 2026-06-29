import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-display font-extrabold text-white mb-6 relative z-10">
          <span className="text-gradient">Contact</span> Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
          Partner with M. Mannan & Co. for reliable, compliant, and precision-engineered industrial components. Our team is ready to support your sourcing requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-3xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="text-3xl font-display font-bold mb-8 text-white">Get in Touch</h2>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-5">
                <div className="bg-primary/20 p-4 rounded-2xl shrink-0 shadow-[0_0_20px_rgba(99,49,168,0.2)]">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Corporate Office</h3>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    4-2-271, Mahankali St,<br />
                    Old Bhoiguda, Ranigunj,<br />
                    Secunderabad, Telangana 500003
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-primary/20 p-4 rounded-2xl shrink-0 shadow-[0_0_20px_rgba(99,49,168,0.2)]">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Phone</h3>
                  <p className="text-muted-foreground mt-2">09652039721</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-primary/20 p-4 rounded-2xl shrink-0 shadow-[0_0_20px_rgba(99,49,168,0.2)]">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Email</h3>
                  <p className="text-muted-foreground mt-2">info@mmannan.co.in</p>
                  <p className="text-muted-foreground">sales@mmannan.co.in</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-primary/20 p-4 rounded-2xl shrink-0 shadow-[0_0_20px_rgba(99,49,168,0.2)]">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Business Hours</h3>
                  <p className="text-muted-foreground mt-2">Monday - Saturday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM (IST)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Send an Inquiry</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">First Name</label>
                <input type="text" id="firstName" className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-white/20" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">Last Name</label>
                <input type="text" id="lastName" className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-white/20" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
              <input type="email" id="email" className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-white/20" placeholder="john@company.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-muted-foreground">Company Name</label>
              <input type="text" id="company" className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-white/20" placeholder="ABC Industries" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
              <textarea id="message" rows={5} className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-white/20 resize-none" placeholder="Tell us about your requirements..."></textarea>
            </div>

            <button type="button" className="btn-glow w-full bg-accent text-accent-foreground font-bold py-4 rounded-xl hover:bg-accent/90 transition shadow-[0_0_20px_rgba(232,193,90,0.2)] hover:shadow-[0_0_30px_rgba(232,193,90,0.4)]">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
