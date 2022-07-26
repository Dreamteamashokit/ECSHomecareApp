import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
// export class CustomFilterPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }


export class CustomFilterPipe implements PipeTransform {
  transform(data: any[], filterType: any, val : any): any[] {

      if (!data || data.length == 0) return data;




return data.filter(item => item[filterType].toString().indexOf(val) !== -1);
  }
}


// data.filter(obj => {
//   return Object.keys(obj).reduce((acc, curr) => {
//       return acc || obj[curr].toLowerCase().includes(val);
//   }, false);
// });


// @Injectable()
// export class CustomFilterPipe implements PipeTransform {
//     transform(items: any[], field : any, value : any): any[] {  
//       if (!items) return [];
//       if (!value || value.length == 0) return items;

//       // return items.filter(it => 
//       // it[field].indexOf(value) !=-1);


//        return items.filter(item => item[field].indexOf(value) !== -1);

//        items.filter(obj => {
//   return Object.keys(obj).reduce((acc, curr) => {
//       return acc || obj[curr].includes(value);
//   }, false);
// });


//     }
// }