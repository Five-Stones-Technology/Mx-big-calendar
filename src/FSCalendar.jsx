import React, {createElement} from "react";
import { Calendar, dateFnsLocalizer, DateLocalizer } from 'fs-big-calendar'
import clsx from 'clsx'

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import isSameDay from 'date-fns/isSameDay'
import enUS from 'date-fns/locale/en-US'

import "./ui/FSCalendar.css";

const FSCalendar = (props) => {
    const [state, setState] = React.useState(
        {   events: [],
            holidays: [],
            localizer : dateFnsLocalizer({format,parse,startOfWeek,getDay, locales: {'en-US': enUS}}),
            startDate : props.startDate ? props.startDate.value : new Date(),
        });
    React.useEffect(() => {
        if (props.dataSourceEvents?.status === 'available') {
            const oEvents = props.dataSourceEvents.items.map(item => {
                const id = Number(props.oidAttr.get(item).displayValue);
                const title = props.isShowFullTitle?.value ? props.fullTitleAttr.get(item).value : props.titleAttr.get(item).value;
                const start = props.dateStartAttr.get(item).value;
                const end = props.dateEndAttr.get(item).value;
                const isAllDay = props.isAllDayAttr.get(item).value;
                const customEventBackgroundColor = props.customBackgroundAttr.get(item).value;
                return {id, title, start, end, isAllDay, customEventBackgroundColor};
            });
            setState({...state, events: oEvents});
        }

        if (props.dataSourceHolidays?.status === 'available') {
            const oHolidays = props.dataSourceHolidays.items.map(item => {
                const title = props.holidayTitleAttr.get(item).value;
                const date = props.holidayDateAttr.get(item).value;
                return {title, date};
            });
            setState({...state, holidays: oHolidays});
        }
    }, [props.dataSourceEvents, props.dataSourceHolidays]);


    const handleDateSelect = ({start, end}) => {
        props.selectedDate.setValue(start);
        if(props.onDateSelected && props.onDateSelected.canExecute){
            props.onDateSelected.execute();
        }
    };

    const handleEventClick = (courseInMoreInfo, event) => {
        event.preventDefault();
        props.selectedEventOid.setValue(courseInMoreInfo.id.toString());
        if(props.onEventSelected && props.onEventSelected.canExecute){
            props.onEventSelected.execute();
        }
    };

    return  (
        <div className="myCustomHeight">
            <Calendar
                dayPropGetter={(date) => ({
                    className:clsx(
                        isSameDay(props.selectedDate?.value, date) && 'fs-selected-day',
                      ),
                 })}
                 slotPropGetter={(date) => ({
                    className:clsx(
                        isSameDay(props.selectedDate?.value, date) && 'fs-selected-day',
                      ),
                 })}
                localizer={state?.localizer}
                defaultDate={state?.startDate}
                selectable={true}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleDateSelect}
                onSelectEvent={handleEventClick}
                events={state?.events}
                holidays={state?.holidays}
            />
    </div>
    )
};


export default FSCalendar;
