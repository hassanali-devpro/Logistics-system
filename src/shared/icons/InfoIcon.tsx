export const InfoIcon = ({ size = 16, fill = 'none', stroke = '#4F5668' }) => {
  switch (size) {
    case 20:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7.5" stroke={stroke} strokeWidth="1.66667" />
          <path d="M10 8.75V13.75" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" />
          <path d="M10 6.25V6.251" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" />
        </svg>
      )
    case 24:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <circle cx="12" cy="12.5" r="9" stroke={stroke} strokeWidth="2" />
          <path d="M12 11V17" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8V8.001" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${size}px`}
          height={`${size}px`}
          viewBox={`0 0 ${size} ${size}`}
          fill={fill}>
          <circle cx="8" cy="8" r="6" stroke={stroke} />
          <path d="M8 7V11" stroke={stroke} strokeLinecap="round" />
          <path d="M8 5V5.001" stroke={stroke} strokeLinecap="round" />
        </svg>
      )
  }
}
