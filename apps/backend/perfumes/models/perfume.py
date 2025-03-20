from django.db import models
from .enum_config import EnumConfig

class Perfume(models.Model):
    """Perfume"""
    name = models.CharField('Name', max_length=200)
    brand = models.ForeignKey(
        EnumConfig, 
        on_delete=models.PROTECT,
        limit_choices_to={'category': 'brand'},
        related_name='brand_perfumes',
        verbose_name='Brand'
    )
    gender = models.ForeignKey(
        EnumConfig,
        on_delete=models.PROTECT,
        limit_choices_to={'category': 'gender'},
        related_name='gender_perfumes',
        verbose_name='Gender'
    )
    scent_family = models.ForeignKey(
        EnumConfig,
        on_delete=models.PROTECT,
        limit_choices_to={'category': 'scent_family'},
        related_name='scent_perfumes',
        verbose_name='Scent Family'
    )
    key_notes = models.ManyToManyField(
        EnumConfig,
        limit_choices_to={'category': 'note'},
        related_name='note_perfumes',
        verbose_name='Key Notes'
    )
    longevity = models.ForeignKey(
        EnumConfig,
        on_delete=models.PROTECT,
        limit_choices_to={'category': 'longevity'},
        related_name='longevity_perfumes',
        verbose_name='Longevity'
    )
    best_for = models.TextField('Best For', blank=True)
    price = models.DecimalField('Price', max_digits=6, decimal_places=2)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)

    class Meta:
        unique_together = ['brand', 'name']
        ordering = ['brand', 'name']
        verbose_name = 'Perfume'
        verbose_name_plural = 'Perfumes'

    def __str__(self):
        return f"{self.brand.name} - {self.name}"

    @property
    def brand_name(self):
        return self.brand.name

    @property
    def scent_family_name(self):
        return self.scent_family.name

    @property
    def gender_name(self):
        return self.gender.name

    @property
    def longevity_name(self):
        return self.longevity.name