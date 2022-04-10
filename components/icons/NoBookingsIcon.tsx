import * as React from 'react'
import { SVGProps } from 'react'

const SvgNoBookingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={72}
    height={72}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M57 6h-3V3a3 3 0 0 0-6 0v3H24V3a3 3 0 0 0-6 0v3h-3A15.018 15.018 0 0 0 0 21v36a15.018 15.018 0 0 0 15 15h42a15.018 15.018 0 0 0 15-15V21A15.018 15.018 0 0 0 57 6ZM6 21a9 9 0 0 1 9-9h42a9 9 0 0 1 9 9v3H6v-3Zm51 45H15a9 9 0 0 1-9-9V30h60v27a9 9 0 0 1-9 9Z"
      fill="#292221"
      fillOpacity={0.5}
    />
  </svg>
)

export default SvgNoBookingsIcon
