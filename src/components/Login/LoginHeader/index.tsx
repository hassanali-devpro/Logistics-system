import logoImage from '/images/Logo-top-left.png'

const index = () => {
  return (
    <div className="flex w-full px-5">
      <img src={logoImage} alt="Logo" className="w-40 py-4" />
    </div>
  )
}

export default index
