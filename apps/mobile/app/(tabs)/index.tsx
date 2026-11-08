import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const COLORS = {
  background: '#09090F',
  surface: '#14141E',
  surfaceLight: '#1C1C29',
  primary: '#A78BFA',
  text: '#F5F3FF',
  secondary: '#9291A5',
  border: '#252535',
};

const trending = [
  { id: '1', title: 'Solo Leveling', genre: 'Action · Fantasy', rating: '9.2', color: '#34234E', symbol: '影' },
  { id: '2', title: 'Demon Slayer', genre: 'Action · Adventure', rating: '8.7', color: '#542D36', symbol: '滅' },
  { id: '3', title: 'Jujutsu Kaisen', genre: 'Action · Supernatural', rating: '8.8', color: '#263B53', symbol: '呪' },
  { id: '4', title: 'Frieren', genre: 'Adventure · Drama', rating: '9.3', color: '#315047', symbol: '葬' },
];

const seasonal = [
  { id: '5', title: 'The Apothecary Diaries', episodes: '24 Episodes', color: '#63433B', symbol: '薬' },
  { id: '6', title: 'Blue Lock', episodes: '14 Episodes', color: '#244A6C', symbol: '青' },
  { id: '7', title: 'Dandadan', episodes: '12 Episodes', color: '#57416D', symbol: '魂' },
];

function SectionHeading({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action} →</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>AERIS<Text style={styles.logoDot}>.</Text></Text>
            <Text style={styles.tagline}>YOUR ANIME UNIVERSE</Text>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={() => router.push('/discover')}
          >
            <Text style={styles.searchIcon}>⌕</Text>
          </Pressable>
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingEyebrow}>SUNDAY, NOVEMBER 8</Text>
          <Text style={styles.greetingTitle}>Find your next obsession.</Text>
          <Text style={styles.greetingSubtitle}>
            Your next favourite story is waiting.
          </Text>
        </View>

        {/* Featured anime */}
        <SectionHeading title="Featured" />

        <View style={styles.heroCard}>
          <View style={styles.heroArtwork}>
            <View style={styles.heroOrb} />
            <Text style={styles.heroJapanese}>影</Text>
            <View style={styles.heroArtworkBottom}>
              <Text style={styles.heroArtworkLabel}>AERIS SPOTLIGHT</Text>
            </View>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>✦  EDITOR'S PICK</Text>
            </View>

            <Text style={styles.heroTitle}>SOLO LEVELING</Text>
            <Text style={styles.heroDescription}>
              The weakest hunter begins a journey that will change everything.
            </Text>

            <View style={styles.heroMeta}>
              <Text style={styles.metaText}>★ 9.2</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>Action</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>Fantasy</Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/discover')}
            >
              <Text style={styles.primaryButtonText}>Explore anime  →</Text>
            </Pressable>
          </View>
        </View>

        {/* Trending */}
        <SectionHeading
          title="Trending now"
          action="See all"
          onPress={() => router.push('/discover')}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((anime) => (
            <Pressable key={anime.id} style={styles.animeCard}>
              <View style={[styles.poster, { backgroundColor: anime.color }]}>
                <View style={styles.posterOrb} />
                <Text style={styles.posterSymbol}>{anime.symbol}</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>★ {anime.rating}</Text>
                </View>
              </View>
              <Text style={styles.animeTitle} numberOfLines={1}>
                {anime.title}
              </Text>
              <Text style={styles.animeGenre} numberOfLines={1}>
                {anime.genre}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Seasonal */}
        <SectionHeading
          title="Seasonal picks"
          action="Explore"
          onPress={() => router.push('/discover')}
        />

        {seasonal.map((anime) => (
          <Pressable key={anime.id} style={styles.seasonalCard}>
            <View style={[styles.seasonalPoster, { backgroundColor: anime.color }]}>
              <Text style={styles.seasonalSymbol}>{anime.symbol}</Text>
            </View>

            <View style={styles.seasonalInfo}>
              <Text style={styles.seasonalTitle}>{anime.title}</Text>
              <Text style={styles.seasonalEpisodes}>{anime.episodes}</Text>
              <Text style={styles.seasonalStatus}>●  Currently airing</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 30,
  },
  logo: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 4,
  },
  logoDot: {
    color: COLORS.primary,
  },
  tagline: {
    color: COLORS.secondary,
    fontSize: 9,
    letterSpacing: 2.5,
    marginTop: 3,
  },
  searchButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 34,
  },
  greeting: {
    marginBottom: 25,
  },
  greetingEyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 9,
  },
  greetingTitle: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  greetingSubtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 7,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 15,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionAction: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  heroArtwork: {
    height: 155,
    backgroundColor: '#302344',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroOrb: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#674A89',
    opacity: 0.35,
    top: -65,
    right: -15,
  },
  heroJapanese: {
    color: '#E9DFFF',
    fontSize: 100,
    fontWeight: '900',
    opacity: 0.8,
  },
  heroArtworkBottom: {
    position: 'absolute',
    bottom: 12,
    left: 16,
  },
  heroArtworkLabel: {
    color: '#E8DDFC',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3,
  },
  heroContent: {
    padding: 17,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#302344',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginBottom: 11,
  },
  featuredBadgeText: {
    color: '#D4BFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroDescription: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 9,
  },
  metaText: {
    color: '#C8C5D6',
    fontSize: 11,
  },
  metaDot: {
    color: COLORS.primary,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 17,
  },
  primaryButtonText: {
    color: '#171020',
    fontSize: 12,
    fontWeight: '800',
  },
  animeCard: {
    width: 137,
    marginRight: 13,
  },
  poster: {
    height: 178,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  posterOrb: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    opacity: 0.07,
    top: 18,
    right: -35,
  },
  posterSymbol: {
    color: '#FFFFFF',
    fontSize: 67,
    fontWeight: '900',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 9,
    left: 9,
    backgroundColor: '#111018',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },
  ratingText: {
    color: '#F6D88B',
    fontSize: 10,
    fontWeight: '800',
  },
  animeTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
  animeGenre: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 4,
  },
  seasonalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  seasonalPoster: {
    width: 62,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonalSymbol: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  seasonalInfo: {
    flex: 1,
    marginLeft: 13,
  },
  seasonalTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  seasonalEpisodes: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 5,
  },
  seasonalStatus: {
    color: '#8FD8B0',
    fontSize: 9,
    marginTop: 7,
  },
  chevron: {
    color: COLORS.secondary,
    fontSize: 25,
    paddingHorizontal: 7,
  },
});