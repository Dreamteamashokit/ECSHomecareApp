import { Component, OnInit,ViewChild, ElementRef, } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientModel } from 'src/app/models/client/client-model';
import { ItemsList ,CheckBoxList} from 'src/app/models/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { AvailbilityRequest } from 'src/app/models/availbility/availbility-request';
import { AvailbilityReponse } from 'src/app/models/availbility/availbility-response';
import { LocationService } from 'src/app/services/location.service';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientSearch } from 'src/app/models/client/client-search';
import { DatePipe } from '@angular/common';
import * as atlas from 'azure-maps-control';
@Component({
  selector: 'app-availability-search',
  templateUrl: './availability-search.component.html',
  styleUrls: [
    '../../assets/css/orange-blue.css',
    './availability-search.component.scss']
})
export class AvailabilitySearchComponent implements OnInit {
  IsLoad: boolean = false;
  IsDate: boolean = false;
  client=new ClientSearch();
  currentUser:UserModel;
  searchModel = new AvailbilityRequest(0);
  caseList:ItemsList[]= [];
   termList:ItemsList[]= [];
  empTypeList = Array<ItemsList>();
  provisionsTypeList = Array<CheckBoxList>();
  _startTime : Date=new Date();
  _endTime : Date=new Date();
  _fromDate : Date=new Date();
  _toDate : Date=new Date();
  monthList  : any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  currentYear : number;
  currentMonthIndex : number;
  currentDay : number;
  currentDate : Date;
  ptrcurrentDate : Date;
  weekstartdate : Date;
  weekenddate : Date;
  currentweekarray : string[] = [];
  weekList : Date[] = [];
  @ViewChild("graphDiv") graphDiv: ElementRef;
    p: number = 1;
    totalItemsCount : number = 0;
    startdate : string;
    availbilityList : AvailbilityReponse[] = [];
  
  constructor(
    private route:ActivatedRoute,
    public datepipe: DatePipe,
    private comSrv: CommonService,  
    private empSrv: EmployeeapiService,
    private acontSrv: AccountService,
    private locSrv: LocationService,
    ) 
    {  
      this.IsLoad=true;
      setTheme('bs3');
      this.BindTerm();
      this.client.latitude = 33.740253;
      this.client.longitude =-82.745857;
      this.currentDate = new Date();
      this.ptrcurrentDate = new Date();
      this.currentYear = new Date().getFullYear();
      this.currentMonthIndex = new Date().getMonth();
      this.currentDay = new Date().getDate();
      this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
    this.currentUser=this.acontSrv.getCurrentUser();
    this.comSrv.getClientList().subscribe((response) => {
      this.caseList = response.data;
    });
    this.comSrv.getEmpTypeList().subscribe((response) => {
      this.empTypeList = response.data;
    });
    this.empSrv.getAvailabilityList().subscribe(response => {
      response.data.forEach((_obj: any) => {
        this.provisionsTypeList.push(
          new CheckBoxList(_obj.availabilityId.toString(), _obj.availabilityName,false)
        );
      });

      this.IsLoad=false;
    });

  }

  ngOnInit(): void {


   
  }

  termChange(e: any): void {

if(e.target.value=="0")
{

this.IsDate=false;
}
else
{
  
  this.IsDate=true;
  var nDate=new Date();
  nDate.setDate(Number(e.target.value));
  this._toDate=nDate;
}

    
  }
 

  search()
  {
    debugger;
    this.IsLoad=true;    
    this.client.clientId=Number(this.searchModel.caseId);
    
    this.searchModel.provisionsList=this.provisionsTypeList.filter(x=>x.IsChecked==true).map(y=>Number(y.itemId));
    this.searchModel.fromDate = this.datepipe.transform(this._fromDate, 'dd-MM-yyyy')||"";   
    this.searchModel.toDate = this.datepipe.transform(this._toDate, 'dd-MM-yyyy')||"";  
    this.searchModel.timeIn=this.datepipe.transform(this._startTime, 'h:mm a')||"";
    this.searchModel.timeOut=this.datepipe.transform(this._endTime, 'h:mm a')||"";
    this.searchModel.caseId=Number(this.searchModel.caseId);
    this.searchModel.empTypeId=Number(this.searchModel.empTypeId);
    const reqObj: AvailbilityRequest = this.searchModel;
    console.log('Search', reqObj);
    this.locSrv.searchAvailbility(reqObj).subscribe((response) => {
      if(response.result)
      {
        debugger;
        console.log( response.data);
        this.availbilityList = response.data;
        this.IsLoad=false;

        this.findRadius(this.client);

        this.loadMap(this.client,this.availbilityList);



        
      }
    });
  }


