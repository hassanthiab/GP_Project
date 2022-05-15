import React,{useEffect,useState} from "react";
import NavBar from '../Dashboard/Sidebar'
import NavTop from '../Homepage/NavTop'
import "./chat.css"
import axios from "../axios/axios";
import Button from '@mui/material/Button';

const Chat=()=>{
let a=localStorage.getItem('type')
const [persons, setPersons] = useState([]);
const [messages, setMessages] = useState([]);
const [to, setTo] = useState();
const [roomId, setRoomId] = useState();
const [myUsername, setMyUsername] = useState();
const [input, setInput] = useState({
    MessageText:"",
  });
  let message=[]
  let person=[]
  let room=[]
  let username=''
  let pusher


let changed = (event, inputId) => {


    let Sinput = { ...input };
    Sinput[inputId] = event.target.value;
    setInput(Sinput);
    console.log(event.target.value)


  };
  const selectUser=(id)=>{

    message=[]
    person=[]
      for(let i=0;i<room.length;i++){
       
          if(room[i].id==id)
       {setTo(<span>To: <span class="name"> {room[i].username} </span></span>)
       if(pusher)
       pusher.disconnect();
       Pusher.logToConsole = true;

       pusher = new Pusher('e698a4bb48003226df99',
       {
        cluster: 'ap2'
       });
       let channel = pusher.subscribe('chat-channel.'+room[i].username+'.'+username);
          
       channel.bind('chat_event', function(data) {
        message=[...message]
           message.push(<li class="chat-left" key={data.id}>
           <div class="chat-avatar">
               <div class="chat-name">{data.SecondUsername}</div>
           </div>
           <div class="chat-text">{data.message}
            </div>
           {/* <div class="chat-hour">08:55 <span class="fa"></span></div> */}
       </li>)
      
         setMessages([...message])
      
       });
    }
    setRoomId(id)
        person.push(<li  onClick={()=>selectUser(room[i].id)} class={room[i].id==id?"person active-user":"person"} key={room[i].id} data-chat={"person"+i+1}>
        <div class="user">
            <img  src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${room[i].profile_picture?room[i].profile_picture:'bpp.webp'}`}alt="Retail Admin"/>
            <span class="status busy"></span>
        </div>
        <p class="name-time">
            <span class="name">{room[i].roomName}</span>
            <span class="time">{room[i].username}</span>
        </p>
    </li>)}
    setPersons(person)


    axios()
    .get("/api/"+a+"getMessages/"+id)
    .then((response) => {
        for(let i=0;i<response.data.length;i++){
            if(username==response.data[i].Username){
                message.push(  <li class="chat-right" key={response.data[i].id}> 
                {/* <div class="chat-hour">08:56 <span class="fa"></span></div> */}
                <div class="chat-text">{response.data[i].MessageText}
                  </div>
                <div class="chat-avatar">
                    <div class="chat-name">{username}</div>
                </div>
            </li>)
            }
            else {
                message.push(    <li class="chat-left" key={response.data[i].id}>
                <div class="chat-avatar">
                    <div class="chat-name">{username==response.data[i].room.FirstUserUsername?response.data[i].room.SecondUserUsername:response.data[i].room.FirstUserUsername}</div>
                </div>
                <div class="chat-text">{response.data[i].MessageText}
                 </div>
                {/* <div class="chat-hour">08:55 <span class="fa"></span></div> */}
            </li>)

            }
        }
        setMessages(message)

    })
    .catch((error) => {
    
      if(!error.response)
    return
  
  
  }
    
    );
      
  }
const sendMessage=()=>{
    axios()
    .post("/api/"+a+"sendMessage/"+roomId,{'MessageText':input['MessageText']})
    .then((response) => {
        message=messages
        message.push(  <li class="chat-right" key={response.data.id}> 
        {/* <div class="chat-hour">08:56 <span class="fa"></span></div> */}
        <div class="chat-text">{input['MessageText']}
          </div>
        <div class="chat-avatar">
            <div class="chat-name">{myUsername}</div>
        </div>
    </li>)
          
             setMessages(message)
             const textarea = document.getElementById('message');
            textarea.value = '';
             setInput({MessageText:"",})
     
    })
    .catch((error) => {
      if(!error.response)
    return
  
  
  }
    
    );
}
    useEffect(() => {
        let toUsername=''
 
        
 
       
        axios()
        .get("api/"+a+"user")
        .then((response) => {
            setMyUsername(response.data.username)
            username=response.data.username

           
            axios()
            .get("/api/"+a+"getUserRooms")
            .then((response) => {
                room=response.data
               toUsername= response.data[0].username
               setRoomId(response.data[0].id)
               Pusher.logToConsole = true;

  pusher = new Pusher('e698a4bb48003226df99',
  {
   cluster: 'ap2'
  });
       
           let channel = pusher.subscribe('chat-channel.'+toUsername+'.'+username);
          
           channel.bind('chat_event', function(data) {
               message.push(<li class="chat-left" key={data.id}>
               <div class="chat-avatar">
                   <div class="chat-name">{data.SecondUsername}</div>
               </div>
               <div class="chat-text">{data.message}
                </div>
               {/* <div class="chat-hour">08:55 <span class="fa"></span></div> */}
           </li>)
          
             setMessages([...message])
          
           });
                for(let i=0;i<response.data.length;i++)
     {
            person.push( <li  onClick={()=>selectUser(response.data[i].id)} class={i==0?"person active-user":"person"} key={response.data[i].id} data-chat={"person"+i+1}>
            <div class="user">
                <img  src={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${response.data[i].profile_picture?response.data[i].profile_picture:'bpp.webp'}`}alt="Retail Admin"/>
                <span class="status busy"></span>
            </div>
            <p class="name-time">
                <span class="name">{response.data[i].roomName}</span>
                <span class="time">{response.data[i].username}</span>
            </p>
        </li>)}
        setPersons(person)

        
        axios()
        .get("/api/"+a+"getMessages/"+response.data[0].id)
        .then((response) => {
           setTo(<span>To: <span class="name"> {username==response.data[0].room.FirstUserUsername?response.data[0].room.SecondUserUsername:response.data[0].room.FirstUserUsername}
            </span></span>)
            for(let i=0;i<response.data.length;i++){
                if(username==response.data[i].Username){
                    message.push(  <li class="chat-right" key={i}> 
                    {/* <div class="chat-hour">08:56 <span class="fa"></span></div> */}
                    <div class="chat-text">{response.data[i].MessageText}
                      </div>
                    <div class="chat-avatar">
                        <div class="chat-name">{username}</div>
                    </div>
                </li>)
                }
                else {
                    message.push(    <li class="chat-left" key={response.data[i].id}>
                    <div class="chat-avatar">
                        <div class="chat-name">{username==response.data[i].room.FirstUserUsername?response.data[i].room.SecondUserUsername:response.data[i].room.FirstUserUsername}</div>
                    </div>
                    <div class="chat-text">{response.data[i].MessageText}
                     </div>
                    {/* <div class="chat-hour">08:55 <span class="fa"></span></div> */}
                </li>)

                }
            }
            setMessages(message)
  
        })
        .catch((error) => {
        
          if(!error.response)
        return
      
      
      }
        
        );
            })
            .catch((error) => {
              if(!error.response)
            return
          
          
          }
            
            );

       

           
      
        })
        .catch((error) => {
          if(!error.response)
          return
        });
     
        return () => {
            if(pusher)
            pusher.disconnect();
          };
    }, []);
   
  return( 
    <React.Fragment>
     {localStorage.getItem('type')=='admin/'?<NavBar/>:<NavTop page='Chat'/>}


     <div class="container">

<div class="page-title">
    <div class="row gutters">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h5 class="title">Live Chat!</h5>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
    </div>
</div>

<div class="content-wrapper">

    <div class="row gutters">

        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

            <div class="card m-0">

                <div class="row no-gutters">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                        <div class="users-container">
                            {/* <div class="chat-search-box">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Search"/>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-info">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                            <ul class="users">
                          
                                {persons}
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                        <div class="selected-user">

                        {to}


                        </div>
                        <div class="chat-container">
                            <ul class="chat-box chatContainerScroll" id="messages">
                          {messages}
                                
                            </ul>
                            
					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
                        <textarea id="message" onChange={(event)=>changed(event,"MessageText")} class="form-control" rows="3" placeholder="Type your message here..."></textarea>			
                        				<Button onClick={sendMessage} >Send</Button>
						</div>
					</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>

</div>


    </React.Fragment>
     )



}
export default Chat