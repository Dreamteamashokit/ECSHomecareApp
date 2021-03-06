


//   declare global {
//     interface String {
//           isNullOrEmpty(this: string): boolean;
//     }
//   }

//   String.prototype.isNullOrEmpty = function (this: string): boolean {
//     return !this;
// };




export class DateHelper {


  static getDay():string {
    let day: string= "Sunday";
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";

    }
    return day;
  }


  static addDays(days: number) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  static getItemDate(item:Date)  {

    let year = item.getFullYear();
    let month = item.getMonth();
    let day = item.getDate();

   var itemDate= new Date();
   itemDate.setFullYear(year);
   itemDate.setMonth(month);
   itemDate.setDate(day);
   return itemDate;
  }


}

