import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setStartChat } from "../../redux/features/recentUserSlice";
import {useNavigate} from 'react-router-dom'

const Logo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickLogo = () => {
    dispatch(setStartChat(false))
    navigate('/')
  }
  return (
    <div onClick={handleClickLogo} className="p-3 w-full flex justify-center text-[#7269EF] cursor-pointer">
      <HiChatBubbleLeftEllipsis size={40} />
    </div>
  )
}

export default Logo