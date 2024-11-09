import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordUpdate: React.FC = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/auth')
  }

  return (
    <div className="2xl:w-[400px] sm:w-[366px] sm:mx-auto px-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#32CD85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 12l2 2l4 -4" />
      </svg>

      <div className=" max-w-xs">
        <h2 className="font-bold text-2xl mt-4 text-[#1A1D23]">Password Update Successfully!</h2>
        <p className="text-[#4F5668] my-4">You can now use your new password to log in</p>
      </div>
      <form>
        <button
          type="button"
          className="w-full h-11 bg-[#1F69FF] text-white rounded-lg mt-4 shadow-md"
          onClick={handleLogin}>
          Back to Log in
        </button>
      </form>
    </div>
  )
}

export default PasswordUpdate
