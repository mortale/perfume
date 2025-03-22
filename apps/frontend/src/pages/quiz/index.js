import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/global.css'
import { quizModel } from './model'
import { renderProgressBar, initProgressBarEvents,updateProgressBarActive } from './components/ProgressBar';
import { showRecommendationModal } from './components/RecommendationModal';

document.documentElement.style.visibility = 'hidden';

function handleButtonClick(type) {
    switch(type) {
        case 'prev':
        case 'next':
            rerender();
            break;
        case 'recommend':
            quizModel.getRecommendation().then(data => {
                if (data) {
                    showRecommendationModal(data);
                }
            });
            break;
    }
}

async function renderQuiz() {
    const questions = await quizModel.init();
    if (!questions || questions.length === 0) {
        console.error('没有获取到问题数据');
        return;
    }
    renderCurrentQuestion();
    initProgressBarEvents(handleButtonClick);
}

// 修改 renderCurrentQuestion 中的 HTML 结构
function renderCurrentQuestion() {
    const question = quizModel.getCurrentQuestion();
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="container py-5 min-vh-100 d-flex flex-column">
            <div class="row flex-grow-1">
                <div class="col-md-6 mx-auto d-flex flex-column">
                    <div class="text-center mb-5">
                        <h2 id="questionTitle">${question.title}</h2>
                    </div>
                    <div class="row g-3 mt-4" id="answersContainer">
                        ${question.answers.map(answer => `
                            <div class="col-12">
                                <button class="btn ${quizModel.getSelectedAnswer(question.id) === answer.id ? 'btn-primary' : 'btn-outline-primary'} btn-lg w-100" 
                                    data-answer-id="${answer.id}"
                                    data-question-id="${question.id}">
                                    ${answer.title}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-auto pt-5">
                        ${renderProgressBar()}
                    </div>
                </div>
            </div>
        </div>
    `;

    // 修改答案按钮点击事件
    const answerButtons = app.querySelectorAll('[data-answer-id]');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answerId = button.dataset.answerId;
            const questionId = button.dataset.questionId;
            
            // 先设置选中状态
            quizModel.setSelectedAnswer(questionId, answerId);
            // 保存答案
            quizModel.setAnswer(questionId, answerId);
            
            // 如果还有下一题，显示下一题
            if (quizModel.hasNextQuestion()) {
                quizModel.goToNextQuestion();
                rerender()
                updateProgressBarActive(quizModel.currentQuestionIndex)
            } else {

            }
        });
    });

}

// 修改 rerender 中的元素查找方式
function rerender() {
    const question = quizModel.getCurrentQuestion();
    const titleElement = document.getElementById('questionTitle');
    const answersContainer = document.getElementById('answersContainer');
    
    // 获取当前问题的选中答案
    const selectedAnswerId = quizModel.getSelectedAnswer(question.id);
    
    // 更新标题
    titleElement.textContent = question.title;
    
    // 更新选项，并根据选中状态设置按钮样式
    answersContainer.innerHTML = question.answers.map(answer => `
        <div class="col-12">
            <button class="btn ${selectedAnswerId === "" + answer.id ? 'btn-primary' : 'btn-outline-primary'} btn-lg w-100" 
                data-answer-id="${answer.id}"
                data-question-id="${question.id}">
                ${answer.title}
            </button>
        </div>
    `).join('');
    
    // 重新绑定答案按钮事件
    const answerButtons = answersContainer.querySelectorAll('[data-answer-id]');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answerId = button.dataset.answerId;
            const questionId = button.dataset.questionId;
            
            quizModel.setSelectedAnswer(questionId, answerId);
            quizModel.setAnswer(questionId, answerId);
            
            if (quizModel.hasNextQuestion()) {
                quizModel.goToNextQuestion();
            }
                rerender();
                updateProgressBarActive(quizModel.currentQuestionIndex,);
        });
    });
}

// 添加全局跳转方法
window.goToQuestion = (index) => {
    quizModel.goToQuestion(index);
    renderCurrentQuestion();
};

window.onload = function() {
    renderQuiz();
    document.documentElement.style.visibility = 'visible';
}