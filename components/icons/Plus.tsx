import * as React from 'react'
import { SVGProps } from 'react'

const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.167 4.167H5.833V.833a.833.833 0 1 0-1.666 0v3.334H.833a.833.833 0 1 0 0 1.666h3.334v3.334a.833.833 0 1 0 1.666 0V5.833h3.334a.833.833 0 1 0 0-1.666Z"
      fill="#FF0103"
    />
  </svg>
)

export default SvgPlus
