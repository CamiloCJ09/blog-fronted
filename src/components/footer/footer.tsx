import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography
        variant="subtitle1"
        color="black"
        align="center"
        className="credits"
      >
        {"Copyright © "}
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="https://github.com/CamiloCJ09"
          className="links"
        >
          Camilo Campaz -
        </Link>{" "}
        
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;