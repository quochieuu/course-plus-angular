import { ChatBotService } from './../../../../shared/services/chat-bot.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-suggestions.component.scss']
})
export class ListSuggestionsComponent implements OnInit {

  suggestions: any = [];

  showTab = 0;
  isHide = 0;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    public chatBotService: ChatBotService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  tabToggle(index: number){
    this.showTab = index;
    this.isHide = index;
  }

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
  }

  getAll() {
    this.chatBotService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.suggestions = data;
      });
  }

  delete(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa câu hỏi này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getAll();

          this.chatBotService.deleteQuestion(id).subscribe((res) => {
            this.suggestions = this.suggestions.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getAll();

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
