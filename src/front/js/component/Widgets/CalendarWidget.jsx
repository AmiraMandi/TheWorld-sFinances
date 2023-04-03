import React from "react";
import { EconomicCalendar } from "react-ts-tradingview-widgets";
export const EconomyCalendarWidget = () => {
    return (
        <div className="container mx-auto" >
            <h1>Economic Calendar</h1>

          <EconomicCalendar colorTheme="light" height="600" width="100%" classname="mx-auto"></EconomicCalendar>  
        </div>
        
    )
};
export default EconomyCalendarWidget