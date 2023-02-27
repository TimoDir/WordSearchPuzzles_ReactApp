import { configureStore } from "@reduxjs/toolkit";
import { puzzleGeneration, wordPlacement } from "../js/Puzzle";

// Initial State
////////////////////////////////////////

const initialState = {
    title:'',
    size: 16,
    searchWord: {
        wordInfo: [],
        puzzle: [],
    },
}

// Action Creators
////////////////////////////////////////

const setTitle = (title) =>{
    return {type:'setTitle', payload: title }
};

const setSize = (size) =>{
    return {type:'setSize', payload: size }
};

const createWordInfo = (wordList, size) =>{
    return {type:'createWordInfo', payload: wordPlacement(wordList, size)}
};

const puzzleGenerate = (wordInfo, size) =>{
    return {type:'puzzleGenerate', payload: puzzleGeneration(wordInfo, size) };
};

export const action = {
    setTitle: setTitle,
    setSize: setSize,
    createWordInfo: createWordInfo,
    puzzleGenerate: puzzleGenerate,
}

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
        case 'createWordInfo':
            return {
                ...state,
                searchWord:{
                    ...state.searchWord,
                    wordInfo: action.payload
                } 
            };
        case 'puzzleGenerate':
            return {
                ...state,
                searchWord:{
                    ...state.searchWord,
                    puzzle: action.payload
                } 
            };
        default:
            return state;
    };
};

export const store = configureStore({
    reducer: searchWordReducer,
});