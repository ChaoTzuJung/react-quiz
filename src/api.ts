import { shuffleArray } from './utils';

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HEAD = "head",
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answer: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answer: string[] }

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=mutiple`;
    const data = await(await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        awnser: shuffleArray([
            ...question.incorrect_answer,
            question.correct_answer
        ])
    }))
}