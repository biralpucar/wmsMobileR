import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  buttons: AlertButton[];
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type = 'info',
  buttons,
  onClose
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const getIconName = () => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'warning': return 'warning';
      case 'error': return 'close-circle';
      default: return 'information-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return '#3B82F6';
    }
  };

  const handleButtonPress = (button: AlertButton) => {
    button.onPress();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        <View style={{
          backgroundColor: cardColor,
          borderRadius: 20,
          padding: 28,
          width: '90%',
          maxWidth: 360,
          maxHeight: '70%',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 8,
        }}>
          {/* Header with Icon and Title */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
              backgroundColor: getIconColor() + '15'
            }}>
               <Ionicons 
                 name={getIconName() as any} 
                 size={24} 
                 color={getIconColor()}
               />
             </View>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: textColor,
              letterSpacing: -0.5,
              flex: 1,
            }}>{title}</Text>
          </View>

          {/* Message */}
          {message && (
            <Text style={{
              fontSize: 16,
              color: secondaryColor,
              lineHeight: 24,
              marginBottom: 28,
              textAlign: 'center',
            }}>{message}</Text>
          )}

          {/* Buttons */}
          <View style={{
            gap: 12,
            ...(buttons.length > 1 && {
              flexDirection: 'row',
              gap: 12,
            })
          }}>
            {buttons.map((button, index) => {
              const isCancel = button.style === 'cancel';
              const isDestructive = button.style === 'destructive';

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: isCancel ? 'transparent' : isDestructive ? '#EF4444' : primaryColor,
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    minHeight: 52,
                    ...(isCancel && {
                      borderWidth: 1.5,
                      borderColor: borderColor,
                    }),
                    ...(!isCancel && {
                      shadowColor: isDestructive ? '#EF4444' : primaryColor,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      elevation: 4,
                    })
                  }}
                  onPress={() => handleButtonPress(button)}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: isCancel ? textColor : 'white',
                    textAlign: 'center',
                    lineHeight: 20,
                    letterSpacing: 0.2,
                  }}>
                    {button.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};



// Hook for easier usage
export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = React.useState<{
    visible: boolean;
    title: string;
    message?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    buttons: AlertButton[];
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    buttons: []
  });

  const showAlert = (
    titleOrConfig: string | Omit<typeof alertConfig, 'visible'>,
    message?: string,
    type?: 'info' | 'success' | 'warning' | 'error',
    confirmText?: string
  ) => {
    if (typeof titleOrConfig === 'string') {
      // Ayrı parametreler olarak çağrıldı
      setAlertConfig({
        visible: true,
        title: titleOrConfig,
        message: message || '',
        type: type || 'info',
        buttons: [{
          text: confirmText || 'Tamam',
          onPress: () => {},
          style: 'default'
        }]
      });
    } else {
      // Obje olarak çağrıldı
      setAlertConfig({ ...titleOrConfig, visible: true });
    }
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const AlertComponent = () => (
    <CustomAlert
      {...alertConfig}
      onClose={hideAlert}
    />
  );

  return { showAlert, hideAlert, AlertComponent };
};

export default CustomAlert;