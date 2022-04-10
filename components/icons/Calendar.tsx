import * as React from 'react'
import { SVGProps } from 'react'

const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#calendar_svg__a)" fill="#292221">
      <path d="M12.667 1.333H12V.667a.666.666 0 1 0-1.333 0v.666H5.333V.667A.667.667 0 1 0 4 .667v.666h-.667A3.337 3.337 0 0 0 0 4.667v8A3.337 3.337 0 0 0 3.333 16h9.334A3.337 3.337 0 0 0 16 12.667v-8a3.338 3.338 0 0 0-3.333-3.334ZM1.333 4.667a2 2 0 0 1 2-2h9.334a2 2 0 0 1 2 2v.666H1.333v-.666Zm11.334 10H3.333a2 2 0 0 1-2-2v-6h13.334v6a2 2 0 0 1-2 2Z" />
      <path d="M8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM4.667 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM11.333 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </g>
    <defs>
      <clipPath id="calendar_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgCalendar
