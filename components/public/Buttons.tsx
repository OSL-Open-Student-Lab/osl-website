import React, { FC } from 'react'


interface IconButtonProps {
	className?: string,
	img: string,
	text?: string,
	type?: 'primary' | 'secondary',
	size: 'medium' | 'small',
	onClick?: () => void
}

export const IconButton: FC<IconButtonProps> = ({ className, img, text, type, size, onClick }) => {
	const sizeClass = `icon-button_${size}`
	const typeClass = `icon-button_${type}`
	return (
		<button onClick={onClick}
			className={`icon-button ${sizeClass} ${typeClass} ${className} `}
			style={{ padding: !!text ? '' : '8px' }}
		>
			<img src={`${img}`} />
			{!!text ?
				<span>
					{text}
				</span>
				:
				null}
		</button>
	)
}
