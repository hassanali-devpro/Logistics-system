export const EditWarehouseIcon = ({ size = 16, fill = 'none', stroke = '#353A46' }) => {
  switch (size) {
    case 24:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 20V7L12 3L19.875 6.5M16.9999 12.0001L19.9999 15.0001M13 22L21.3849 13.5851C21.7787 13.1912 22 12.6571 22 12.1001C22 11.5431 21.7787 11.0089 21.3849 10.6151C20.9911 10.2213 20.4569 10 19.8999 10C19.3429 10 18.8088 10.2213 18.4149 10.6151L10 19V22H13Z"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
          <path
            d="M2.5 16.6667V5.83333L10 2.5L16.5625 5.41667M14.1666 10.0001L16.6666 12.5001M10.8333 18.3333L17.8208 11.3209C18.149 10.9927 18.3333 10.5476 18.3333 10.0834C18.3333 9.61926 18.149 9.17412 17.8208 8.84592C17.4925 8.51772 17.0474 8.33333 16.5833 8.33333C16.1191 8.33333 15.674 8.51772 15.3458 8.84592L8.33333 15.8334V18.3333H10.8333Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
