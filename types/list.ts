export enum ButtonType {
  edit = 'edit',
  delete = 'delete',
  clone = 'clone',
}

export type AvailableButtonTypes = keyof typeof ButtonType
