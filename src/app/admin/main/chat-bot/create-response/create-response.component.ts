import { Router, ActivatedRoute } from '@angular/router';
import { ChatBotService } from './../../../../shared/services/chat-bot.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create-response.component.scss']
})
export class CreateResponseComponent implements OnInit {

  createForm: FormGroup;
  questionId!: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private chatBotService: ChatBotService,
    private route: ActivatedRoute,
  ) {
    this.questionId = this.route.snapshot.params['questionId'];

    this.createForm = this.formBuilder.group({
      botQuestionId: this.questionId,
      content: [''],
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
        text: 'Xác nhận thêm mới câu phản hồi?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.chatBotService.createResponse(this.createForm.value).subscribe(
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
