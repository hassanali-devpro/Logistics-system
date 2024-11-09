import { Box, Typography } from '@mui/material'

export const AvatarWithLabel = ({
  imgSrc,
  label,
  subLabel,
  largeText
}: {
  imgSrc: string
  label: string
  subLabel: string
  largeText?: boolean
}) => {
  return (
    <Box display="flex" alignItems="center" gap="8px">
      <img src={imgSrc} alt="User Profile" className="w-10 h-10 rounded-full" />

      <Box display="flex" flexDirection="column">
        <Typography variant={largeText ? 'body2' : 'subtitle1'} color="#353A46">
          {label}
        </Typography>

        <Typography variant={largeText ? 'subtitle1' : 'caption'} color="#8B93A7">
          {subLabel}
        </Typography>
      </Box>
    </Box>
  )
}
