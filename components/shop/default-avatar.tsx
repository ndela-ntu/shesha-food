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
    console.log(color);
    return color
  }

  const gradientStyle = {
    background: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`,
  }

  return (
    <div
      className={`flex items-center justify-center text-champagne p-2.5 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full ${className}`}
      style={{
        ...gradientStyle,
        fontSize: `${size / 2}px`,
      }}
      aria-label={`Default avatar for ${name}`}
      role="img"
    >
      {firstLetter}
    </div>
  )
}