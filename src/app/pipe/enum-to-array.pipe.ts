import { Pipe, PipeTransform } from '@angular/core';
import { UserType } from 'src/app/models/common';
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value:any) : Object {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return {index: +o, name: value[o]}});
    
  }

}
