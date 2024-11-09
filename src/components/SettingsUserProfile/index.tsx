import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Typography } from '@mui/material'

import { Breadcrumbs, ProfileImageUpdate } from '../../shared/components'
import { Delay } from '../../shared/components/Delay'
import { useGetUserProfileQuery, useUpdateProfileImageMutation } from '../../wms-store/services/authService'
import { AccountInformationCard } from '../UserProfile/AccountInformationCard'
import { EmergencyContactCard } from '../UserProfile/EmergencyContactCard'
import { PersonalInformationCard } from '../UserProfile/PersonalInformationCard'
import { SecurityInformationCard } from '../UserProfile/SecurityInformationCard'
import { UserStatus } from '../UsersPage/UserStatus'
import { UserStatusPill } from '../UsersPage/UserStatusPill'

const SettingsUserProfile = () => {
  const location = useLocation()
  const userKey = location.state.userKey
  const { isLoading: isLoadingProfile, isFetching: isFetchingProfile } = useGetUserProfileQuery({ userKey })
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation()
  const currentUser = useSelector((state: any) => state.auth.currentUser)
  const currentProfile = useSelector((state: any) => state.auth.userProfiles[userKey])
  const [selectedImage, setSelectedImage] = useState<string | null>(currentProfile?.image)

  const isProfileLoading = isLoadingProfile || isFetchingProfile

  const handleImageUpdate = (file: File) => {
    const profilePictureData = new FormData()
    profilePictureData.append('image', file)

    updateProfileImage({ payload: profilePictureData, userKey: currentUser?._id })
      .then((res) => {
        if (res?.data?.status === 1) {
          toast.success('Profile image updated successfully')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Add beforeunload listener when isLoading is true
  // to restrict user from navigating to a different page while
  // image is being uploaded
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isLoading) {
        event.preventDefault()
        return 'The profile image update is still in progress. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isLoading])

  return (
    <Box display="flex" flexDirection="column" height="100vh" className="py-6 md:py-4 sm:py-2 px-12 md:px-8 sm:px-4">
      <Breadcrumbs />

      {isProfileLoading ? (
        <Delay />
      ) : (
        <Box className="xl:w-[932px]">
          <Box display="flex" gap="16px">
            <img src={currentUser?.image} className="rounded-full w-16 h-16" alt="profile" />

            <Box display="flex" flexDirection="column" gap="2px">
              <Typography variant="h3" color="#1A1D23" fontWeight={700}>
                {currentUser?.givenName} {currentUser?.lastName}
              </Typography>

              <Typography textTransform="capitalize" variant="h6" color="#8B93A7">
                {currentUser?.role}
              </Typography>
            </Box>
          </Box>

          <Box py="16px">
            <div className="flex flex-col px-4 sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <ProfileImageUpdate
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  handleImageUpdate={handleImageUpdate}
                />
              </div>

              <div className="flex flex-col justify-center gap-4">
                <Box display="flex" flexDirection="column" gap="2px">
                  <Typography variant="h3" color="#1A1D23" fontWeight={700}>
                    {currentProfile?.givenName} {currentProfile?.lastName}
                  </Typography>

                  <Typography textTransform="capitalize" variant="h6" color="#8B93A7">
                    {currentProfile?.role}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="16px">
                  <UserStatusPill status={currentProfile?.status} />

                  <UserStatus
                    activity={{
                      ...currentProfile?.activity?.[0],
                      tmpPasswordExpiresAt: currentProfile?.tmpPasswordExpiresAt
                    }}
                  />
                </Box>
              </div>
            </div>
          </Box>

          <Box my="16px" display="flex" flexDirection="column" gap="16px">
            <PersonalInformationCard header="User Information" currentUser={currentProfile} />

            <SecurityInformationCard currentUser={currentProfile} isReset />

            <EmergencyContactCard currentUser={currentProfile} />

            <AccountInformationCard currentUser={currentProfile} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SettingsUserProfile
