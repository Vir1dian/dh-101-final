import { site } from '../content/site'
import './Watermark.css'

/** Faint "IMMIGRATION / ARCHIVE" stamp behind cards. Purely decorative. */
export default function Watermark({ className = '' }: { className?: string }) {
  return (
    <div className={`watermark ${className}`} aria-hidden="true">
      {site.title.split(' ').map((word) => (
        <span key={word}>{word}</span>
      ))}
    </div>
  )
}

/**
 * Worn-stamp texture for the watermark (the Figma layer has Noise + Texture
 * effects). Rendered once by the layout; Watermark.css points at it by id.
 */
export function WatermarkTextureFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="watermark-texture" x="-2%" y="-5%" width="104%" height="110%">
        {/* rough letter edges */}
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
        {/* speckled "missing ink" */}
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="grain" />
        <feColorMatrix in="grain" type="luminanceToAlpha" result="grainAlpha" />
        <feComponentTransfer in="grainAlpha" result="speckle">
          <feFuncA type="discrete" tableValues="0 0 1 1 1 1" />
        </feComponentTransfer>
        <feComposite in="rough" in2="speckle" operator="in" />
      </filter>
    </svg>
  )
}
