import React from 'react'

interface DefaultAvatarProps {
  name: string
  size?: number
  className?: string
}

export default function DefaultAvatar({ name, size = 40, className = '' }: DefaultAvatarProps) {
  const firstLetter = name.charAt(0).toUpperCase()

  // Generate a random gradient
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const gradientStyle = {
    background: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`,
  }

  return (
    <div
      className={`flex items-center justify-center text-white rounded-lg font-bold ${className}`}
      style={{
        ...gradientStyle,
        width: '100%',
        height: '100%',
        fontSize: `${size / 2}px`,
      }}
      aria-label={`Default avatar for ${name}`}
      role="img"
    >
      {firstLetter}
    </div>
  )
}