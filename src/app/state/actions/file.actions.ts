import { createAction, props } from '@ngrx/store';
import { IFile } from '../reducers/file.reducer';

export const uploadStarted = createAction('[Files] Upload Started');
export const uploadFinished = createAction('[Files] Upload Finished');
export const addFile = createAction(
  '[Files] Add File',
  props<{ fileInfo: IFile }>()
);
