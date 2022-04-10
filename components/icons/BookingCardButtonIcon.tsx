import * as React from 'react'
import { SVGProps } from 'react'

const SvgBookingCardButtonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#booking_card_button_icon_svg__a)">
      <path
        d="M9.5 1H4.978a2.483 2.483 0 0 0-1.973.966l-2.9 3.727a.5.5 0 0 0 0 .614l2.9 3.727A2.483 2.483 0 0 0 4.978 11H9.5A2.503 2.503 0 0 0 12 8.5v-5A2.503 2.503 0 0 0 9.5 1ZM11 8.5A1.5 1.5 0 0 1 9.5 10H4.978a1.49 1.49 0 0 1-1.184-.579L1.134 6l2.66-3.421A1.49 1.49 0 0 1 4.978 2H9.5A1.5 1.5 0 0 1 11 3.5v5ZM8.603 5.104 7.707 6l.896.897a.5.5 0 1 1-.707.707L7 6.707l-.897.897a.5.5 0 0 1-.707-.707L6.293 6l-.897-.896a.5.5 0 0 1 .707-.707L7 5.293l.896-.896a.5.5 0 0 1 .707.707Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="booking_card_button_icon_svg__a">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgBookingCardButtonIcon
