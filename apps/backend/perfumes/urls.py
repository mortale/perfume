from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerfumeRecommendationView, QuestionViewSet

# 创建路由器并注册视图集
router = DefaultRouter()
router.register('questions', QuestionViewSet)

urlpatterns = [
    # 包含路由器生成的 URL
    path('', include(router.urls)),
    
    # 香水推荐接口
    path('perfumes/<int:perfume_id>/recommendations/', 
         PerfumeRecommendationView.as_view(), 
         name='perfume-recommendations'),
]