from rest_framework import serializers
from ..models import Question, Answer, Perfume

class PerfumeSimpleSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name')
    
    class Meta:
        model = Perfume
        fields = ['id', 'name', 'brand_name']

class AnswerSerializer(serializers.ModelSerializer):
    related_perfumes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Answer
        fields = ['id', 'title', 'description', 'related_perfumes', 'order']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'title', 'type', 'order', 'answers']