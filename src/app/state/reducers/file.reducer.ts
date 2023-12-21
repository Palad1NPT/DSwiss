import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as FileActions from '../actions/file.actions';

const FILE_FEATURE_PROPERTY = 'file';

export interface IFile {
  name: string;
  size: number;
  content: string | ArrayBuffer;
  dateAdded: number;
}

export interface IFilesState {
  files: IFile[];
  uploading: boolean;
}

export const filesInitialState: IFilesState = {
  files: [
    {
      name: 'dummy_file_1.txt',
      size: 23222,
      content: 'dummycontent',
      dateAdded: 1703122260990,
    },
    {
      name: 'dummy_file_2.png',
      size: 979276,
      content: 'dummycontent',
      dateAdded: 1703122260990,
    },
    {
      name: 'dummy_file_3.txt',
      size: 6927,
      content: 'dummycontent',
      dateAdded: 1703122260990,
    },
  ],
  uploading: false,
};

export const fileReducer = createReducer(
  filesInitialState,
  on(
    FileActions.uploadStarted,
    (state): IFilesState => ({
      ...state,
      uploading: true,
    })
  ),
  on(
    FileActions.uploadFinished,
    (state): IFilesState => ({
      ...state,
      uploading: false,
    })
  ),
  on(
    FileActions.addFile,
    (state, action): IFilesState => ({
      ...state,
      files: [...state.files, action.fileInfo],
    })
  )
);

export const selectFeatureFiles = createFeatureSelector<IFilesState>(
  FILE_FEATURE_PROPERTY
);

export const selectListOfFiles = createSelector(
  selectFeatureFiles,
  (state: IFilesState) => state.files
);

export const selectIsUploading = createSelector(
  selectFeatureFiles,
  (state: IFilesState) => state.uploading
);
