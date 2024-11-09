import React from 'react'

const InProgressPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">This page is in progress</h1>
        <p className="text-lg md:text-xl text-gray-700">
          We're working hard to bring you new content. Please check back later!
        </p>
      </div>
    </div>
  )
}

export default InProgressPage
