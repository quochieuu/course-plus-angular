import Swal  from 'sweetalert2';
import { ChatBotService } from './../../../../shared/services/chat-bot.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  createForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private chatBotService: ChatBotService
  ) {
    this.createForm = this.formBuilder.group({
      content: [''],
      urlDirect: [''],
      sortOrder: 0,
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
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
        text: 'Xác nhận thêm mới câu hỏi tự động?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.chatBotService.createQuestion(this.createForm.value).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/chat-bot/index')
              );
            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Thêm mới thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
