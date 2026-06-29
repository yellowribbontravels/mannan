import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Products() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: {
      category: true
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-display font-extrabold text-white mb-4">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-muted-foreground text-lg">Comprehensive catalog of industrial fasteners and precision components.</p>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="glass p-16 text-center rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full" />
          <Package className="w-20 h-20 mx-auto text-muted-foreground mb-6 opacity-30 relative z-10" />
          <h2 className="text-2xl font-display font-semibold mb-3 text-white relative z-10">No products found</h2>
          <p className="text-muted-foreground relative z-10">Products will appear here once they are added to the catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="glass-card flex flex-col rounded-2xl overflow-hidden group h-full block"
            >
              <div className="aspect-video bg-white/5 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.images && JSON.parse(product.images).length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={JSON.parse(product.images)[0]} alt={product.name} className="object-cover w-full h-full absolute inset-0 group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <Package className="w-16 h-16 text-primary opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" />
                )}
                <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-md text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-md">
                  {product.category.name}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between relative z-20 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-white group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">{product.description}</p>
                </div>
                <div className="flex items-center text-sm font-bold text-accent mt-auto group-hover:text-white transition-colors">
                  View Specifications <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
