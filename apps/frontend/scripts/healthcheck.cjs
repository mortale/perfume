const axios = require('axios');
const { exit } = require('process');

const MAX_RETRIES = 10;
const RETRY_DELAY = 1000;
const BACKEND_URL = 'http://localhost:8000/api/health/';

// 添加ANSI颜色代码
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

function log(message, color = '') {
    console.log(`${color}${message}${colors.reset}\n`);
}

async function checkBackendHealth(retryCount = 0) {
    try {
        const response = await axios({
            method: 'get',
            url: BACKEND_URL,
            timeout: 2000, // 2秒超时
            validateStatus: (status) => status >= 200 && status < 500
        });

        if (response.status === 200) {
            log('✅ 后端服务已就绪', colors.green);
            return true;
        }

        log(`⚠️ 非预期状态码: ${response.status}`, colors.yellow);
    } catch (error) {
        const remainingTime = (MAX_RETRIES - retryCount) * RETRY_DELAY / 1000;
        const errorMsg = error.response ?
            `HTTP ${error.response.status}` :
            error.code || error.message;

        log(`🔴 请求失败 (${errorMsg}) 剩余重试: ${MAX_RETRIES - retryCount}次`, colors.red);
    }

    if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return checkBackendHealth(retryCount + 1);
    }
    return false;
}

checkBackendHealth().then(success => {
    exit(success ? 0 : 1);
});