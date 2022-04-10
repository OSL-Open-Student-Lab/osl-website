import Image from 'next/image'
import { FC } from 'react'

interface IconButtonProps {
  className?: string
  img: string
  text?: string
  type?: 'primary' | 'secondary'
  size: 'medium' | 'small'
  onClick?: () => void
}

export const IconButton: FC<IconButtonProps> = ({
  className,
  img,
  text,
  type,
  size,
  onClick
}) => {
  const sizeClass = `icon-button_${size}`
  const typeClass = `icon-button_${type}`
  return (
    <button
      onClick={onClick}
      className={`icon-button ${sizeClass} ${typeClass} ${className} `}
      style={text ? { padding: '8px' } : {}}
    >
      <div style={{ height: '2rem', position: 'relative', width: '2rem' }}>
        <Image src={img} layout="fill" />
      </div>
      {!!text ? <span>{text}</span> : null}
    </button>
  )
}
