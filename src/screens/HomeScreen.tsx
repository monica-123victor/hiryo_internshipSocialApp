import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import { getPosts } from '../services/api';
import { Post } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      setError(null);
      const data = await getPosts();
      setPosts(data);
    } catch (e) {
      setError('Failed to load posts. Pull down to retry.');
    }
  }, []);

  useEffect(() => {
    loadPosts().finally(() => setLoading(false));
  }, [loadPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [posts, query]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b5bfd" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={18} color="#9aa0b4" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts by title..."
          placeholderTextColor="#9aa0b4"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetails', { post: item })}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b5bfd" />}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No posts match "{query}"</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    error: { color: colors.danger, textAlign: 'center', padding: 8, fontFamily: fonts.medium },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
        shadowColor: colors.primary,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    searchInput: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.textPrimary },
    empty: { textAlign: 'center', color: colors.textMuted, padding: 32, fontFamily: fonts.regular, fontSize: 14 },
});