export const formateDate = (value, input = false) => {
  if (value != undefined && value != null) {
    var today = "";

    var date = new Date(value);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (input === false) {
      today = day + "-" + month + "-" + year;
      return today;
    } else {
      today = year + "-" + month + "-" + day;
      return today;
    }
  }
};
