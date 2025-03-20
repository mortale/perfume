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
            <h1 class="text-center mb-4">Welcome to Noteworthy</h1>
            <div class="row">
                <div class="col-md-8 mx-auto text-center">
                    <p class="lead">Discover your perfect scent</p>
                    <a href="/quiz.html" class="btn btn-primary btn-lg mt-3">Take the Quiz</a>
                </div>
            </div>
        </div>
    `;
    document.documentElement.style.visibility = 'visible';
}