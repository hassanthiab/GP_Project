import React,{useState,useEffect} from 'react'
import NavBar from './Sidebar'
import axios from "../axios/axios";
import FeedCard from "./FeedCard"
import  Pagination  from '@mui/material/Pagination'
import NavTop from "../Homepage/NavTop";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
const Input = styled('input')({
  display: 'none',
});
function Feed(){
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState();
  const [image, setImage] = useState("");

  const [input, setInput] = useState({
    title:"",
    post:"",

  });

  const [errors, setErrors] = useState({
    title:"",
    post:"",
 

  });
  useEffect(() => {
    axios().get('/api/posts').then((response)=>{
      setData(response.data.data)
      setLinks(response.data.links)
      setCount(response.data.last_page)
      setLink(response.data.links[1].url)
    }).catch((error)=>{if(!error.response)return})
    }, []);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const imageHandler = (e) => {
      setImage(e.target.files[0])
    }
    const addPost=()=>{
    
      const formData = new FormData();
      formData.append('title',input['title']);
      formData.append('post',input['post']);
      formData.append('image',image);
  
                axios()
                .post("/api/admin/addPost/",formData)
                .then((response) => {
                  if(response.status==200){
                    handleClose()
                    var myToastEl = document.getElementById('myToastEl1')
                    var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
                    var myToastEl = document.getElementById('toast-body')
                    myToastEl.innerHTML="New post has been posted";
                    myToast.show()
                    setErrors({
                      title:"",
                      post:"",
                 
                    });
                    setInput({
                      title:"",
                      post:"",
                 
                    });
                    setImage()
                    axios().get(link).then((response)=>{
                      setData(response.data.data)
                      setLinks(response.data.links)
                      setCount(response.data.last_page)
                      if(response.data.from==null){
                        axios().get(response.data.prev_page_url).then((response)=>{
                          setData(response.data.data)
                          setLinks(response.data.links)
                          setCount(response.data.last_page)
                          
                        }).catch((error)=>{if(!error.response)return})
                      }
                      
                    }).catch((error)=>{if(!error.response)return})
               
                  }
                  
                })
                .catch((error) => {
            
                  if (!error.response) return;
                  let Reserrors = error.response.data.errors;
            
                  let stateErrrors = { ...errors };
                if(!Reserrors) return;
                  Object.keys(errors).forEach((element) => {
                    if (Object.keys(Reserrors).includes(element)) {
                      stateErrrors[element] = Reserrors[element];
                    } else {
                      stateErrrors[element] = "";
                    }
                  });
            
                  setErrors(stateErrrors);
                  setImage()
              });
    }
  
    const handleClose = () => {
      setImage()
      setOpen(false);
      setErrors({
        title:"",
        post:"",
   
      });
      setInput({
        title:"",
        post:"",
   
      });
    };
    let changed = (event, inputId) => {
  
      let Sinput = { ...input };
      Sinput[inputId] = event.target.value;
      setInput(Sinput);
  
    
    };
    const Delete=(id)=>{
      axios().delete('/api/admin/deletePost/'+id).then((response)=>{
        var myToastEl = document.getElementById('myToastEl1')
        var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl) // Returns a Bootstrap toast instance
        var myToastEl = document.getElementById('toast-body')
        myToastEl.innerHTML="post has been Deleted";
        myToast.show()
        axios().get(link).then((response)=>{
          setData(response.data.data)
          setLinks(response.data.links)
          setCount(response.data.last_page)
          if(response.data.from==null){
            axios().get(response.data.prev_page_url).then((response)=>{
              setData(response.data.data)
              setLinks(response.data.links)
              setCount(response.data.last_page)
              
            }).catch((error)=>{if(!error.response)return})
          }
          
        }).catch((error)=>{if(!error.response)return})
      }).catch((error)=>{if(!error.response)return})
    }
    const changedUrl=(event)=>{
setLink(links[event.target.textContent].url)
axios().get(links[event.target.textContent].url).then((response)=>{
  console.log(response)
  setData(response.data.data)
  setLinks(response.data.links)
}).catch((error)=>{if(!error.response)return})
    }
return (
  <React.Fragment>
  {localStorage.getItem('type')=='admin/'?<NavBar/>:<NavTop/>}
  <div className='container'> 
  
  <div className='row' style={{marginTop:'10px'}}>
        <div className='col-md-4'>

        </div>
        <div className='col-md-4' >
       {localStorage.getItem('type')=='admin/'? <button  onClick={handleClickOpen} class="bn54" style={{marginLeft:'30%'}}>
    <span class="bn54span">New Post</span>
  </button>:""}
 
        </div>
        <div className='col-md-4'>
        </div>

     
      </div>
  <div className='row' style={{marginTop:'10px'}}>

  {data[0]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard 
      Delete={()=>Delete(data[0].id)}
        id={data[0].id}
        title={data[0].title}
         date={new Date(data[0].created_at).toLocaleDateString()}
           img={data[0].image?data[0].image:null}
           post={data[0].post}
         />
        </div>:""}

        {data[1]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard 
       Delete={()=>Delete(data[1].id)}
           id={data[1].id}
        title={data[1].title}
         date={new Date(data[1].created_at).toLocaleDateString()}
           img={data[1].image?data[1].image:null}
           post={data[1].post}
         />
        </div>:""}

        {data[2]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard
          Delete={()=>Delete(data[2].id)}
           id={data[2].id}
         title={data[2].title}
         date={new Date(data[2].created_at).toLocaleDateString()}
           img={data[2].image?data[2].image:null}
           post={data[2].post}
         />
        </div>:""}
      </div>
 
      <div className='row' style={{marginTop:'100px'}}>
      {data[3]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard 
           Delete={()=>Delete(data[3].id)}
        title={data[3].title}
         date={new Date(data[3].created_at).toLocaleDateString()}
           img={data[3].image?data[3].image:null}
           post={data[3].post}
         />
        </div>:""}

        {data[4]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard
            Delete={()=>Delete(data[4].id)}
         title={data[4].title}
         date={new Date(data[4].created_at).toLocaleDateString()}
           img={data[4].image?data[4].image:null}
           post={data[4].post}
         />
        </div>:""}


{data[5]?<div className='col-md-4' style={{marginTop:'10px'}}>
        <FeedCard 
            Delete={()=>Delete(data[5].id)}
        title={data[5].title}
         date={new Date(data[5].created_at).toLocaleDateString()}
           img={data[5].image?data[5].image:null}
           post={data[5].post}
         />
        </div>:""}
   

      </div>
      <div className='row' style={{marginTop:'100px',marginBottom:'50px'}}>
        <div className='col-md-4'style={{marginTop:'10px'}}>
        
        </div>
        <div className='col-md-4' style={{marginTop:'10px'}}>
       
 
        </div>
        <div className='col-md-4' style={{marginTop:'10px'}}>
        <Pagination onChange={(event)=>changedUrl(event)} count={count} hidePrevButton hideNextButton />
        </div>
      </div>
  </div>

  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={input['title']}
            onChange={(event) => changed(event,"title")}
          />
          <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["title"]}
                  </label>
              <TextField
            autoFocus
            margin="dense"
            multiline
            id="info"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={input['post']}
            onChange={(event) => changed(event,"post")}
          />
          <label style={{ color: "#960000", fontWeight: "bold" }}>
                    {errors["post"]}
                  </label>
                  <br/>
          <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file"  onChange={imageHandler}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addPost}>Create new</Button>
        </DialogActions>
        
      </Dialog>
</React.Fragment>

)

} export default Feed

