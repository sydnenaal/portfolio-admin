import moment from "moment";

export const dateParse = (date) => moment(date).format("MMM Do YY hh:mm");
