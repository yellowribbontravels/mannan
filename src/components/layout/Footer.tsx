import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Footer() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  } catch {
    // Fallback if db error
  }

  const primaryPhone = settings?.primaryPhone || "09652039721";
  const primaryEmail = settings?.primaryEmail || "info@mmannan.co.in";
  const addressText = settings?.addressText || "4-2-271, Mahankali St,\nOld Bhoiguda, Ranigunj,\nSecunderabad, Telangana 500003";

  return (
    <footer className="relative bg-background pt-20 pb-10 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.02] mix-blend-overlay pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.webp" alt="M Mannan Pvt Ltd Logo" className="h-16 w-auto object-contain" />
              <span className="text-2xl font-display font-bold tracking-tight text-white hidden sm:inline-block">M Mannan <span className="text-gradient">Pvt Ltd</span></span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Over 25 years of combined experience in the fastener and industrial components sector. A trading-led model focused on reliability, compliance, and repeat institutional demand.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-accent hover:pl-1 transition-all">About Us</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-accent hover:pl-1 transition-all">Product Categories</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-accent hover:pl-1 transition-all">All Products</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent hover:pl-1 transition-all">Contact</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-accent hover:pl-1 transition-all">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
                <span className="whitespace-pre-line">{addressText}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>{primaryPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>{primaryEmail}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} M. Mannan Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
