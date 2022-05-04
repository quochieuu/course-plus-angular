import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  status = "";
  showMenu = "";
  collapse = false;
  collapseMenu = false;
  @Output() statusEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.collapse = !this.collapse;
    if(!this.collapse) {
      this.status = "close";
    } else {
      this.status = "";
    }

    this.statusEvent.emit(this.status);
  }


}
