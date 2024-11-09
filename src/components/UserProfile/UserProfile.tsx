import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Breadcrumbs, ProfileImageUpdate } from '../../shared/components'
import { useUpdateProfileImageMutation } from '../../wms-store/services/authService'

import { EmergencyContactCard } from './EmergencyContactCard'
import { PersonalInformationCard } from './PersonalInformationCard'
import { SecurityInformationCard } from './SecurityInformationCard'

import 'react-datepicker/dist/react-datepicker.css'

const UserProfile = () => {
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation()
  const currentUser = useSelector((state: any) => state.auth.currentUser)
  const [selectedImage, setSelectedImage] = useState<string | null>(currentUser?.image)

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-2 md:px-12 px-4 xl:w-[932px] mb-5">
        <Breadcrumbs />

        <div className="flex flex-col">
          <div className="flex flex-col px-4 sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <ProfileImageUpdate
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleImageUpdate={handleImageUpdate}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl sm:text-2xl font-semibold text-gray-900">
                {currentUser?.givenName} {currentUser?.lastName}
              </div>
              <div className="capitalize text-base sm:text-lg text-gray-500">{currentUser?.type ?? 'Admin'}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <PersonalInformationCard currentUser={currentUser} />

            <SecurityInformationCard currentUser={currentUser} />

            <EmergencyContactCard currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
