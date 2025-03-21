from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.perfume import Perfume
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)

class PerfumeRecommendationView(APIView):
    def get(self, request, perfume_id):
        try:
            logger.info(f"开始获取香水ID: {perfume_id}")
            # 先检查数据库中是否有数据
            total_perfumes = Perfume.objects.count()
            logger.info(f"数据库中总共有 {total_perfumes} 个香水")
            
            if total_perfumes == 0:
                return Response({
                    'error': '数据库中没有香水数据'
                }, status=404)

            # 获取目标香水
            try:
                target_perfume = Perfume.objects.get(id=perfume_id)
                logger.info(f"成功获取目标香水: {target_perfume.name}")
            except Perfume.DoesNotExist:
                return Response({
                    'error': f'未找到ID为 {perfume_id} 的香水'
                }, status=404)
            
            # 获取所有香水
            all_perfumes = list(Perfume.objects.all())  # 转换为列表以避免重复查询
            
            if len(all_perfumes) < 2:
                return Response({
                    'error': '数据库中香水数量不足，无法生成推荐'
                }, status=400)
            
            # 构建特征向量
            features = []
            perfume_ids = []
            
            for perfume in all_perfumes:
                try:
                    feature_vector = [
                        perfume.brand_id,
                        perfume.gender_id,
                        perfume.scent_family_id,
                        perfume.longevity_id,
                        float(perfume.price)
                    ]
                    features.append(feature_vector)
                    perfume_ids.append(perfume.id)
                except Exception as e:
                    logger.error(f"处理香水 {perfume.id} 时出错: {str(e)}")
                    continue
            
            if not features:
                return Response({
                    'error': '无法构建特征向量'
                }, status=500)
            
            target_index = perfume_ids.index(int(perfume_id))
            features = np.array(features)
            
            # 计算相似度
            similarities = cosine_similarity([features[target_index]], features)
            similar_indices = similarities[0].argsort()[::-1][1:6]
            
            # 构建推荐结果
            recommendations = []
            for idx in similar_indices:
                perfume = all_perfumes[idx]
                recommendations.append({
                    'id': perfume.id,
                    'name': perfume.name,
                    'brand': perfume.brand.name,
                    'similarity_score': float(similarities[0][idx]),
                    'price': str(perfume.price)
                })
            
            return Response({
                'target_perfume': {
                    'id': target_perfume.id,
                    'name': target_perfume.name,
                    'brand': target_perfume.brand.name
                },
                'recommendations': recommendations
            })
            
        except Exception as e:
            logger.exception(f"推荐系统出错: {str(e)}")
            return Response({
                'error': f'推荐系统错误: {str(e)}'
            }, status=500)