"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../actions";
import { Upload, Loader2 } from "lucide-react";

export function CategoryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", description: "", slug: "", image: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const resData = await res.json();
      
      if (resData.success) {
        setFormData({...formData, image: resData.url});
      } else {
        setError(resData.error || "Failed to upload image");
      }
    } catch {
      setError("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    const res = await createCategory({
      name: formData.name,
      description: formData.description,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: formData.image
    });

    if (res.success) {
      router.push("/admin/categories");
    } else {
      setError(res.message || "An error occurred");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background border border-border p-8 rounded-xl shadow-sm max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-md text-sm font-medium">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (optional)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="auto-generated if empty" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" rows={4}></textarea>
        </div>
        
        <div className="border-t border-border pt-6 mt-6">
          <label className="block text-sm font-medium mb-3">Category Image</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
              <div className={`px-4 py-2.5 rounded-md border border-border bg-muted flex items-center gap-2 transition ${isUploading ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              </div>
            </div>
            {formData.image && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                Image Uploaded Successfully
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-8 border-t border-border pt-6">
          <button type="button" onClick={() => router.push("/admin/categories")} className="px-6 py-2.5 border border-border rounded-md hover:bg-muted transition font-medium">Cancel</button>
          <button type="submit" disabled={isSubmitting || isUploading} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
