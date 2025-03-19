import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

document.documentElement.style.visibility = 'hidden';

window.onload = function() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="announcement-bar bg-dark text-white text-center py-2">
            SPRING BREAK SALE! 3 FOR $75 TRAVEL SPRAYS | SHOP NOW
        </div>
        <nav class="navbar navbar-expand-lg bg-white">
            <div class="container">
                <div class="d-flex align-items-center">
                    <a class="navbar-brand me-4" href="#">noteworthy</a>
                    <div class="nav-item d-flex align-items-center d-none d-lg-flex">
                        <i class="bi bi-circle me-1"></i>
                        <a class="nav-link px-0" href="#">SCENT QUIZ</a>
                    </div>
                </div>
                <div class="d-flex align-items-center order-lg-2 gap-3">
                    <button class="btn p-0"><i class="bi bi-search"></i></button>
                    <button class="btn p-0"><i class="bi bi-person"></i></button>
                    <button class="btn p-0"><i class="bi bi-bag"></i></button>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item d-lg-none">
                            <a class="nav-link d-flex align-items-center" href="#">
                                <i class="bi bi-circle me-1"></i>SCENT QUIZ
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center" href="#">
                                Fragrances <i class="bi bi-chevron-down ms-1"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link px-0 d-flex align-items-center" href="#">
                                Sample Kits <i class="bi bi-chevron-down ms-1 small"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link px-0 d-flex align-items-center" href="#">
                                Bundles <i class="bi bi-chevron-down ms-1 small"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link px-0 d-flex align-items-center" href="#">
                                Gifts <i class="bi bi-chevron-down ms-1 small"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link px-0 d-flex align-items-center" href="#">
                                About <i class="bi bi-chevron-down ms-1 small"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center">
                    <h2 class="mb-4">When were you born?</h2>
                    <p class="text-muted mb-5">We know age is just a number, but it's part of the science</p>
                    
                    <div class="row g-3">
                        <div class="col-sm-6">
                            <select class="form-select form-select-lg" aria-label="Year">
                                <option selected>Year</option>
                                ${Array.from({length: 100}, (_, i) => 
                                    `<option value="${2024-i}">${2024-i}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="col-sm-6">
                            <select class="form-select form-select-lg" aria-label="Month">
                                <option selected>Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.documentElement.style.visibility = 'visible';
}