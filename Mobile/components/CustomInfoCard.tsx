import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface CustomInfoCardProps {
  title?: string;
  message?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  titleColor?: string;
  buttonPosition?: {
    right?: number;
    top?: number;
  };
  cardPosition?: {
    top?: number;
    right?: number;
    left?: number;
  };
}

export default function CustomInfoCard({
  title = "Bilgilendirme",
  message = "Bilgilendirme mesajı buraya gelecek.",
  iconName = "information",
  iconColor = "white",
  backgroundColor,
  borderColor,
  textColor,
  titleColor,
  buttonPosition = { right: 60, top: 90 },
  cardPosition = { top: 135, right: 16, left: 16 }
}: CustomInfoCardProps) {
  const themeBackgroundColor = useThemeColor({}, 'background');
  const themeTextColor = useThemeColor({}, 'text');
  const themeCardColor = useThemeColor({}, 'card');
  const themeBorderColor = useThemeColor({}, 'border');
  const themePrimaryColor = useThemeColor({}, 'primary');
  const themeSecondaryColor = useThemeColor({}, 'secondary');

  const [infoCardExpanded, setInfoCardExpanded] = useState(false);

  return (
    <>
      {/* Sabit Info Butonu */}
      <TouchableOpacity 
        style={{
          position: 'absolute',
          zIndex: 10,
          elevation: 10,
          right: buttonPosition.right,
          top: buttonPosition.top,
        }}
        onPress={() => setInfoCardExpanded(!infoCardExpanded)}
        activeOpacity={0.7}
      >
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: themePrimaryColor,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name={iconName} size={18} color={iconColor} />
        </View>
      </TouchableOpacity>

      {/* Genişletilmiş bilgilendirme alanı - absolute pozisyonlama */}
      {infoCardExpanded && (
        <View 
          style={{
            position: 'absolute',
            backgroundColor: backgroundColor || themeCardColor,
            borderWidth: 1,
            borderColor: borderColor || themeBorderColor,
            borderRadius: 12,
            padding: 16,
            elevation: 8,
            top: cardPosition.top,
            right: cardPosition.right,
            left: cardPosition.left,
            zIndex: 100,
          }}
        >
          <TouchableOpacity 
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
            onPress={() => setInfoCardExpanded(false)}
            activeOpacity={0.7}
          >
            <View style={{
              width: 32,
              height: 32,
              backgroundColor: themePrimaryColor,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              marginTop: 4,
            }}>
              <Ionicons name={iconName} size={16} color={iconColor} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                color: titleColor || themeTextColor,
                fontWeight: '600',
                marginBottom: 4,
              }}>{title}</Text>
              <Text style={{
                color: textColor || themeSecondaryColor,
                fontSize: 14,
                lineHeight: 20,
              }}>
                {message}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}