import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowRightWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#arrow-right-white_svg__a)">
      <path
        d="M15.413 6.607 12.833 4a.666.666 0 1 0-.946.94l2.373 2.393H.667A.667.667 0 0 0 0 8a.667.667 0 0 0 .667.667H14.3l-2.413 2.406a.667.667 0 0 0 .217 1.093.666.666 0 0 0 .73-.146l2.58-2.587a2 2 0 0 0 0-2.826Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="arrow-right-white_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgArrowRightWhite
