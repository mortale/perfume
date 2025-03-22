import { Modal } from 'bootstrap';
export function showRecommendationModal(perfumes) {
    const modalHtml = `
        <div class="modal fade" id="recommendationModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Recommended Perfumes</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Gender</th>
                                    <th>Scent Family</th>
                                    <th>Longevity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${perfumes.map(perfume => `
                                    <tr>
                                        <td>${perfume.name}</td>
                                        <td>${perfume.brand}</td>
                                        <td>${perfume.gender}</td>
                                        <td>${perfume.scent_family}</td>
                                        <td>${perfume.longevity}</td>
                                        <td>$${perfume.price}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 移除可能存在的旧模态框
    const oldModal = document.getElementById('recommendationModal');
    if (oldModal) {
        oldModal.remove();
    }

    // 添加新模态框到 body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // 显示模态框
    const modalElement = document.getElementById('recommendationModal');
    const modal = new Modal(modalElement);
    modal.show();
}