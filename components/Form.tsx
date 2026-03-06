import React, { createContext, useContext, useState, useCallback } from "react";

interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  register: (name: string) => {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be used within a Form provider");
  }
  return context;
}

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (values: Record<string, any>) => void;
  className?: string;
  defaultValues?: Record<string, any>;
}

export function Form({ children, onSubmit, className = "", defaultValues = {} }: FormProps) {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const setTouchedField = useCallback((name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  const register = useCallback(
    (name: string) => ({
      name,
      value: values[name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(name, e.target.value);
      },
      onBlur: () => {
        setTouchedField(name, true);
      },
    }),
    [values, setValue, setTouchedField]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        setValue,
        setError,
        setTouched: setTouchedField,
        register,
      }}
    >
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FormFieldProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ name, children, className = "" }: FormFieldProps) {
  return <div className={className}>{children}</div>;
}

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

export function FormItem({ children, className = "" }: FormItemProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormLabel({ children, className = "", htmlFor }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
}

interface FormControlProps {
  children: React.ReactNode;
  className?: string;
}

export function FormControl({ children, className = "" }: FormControlProps) {
  return <div className={className}>{children}</div>;
}

interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className = "" }: FormMessageProps) {
  if (!children) return null;
  return (
    <p className={`text-sm font-medium text-red-500 ${className}`}>
      {children}
    </p>
  );
}

interface UseFormReturn {
  register: (name: string) => {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
  handleSubmit: (onSubmit: (values: Record<string, any>) => void) => (e: React.FormEvent) => void;
  formState: {
    errors: Record<string, string>;
    isValid: boolean;
  };
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
}

interface UseFormOptions {
  defaultValues?: Record<string, any>;
}

export function useForm(options: UseFormOptions = {}): UseFormReturn {
  const [values, setValues] = useState<Record<string, any>>(options.defaultValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const register = useCallback(
    (name: string) => ({
      name,
      value: values[name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [name]: e.target.value }));
      },
      onBlur: () => {},
    }),
    [values]
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: Record<string, any>) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(values);
    },
    [values]
  );

  const setValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const watch = useCallback(
    (name: string) => values[name],
    [values]
  );

  return {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid: Object.keys(errors).length === 0,
    },
    setValue,
    watch,
  };
}

export default Form;
