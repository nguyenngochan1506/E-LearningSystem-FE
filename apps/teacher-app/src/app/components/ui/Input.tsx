interface InputProps {
  title: string;
  placeholder: string;
  type:
    | 'email'
    | 'password'
    | 'text'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'time'
    | 'color'
    | 'file'
    | 'hidden'
    | 'image'
    | 'range'
    | 'checkbox'
    | 'radio'
    | 'button'
    | 'submit'
    | 'reset';
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input = ({
  title,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}: InputProps) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full ${
          error ? 'input-error' : ''
        } ${className}`}
        required={required}
        disabled={disabled}
      />
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
