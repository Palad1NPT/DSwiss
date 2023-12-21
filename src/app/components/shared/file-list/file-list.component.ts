import { Component, Input } from '@angular/core';
import { IFile } from '../../../state/reducers/file.reducer';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent {
  @Input({ required: true }) files!: IFile[] | null;

  headers: string[] = ['Filename', 'Size', 'Date Added'];
}