  public getWeekDays(day : number, monthIndex : number, year : number): Date[] {
    var weeknumber = new Date().getDay();
    var dd = new Date(year, monthIndex, day);
    dd.setDate(dd.getDate() - weeknumber);
    const dateList: Date[] = [];
    this.currentweekarray = [];
    for (let i = 0; i <= 6; i++) {
      const newDate = new Date(dd.getTime());
      newDate.setDate(newDate.getDate() + i);
      let x : string = this.datepipe.transform(newDate,"yyyy-MM-dd") || "";
      this.currentweekarray.push(x);
      dateList.push(newDate);
      if(i == 0)
        this.startdate = this.datepipe.transform(newDate,"yyyy-MM-dd") || "";
    }
    return dateList;
  }

  OnNextWeek()
  {
    this.ptrcurrentDate.setDate(this.ptrcurrentDate.getDate() + 7);
    this.currentYear = this.ptrcurrentDate.getFullYear();
    this.currentMonthIndex = this.ptrcurrentDate.getMonth();
    this.currentDay = this.ptrcurrentDate.getDate();
    this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
  }

  OnPrevWeek()
  {
    // if(this.ptrcurrentDate > this.currentDate)
      this.ptrcurrentDate.setDate(this.ptrcurrentDate.getDate() - 7);
    this.currentYear = this.ptrcurrentDate.getFullYear();
    this.currentMonthIndex = this.ptrcurrentDate.getMonth();
    this.currentDay = this.ptrcurrentDate.getDate();
    this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
  }


  pageChanged(event : any){
    this.p = event;
  }



  getDistance(item:AvailbilityReponse):number
  {
    this.locSrv.getDistance(this.client.latitude,this.client.longitude,item.latitude,item.longitude)
    .subscribe({    
      error: () => {
        item.distance= 0.0;
        },   
      next: (result:any) => { 
        var route:any=  result['routes'][0];
        var lengthInMeters:any=  route['summary']['lengthInMeters'];
        item.distance= this.getMiles(lengthInMeters); 
     
      },     
  });
  return item.distance;
  }



  findRadius(item:ClientSearch){
    this.availbilityList.forEach((loc: AvailbilityReponse) => 
    {
      this.locSrv.getDistance(item.latitude,item.longitude,loc.latitude,loc.longitude)
      .subscribe({    
        error: () => {
          loc.distance= 0.0;
          },   
        next: (result:any) => { 
          var route:any=  result['routes'][0];
          var lengthInMeters:any=  route['summary']['lengthInMeters'];
          loc.distance= this.getMiles(lengthInMeters); 

        },
        complete: () => {
          var sortedArray: AvailbilityReponse[] = this.availbilityList.sort((a: AvailbilityReponse, b: AvailbilityReponse) => {
              debugger;
              if (a.distance < b.distance) {
                  return -1;
              } else if (a.distance > b.distance) {
                  return 1;
              } else {
                  return 0;
              }});
          },
    });
    },
    (e:ErrorEvent) => {  
     alert(e.error);
    });
  }

















  getMiles(meters:number) 
  {
    return  meters*0.000621371192;
   
   }
   
  BindTerm()
  {
this.termList.push(new ItemsList(0,"Recurring Weekly"));
var current = new Date(); // Current date (default)   
var addend = current.getDay();
var i=0;
if(addend===5)
{
  i++;
  this.termList.push(new ItemsList(current.getDate(),this.datepipe.transform(new Date(current),"dd MMM YYYY") || ""));
}
if (addend >5) { 
 addend = 5 - addend;
}
else
{
addend = 5 + addend;
}
current.setDate(current.getDate() + addend);
while (i<4) { //  Loop only for current month    
i++;
  this.termList.push(new ItemsList(current.getDate(),this.datepipe.transform(new Date(current),"dd MMM YYYY") || ""));
 
 current.setDate(current.getDate() + 7); // Increment weekly (7 days)
 
}}



loadMap(client:ClientSearch,itemList:AvailbilityReponse[]) {
  this.graphDiv.nativeElement.innerHTML = "";
  console.log(itemList);
  var azureMap = new atlas.Map('myMap', {
      center: [client.longitude , client.latitude],
      zoom: 12,
      language: 'en-US',
      authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: 'MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE'
      },
      enableAccessibility: false,
  });
  azureMap.events.add('ready', function () {
      /*Create a data source and add it to the map*/
      var dataSource = new atlas.source.DataSource();
      azureMap.sources.add(dataSource);
      var points: any[]=[];
      var cpoint = new atlas.Shape(new atlas.data.Point([client.longitude, client.latitude])); 
      points.push(cpoint);
      itemList.forEach((Item: AvailbilityReponse) => {
        debugger;
        var point = new atlas.Shape(new atlas.data.Point([Number(Item.longitude), Number(Item.latitude)])); 
        points.push(point);
      });
      //Add the symbol to the data source.
      dataSource.add(points);
      //Create a symbol layer using the data source and add it to the map
      azureMap.layers.add(new atlas.layer.SymbolLayer(dataSource, ""));
  });
}




















}
