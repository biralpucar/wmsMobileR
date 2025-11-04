import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '../services/AuthService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputLast: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  demoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  demoTitle: {
    color: '#1e3a8a',
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    color: '#2563eb',
    fontSize: 14,
  },
});

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login button clicked');
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Email ve şifre gereklidir');
      return;
    }

    console.log('Starting login...', { email: email.trim() });
    setIsLoading(true);
    try {
      const response = await AuthService.login(email.trim(), password.trim());
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        console.log('Login successful, navigating to home');
        router.replace('/home');
      } else {
        console.log('Login failed:', response.message);
        Alert.alert('Giriş Hatası', response.message || 'Giriş başarısız');
      }
    } catch (error: any) {
      console.error('Login exception:', error);
      Alert.alert('Hata', error.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo/Title */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            WMS Mobile
          </Text>
          <Text style={styles.subtitle}>
            Depo Yönetim Sistemi
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <Text style={styles.title}>
            Giriş Yap
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email veya Kullanıcı Adı"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          
          <TextInput
            style={[styles.input, styles.inputLast]}
            placeholder="Şifre"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>
                Giriş Yap
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Demo credentials */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>
            Demo Giriş Bilgileri:
          </Text>
          <Text style={styles.demoText}>Email: admin@verii.com</Text>
          <Text style={styles.demoText}>Şifre: Veriipass123!</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
