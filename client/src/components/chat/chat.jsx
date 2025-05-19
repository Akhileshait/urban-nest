import './chat.scss'

function Chat(){
    const chat=true;

  return (
    <div className='chat'>
        <div className="messages">
            <h1>Messages</h1>
            <div className="message">
                <img src="" alt="" />
                <span>John Doe</span>
                <p>Lorem ipsum dolor sit...........</p>
            </div>
            <div className="message">
                <img src="" alt="" />
                <span>John Doe</span>
                <p>Lorem ipsum dolor sit...........</p>
            </div>
            <div className="message">
                <img src="" alt="" />
                <span>John Doe</span>
                <p>Lorem ipsum dolor sit...........</p>
            </div>
        </div>
        {
            chat && (
                <div className='chatBox'>
            <div className="top">
                <div className="user">
                    <img src="" alt="" />
                    <span>John Doe</span>
                </div>
                <span className="close" onClick={() => {}}>
                    X
                    </span>
            </div>
            <div className="center">
                <div className="chatMessage">
                    <p>This is a dummy Message</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>This is a dummy Message</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>This is a dummy Message</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>This is a dummy Message</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>This is a dummy Message</p>
                    <span>1 hour ago</span>
                </div>
                
            </div>
            <div className="bottom">
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div>
            )
        }
    </div>
  )
}

export default Chat