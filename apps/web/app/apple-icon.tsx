import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 118,
          background: '#00F0FF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          borderRadius: '40px',
          fontWeight: 900,
          fontFamily: 'monospace, sans-serif',
        }}
      >
        M
      </div>
    ),
    {
      ...size,
    }
  )
}
