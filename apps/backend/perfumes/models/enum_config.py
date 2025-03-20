from django.db import models

class EnumConfig(models.Model):
    """Enumeration Configuration Base Class"""
    CATEGORY_CHOICES = [
        ('brand', 'Brand'),
        ('scent_family', 'Scent Family'),
        ('longevity', 'Longevity'),
        ('gender', 'Gender'),
        ('note', 'Fragrance Note')
    ]

    category = models.CharField('Category', max_length=20, choices=CATEGORY_CHOICES)
    code = models.CharField('Code', max_length=50)
    name = models.CharField('Name', max_length=100)
    description = models.TextField('Description', blank=True)
    sort_order = models.IntegerField('Sort Order', default=0)
    is_active = models.BooleanField('Active Status', default=True)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)

    class Meta:
        unique_together = ['category', 'code']
        ordering = ['category', 'sort_order', 'code']
        verbose_name = 'Enum Configuration'
        verbose_name_plural = 'Enum Configurations'

    def __str__(self):
        return f"{self.get_category_display()}-{self.name}"