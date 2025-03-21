from django.contrib import admin
from .models import EnumConfig, Perfume, Question, Answer

@admin.register(EnumConfig)
class EnumConfigAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'code', 'category', 'description', 'sort_order', 'is_active', 'created_at', 'updated_at']
    list_filter = ['category', 'is_active']
    search_fields = ['code', 'name', 'description']
    ordering = ['category', 'sort_order', 'code']
    readonly_fields = ('id', 'created_at', 'updated_at')
    
@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'brand', 'gender', 'scent_family', 'longevity', 'price', 'created_at', 'updated_at']
    list_filter = ('brand', 'gender', 'scent_family', 'longevity')
    search_fields = ['name', 'brand__name', 'scent_family__name', 'best_for']
    readonly_fields = ('id', 'created_at', 'updated_at')
    filter_horizontal = ['key_notes']
    raw_id_fields = ['brand', 'gender', 'scent_family', 'longevity']
    fieldsets = (
        ('基本信息', {
            'fields': ('id', 'name', 'brand', 'price')
        }),
        ('香水特征', {
            'fields': ('gender', 'scent_family', 'key_notes', 'longevity')
        }),
        ('其他信息', {
            'fields': ('best_for', 'created_at', 'updated_at')
        }),
    )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'type', 'order', 'is_active', 'created_at')
    list_filter = ('type', 'is_active')
    search_fields = ('title',)
    list_editable = ('order', 'is_active')
    ordering = ('order', 'id')
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        ('基本信息', {
            'fields': ('id', 'title', 'type')
        }),
        ('显示设置', {
            'fields': ('order', 'is_active')
        }),
        ('时间信息', {
            'fields': ('created_at', 'updated_at')
        }),
    )

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'title', 'description', 'order', 'is_active')
    list_filter = ('question', 'is_active')
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')
    filter_horizontal = ('related_perfumes',)
    ordering = ('question', 'order', 'id')
    readonly_fields = ('id', 'created_at', 'updated_at')
    raw_id_fields = ['question']
    fieldsets = (
        ('基本信息', {
            'fields': ('id', 'question', 'title', 'description', )
        }),
        ('显示设置', {
            'fields': ('order', 'is_active')
        }),
        ('关联香水', {
            'fields': ('related_perfumes',)
        }),
        ('时间信息', {
            'fields': ('created_at', 'updated_at')
        }),
    )
