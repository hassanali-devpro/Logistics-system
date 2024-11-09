import { Tooltip, Typography } from '@mui/material'

import { InfoIcon } from '../../icons'

export const PasswordStrengthIndicator = ({
  password,
  passwordStrength,
  passwordStrengthParams
}: {
  password: string
  passwordStrengthParams: { [key: string]: boolean }
  passwordStrength: any
}) => {
  const passwordStrengthParamKeys = ['length', 'smallLetters', 'capitalLetters', 'numbers', 'specialCharacters']

  const getTooltipContent = () => {
    return (
      <Typography variant="caption">
        To increase password strength, make sure your password:
        <ul className="list-disc pl-4">
          {!passwordStrengthParams.length && <li>Must contains at least 8 characters</li>}
          {!passwordStrengthParams.smallLetters && <li>Use lower case characters</li>}
          {!passwordStrengthParams.capitalLetters && <li>Use upper case characters</li>}
          {!passwordStrengthParams.numbers && <li>Use numbers</li>}
          {!passwordStrengthParams.specialCharacters && <li>Optionally use special characters</li>}
        </ul>
      </Typography>
    )
  }

  return password === '' ? (
    <p className="text-sm mt-2 text-[#8B93A7]">
      Must contains at least 8 characters, including upper and lower case characters and numbers
    </p>
  ) : (
    <div className="mb-4">
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <div
          className="h-1 rounded-full"
          style={{
            width: passwordStrength.width,
            backgroundColor: passwordStrength.color
          }}></div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm mt-2">
          Password strength: <span className={`${passwordStrength.textColor}`}> {passwordStrength.text} </span>
        </p>

        {passwordStrengthParamKeys.some((key) => !passwordStrengthParams[key]) && (
          <Tooltip className="cursor-pointer" arrow title={getTooltipContent()}>
            <div>
              <InfoIcon size={20} />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
