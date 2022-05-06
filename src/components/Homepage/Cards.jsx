import React ,{ useState, useEffect }  from 'react'
import img from "../../Images/LoginBackground.jpg";
import { Grow } from "@material-ui/core";
import Container from "../Login/ContainerBox";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
function Cards() {
const [data, setData] = useState([]);
  useEffect(() => {
    axios().get('api/threeT').then((response) => { 
      setData(response.data)

    }).catch((error) => {
      if(!error.response) return

    })
   
  }, []);
  return (
    <Grow in="true" style={{ transformOrigin: "0 0 0" }}>
      <React.Fragment>
        <h1 className="text-center text-white text-capitalize">
          Check out our Tournaments!
        </h1>
        <div class="container">
          <div class="row">
            <div class="col-sm  hover-zoom">
              <div class="card" style={{ width: "18 rem" }}>
                <img src={img} class="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">{data[0]?'Tile : '+data[0].name:''}</h5>
                  <p class="card-text">{data[0]?'Date : '+data[0].date:''}</p>
                  <Link to={'/UserTournament'} class="btn btn-primary">
                  Check our tournaments
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm  hover-zoom">
              <div class="card" style={{ width: "18 rem" }}>
                <img src={img} class="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">{data[1]?'Tile : '+data[1].name:''}</h5>
                  <p class="card-text">{data[1]?'Date : '+data[1].date:''}</p>
                  <Link to={'/UserTournament'} class="btn btn-primary">
                  Check our tournaments
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm  hover-zoom">
              <div class="card" style={{ width: "18 rem" }}>
                <img src={img} class="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">{data[2]?'Tile : '+data[2].name:''}</h5>
                  <p class="card-text">{data[2]?'Date : '+data[2].date:''}</p>
                  <Link to={'/UserTournament'} class="btn btn-primary">
                  Check our tournaments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Grow>
  );
}

export default Cards;
