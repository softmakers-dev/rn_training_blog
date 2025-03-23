import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Context} from "../context/BlogContext";
import {useNavigation} from "@react-navigation/native";
import {EvilIcons, Feather} from '@expo/vector-icons';

const ShowScreen = ({ route }) => {

    const { state } = useContext(Context);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: route.params.id})} style={{ marginRight: 15 }}>
                    <EvilIcons name="pencil" size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const blogPost = state.find((blogPost) => blogPost.id === route.params.id);

    return (
        <View>
            <Text>{blogPost.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default ShowScreen;
