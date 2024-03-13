import ChatUser from './ChatUser'
import ChatContent from './ChatContent'
import ChatInput from './ChatInput'

const FullChat = () => {
    
    return (
        <div className='h-screen'>
            <div className='h-[8%]'>
                <ChatUser />
            </div>
            <div className='h-[84%] overflow-y-scroll'>
                <ChatContent  />
            </div>
            <div className='h-[8%]'>
                <ChatInput />
            </div>
        </div>
    )
}

export default FullChat