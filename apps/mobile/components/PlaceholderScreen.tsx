import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
  subtitle: string;
  symbol: string;
};

export default function PlaceholderScreen({
  title,
  subtitle,
  symbol,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.brand}>AERIS<Text style={styles.dot}>.</Text></Text>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.comingSoon}>COMING SOON</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090F',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  brand: {
    position: 'absolute',
    top: 35,
    left: 25,
    color: '#F5F3FF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 4,
  },
  dot: {
    color: '#A78BFA',
  },
  symbolContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#1C1C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  symbol: {
    fontSize: 45,
    color: '#A78BFA',
  },
  title: {
    color: '#F5F3FF',
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9291A5',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
  },
  comingSoon: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 25,
  },
});