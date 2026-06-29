import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Folder } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Categories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-5xl font-display font-extrabold text-white mb-4">
          Product <span className="text-gradient">Categories</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">Browse our extensive range of industrial fasteners and precision components.</p>
      </div>
      
      {categories.length === 0 ? (
        <div className="glass p-16 text-center rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full" />
          <Folder className="w-20 h-20 mx-auto text-muted-foreground mb-6 opacity-30 relative z-10" />
          <h2 className="text-2xl font-display font-semibold mb-3 text-white relative z-10">No categories found</h2>
          <p className="text-muted-foreground relative z-10">Categories will appear here once they are added by an administrator.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="glass-card rounded-2xl overflow-hidden group block"
            >
              <div className="aspect-video bg-white/5 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {category.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={category.image} alt={category.name} className="object-cover w-full h-full absolute inset-0 group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <Folder className="w-16 h-16 text-primary opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" />
                )}
              </div>
              <div className="p-6 relative z-20 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-accent transition-colors">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{category._count.products} Products available</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
