import * as React from 'react'
import { SVGProps } from 'react'

const SvgUsers = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#users_svg__a)">
      <path
        d="M5 8.667a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM5 4a1.667 1.667 0 1 0 0 3.333A1.667 1.667 0 0 0 5 4Zm5 11.333V15a5 5 0 1 0-10 0v.333a.667.667 0 1 0 1.333 0V15a3.666 3.666 0 1 1 7.334 0v.333a.667.667 0 1 0 1.333 0ZM16 12a4.666 4.666 0 0 0-7.778-3.478.667.667 0 1 0 .89.993A3.333 3.333 0 0 1 14.666 12 .667.667 0 1 0 16 12Zm-4.333-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-4.667a1.667 1.667 0 1 0 0 3.334 1.667 1.667 0 0 0 0-3.334Z"
        fill="#292221"
      />
    </g>
    <defs>
      <clipPath id="users_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgUsers
