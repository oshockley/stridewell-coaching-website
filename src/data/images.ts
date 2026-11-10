/**
 * All photography lives here so it can be swapped in one place.
 * Each entry is an Unsplash photo ID; `unsplash()` builds a sized, compressed URL.
 */
export const photos = {
  hero: '1517836357463-d25dfeac3438',
  coach: '1567013127542-490d757e51fc',
  priya: '1594381898411-846e7d193883',
  marcus: '1526506118085-60ce8714f8c5',
  alyssa: '1609899537878-88d5ba429bdb',
  dan: '1594737625785-a6cbdabd333c',
  elena: '1541534741688-6078c6bfb5c5',
  chris: '1597452485669-2c7bb5fef90d',
} as const

export function unsplash(id: string, width: number, height?: number) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    crop: 'faces,center',
    w: String(width),
    q: '70',
  })
  if (height) params.set('h', String(height))
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`
}

/** Builds a srcSet for a fixed aspect ratio across common widths. */
export function unsplashSrcSet(id: string, widths: number[], ratio: number) {
  return widths.map((w) => `${unsplash(id, w, Math.round(w * ratio))} ${w}w`).join(', ')
}
