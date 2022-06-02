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
  

  @ViewChild("locMapId") locMapId: ElementRef;
  constructor() {

    this.BindMap(this.geoPoint);
  }

  ngOnInit(): void {
    this.BindMap(this.geoPoint);

  }

  BindMap(current:LocationView) {
  debugger;
     this.locMapId.nativeElement.innerHTML = "";
    var azureMap = new atlas.Map('locMapId', {
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
      //Load the custom image icon into the map resources.
      azureMap.imageSprite.add('my-custom-icon', 'https://img.icons8.com/material-two-tone/2x/home--v2.png').then(function () {

    //Create a data source and add it to the map.
    var datasource = new atlas.source.DataSource();
    azureMap.sources.add(datasource);

    //Create a point feature and add it to the data source.
    datasource.add(new atlas.data.Feature(new atlas.data.Point([Number(current.longitude), Number(current.latitude)])));

    //Add a layer for rendering point data as symbols.
    azureMap.layers.add(new atlas.layer.SymbolLayer(datasource, "", {
      iconOptions: {
        image: 'my-custom-icon',
        size: 0.5
      }
    }));
  });
  
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
