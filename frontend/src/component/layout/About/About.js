import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/hannan_.01";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ds3fookkk/image/upload/v1679602227/avatars/Hannan_pic_xqxidb.jpg"
              alt="Founder"
            />
            <Typography>Muhammad Hannan</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a practice project ecommerce wesbite made by me, Muhammad Hannan. I made this to leanrn MERN stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Contact</Typography>


            <a href="https://www.instagram.com/hannan_.01" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;