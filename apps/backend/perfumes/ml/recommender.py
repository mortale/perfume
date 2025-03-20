import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from ..models import Perfume, EnumConfig

class PerfumeRecommender:
    def __init__(self):
        self.scaler = StandardScaler()
        self.similarity_matrix = None
        self.perfume_ids = None
        self.feature_names = None
    
    def _create_feature_matrix(self):
        """创建特征矩阵"""
        perfumes = Perfume.objects.all().prefetch_related('key_notes')
        
        # 获取所有特征的唯一值
        scent_families = list(EnumConfig.objects.filter(category='scent_family'))
        notes = list(EnumConfig.objects.filter(category='note'))
        
        # 记录特征名称
        self.feature_names = (
            [f"scent_{sf.code}" for sf in scent_families] +
            [f"note_{n.code}" for n in notes] +
            ['price']
        )
        
        # 创建特征矩阵
        feature_matrix = []
        perfume_ids = []
        
        for perfume in perfumes:
            features = []
            # 香调家族的 one-hot 编码
            features.extend([1 if perfume.scent_family.id == sf.id else 0 for sf in scent_families])
            
            # 香调成分的 multi-hot 编码
            perfume_notes = set(perfume.key_notes.values_list('id', flat=True))
            features.extend([1 if n.id in perfume_notes else 0 for n in notes])
            
            # 添加价格特征
            features.append(float(perfume.price))
            
            feature_matrix.append(features)
            perfume_ids.append(perfume.id)
        
        return np.array(feature_matrix), perfume_ids
    
    def fit(self):
        """训练推荐模型"""
        # 创建特征矩阵
        feature_matrix, self.perfume_ids = self._create_feature_matrix()
        
        # 标准化价格特征（最后一列）
        feature_matrix[:, -1] = self.scaler.fit_transform(feature_matrix[:, -1].reshape(-1, 1)).ravel()
        
        # 计算余弦相似度矩阵
        self.similarity_matrix = cosine_similarity(feature_matrix)
        
        return self
    
    def recommend(self, perfume_id, n_recommendations=5):
        """根据给定香水推荐相似的香水"""
        if self.similarity_matrix is None:
            self.fit()
            
        try:
            idx = self.perfume_ids.index(perfume_id)
        except ValueError:
            return []
        
        # 获取相似度分数
        similarity_scores = self.similarity_matrix[idx]
        
        # 获取最相似的香水索引（排除自身）
        similar_indices = similarity_scores.argsort()[::-1][1:n_recommendations+1]
        
        # 获取推荐的香水ID和相似度分数
        recommendations = [
            (self.perfume_ids[idx], float(similarity_scores[idx]))
            for idx in similar_indices
        ]
        
        return recommendations

    def explain_recommendation(self, source_id, target_id):
        """解释为什么推荐这款香水"""
        if self.similarity_matrix is None:
            self.fit()
            
        try:
            source_idx = self.perfume_ids.index(source_id)
            target_idx = self.perfume_ids.index(target_id)
            source = Perfume.objects.get(id=source_id)
            target = Perfume.objects.get(id=target_id)
            
            explanation = [
                f"推荐 {target.brand.name} 的 {target.name} 是因为：",
                f"1. 香调家族: {target.scent_family.name} {'(相同)' if source.scent_family == target.scent_family else ''}",
                f"2. 共同的香调成分: {', '.join(note.name for note in set(source.key_notes.all()) & set(target.key_notes.all()))}",
                f"3. 价格区间: {target.price} {'(相近)' if abs(float(source.price) - float(target.price)) < 50 else ''}"
            ]
            
            return "\n".join(explanation)
            
        except (ValueError, Perfume.DoesNotExist):
            return "无法生成推荐解释"