import React from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

export const ShowPasswordIcon = ({
  showPassword,
  setShowPassword
}: {
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const toggle = () => setShowPassword(!showPassword)

  return (
    <div className="mr-2">
      {!showPassword ? (
        <IconEye onClick={toggle} size={24} color="#8B93A7" className="cursor-pointer" />
      ) : (
        <IconEyeOff onClick={toggle} size={24} color="#8B93A7" className="cursor-pointer" />
      )}
    </div>
  )
}
