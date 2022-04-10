import * as React from 'react'
import { SVGProps } from 'react'

const SvgPicture = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#picture_svg__a)" fill="#292221">
      <path d="M12.667 0H3.333A3.337 3.337 0 0 0 0 3.333v9.334A3.337 3.337 0 0 0 3.333 16h9.334A3.337 3.337 0 0 0 16 12.667V3.333A3.337 3.337 0 0 0 12.667 0ZM3.333 1.333h9.334a2 2 0 0 1 2 2v9.334c-.002.297-.07.59-.2.856L8.358 7.415a3.333 3.333 0 0 0-4.715 0l-2.31 2.309v-6.39a2 2 0 0 1 2-2Zm0 13.334a2 2 0 0 1-2-2v-1.058l3.252-3.252a2 2 0 0 1 2.83 0l6.108 6.11c-.266.13-.56.198-.856.2H3.333Z" />
      <path d="M10.667 7a2.333 2.333 0 1 0 0-4.666 2.333 2.333 0 0 0 0 4.666Zm0-3.333a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </g>
    <defs>
      <clipPath id="picture_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgPicture
