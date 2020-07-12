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
    incorrect_answers: string[];
    question: string;
    type: string;
}

// NOTE:
export type QuestionState = Question & { awnser: string[] }

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await(await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        awnser: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }))
}
