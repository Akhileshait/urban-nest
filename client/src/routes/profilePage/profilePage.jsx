import Chat from '../../components/chat/chat'
import List from '../../components/list/list'
import './profilePage.scss'

function ProfilePage(){
  return (
    <div className='profilePage'>
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <button>Update Profile</button>
                </div>
                <div className="info">
                    <span>Avatar: <img src="" alt="" /></span>
                    <span>Username: <b>John Doe</b></span>
                    <span>E-mail: <b>john@gmail.com</b></span>
                </div>
                <div className="title">
                    <h1>My List</h1>
                    <button>Create New Post</button>
                </div>
                <List></List>

                <div className="title">
                    <h1>Saved List</h1>
                  
                </div>
                <List></List>
            </div>
        </div>
        <div className="chatContainer">
            <div className="wrapper">
                <Chat/>

            </div>
        </div>
    </div>
  )
}

export default ProfilePage