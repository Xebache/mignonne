# Generated by Django 4.0.1 on 2022-02-05 17:18

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='color',
            name='href',
        ),
        migrations.AddField(
            model_name='color',
            name='hex',
            field=models.CharField(default='#000000', max_length=7, validators=[base.models.validate_hex]),
        ),
    ]
