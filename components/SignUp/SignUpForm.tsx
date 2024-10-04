import { useState, FormEvent } from 'react';
import styles from './SignUp.module.css';
import { SignUpFormProps, User } from './User';
import InputField from './InputField';

export default function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    first_joined: new Date().toISOString(),
    last_login: new Date().toISOString(),
    characters: [''],
    campaigns: []
  });

  const handleInputChange = (field: keyof User, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleCharactersChange = (value: string) => {
    setUserData({
      ...userData,
      characters: value.split(',').map(char => char.trim())
    });
  };

  const validateUserData = (user: User) => {
    return user.username && user.email && user.password;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateUserData(userData)) {
      onSubmit(userData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.userGroup}>
        <InputField
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(value) => handleInputChange('username', value)}
          required
        />
        <InputField
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(value) => handleInputChange('email', value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(value) => handleInputChange('password', value)}
          required
        />
        <InputField
          type="text"
          placeholder="Characters (comma separated)"
          value={userData.characters.join(', ')}
          onChange={handleCharactersChange}
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
}