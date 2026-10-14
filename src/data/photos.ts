export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

// TODO(owner): реальные фото работ в public/photos/ (JPG/WebP, длинная сторона до 1600 px).
// Галерея появляется, когда здесь три фото или больше.
export const photos: Photo[] = []

export const GALLERY_MIN = 3
