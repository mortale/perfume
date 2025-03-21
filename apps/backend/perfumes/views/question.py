from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny
from ..models import Question
from ..serializers import QuestionSerializer

class QuestionViewSet(ReadOnlyModelViewSet):
    """问题接口"""
    queryset = Question.objects.prefetch_related(
        'answers',
        'answers__related_perfumes',
        'answers__related_perfumes__brand'
    ).filter(is_active=True)
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]