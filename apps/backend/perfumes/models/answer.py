from django.db import models
from .question import Question
from .perfume import Perfume

class Answer(models.Model):
    """Answer Model"""
    question = models.ForeignKey(
        Question, 
        on_delete=models.CASCADE, 
        related_name='answers'
    )
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=500, blank=True, null=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    related_perfumes = models.ManyToManyField(
        Perfume, 
        blank=True, 
        related_name='quiz_answers'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Answer'
        verbose_name_plural = 'Answers'
        unique_together = ['question', 'title']
        ordering = ['question', 'order', 'id']

    def __str__(self):
        return f"{self.question.title} - {self.title}"