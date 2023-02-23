import { configureStore } from "@reduxjs/toolkit";
import { searchWordGeneration } from "../js/Puzzle";

// Initial State
////////////////////////////////////////

const initialState = {
    title:'',
    size: 16,
    wordList: [],
    searchWord: [],
}

// Action Creators
////////////////////////////////////////

export const setTitle = (title) =>{
    return {type:'setTitle', payload: title }
};

export const setSize = (size) =>{
    return {type:'setSize', payload: size }
};

export const clearWord = () =>{
    return {type: 'clearWord'};
}

export const addWord = (word) =>{
    //  replace methode will remove all the spécial caractère the accent and the space from the word.
    return {type:'addWord', payload: word.normalize('NFD').replace(/[^a-zA-Z]/g, '').replace(/[\u0300-\u036f]/g, '').toUpperCase() };
};

export const searchWordGenerate = (wordList, size) =>{
    return {type:'searchWordGenerate', payload: searchWordGeneration(wordList, size) };
};

// Reducer
////////////////////////////////////////

const searchWordReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'setTitle':
            return {
                ...state,
                title: action.payload
            };
        case 'setSize':
            return {
                ...state,
                size: action.payload,
            };
        case 'clearWord':
            return {
                ...state,
                wordList: []
            }
        case 'addWord':
            return {
                ...state,
                wordList:[...state.wordList, action.payload]
            };
        case 'searchWordGenerate':
            return {
                ...state,
                searchWord: action.payload
            };
        default:
            return state;
    };
};

export const store = configureStore({reducer: searchWordReducer});