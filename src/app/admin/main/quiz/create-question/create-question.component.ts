import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Title } from '@angular/platform-browser';
import { QuizService } from './../../../../shared/services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  courses!: any;
  data!: any;
  answer!: any;
  answers: any[] = [];
  quizId!: string;

  createForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private titleService: Title
  ) {
    this.quizId = this.route.snapshot.params['quizId'];

    this.titleService.setTitle("Thêm mới câu hỏi trắc nghiệm - Course Plus Admin");

    this.createForm = this.formBuilder.group({
      quizId: null,
      content: [''],
      urlImage: [''],
      score: 1,
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer5: [''],
      answer6: [''],
      answer7: [''],
      answer8: [''],
      answer9: [''],
      answer10: [''],
      answer_correct1: false,
      answer_correct2: false,
      answer_correct3: false,
      answer_correct4: false,
      answer_correct5: false,
      answer_correct6: false,
      answer_correct7: false,
      answer_correct8: false,
      answer_correct9: false,
      answer_correct10: false,
    });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '250px',
    maxHeight: 'auto',
    placeholder: 'Nhập nội dung câu hỏi trắc nghiệm...',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript',],
      ['link','insertVideo','unlink','insertHorizontalRule','removeFormat',]
    ]
  }

  showTab = 0; showTab5 = 0; showTab6 = 0; showTab7 = 0; showTab8 = 0; showTab9 = 0; showTab10 = 0;
  isHide = 0;

  ngOnInit(): void {
  }


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
        text: 'Xác nhận thêm mới trắc nghiệm?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {

            if(this.createForm.value.answer1 !== "") {
              this.answer = {
                "content": this.createForm.value.answer1,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct1
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer2 !== "") {
              this.answer = {
                "content": this.createForm.value.answer2,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct2
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer3 !== "") {
              this.answer = {
                "content": this.createForm.value.answer3,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct3
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer4 !== "") {
              this.answer = {
                "content": this.createForm.value.answer4,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct4
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer5 !== "") {
              this.answer = {
                "content": this.createForm.value.answer5,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct5
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer6 !== "") {
              this.answer = {
                "content": this.createForm.value.answer6,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct6
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer7 !== "") {
              this.answer = {
                "content": this.createForm.value.answer7,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct7
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer8 !== "") {
              this.answer = {
                "content": this.createForm.value.answer8,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct8
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer9 !== "") {
              this.answer = {
                "content": this.createForm.value.answer9,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct9
              }
              this.answers.push(this.answer)
            }
            if(this.createForm.value.answer10 !== "") {
              this.answer = {
                "content": this.createForm.value.answer10,
                "sortOrder": 0,
                "isCorrect": this.createForm.value.answer_correct10
              }
              this.answers.push(this.answer)
            }


          console.log(this.answers);

          this.data = {
            "quizId": this.quizId,
            "content": this.createForm.value.content,
            "urlImage": this.createForm.value.urlImage,
            "score": this.createForm.value.score,
            "questionAnswer": this.answers
          }

          this.quizService.createQuestion(this.data).subscribe(
            () => {
              this.ngZone.run(() =>
                this.router.navigateByUrl('admin/quiz/questions/' + this.quizId)
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

  showTab_5(){ this.showTab5 = 5;}
  showTab_6(){ this.showTab6 = 6;}
  showTab_7(){ this.showTab7 = 7;}
  showTab_8(){ this.showTab8 = 8;}
  showTab_9(){ this.showTab9 = 9;}
  showTab_10(){ this.showTab10 = 10;}

  tabCancel(){
    this.showTab = 0;
    this.isHide = 0;
  }

}
