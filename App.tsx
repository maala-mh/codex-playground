import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordsMatch = useMemo(
    () => password.length > 0 && password === confirmPassword,
    [password, confirmPassword],
  );

  const formValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    passwordsMatch &&
    agreedToTerms;

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
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <LabeledInput
          label="Email address"
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

        <LabeledInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          style={styles.checkboxRow}
          activeOpacity={0.8}
        >
          <Checkbox value={agreedToTerms} onValueChange={setAgreedToTerms} />
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

        <TouchableOpacity style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
