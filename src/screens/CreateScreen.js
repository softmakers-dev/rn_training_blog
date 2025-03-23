import React, {useContext} from 'react';
import { StyleSheet } from "react-native";
import {Context} from "../context/BlogContext";
import {useNavigation} from "@react-navigation/native";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = () => {

    const {addBlogPost} = useContext(Context);
    const navigation = useNavigation();

    return <BlogPostForm onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate('Index'));
    }}
    />;
}

const styles = StyleSheet.create({});

export default CreateScreen;
