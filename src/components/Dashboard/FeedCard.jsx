
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../axios/axios";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const Delete=(id)=>{
  //   axios().delete('/api/admin/deletePost/'+id).then((response)=>{
  //   }).catch((error)=>{if(!error.response)return})
  // }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
    
    action={
 
      localStorage.getItem('type')=='admin/'?
       <IconButton onClick={()=>props.Delete()} aria-label="settings">
            <DeleteIcon />
          </IconButton>:''
       

        }
      
        title={props.title}
        subheader={props.date}
      />
    {props.img? <CardMedia
        component="img"
        height="194"
        image={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/${props.img}`}
        alt={props.img}
      />:    <CardMedia
        component="img"
        height="194"
         image={`http://${process.env.REACT_APP_HOST_BACKEND}:8000/storage/bpp.webp`}
        alt={props.img}
      />   }
  
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>POST:</Typography>
          <Typography paragraph>
            {props.post}
          </Typography>


        </CardContent>
      </Collapse>
    </Card>
  );
}