import Logo from "./navbar/Logo"
import OnlineMembers from "./navbar/OnlineMembers";

const Navbar = () => {
  return (
   <div className={`h-screen border-r border-gray-500 w-full overflow-hidden hidden lg:block`}>
      <div className="h-[10%] min-h-[70px]">
        <Logo />
      </div>
      <div className="h-[90%] w-full min-h-[150px] border-b border-gray-500">
        <OnlineMembers />
      </div>
      {/* <div className="h-[20%] flex items-center min-h-[120px]">
        <MidOption />
      </div> */}
      {/* <div className="h-[30%] flex items-end justify-center pb-4 ">
        <BottomOption />
      </div> */}
    </div>
    
  )
}

export default Navbar