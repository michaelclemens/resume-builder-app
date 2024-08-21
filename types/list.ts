export enum ButtonType {
  edit = 'edit',
  delete = 'delete',
}

export type AvailableButtonTypes = keyof typeof ButtonType
