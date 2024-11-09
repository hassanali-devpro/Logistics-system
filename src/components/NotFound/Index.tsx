import React from 'react'

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100 min-h-screen">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Whoops! 404</h1>
        <p className="text-lg md:text-xl text-gray-700">Page not Found</p>
      </div>
    </div>
  )
}

export default NotFound
