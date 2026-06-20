import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, ActivityIndicator, StyleSheet,
    TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import CommentCard from '../components/CommentCard';
import { getCommentsByPostId } from '../services/api';
import { Comment } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

export default function PostDetailsScreen({ route }: Props) {
    const { post } = route.params;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [draft, setDraft] = useState('');

    useEffect(() => {
        getCommentsByPostId(post.id)
            .then(setComments)
            .catch(() => setComments([]))
            .finally(() => setLoading(false));
    }, [post.id]);

    const handleSend = () => {
        const trimmed = draft.trim();
        if (!trimmed) return;

        const localComment: Comment = {
            id: Date.now(), // temporary unique id, since this isn't saved to the server
            post_id: post.id,
            name: 'You',
            email: 'you@local.app',
            body: trimmed,
        };

        setComments((prev) => [localComment, ...prev]);
        setDraft('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
        >
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                style={styles.screen}
                ListHeaderComponent={
                    <View style={styles.postContainer}>
                        <View style={styles.header}>
                            <Avatar seed={post.user_id} size={56} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.userName}>User #{post.user_id}</Text>
                                <Text style={styles.postMeta}>Post #{post.id}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.body}>{post.body}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.commentsLabel}>
                            💬 Comments {loading ? '' : `(${comments.length})`}
                        </Text>
                    </View>
                }
                renderItem={({ item }) => <CommentCard comment={item} />}
                ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} color="#3b5bfd" /> : null}
                ListEmptyComponent={
                    !loading ? <Text style={styles.empty}>No comments yet. Be the first!</Text> : null
                }
            />

            <View style={styles.composer}>
                <TextInput
                    style={styles.composerInput}
                    placeholder="Write a comment..."
                    placeholderTextColor="#9aa0b4"
                    value={draft}
                    onChangeText={setDraft}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, !draft.trim() && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!draft.trim()}
                >
                    <Ionicons name="send" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: colors.background },
    postContainer: {
        padding: 20,
        backgroundColor: colors.surface,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 8,
    },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    userName: { fontFamily: fonts.bold, fontSize: 17, color: colors.textPrimary },
    postMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
    title: { fontFamily: fonts.bold, fontSize: 21, marginBottom: 10, color: colors.textPrimary, lineHeight: 28 },
    body: { fontFamily: fonts.regular, fontSize: 15, color: colors.textSecondary, lineHeight: 23, marginBottom: 16 },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 14 },
    commentsLabel: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.textPrimary },
    empty: { textAlign: 'center', color: colors.textMuted, padding: 32, fontFamily: fonts.regular, fontSize: 14 },
    composer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    composerInput: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.textPrimary,
        maxHeight: 100,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: colors.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: colors.primaryLight,
    },
});