import React from "react";
import "./homepage.style.scss";
import Directory from "../../components/diectory/directory.component";
import { HomePageContainer } from "./homepage.styles";

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
