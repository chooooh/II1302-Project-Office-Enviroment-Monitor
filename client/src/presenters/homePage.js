import React from "react";

import { HomePageView } from "../views/homePageView.js";


export const HomePage = () => (
    React.createElement(HomePageView( {airQuality: 10, people: 10} )) //fetch params from database before
);