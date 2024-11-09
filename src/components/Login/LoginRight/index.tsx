import logoImage from '/images/Logo.png'

const index = () => {
  return (
    <div className="hidden md:flex justify-center w-full items-center bg-[#001338] bg-cover bg-center bg-no-repeat login-bg-img ">
      <div className=" max-w-[389.282] h-[120px]">
        <img className="" src={logoImage} alt="Logo" />
      </div>
    </div>
  )
}

export default index
