# Generated by Django 3.0.5 on 2020-05-11 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0009_sectionlist_position'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='position',
            field=models.IntegerField(blank=True, default=0),
            preserve_default=False,
        ),
    ]