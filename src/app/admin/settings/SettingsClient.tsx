"use client";

import { useState } from "react";
import { updateSiteSettings } from "./actions";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Basic settings
  const [primaryEmail, setPrimaryEmail] = useState(initialSettings?.primaryEmail || "");
  const [primaryPhone, setPrimaryPhone] = useState(initialSettings?.primaryPhone || "");
  const [addressText, setAddressText] = useState(initialSettings?.addressText || "");
  const [googleMapsEmbed, setGoogleMapsEmbed] = useState(initialSettings?.googleMapsEmbed || "");
  
  // Contact Cards
  let initialCards = [];
  try {
    initialCards = initialSettings?.contactCards ? JSON.parse(initialSettings.contactCards) : [];
  } catch {
    initialCards = [];
  }
  const [contactCards, setContactCards] = useState<{heading: string, email: string, phone: string}[]>(initialCards);

  const addCard = () => setContactCards([...contactCards, { heading: "", email: "", phone: "" }]);
  
  const removeCard = (index: number) => setContactCards(contactCards.filter((_, i) => i !== index));
  
  const updateCard = (index: number, field: 'heading' | 'email' | 'phone', val: string) => {
    const newCards = [...contactCards];
    newCards[index][field] = val;
    setContactCards(newCards);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    // Filter out empty cards
    const validCards = contactCards.filter(c => c.heading.trim() !== "");
    
    const res = await updateSiteSettings({
      primaryEmail,
      primaryPhone,
      addressText,
      googleMapsEmbed,
      contactCards: JSON.stringify(validCards)
    });

    setIsSubmitting(false);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("Failed to save settings: " + res.message);
    }
  }

  return (
    <div className="bg-background border border-border p-8 rounded-xl shadow-sm max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Primary Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Phone (WhatsApp)</label>
              <input 
                type="text" 
                value={primaryPhone} 
                onChange={e => setPrimaryPhone(e.target.value)} 
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
              />
              <p className="text-xs text-muted-foreground mt-1">This number will be used for the floating WhatsApp button.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Email</label>
              <input 
                type="email" 
                value={primaryEmail} 
                onChange={e => setPrimaryEmail(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Location</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Address Text</label>
              <textarea 
                value={addressText} 
                onChange={e => setAddressText(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps Embed HTML (iframe)</label>
              <textarea 
                value={googleMapsEmbed} 
                onChange={e => setGoogleMapsEmbed(e.target.value)} 
                placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
                className="w-full px-4 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none font-mono text-xs" 
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Dynamic Contact Cards */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
            <h2 className="text-xl font-bold">Additional Contact Cards</h2>
            <button 
              type="button" 
              onClick={addCard} 
              className="text-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
          
          {contactCards.length === 0 && <p className="text-sm text-muted-foreground italic mb-3">No additional contact cards added.</p>}
          
          <div className="space-y-4">
            {contactCards.map((card, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 border border-border rounded-lg bg-muted/20 relative">
                <button type="button" onClick={() => removeCard(index)} className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-md transition">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                  <div>
                    <label className="block text-xs font-medium mb-1">Heading (e.g. Sales)</label>
                    <input type="text" value={card.heading} onChange={(e) => updateCard(index, 'heading', e.target.value)} className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Email</label>
                    <input type="email" value={card.email} onChange={(e) => updateCard(index, 'email', e.target.value)} className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Phone</label>
                    <input type="text" value={card.phone} onChange={(e) => updateCard(index, 'phone', e.target.value)} className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-8 border-t border-border pt-6 items-center">
          {success && <span className="text-green-600 font-medium text-sm">Settings saved successfully!</span>}
          <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition flex items-center gap-2 disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
