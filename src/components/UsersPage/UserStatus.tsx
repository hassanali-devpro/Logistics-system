import { Box, Typography } from '@mui/material'

import { capitalizeFirstLetterOnly } from '../../shared/helpers/applicationHelpers'
import {
  formatDateFromTimestamp,
  getTimeDifference,
  isTimestampInPast,
  timeAgo
} from '../../shared/helpers/unixTimestampHelpers'

import { USER_STATUSES } from './constants'

export const UserStatus = ({ activity }: { activity: any }) => {
  const getStatusInfo = () => {
    switch (activity?.status) {
      case USER_STATUSES.INVITATION_SENT: {
        if (isTimestampInPast(activity?.tmpPasswordExpiresAt)) {
          return {
            topInfo: 'Invitation link expired at',
            bottomInfo: `${formatDateFromTimestamp(activity?.tmpPasswordExpiresAt, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.tmpPasswordExpiresAt)}`
          }
        } else {
          return {
            topInfo: `Invitation sent ${timeAgo(activity?.date)}`,
            bottomInfo: `Expires in ${getTimeDifference(activity?.tmpPasswordExpiresAt, new Date().getTime())}`
          }
        }
      }

      case USER_STATUSES.ACTIVE_UPDATE:
        return {
          topInfo: capitalizeFirstLetterOnly(activity?.description),
          bottomInfo: `${formatDateFromTimestamp(activity?.date, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.date)}`
        }

      case USER_STATUSES.PASSWORD_VERIFIED:
        return {
          topInfo: 'Password verified',
          bottomInfo: `${formatDateFromTimestamp(activity?.date, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.date)}`
        }

      case USER_STATUSES.ACTIVE:
        return {
          topInfo: capitalizeFirstLetterOnly(activity?.description),
          bottomInfo: `${formatDateFromTimestamp(activity?.date, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.date)}`
        }

      case USER_STATUSES.DELETED:
        return {
          topInfo: 'Account deleted on',
          bottomInfo: `${formatDateFromTimestamp(activity?.date, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.date)}`
        }

      case USER_STATUSES.DEACTIVATED:
        return {
          topInfo: 'Account deactivated on',
          bottomInfo: `${formatDateFromTimestamp(activity?.date, 'MMM. DD YYYY', ' ')} . ${timeAgo(activity?.date)}`
        }

      default:
        return {
          topInfo: 'No activity'
        }
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <Typography color="#8B93A7" variant="caption">
        {getStatusInfo().topInfo}
      </Typography>

      <Typography color="#8B93A7" variant="caption">
        {getStatusInfo().bottomInfo}
      </Typography>
    </Box>
  )
}
