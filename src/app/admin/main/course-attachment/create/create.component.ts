import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAttachmentService } from '../../../../shared/services/course-attachment.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  lectureId!: string;
  selectedFile: File | any;
  attachmentTypes = [
    {
      'val' : 1,
      'name': 'File',
    },
    {
      'val' : 2,
      'name': 'Link',
    },
  ]
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private courseAttachmentService: CourseAttachmentService) { 
      this.createForm = this.formBuilder.group({
        lectureId: [''],
        name: [''],
        attachment: [''],
        attachmentType: 0
      });
    }

  ngOnInit(): void {
    this.lectureId = this.route.snapshot.params['lectureId'];
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
   
  }

  onSubmit() {
    var formData = new FormData();
    formData.append("attachment", this.selectedFile);
    formData.append("name", this.createForm.value.name);
    formData.append("attachmentType", this.createForm.value.attachmentType);
    formData.append("lectureId", this.lectureId);

    console.log(this.selectedFile)
    console.log(this.createForm.value.name)
    console.log(this.lectureId)

    this.courseAttachmentService.create(formData).subscribe(res => {
      console.log(res)

      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/course-attachment/' + this.lectureId)
      );
    }, (err) => {
      this.ngZone.run(() =>
        this.router.navigateByUrl('admin/course-attachment/' + this.lectureId)
      );
    });
  }

}
