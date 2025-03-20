export function createNavbar() {
    return `
        <div class="announcement-bar bg-dark text-white text-center py-2">
            SPRING BREAK SALE! 3 FOR $75 TRAVEL SPRAYS | SHOP NOW
        </div>
        <nav class="navbar navbar-expand-lg bg-white">
            <div class="container">
                <div class="d-flex align-items-center">
                    <a class="navbar-brand me-4" href="/index.html">noteworthy</a>
                    <div class="nav-item d-flex align-items-center d-none d-lg-flex">
                        <i class="bi bi-circle me-1"></i>
                        <a class="nav-link px-0" href="/quiz.html">SCENT QUIZ</a>
                    </div>
                </div>
                <div class="d-flex align-items-center order-lg-2 gap-3">
                    <button class="btn p-0"><i class="bi bi-search"></i></button>
                    <button class="btn p-0"><i class="bi bi-person"></i></button>
                    <button class="btn p-0"><i class="bi bi-bag"></i></button>
                    <a href="/test.html" class="btn btn-link">API Test</a>
                </div>
            </div>
        </nav>
    `;
}