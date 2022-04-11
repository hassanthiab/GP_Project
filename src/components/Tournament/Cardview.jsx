import React from "react";

import dayjs from "dayjs";
import "./Cardview.css";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@material-ui/core";
// import background from "../../Images/LoginBackground.jpg";
const Cardview = ({ items }) => {
  return (
    <React.Fragment>
      <div class="tournament_card" id="bright">
        <div class="info_section">
          <div class="tournament_header">
            <img class="locandina" src={`http://localhost:8000/storage/${items.image}`} />
            <h1>{items.name}</h1>
            <h4>{dayjs(items.date).format("DD MMMM YYYY")}</h4>
            <p class="type">
              {items.size} riders - {items.location}{" "}
            </p>
          </div>
          <div class="tournament_desc">
            <p class="text">{items.description}</p>
          </div>
          <div class="tournament_social">
            <ul>
              <li>
                <ShareIcon></ShareIcon>{" "}
              </li>
              <li>
                {" "}
                <Button varient="outline">Sign up</Button>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(http://localhost:8000/storage/${items.image})` }}
          class="blur_back"
        ></div>
      </div>
    </React.Fragment>
  );
};

export default Cardview;
