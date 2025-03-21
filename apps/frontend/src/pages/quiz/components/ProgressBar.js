import { quizModel } from '../model';

export function renderProgressBar() {
    const currentIndex = quizModel.currentQuestionIndex;
    const totalQuestions = quizModel.questions.length;
    
    const html = `
        <div class="position-relative d-flex justify-content-center progress-bar-container">
            <div class="progress-bar-wrapper" data-question-index="${currentIndex}">
                <div class="d-flex justify-content-between align-items-center mb-3">
                        <button class="btn btn-link text-nowrap" id="prevButton">
                            <i class="bi bi-arrow-left"></i> Previous
                        </button>
                    <div class="progress flex-grow-1 mx-4 bg-transparent d-flex align-items-center progress-container">
                        ${Array.from({ length: totalQuestions }, (_, i) => `
                            <div class="progress-bar position-relative"
                                ${getProgressBarAttributes(i)}
                                role="progressbar">
                            </div>
                        `).join('')}
                    </div>
                    <div class="nav-buttons-wrapper">
                        <button class="btn btn-link text-nowrap" id="nextButton">
                            Next <i class="bi bi-arrow-right"></i>
                        </button>
                        <button class="btn btn-link text-nowrap" id="recommendButton">
                            Recommendations <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <span class="small text-muted">${currentIndex + 1} / ${totalQuestions}</span>
                </div>
            </div>
        </div>
    `;
    return html;
}

export function initProgressBarEvents(callback) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const recommendButton = document.getElementById('recommendButton');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            quizModel.goToPreviousQuestion();
            updateProgressBarActive(quizModel.currentQuestionIndex);
            callback?.('prev');
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            quizModel.goToNextQuestion();
            updateProgressBarActive(quizModel.currentQuestionIndex);
            callback?.('next');
        });
    }

    if (recommendButton) {
        recommendButton.addEventListener('click', () => {
            if (quizModel.isAllQuestionsAnswered()) {
                const answers = quizModel.getAllAnswers();
                console.log('问卷完成，答案：', answers);
                callback?.('recommend');
            }
        });
    }
}
function getProgressBarAttributes(index) {
    const question = quizModel.questions[index];
    const currentIndex = quizModel.currentQuestionIndex;
    const isFirstVisit = quizModel.isFirstVisit(question.id);
    const isAnswered = quizModel.getAnswer(question.id);
    
    const attrs = [];
    // 标记完成状态
    if (isAnswered) {
        attrs.push('data-finish="true"');
    }
    
    // 标记首次访问后的状态
    if (!isFirstVisit) {
        attrs.push('data-ready="true"');
    }
    
    // 标记激活状态
    if (index === currentIndex) {
        attrs.push('data-active="true"');
    } else if (index === currentIndex - 1) {
        attrs.push('data-active-left="true"');
    } else if (index === currentIndex + 1) {
        attrs.push('data-active-right="true"');
    }
    
    // 添加可点击状态
    if (!isAnswered && index <= currentIndex) {
        attrs.push('data-clickable="true"');
    }
    
    return attrs.join(' ');
}

export function updateProgressBarActive(newIndex) {
    const wrapper = document.querySelector('.progress-bar-wrapper');
    const counter = wrapper.querySelector('.small.text-muted');
    const bars = document.querySelectorAll('.progress-bar');
    const totalQuestions = quizModel.questions.length;
    
    // 更新问题索引
    wrapper.setAttribute('data-question-index', newIndex);
    
    // 更新计数器显示
    counter.textContent = `${newIndex + 1} / ${totalQuestions}`;
    
    // 清除所有状态属性并重新计算
    bars.forEach((bar, index) => {
        const question = quizModel.questions[index];
        const isFirstVisit = quizModel.isFirstVisit(question.id);
        const isAnswered = quizModel.getAnswer(question.id);
        bar.removeAttribute('data-active');
        bar.removeAttribute('data-active-left');
        bar.removeAttribute('data-active-right');
        bar.removeAttribute('data-ready');
        bar.removeAttribute('data-finish');
        
        // 重新设置完成和就绪状态
        if (isAnswered) {
            bar.setAttribute('data-finish', 'true');
        }
        if (!isFirstVisit) {
            bar.setAttribute('data-ready', 'true');
        }
    });
    
    // 设置新的激活状态
    if (bars[newIndex]) {
        bars[newIndex].setAttribute('data-active', 'true');
    }
    if (bars[newIndex - 1]) {
        bars[newIndex - 1].setAttribute('data-active-left', 'true');
    }
    if (bars[newIndex + 1]) {
        bars[newIndex + 1].setAttribute('data-active-right', 'true');
    }
}