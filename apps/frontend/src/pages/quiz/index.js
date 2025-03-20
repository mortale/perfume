import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/global.css'
import { createNavbar } from '../../components/navbar'

document.documentElement.style.visibility = 'hidden';

window.onload = function() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${createNavbar()}
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