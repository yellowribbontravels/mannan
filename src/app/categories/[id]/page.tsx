import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Package, ArrowLeft, Folder } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CategoryProducts({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        orderBy: { name: 'asc' }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/categories" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12 bg-secondary text-secondary-foreground p-8 rounded-xl border-l-4 border-accent">
        {category.image ? (
           // eslint-disable-next-line @next/next/no-img-element
          <img src={category.image} alt={category.name} className="w-32 h-32 object-cover rounded-lg shadow-md shrink-0 bg-background" />
        ) : (
          <div className="w-32 h-32 bg-background rounded-lg shadow-md shrink-0 flex items-center justify-center">
             <Folder className="w-16 h-16 text-primary opacity-50" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-secondary-foreground/80 text-lg max-w-3xl">{category.description}</p>
          )}
        </div>
      </div>
      
      {category.products.length === 0 ? (
        <div className="bg-muted p-12 text-center rounded-lg border border-border">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">No products in this category</h2>
          <p className="text-muted-foreground">Products will appear here once they are assigned to this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-lg transition h-full"
            >
              <div className="aspect-video bg-muted flex items-center justify-center p-6 relative">
                {product.images && JSON.parse(product.images).length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={JSON.parse(product.images)[0]} alt={product.name} className="object-cover w-full h-full absolute inset-0" />
                ) : (
                  <Package className="w-12 h-12 text-primary opacity-20 group-hover:opacity-40 group-hover:scale-110 transition" />
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
                </div>
                <div className="flex items-center text-sm font-medium text-accent mt-auto">
                  View Specifications <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
