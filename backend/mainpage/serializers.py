from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
    features = serializers.SerializerMethodField()

    class Meta:
        model = Plan
        fields = ['id', 'name', 'price', 'bots', 'memory', 'messages', 'features', 'selected']

    def get_features(self, obj):
        return obj.get_features_list()
