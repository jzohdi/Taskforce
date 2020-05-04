from rest_framework import serializers
from tasks.models import Task, Project


class taskserializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class projectserializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
