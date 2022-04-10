import * as React from 'react'
import { SVGProps } from 'react'

const SvgSignIn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#sign-in_svg__a)" fill="currentColor">
      <path d="M4.667 14.667H3.333a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2h1.334a.667.667 0 1 0 0-1.333H3.333A3.337 3.337 0 0 0 0 3.333v9.334A3.337 3.337 0 0 0 3.333 16h1.334a.666.666 0 1 0 0-1.333Z" />
      <path d="m15.333 7.333-10.518.022c.059-.109.132-.209.218-.298l2.586-2.586a.666.666 0 1 0-.943-.942L4.089 6.115a2.667 2.667 0 0 0 0 3.77l2.586 2.586a.666.666 0 1 0 .942-.942L5.031 8.943a1.34 1.34 0 0 1-.194-.255l10.496-.021a.667.667 0 1 0 0-1.334Z" />
    </g>
    <defs>
      <clipPath id="sign-in_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgSignIn
