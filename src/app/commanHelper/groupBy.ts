
export{}


declare global {
    interface Array<T> {
        groupBy(prop: T): Array<T>;
    }
}



// if (!Array.prototype.groupBy) {
//     Array.prototype.groupBy = function<T>(this: T[], elem: T): T[] {
//       return this.filter(e => e !== elem);
//     }
//   }

//   if (!Array.prototype.groupBy) {
//     Array.prototype.groupBy = function(prop: any){
//         return  this.reduce(function(groups, item) {
//             const val = item[prop];
//             groups[val] = groups[val] || [];
//             groups[val].push(item);
//             return groups;
//         }, {});
//     }
// }


if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function(prop: string){
        return  this.reduce(function(groups, item) {
            const val = item[prop];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    }









}












// Array.prototype.groupBy  = function(prop: string) { 
//     let array = this; 
//     let result;
//     /* do more stuff here*/
//     return result;
//  }; 


declare global {
    interface Array<T> {
      remove(elem: T): Array<T>;
    }
  }
  
  if (!Array.prototype.remove) {
    Array.prototype.remove = function<T>(this: T[], elem: T): T[] {
      return this.filter(e => e !== elem);
    }
  }




