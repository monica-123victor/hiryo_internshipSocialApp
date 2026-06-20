import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { Comment } from '../types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <View style={styles.card}>
            <Avatar seed={comment.email} size={36} />
            <View style={styles.content}>
                <Text style={styles.name}>{comment.name}</Text>
                <Text style={styles.body}>{comment.body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 14,
    },
    content: { marginLeft: 10, flex: 1 },
    name: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.textPrimary, marginBottom: 2 },
    body: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, lineHeight: 19 },
});