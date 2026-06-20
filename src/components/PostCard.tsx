import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';
import { Post } from '../types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

interface PostCardProps {
    post: Post;
    onPress: () => void;
}

export default function PostCard({ post, onPress }: PostCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Avatar seed={post.user_id} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.userName}>User #{post.user_id}</Text>
                    <Text style={styles.postId}>Post #{post.id}</Text>
                </View>
            </View>
            <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
            <Text style={styles.body} numberOfLines={3}>{post.body}</Text>
            <View style={styles.footer}>
                <Text style={styles.readMore}>View details →</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: colors.primary,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    userName: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.textPrimary },
    postId: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 1 },
    title: { fontFamily: fonts.bold, fontSize: 16, marginBottom: 4, color: colors.textPrimary },
    body: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
    footer: { marginTop: 10, alignItems: 'flex-end' },
    readMore: { fontFamily: fonts.semiBold, color: colors.primary, fontSize: 13 },
});