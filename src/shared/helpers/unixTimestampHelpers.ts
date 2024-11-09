export const isTimestampInPast = (timestamp: number): boolean => {
  const currentTimestamp = Date.now()

  return timestamp < currentTimestamp
}

export const formatDateFromTimestamp = (timestamp: number | string, format: string, separator = '/'): string => {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(Number(timestamp))
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthShort = monthNamesShort[date.getMonth()]

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}${separator}${month}${separator}${day}`

    case 'YYYY/MM/DD':
      return `${year}${separator}${month}${separator}${day}`

    case 'MMM DD YYYY':
      return `${monthShort}${separator}${day}${separator}${year}`

    case 'MMM. DD YYYY':
      return `${monthShort}.${separator}${day}${separator}${year}`

    case 'DD-MM-YYYY':
      return `${day}${separator}${month}${separator}${year}`

    case 'DD-MMM-YYYY':
      return `${day}${separator}${monthShort}${separator}${year}`

    case 'MM/DD/YYYY':
      return `${month}${separator}${day}${separator}${year}`

    default:
      throw new Error('Unsupported format')
  }
}

export const getTimeDifference = (timestamp1: number | string, timestamp2: number | string): string => {
  const diffInSeconds =
    Math.floor(
      Math.abs(
        (typeof timestamp1 === 'string' ? Number(timestamp1) : timestamp1) -
          (typeof timestamp2 === 'string' ? Number(timestamp2) : timestamp2)
      )
    ) / 1000

  const units: { unit: string; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ]

  for (const { unit, seconds } of units) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit}` : `${interval} ${unit}s`
    }
  }
  return 'just now'
}

export const timeAgo = (timestamp: number | string): string => {
  const now = new Date().getTime()
  const timeDifference = getTimeDifference(now, timestamp)

  return timeDifference === 'just now' ? timeDifference : `${timeDifference} ago`
}
