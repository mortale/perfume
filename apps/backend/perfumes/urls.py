from django.urls import path
from .views import PerfumeRecommendationView

urlpatterns = [
    path('perfumes/<int:perfume_id>/recommendations/', 
         PerfumeRecommendationView.as_view(), 
         name='perfume-recommendations'),
]