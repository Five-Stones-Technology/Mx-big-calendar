import React, {createElement} from "react";
import { Calendar, dateFnsLocalizer } from 'fs-big-calendar'

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import "./ui/FSCalendar.css";
import events from './test/testevents.js'


const FSCalendar = (props) => {
    const [state, setState] = React.useState({ checkDate: null, defaultDate: props.startDate ? props.startDate.value : new Date(2015, 3, 1), helloWorld: "HWorld" });

    const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
        'en-US': enUS,
        },
    })
    
    // const defaultDate = props.startDate ? props.startDate.value : new Date(2015, 3, 1);
    // const checkDate = null;
    // const helloWorld = 'HelloWOrld';

    const handleDateSelect = ({start, end}) => {
        setState({ ...state, helloWorld: JSON.stringify(start) });
        props.selectedDate.setValue(start);
        if(props.onSelectedDateChange && props.onSelectedDateChange.canExecute){
            props.onSelectedDateChange.execute();
        }
    };

    const handleEventClick = (courseInMoreInfo, event) => {
        setState({ ...state, helloWorld: JSON.stringify(courseInMoreInfo)});

        // const { currentTarget } = event;
        // event.stopPropagation();

        // if (courseInMoreInfo.sectionType !== 'Fin')
        //     this.setState((state) => ({
        //         anchorEvent: Boolean(state.anchorEvent) ? null : currentTarget,
        //         courseInMoreInfo: courseInMoreInfo,
        //     }));
    };

    return  (
        <div className="myCustomHeight">
            {JSON.stringify(state?.checkDate)}
            {state?.helloWorld}
            <Calendar
                eventPropGetter={(event) => ({
                    class:{},
                    style: {
                    background: "5px solid",
                    },
                 })}
                localizer={localizer}
                events={events}
                defaultDate={state?.defaultDate}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleDateSelect}
                onSelectEvent={handleEventClick}

            />
    </div>
    )
};


export default FSCalendar;
