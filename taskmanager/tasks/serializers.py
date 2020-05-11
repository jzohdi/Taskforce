from rest_framework import serializers
from tasks.models import Task, Project, ProjectSection, ProjectNotes, SectionList, SubTask
from django.db.models import F


class subtaskserializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = '__all__'


class taskserializer(serializers.ModelSerializer):

    subtasks = subtaskserializer(many=True, required=False)

    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        Task.objects.filter(section_list=validated_data['section_list']).update(
            position=F('position') + 1)  # F allows for querying the db without loading data into memory
        new_task = Task.objects.create(
            position=0,
            name=validated_data["name"],
            section_list=validated_data['section_list'])
        return new_task


class sectionlistserializer(serializers.ModelSerializer):

    tasks = taskserializer(many=True, required=False)

    class Meta:
        model = SectionList
        fields = '__all__'

    def create(self, validated_data):
        SectionList.objects.filter(section=validated_data['section']).update(
            position=F('position') + 1)  # F allows for querying the db without loading data into memory
        new_list = SectionList.objects.create(
            position=0,
            name=validated_data["name"], section=validated_data['section'])
        return new_list


class projectsectionserializer(serializers.ModelSerializer):

    lists = sectionlistserializer(many=True, required=False)

    class Meta:
        model = ProjectSection
        fields = '__all__'


class projectnotesserializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectNotes
        fields = '__all__'


class projectserializer(serializers.ModelSerializer):

    sections = projectsectionserializer(many=True, required=False)
    notes = projectnotesserializer(many=True, required=False)

    class Meta:
        model = Project
        fields = '__all__'

    #  defined create because all projects should auto generate a main section

    def create(self, validated_data):
        new_project = Project.objects.create(**validated_data)
        ProjectSection.objects.create(name="Main", project=new_project)
        return new_project
