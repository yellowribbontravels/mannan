import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Folder, Package, Wrench } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 bg-muted/30 relative z-10">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary text-secondary-foreground border-r border-border shrink-0 flex flex-col sticky top-0 z-20">
        <div className="p-6 flex items-center gap-2 border-b border-border/20">
          <Wrench className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tight text-accent">Admin Portal</span>
        </div>
        <div className="p-4 flex-grow">
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
              <Folder className="w-5 h-5" /> All Categories
            </Link>
            <Link href="/admin/categories/new" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors pl-8 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Add Category
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
              <Package className="w-5 h-5" /> All Products
            </Link>
            <Link href="/admin/products/new" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors pl-8 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Add Product
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-border/20">
          <div className="mb-4 px-3 text-sm text-secondary-foreground/70 truncate">
            {session.user.email}
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto relative z-30">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
