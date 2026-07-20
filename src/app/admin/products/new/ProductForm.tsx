"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "../actions";
import { Plus, X, Upload, Loader2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter();
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || "");
  
  let initialImage = "";
  try { if (initialData?.images) { const imgs = JSON.parse(initialData.images); if (imgs.length > 0) initialImage = imgs[0]; } } catch {}
  const [image, setImage] = useState(initialImage);
  
  let initialSpecs = [];
  try { 
    if (initialData?.specs) { 
      const sp = JSON.parse(initialData.specs);
      initialSpecs = Object.entries(sp).map(([key, value]) => ({ key, value: value as string }));
    } 
  } catch {}
  const [specs, setSpecs] = useState<{key: string, value: string}[]>(initialSpecs);
  
  let initialSizes = [];
  try { if (initialData?.sizes) { initialSizes = JSON.parse(initialData.sizes); } } catch {}
  const [sizes, setSizes] = useState<string[]>(initialSizes);
  const [newSize, setNewSize] = useState("");
  
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setImage(data.url);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch {
      setError("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };
  
  const removeSize = (sizeToRemove: string) => {
    setSizes(sizes.filter(s => s !== sizeToRemove));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    const specsObject = specs.reduce((acc, curr) => {
      if (curr.key.trim() && curr.value.trim()) {
        acc[curr.key.trim()] = curr.value.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    const specsString = JSON.stringify(specsObject);
    const sizesString = JSON.stringify(sizes);
    const imagesString = image ? JSON.stringify([image]) : "[]";

    const payload = {
      name,
      description,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId,
      specs: specsString,
      sizes: sizesString,
      images: imagesString
    };

    let res;
    if (initialData?.id) {
      res = await updateProduct(initialData.id, payload);
    } else {
      res = await createProduct(payload);
    }

    if (res.success) {
      router.push("/admin/products");
    } else {
      setError(res.message || "An error occurred");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background border border-border p-8 rounded-xl shadow-sm max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-600 p-4 rounded-md text-sm font-medium">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" rows={4}></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Slug (optional)</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="auto-generated if empty" />
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <label className="block text-sm font-medium mb-3">Product Image</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
              <div className={`px-4 py-2.5 rounded-md border border-border bg-muted flex items-center gap-2 transition ${isUploading ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              </div>
            </div>
            {image && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                Image Uploaded Successfully
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Specifications</label>
            <button type="button" onClick={addSpec} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add Spec
            </button>
          </div>
          {specs.length === 0 && <p className="text-sm text-muted-foreground italic mb-3">No specifications added.</p>}
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input type="text" placeholder="Key (e.g. Material)" value={spec.key} onChange={(e) => updateSpec(index, 'key', e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm" />
                <input type="text" placeholder="Value (e.g. Steel)" value={spec.value} onChange={(e) => updateSpec(index, 'value', e.target.value)} className="flex-1 px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm" />
                <button type="button" onClick={() => removeSpec(index)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-md transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <label className="block text-sm font-medium mb-3">Available Sizes</label>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="e.g. M5" value={newSize} onChange={e => setNewSize(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())} className="px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm max-w-xs" />
            <button type="button" onClick={addSize} className="px-5 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/90 transition">Add Size</button>
          </div>
          {sizes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <div key={size} className="flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                  {size}
                  <button type="button" onClick={() => removeSize(size)} className="text-muted-foreground hover:text-red-500 ml-2 focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No sizes added.</p>
          )}
        </div>

        <div className="flex gap-4 justify-end mt-8 border-t border-border pt-6">
          <button type="button" onClick={() => router.push("/admin/products")} className="px-6 py-2.5 border border-border font-medium rounded-md hover:bg-muted transition">Cancel</button>
          <button type="submit" disabled={isSubmitting || isUploading} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition flex items-center gap-2 disabled:opacity-50">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
