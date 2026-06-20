import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import { Post } from '../types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export type RootStackParamList = {
    Home: undefined;
    PostDetails: { post: Post };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontFamily: fonts.semiBold, fontSize: 18 },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Feed' }} />
                <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Post' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}