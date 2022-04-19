import React from 'react'
import "./TrainerCard.css"
import img from "../../Images/LoginBackground.jpg"
function TrainerCard() {
  return (
    <div class="page-content">
    <div class="card" style={{backgroundImage: "url(https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)"}}>
        <div class="content">
            <h2 class="title">Hassan Thiab</h2>
            <p class="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p><button class="btn">Check Courses</button>
        </div>
    </div>
    <div class="card">
        <div class="content">
            <h2 class="title">Hassan Thiab</h2>
            <p class="copy">Plan your next beach trip with these fabulous destinations</p><button class="btn">Check Courses</button>
        </div>
    </div>
    <div class="card">
        <div class="content">
            <h2 class="title">Hassan Thiab</h2>
            <p class="copy">It's the desert you've always dreamed of</p><button class="btn">Check Courses</button>
        </div>
    </div>
    <div class="card">
        <div class="content">
            <h2 class="title">Hassan Thiab</h2>
            <p class="copy">Seriously, straight up, just blast off into outer space today</p><button class="btn">Check Courses</button>
        </div>
    </div>
    </div>
  )
}

export default TrainerCard
