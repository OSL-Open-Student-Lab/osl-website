import * as React from 'react'
import { SVGProps } from 'react'

const SvgUserAddWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#user-add-white_svg__a)" fill="#fff">
      <path d="M15.333 7.333H14V6a.667.667 0 0 0-1.333 0v1.333h-1.334a.667.667 0 1 0 0 1.334h1.334V10A.667.667 0 0 0 14 10V8.667h1.333a.667.667 0 1 0 0-1.334ZM6 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-6.667a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334ZM6 9.333a6.007 6.007 0 0 0-6 6 .666.666 0 1 0 1.333 0 4.667 4.667 0 0 1 9.334 0 .667.667 0 1 0 1.333 0 6.007 6.007 0 0 0-6-6Z" />
    </g>
    <defs>
      <clipPath id="user-add-white_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgUserAddWhite
