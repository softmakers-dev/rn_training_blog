import React, {useContext} from 'react';
import {StyleSheet} from "react-native";
import {Context} from "../context/BlogContext";
import {useNavigation} from "@react-navigation/native";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({route}) => {

    const {state, editBlogPost} = useContext(Context);
    const navigation = useNavigation();
    const blogPost = state.filter((blogPost) => blogPost.id === route.params.id)[0];
    return <BlogPostForm
        initialValues={{title: blogPost.title, content:blogPost.content}}
        onSubmit={(title, content) => {
            editBlogPost(route.params.id, title, content, () => navigation.pop());
        }}
    />;
}

const styles = StyleSheet.create({});

export default EditScreen;
