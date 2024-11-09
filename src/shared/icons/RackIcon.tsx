export const RackIcon = ({ size = 16, fill = 'none', stroke = '#353A46' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill}>
      <g id="Custom-rack">
        <path
          id="Vector"
          d="M13.3334 13.3332V3.99984C13.3334 3.64622 13.1929 3.30708 12.9429 3.05703C12.6928 2.80698 12.3537 2.6665 12.0001 2.6665H4.00008C3.64646 2.6665 3.30732 2.80698 3.05727 3.05703C2.80722 3.30708 2.66675 3.64622 2.66675 3.99984V13.3332M2.66675 6.6665H13.3334M2.66675 10.6665H13.3334"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
