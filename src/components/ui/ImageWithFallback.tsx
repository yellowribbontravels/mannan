"use client";

import { ImgHTMLAttributes, useState } from "react";
import { Folder, Package } from "lucide-react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'folder' | 'package';
  fallbackClassName?: string;
}

export function ImageWithFallback({ fallbackType = 'folder', fallbackClassName = '', className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !props.src) {
    if (fallbackType === 'package') {
      return <Package className={fallbackClassName} />;
    }
    return <Folder className={fallbackClassName} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className={className}
      onError={() => setError(true)}
    />
  );
}
