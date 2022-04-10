import * as React from 'react'
import { SVGProps } from 'react'

const SvgCalendarWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.5 1H9V.5a.5.5 0 0 0-1 0V1H4V.5a.5.5 0 0 0-1 0V1h-.5A2.503 2.503 0 0 0 0 3.5v6A2.503 2.503 0 0 0 2.5 12h7A2.503 2.503 0 0 0 12 9.5v-6A2.503 2.503 0 0 0 9.5 1ZM1 3.5A1.5 1.5 0 0 1 2.5 2h7A1.5 1.5 0 0 1 11 3.5V4H1v-.5ZM9.5 11h-7A1.5 1.5 0 0 1 1 9.5V5h10v4.5A1.5 1.5 0 0 1 9.5 11Z"
      fill="#fff"
    />
  </svg>
)

export default SvgCalendarWhite
