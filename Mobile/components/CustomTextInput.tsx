import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface CustomTextInputProps extends TextInputProps {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    showPasswordToggle?: boolean;
    disableSpaces?: boolean; // Boşluk engellemesi için yeni prop
}



const CustomTextInput: React.FC<CustomTextInputProps> = ({ 
  label, 
  icon, 
  iconColor, 
  showPasswordToggle = false,
  disableSpaces = false, // Varsayılan olarak boşluk engellemesi kapalı
  secureTextEntry,
  onChangeText,
  ...textInputProps 
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');
  const secondaryColor = useThemeColor({}, 'secondary');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setIsSecureEntry(!isSecureEntry);
  };

  // Boşluk engellemesi için özel onChangeText handler
  const handleTextChange = (text: string) => {
    if (disableSpaces) {
      // Boşlukları kaldır
      const textWithoutSpaces = text.replace(/\s/g, '');
      onChangeText?.(textWithoutSpaces);
    } else {
      onChangeText?.(text);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: textColor,
        marginBottom: 8,
      }}>{label}</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 8,
        backgroundColor: surfaceColor,
        paddingHorizontal: 0,
      }}>
        {icon && (
          <View style={{
            paddingLeft: 12,
            paddingRight: 8,
          }}>
            <Ionicons name={icon} size={20} color={iconColor || secondaryColor} />
          </View>
        )}
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: 'transparent',
            color: textColor,
            paddingLeft: icon ? 8 : 16,
            paddingRight: showPasswordToggle ? 8 : 16,
          }}
          placeholderTextColor={secondaryColor}
          secureTextEntry={isSecureEntry}
          onChangeText={handleTextChange}
          {...textInputProps}
        />
        {showPasswordToggle && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={{
              paddingRight: 12,
              paddingLeft: 8,
              paddingVertical: 12,
              minWidth: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={22} 
              color={iconColor || secondaryColor} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomTextInput