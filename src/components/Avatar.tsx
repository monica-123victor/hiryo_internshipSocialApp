import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AvatarProps {
    seed: number | string;
    size?: number;
}

export default function Avatar({ seed, size = 48 }: AvatarProps) {
    const uri = `https://i.pravatar.cc/150?u=${seed}`;
    return (
        <Image
            source={{ uri }}
            style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#e1e1e1',
    },
});