import React, {useReducer} from 'react';
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'edit_blogPost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        case 'add_blogPost':
            return [...state, {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];
        case 'delete_blogPost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        default:
            return state;
    }
}

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({type: 'get_blogPost', payload: response.data});
    }
}

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title: title, content: content}});
        callback();
    }
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'delete_blogPost', payload: id});
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'edit_blogPost',
            payload: {id, title, content}
        });
        callback();
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost},
    [{title: 'Test title', content: 'Test content'}]
);
