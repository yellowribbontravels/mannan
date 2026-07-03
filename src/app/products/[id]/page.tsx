import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true
    }
  });

  if (!product) {
    notFound();
  }

  let images = [];
  let specs = {};
  let sizes = [];
  try { images = product.images ? JSON.parse(product.images) : []; } catch { /* ignore */ }
  try { specs = product.specs ? JSON.parse(product.specs) : {}; } catch { /* ignore */ }
  try { sizes = product.sizes ? JSON.parse(product.sizes) : []; } catch { /* ignore */ }

  return (
    <div className="relative min-h-screen pb-24 z-10 flex flex-col">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10 mt-12">
        <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-square glass rounded-3xl flex items-center justify-center overflow-hidden border border-white/10 relative shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              {images.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[0]} alt={product.name} className="object-cover w-full h-full absolute inset-0 hover:scale-110 transition-transform duration-700" />
              ) : (
                <Package className="w-24 h-24 text-white/10" />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square glass rounded-xl overflow-hidden border border-white/10 relative hover:border-accent/50 transition-colors cursor-pointer group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.name} ${idx + 2}`} className="object-cover w-full h-full absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <Link href={`/categories/${product.categoryId}`} className="inline-block px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-medium tracking-wide uppercase text-xs mb-6 hover:bg-accent/10 transition-colors w-fit">
              {product.category.name}
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="prose prose-lg dark:prose-invert mb-10 text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Available Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size: string, i: number) => (
                    <div key={i} className="px-5 py-2 rounded-lg glass border border-white/10 text-white font-medium hover:border-accent/50 hover:bg-white/5 transition-all shadow-sm">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="glass-card rounded-2xl p-8 mb-10 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent rounded-full inline-block"></span>
                  Technical Specifications
                </h2>
                
                {Object.keys(specs).length > 0 ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="border-b border-white/10 pb-3">
                        <dt className="text-sm text-muted-foreground mb-1">{key}</dt>
                        <dd className="font-medium text-white">{value as React.ReactNode}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground italic">No specifications provided.</p>
                )}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Link href="/contact" className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all text-center w-full sm:w-auto shadow-[0_0_30px_rgba(232,193,90,0.3)] hover:shadow-[0_0_40px_rgba(232,193,90,0.5)] hover:-translate-y-1">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
