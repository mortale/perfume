import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/global.css'
import { createNavbar } from '../../components/navbar'
import { http } from '../../utils/request'

document.documentElement.style.visibility = 'hidden';

window.onload = function() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${createNavbar()}
        <div class="container py-5">
            <h2>API 测试</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span>香水推荐测试</span>
                            <span class="badge bg-secondary" id="requestStatus"></span>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">香水ID</label>
                                <input type="number" class="form-control" id="perfumeId" value="1">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">请求URL</label>
                                <input type="text" class="form-control" id="requestUrl" readonly>
                            </div>
                            <button class="btn btn-primary" id="testRecommend">测试推荐</button>
                            <div class="mt-3">
                                <div class="d-flex justify-content-between">
                                    <strong>响应结果：</strong>
                                    <span class="text-muted" id="responseTime"></span>
                                </div>
                                <pre class="mt-2 p-3 bg-light" id="recommendResult" style="max-height: 400px; overflow-y: auto;"></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('testRecommend').onclick = async () => {
        const perfumeId = document.getElementById('perfumeId').value;
        const requestUrl = `/api/perfumes/${perfumeId}/recommendations/`;
        const statusEl = document.getElementById('requestStatus');
        const resultEl = document.getElementById('recommendResult');
        const timeEl = document.getElementById('responseTime');
        
        document.getElementById('requestUrl').value = requestUrl;
        statusEl.textContent = '请求中...';
        statusEl.className = 'badge bg-warning';
        resultEl.textContent = '';
        
        const startTime = Date.now();
        
        try {
            const result = await http.get(requestUrl);
            const endTime = Date.now();
            
            statusEl.textContent = '成功';
            statusEl.className = 'badge bg-success';
            timeEl.textContent = `耗时: ${endTime - startTime}ms`;
            resultEl.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            const endTime = Date.now();
            
            statusEl.textContent = '失败';
            statusEl.className = 'badge bg-danger';
            timeEl.textContent = `耗时: ${endTime - startTime}ms`;
            resultEl.innerHTML = `
                <div class="text-danger">
                    <strong>错误信息：</strong> ${error.message}
                </div>
                <div class="mt-2">
                    <strong>请求URL：</strong> ${requestUrl}
                </div>
            `;
        }
    };

    document.documentElement.style.visibility = 'visible';
}