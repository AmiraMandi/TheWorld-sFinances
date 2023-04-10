import React from "react";
import { EconomicCalendar } from "react-ts-tradingview-widgets";
export const EconomyCalendarWidget = () => {
    return (
        <div className="container mx-auto" >
            <br />
            <h1 className="d-flex justify-content-center">Economic Calendar</h1>
            <br />

          <EconomicCalendar colorTheme="light" height="600" width="100%" classname="mx-auto"></EconomicCalendar>  
        </div>
        
    )
};
export default EconomyCalendarWidget