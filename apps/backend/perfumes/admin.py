from django.contrib import admin
from .models import EnumConfig, Perfume

@admin.register(EnumConfig)
class EnumConfigAdmin(admin.ModelAdmin):
    list_display = ['category', 'code', 'name', 'sort_order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['code', 'name', 'description']
    ordering = ['category', 'sort_order', 'code']

@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    list_display = ['brand', 'name', 'gender', 'scent_family', 'longevity', 'price']
    list_filter = ['brand', 'gender', 'scent_family', 'longevity']
    search_fields = ['name', 'key_notes']