import * as React from 'react'
import { SVGProps } from 'react'

const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#star_svg__a)">
      <path
        d="M15.89 5.863a2.119 2.119 0 0 0-2.044-1.484h-2.912l-.885-2.758a2.151 2.151 0 0 0-4.098 0L5.067 4.38H2.154A2.151 2.151 0 0 0 .887 8.267L3.258 10l-.901 2.791a2.119 2.119 0 0 0 .79 2.409 2.119 2.119 0 0 0 2.532-.013L8 13.48l2.322 1.706a2.151 2.151 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.118 2.118 0 0 0 .776-2.404ZM14.33 7.19l-2.763 2.02a.667.667 0 0 0-.241.743l1.05 3.247a.818.818 0 0 1-1.264.91l-2.716-2a.666.666 0 0 0-.79 0l-2.716 2a.818.818 0 0 1-1.267-.91l1.053-3.247a.667.667 0 0 0-.24-.744L1.67 7.19a.818.818 0 0 1 .483-1.478h3.4a.667.667 0 0 0 .635-.463l1.033-3.22a.818.818 0 0 1 1.557 0l1.034 3.22a.667.667 0 0 0 .634.463h3.4a.818.818 0 0 1 .483 1.478h-.001Z"
        fill="#292221"
      />
    </g>
    <defs>
      <clipPath id="star_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgStar