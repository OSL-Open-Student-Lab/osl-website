import * as React from 'react'
import { SVGProps } from 'react'

const SvgStarFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#star-filled_svg__a)">
      <path
        d="M15.89 5.863a2.12 2.12 0 0 0-2.044-1.484h-2.913L10.05 1.62a2.152 2.152 0 0 0-4.098 0L5.067 4.38H2.154A2.151 2.151 0 0 0 .887 8.267L3.257 10l-.9 2.791a2.119 2.119 0 0 0 .789 2.409 2.118 2.118 0 0 0 2.533-.013L8 13.48l2.322 1.706a2.15 2.15 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.118 2.118 0 0 0 .776-2.404Z"
        fill="#F2C94C"
      />
    </g>
    <defs>
      <clipPath id="star-filled_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgStarFilled
