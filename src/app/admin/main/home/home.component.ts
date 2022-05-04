import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/tailwind.css',
    './home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Trang tổng quan - Course Plus Admin");
   }

  ngOnInit(): void {
  }

}
