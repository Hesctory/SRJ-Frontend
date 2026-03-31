import { useState, useCallback } from 'react';
import { AuthCredentials } from '../../domain/valueObjects/AuthCredentials';
import { LoginUseCase } from '../../application/useCases/LoginUseCase';
import { AuthRepositoryImpl } from '../../repository/implementations/AuthRepositoryImpl';

interface useLoginData {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: () => Promise<void>
}

export const useLogin = (): useLoginData => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const authCredentials = AuthCredentials.create(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return;
    } finally {
      setLoading(false)
    }
  }, [email, password]);

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
};