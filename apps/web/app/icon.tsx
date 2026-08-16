import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 21,
          background: '#00F0FF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          borderRadius: '7px',
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
