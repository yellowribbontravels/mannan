import { prisma } from "@/lib/prisma";
import { Folder, Package, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [productCount, categoryCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-background border border-border p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-muted-foreground font-medium mb-1">Total Products</p>
            <h2 className="text-3xl font-bold">{productCount}</h2>
          </div>
          <div className="bg-primary/10 p-4 rounded-full">
            <Package className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-background border border-border p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-muted-foreground font-medium mb-1">Total Categories</p>
            <h2 className="text-3xl font-bold">{categoryCount}</h2>
          </div>
          <div className="bg-accent/20 p-4 rounded-full">
            <Folder className="w-8 h-8 text-accent-foreground" />
          </div>
        </div>

        <div className="bg-background border border-border p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-muted-foreground font-medium mb-1">Admin Users</p>
            <h2 className="text-3xl font-bold">{userCount}</h2>
          </div>
          <div className="bg-secondary/10 p-4 rounded-full">
            <Users className="w-8 h-8 text-secondary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background border border-border rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 border-b border-border pb-2">Quick Actions</h3>
          <div className="space-y-4">
            <Link href="/admin/products" className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition">
              Manage Products
            </Link>
            <Link href="/admin/categories" className="block w-full text-center bg-secondary text-secondary-foreground py-3 rounded-md font-medium hover:bg-secondary/90 transition">
              Manage Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
