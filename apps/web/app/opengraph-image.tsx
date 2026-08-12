import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mahdi Jafari - AI-Native Systems Architect'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #000000, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '24px',
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #00f0ff)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.05em',
            }}
          >
            mahdi0jafari
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#888888',
              marginTop: 20,
              textAlign: 'center',
              fontWeight: 500,
              maxWidth: '800px',
            }}
          >
            Systems Architect & Software Engineer
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            <span style={{ fontSize: 24, color: '#00f0ff', border: '1px solid #00f0ff', padding: '8px 16px', borderRadius: '100px' }}>AI-Native</span>
            <span style={{ fontSize: 24, color: '#00f0ff', border: '1px solid #00f0ff', padding: '8px 16px', borderRadius: '100px' }}>Distributed Systems</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
