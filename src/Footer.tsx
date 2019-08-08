import React from "react";
const Footer: React.FC = () => {
  return (
    <footer
      className="footer mt-auto py-3 bg-primary fixed-bottom"
      style={{ color: "black", marginTop: "auto !important" }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <span className="text-muted">
          Made with 
          <i
            className="fa fa-heart"
            style={{ color: "red" }}
            aria-hidden="true"
          />{" "}
            By Infosys
        </span>
      </div>
    </footer>
  );
};

export default Footer;
