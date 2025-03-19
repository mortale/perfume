from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.generic import RedirectView
from django.conf import settings
import requests
from django.http import HttpResponse
from django.views.generic.base import View

def health_check(request):
    return JsonResponse({"status": "ok"})

class ProxyView(View):
    def dispatch(self, request, path=''):
        if settings.DEBUG:
            # 开发环境：代理到前端开发服务器
            response = requests.get(f'http://localhost:3000/{path}')
            return HttpResponse(
                content=response.content,
                status=response.status_code,
                content_type=response.headers.get('content-type')
            )
        else:
            # 生产环境：返回 404 或其他处理
            return HttpResponse(status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health_check'),
    path('', ProxyView.as_view()),
    path('<path:path>', ProxyView.as_view()),
]