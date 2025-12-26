import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

type ActiveScreen = 'signup' | 'signin';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const passwordsMatch = useMemo(
    () => password.length > 0 && password === confirmPassword,
    [password, confirmPassword],
  );

  const formValid =
    email.trim().length > 0 && passwordsMatch && agreedToTerms;

  if (isLoading) {
    return <SplashScreen />;
  }

  if (activeScreen === 'signin') {
    return <SignInScreen onBackToSignUp={() => setActiveScreen('signup')} />;
  }

  return (
    <SignUpScreen
      fullName={fullName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      agreedToTerms={agreedToTerms}
      onFullNameChange={setFullName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onToggleTerms={() => setAgreedToTerms(!agreedToTerms)}
      formValid={formValid}
      onNavigateToSignIn={() => setActiveScreen('signin')}
    />
  );
}

function SplashScreen() {
  const { width, height } = Dimensions.get('window');
  
  // Generate random colorful logos
  const logos = useMemo(() => {
    const colors = [
      '#ef4444', // red
      '#f97316', // orange
      '#eab308', // yellow
      '#22c55e', // green
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#f59e0b', // amber
      '#10b981', // emerald
    ];
    
    const shapes = ['circle', 'square', 'rounded'];
    const logoCount = 15;
    
    return Array.from({ length: logoCount }, (_, i) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 35 + Math.random() * 40;
      const x = Math.random() * (width - size);
      const y = Math.random() * (height - size);
      
      return {
        id: i,
        color,
        shape,
        size,
        x,
        y,
        rotation: Math.random() * 360,
        borderRadius: shape === 'circle' ? size / 2 : shape === 'rounded' ? size * 0.3 : 0,
      };
    });
  }, [width, height]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar style="light" />
      {logos.map((logo) => (
        <View
          key={logo.id}
          style={[
            styles.logoShape,
            {
              backgroundColor: logo.color,
              width: logo.size,
              height: logo.size,
              left: logo.x,
              top: logo.y,
              borderRadius: logo.borderRadius,
              transform: [{ rotate: `${logo.rotation}deg` }],
            },
          ]}
        />
      ))}
      <View style={styles.splashContent}>
        <Text style={styles.splashTitle}>Codex Playground</Text>
        <Text style={styles.splashSubtitle}>Welcome</Text>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.splashLoader}
        />
      </View>
    </View>
  );
}

interface LabeledInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  helperText?: string;
  helperVariant?: 'default' | 'error';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

interface SignUpScreenProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onToggleTerms: () => void;
  formValid: boolean;
  onNavigateToSignIn: () => void;
}

function SignUpScreen({
  fullName,
  email,
  password,
  confirmPassword,
  agreedToTerms,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onToggleTerms,
  formValid,
  onNavigateToSignIn,
}: SignUpScreenProps) {
  const passwordsMatch = useMemo(
    () => password.length > 0 && password === confirmPassword,
    [password, confirmPassword],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Set up your profile to start exploring the app.
          </Text>
        </View>

        <LabeledInput
          label="Full name"
          value={fullName}
          onChangeText={onFullNameChange}
          autoCapitalize="words"
        />

        <LabeledInput
          label="Email add"
          value={email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <LabeledInput
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
        />

        <LabeledInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
          secureTextEntry
          helperText={
            confirmPassword.length > 0 && !passwordsMatch
              ? 'Passwords do not match'
              : undefined
          }
          helperVariant="error"
        />

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={onToggleTerms}
          style={styles.checkboxRow}
          activeOpacity={0.8}
        >
          <Checkbox value={agreedToTerms} onValueChange={onToggleTerms} />
          <Text style={styles.checkboxLabel}>
            I agree to the Terms of Service and Privacy Policy.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!formValid}
          style={[styles.primaryButton, !formValid && styles.primaryButtonDisabled]}
          activeOpacity={0.9}
        >
          <Text style={[styles.primaryButtonText, !formValid && styles.disabledText]}>
            Sign up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={onNavigateToSignIn}>
          <Text style={styles.secondaryActionText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SignInScreenProps {
  onBackToSignUp: () => void;
}

function SignInScreen({ onBackToSignUp }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formValid = email.trim().length > 0 && password.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Welcome back! Sign in to continue.</Text>
        </View>

        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          disabled={!formValid}
          style={[styles.primaryButton, !formValid && styles.primaryButtonDisabled]}
          activeOpacity={0.9}
        >
          <Text style={[styles.primaryButtonText, !formValid && styles.disabledText]}>
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={onBackToSignUp}>
          <Text style={styles.secondaryActionText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  helperText,
  helperVariant = 'default',
  secureTextEntry,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
}: LabeledInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#9CA3AF"
      />
      {helperText ? (
        <Text
          style={[
            styles.helperText,
            helperVariant === 'error' && styles.helperTextError,
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#facc15',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  splashContent: {
    alignItems: 'center',
    gap: 16,
    zIndex: 10,
  },
  logoShape: {
    position: 'absolute',
    opacity: 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#e0e7ff',
    marginBottom: 24,
  },
  splashLoader: {
    marginTop: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 20,
  },
  headingContainer: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#0f172a',
  },
  helperText: {
    fontSize: 12,
    color: '#475569',
  },
  helperTextError: {
    color: '#dc2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: '#bfdbfe',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  disabledText: {
    color: '#1e3a8a',
  },
  secondaryAction: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  secondaryActionText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
