import React from "react";

export const About = () => {
  return (
    <div className="jumbotron">
      <span className="text-primary">
        <h1>
          <strong> About This Website </strong>
        </h1>{" "}
      </span>
      <h3 className="text-primary">
        {" "}
        <strong>
          This is EOD( End of Day) website in Which Exceutive and TeleCaller can
          login and can fill the daily update and can apply for leave and
          manager can login and see the data of every employee like daily update
          leave applied{" "}
        </strong>
      </h3>
      <h3 className="text-primary">
        Created by:- Kaushal Saraswat Student At Swami Keshvanand Institute of
        Technology{" "}
      </h3>
      <h3 className="text-primary">Technology Used:- REACTJS,NODEJS,MONGODB</h3>
    </div>
  );
};

export default About;
