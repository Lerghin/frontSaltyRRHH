

const LogInDropdown = ({login, setLogin}) => {
    const handleClick=()=>{
        setLogin(!login)
    }
  return (
    <div onClick={handleClick} className=" cursor-pointer  absolute flex right-5 top-15 text-white  font-medium text-lg flex-col gap-4 bg-teal-700 p-2 border border-gray-400 rounded-md">

    <img src="https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png" alt="person" className="w-5 h-5" />

    </div>
  )
}

export default LogInDropdown