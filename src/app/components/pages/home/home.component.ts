import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../state/actions/user.actions';
import { IFile, selectListOfFiles } from '../../../state/reducers/file.reducer';
import { addFile, uploadStarted } from '../../../state/actions/file.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private store: Store) {}

  files$ = this.store.select(selectListOfFiles);
  selectedFile!: File;

  buttonLogOut() {
    this.store.dispatch(logout());
  }

  fileSelected(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  uploadFile() {
    this.store.dispatch(uploadStarted());

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const newFile: IFile = {
        name: this.selectedFile?.name,
        size: this.selectedFile?.size,
        dateAdded: new Date().getTime(),
        content: fileReader.result!,
      };
      this.store.dispatch(addFile({ fileInfo: newFile }));
    };
    fileReader.readAsDataURL(this.selectedFile);
  }
}
