import { http } from '../../utils/request'

class QuizModel {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = new Map();
        this.visitedQuestions = new Set([]);
        this.selectedAnswers = new Map(); // 新增：记录每个问题当前选中的答案
    }

    setSelectedAnswer(questionId, answerId) {
        this.selectedAnswers.set(questionId, answerId);
    }

    getSelectedAnswer(questionId) {
        return this.selectedAnswers.get(""+questionId);
    }

    clearSelectedAnswer(questionId) {
        this.selectedAnswers.delete(questionId);
    }

    getCurrentQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.visitedQuestions.add(question.id); // 记录访问
        return question;
    }

    isFirstVisit(questionId) {
        return !this.visitedQuestions.has(questionId);
    }

    async init() {
        try {
            const questions = await http.get('/api/questions/');
            this.setQuestions(questions);
            return questions;
        } catch (error) {
            console.error('获取问题出错:', error);
            return [];
        }
    }

    setQuestions(questions) {
        this.questions = questions;
    }


    setAnswer(questionId, answerId) {
        this.answers.set(questionId, answerId);
    }

    getAnswer(questionId) {
        return this.answers.get(''+questionId);
    }

    getAllAnswers() {
        return Object.fromEntries(this.answers);
    }

    hasPreviousQuestion() {
        return this.currentQuestionIndex > 0;
    }

    hasNextQuestion() {
        return this.currentQuestionIndex < this.questions.length - 1;
    }

    goToPreviousQuestion() {
        if (this.hasPreviousQuestion()) {
            this.currentQuestionIndex--;
            return this.getCurrentQuestion();
        }
        return null;
    }

    goToNextQuestion() {
        if (this.hasNextQuestion()) {
            this.currentQuestionIndex++;
            return this.getCurrentQuestion();
        }
        return null;
    }

    isAllQuestionsAnswered() {
        // 检查是否所有问题都已回答
        return this.questions.every(question => 
            this.answers.has(question.id.toString())
        );
    }

    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            return this.getCurrentQuestion();
        }
        return null;
    }
}

export const quizModel = new QuizModel();