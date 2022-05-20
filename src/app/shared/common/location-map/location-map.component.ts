import { Component, OnInit,ViewChild, ElementRef,Input } from '@angular/core';
import { LocationView } from 'src/app/models/common/address-view';
import * as atlas from 'azure-maps-control';
@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {

  @Input() geoPoint = new LocationView();
  @ViewChild("graphDiv") graphDiv: ElementRef;
  constructor() {

    if(this.geoPoint.latitude>0)
    {
      this.BindMap(this.geoPoint);
    }
  
  }

  ngOnInit(): void {


    if(this.geoPoint.latitude>0)
    {
      this.BindMap(this.geoPoint);
    }

  }







  BindMap(current:LocationView) {
  debugger;
     //this.graphDiv.nativeElement.innerHTML = "";
    var azureMap = new atlas.Map('myMap', {
        center: [current.longitude , current.latitude],
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
        var cpoint = new atlas.Shape(new atlas.data.Point([Number(current.longitude), Number(current.latitude)])); 
        points.push(cpoint);    
        //Add the symbol to the data source.
        dataSource.add(points);
        //Create a symbol layer using the data source and add it to the map
        azureMap.layers.add(new atlas.layer.SymbolLayer(dataSource, ""));
    });
  }















}
