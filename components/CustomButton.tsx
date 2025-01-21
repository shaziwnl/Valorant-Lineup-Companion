import { Link, router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, variant = 'default', href }: {
    title: string;
    variant?: 'default' | 'light';
    href: any;
}) => {
  const isLightVariant = variant === 'light';

  const handlePress = () => {
    router.push(href);
  }

  // Define colors based on variant
  const buttonBackgroundColor = isLightVariant ? colors.highlightColor : colors.buttonBackgroundColor;
  const buttonTextColor = isLightVariant ? colors.buttonTextColorHover : colors.buttonTextColor;
  const buttonInnerBorderColor = isLightVariant ? colors.highlightColor : colors.buttonInnerBorderColor;
  const buttonBitsColor = colors.buttonBitsColor;
  const buttonBitsColorHover = isLightVariant ? colors.buttonBitsColorHover : colors.buttonBitsColor;

  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={handlePress}>
      {/* Top Border */}
      <View
        style={[
          styles.btnBorder,
          styles.btnBorderTop,
          {
            borderColor: colors.borderColor,
          },
        ]}
      />
      {/* Bottom Border */}
      <View
        style={[
          styles.btnBorder,
          styles.btnBorderBottom,
          {
            borderColor: colors.borderColor,
          },
        ]}
      />
      {/* Inner Content */}
      <View
        style={[
          styles.btnInner,
          {
            backgroundColor: buttonBackgroundColor,
            borderColor: buttonInnerBorderColor,
          },
        ]}
      >
        {/* Top-left corner square */}
        <View
          style={[
            styles.btnInnerCorner,
            {
              top: 0,
              left: 0,
              width: 2,
              height: 2,
              backgroundColor: buttonBitsColor,
            },
          ]}
        />
        {/* Bottom-right corner square */}
        <View
          style={[
            styles.btnInnerCorner,
            {
              bottom: 0,
              right: 0,
              width: 4,
              height: 4,
              backgroundColor: buttonBitsColorHover,
            },
          ]}
        />
        {/* Slide (Removed for no animation) */}
        {/* Content */}
        <Text
          style={[
            styles.btnContent,
            { color: buttonTextColor },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const colors = {
  backgroundColor: '#0f1923',
  buttonTextColor: '#0f1923',
  buttonTextColorHover: '#ece8e1',
  borderColor: '#7D8082',
  buttonBackgroundColor: '#ece8e1',
  highlightColor: '#ff4655',
  buttonInnerBorderColor: 'transparent',
  buttonBitsColor: '#0f1923',
  buttonBitsColorHover: '#ece8e1',
};

const styles = StyleSheet.create({
  btn: {
    position: 'relative',
    padding: 8,
    marginBottom: 20,
  },
  btnBorder: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: '50%',
    borderWidth: 1,
  },
  btnBorderTop: {
    top: 0,
    borderBottomWidth: 0,
  },
  btnBorderBottom: {
    bottom: 0,
    borderTopWidth: 0,
  },
  btnInner: {
    position: 'relative',
    paddingHorizontal: 30,
    paddingVertical: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  btnInnerCorner: {
    position: 'absolute',
  },
  btnContent: {
    position: 'relative',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CustomButton;