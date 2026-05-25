"use client"
import { useState } from "react"
import Image from "next/image"

interface Props {
  mainImg: string
  galleryList: string[]
  altName: string
  tagList?: string[]
}

export default function ImageGallerySwitch({ mainImg, galleryList, altName, tagList }: Props) {
  const [showImg, setShowImg] = useState(mainImg)

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden relative">
        {showImg ? (
          <Image
            src={showImg}
            alt={altName}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/20" />
            </div>
          </div>
        )}
        
        {tagList && tagList.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {tagList.slice(0, 2).map((item) => (
              <span key={item} className="bg-green-500/90 text-white text-sm px-3 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {mainImg && (
          <div
            onClick={() => setShowImg(mainImg)}
            className="aspect-square bg-muted rounded-lg cursor-pointer hover:ring-2 ring-primary overflow-hidden relative"
          >
            <Image src={mainImg} alt={altName} fill className="object-cover" />
          </div>
        )}
        {galleryList.map((url, idx) => (
          <div
            key={idx}
            onClick={() => setShowImg(url)}
            className="aspect-square bg-muted rounded-lg cursor-pointer hover:ring-2 ring-primary overflow-hidden relative"
          >
            <Image src={url} alt={`${altName} view ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
