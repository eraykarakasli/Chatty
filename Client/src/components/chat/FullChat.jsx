import ChatUser from './ChatUser'
import ChatContent from './ChatContent'
import ChatInput from './ChatInput'
import { useSelector, useDispatch } from "react-redux";
import GroupMembers from '../groupChat/GroupMembers';

const FullChat = () => {
    const { groupMembers } = useSelector((state) => state.navbar);
    return (
        <div className='h-screen'>
            <div className='h-[8%]'>
                <ChatUser />
            </div>
            {!groupMembers ?
                <>
                    <div className='h-[84%] overflow-y-scroll'>
                        <ChatContent />
                    </div>
                    <div className='h-[8%]'>
                        <ChatInput />
                    </div>
                </> :
                    <div>
                        <GroupMembers />
                    </div>
            }
        </div>
    )
}

export default FullChat