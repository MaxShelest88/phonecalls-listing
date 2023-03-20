export interface IInputComponentProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  iconleft?: React.ReactNode;
  iconright?: React.ReactNode;
  placeholder?: string;
  name: string;
  type?: string;
  error?: 1 | 0;
  onBlur?: () => void;
  onFocus?: () => void;
  onReset?: () => void;
  ref?: React.Ref<HTMLInputElement> | null;
}
