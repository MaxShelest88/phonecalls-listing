export interface IInputComponentProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  placeholder?: string;
  name: string;
  type?: string;
  error?: boolean;
  onBlur: () => void;
  onFocus: () => void;
  reset: () => void;
  ref?: React.Ref<HTMLInputElement> | null;
}
