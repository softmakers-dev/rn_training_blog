import React, { useContext, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import {Context} from "../context/BlogContext";
import {FontAwesome6, Feather} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";


const IndexScreen = () => {

    const {state, addBlogPost, deleteBlogPost, getBlogPosts} = useContext(Context);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{ marginRight: 15 }}>
                    <Feather name="plus" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('focus',() => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        }
    }, [])

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Show", {id: item.id})
                        }>
                            <View style={styles.container}>
                                <Text style={styles.title}>
                                    {item.title} - {item.id}
                                </Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <FontAwesome6 style={styles.icon} name="trash-can" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: 'teal'
    },
    title: {
        fontSize: 18,

    },
    icon: {
        fontSize: 22,
    }
});

export default IndexScreen;
