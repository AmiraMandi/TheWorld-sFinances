import React from "react";
import { EconomicCalendar } from "react-ts-tradingview-widgets";
export const EconomyCalendarWidget = () => {
    return (
        <div className="container mx-auto" >
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <br />
                <h1>Economic Calendar</h1>
                <br />
                 <EconomicCalendar colorTheme="light" height="600" width="100%" classname="mx-auto"></EconomicCalendar>  
                </div>
               
            </div>
          
        </div>
        
    )
};
export default EconomyCalendarWidget