import * as React from 'react'
import { SVGProps } from 'react'

const SvgMenuDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#menu-dots_svg__a)" fill="#292221">
      <path d="M1.333 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM8 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM14.667 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z" />
    </g>
    <defs>
      <clipPath id="menu-dots_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgMenuDots
