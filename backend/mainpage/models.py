from django.db import models


class Plan(models.Model):
    PLAN_CHOICES = [
        ('yes', 'Selected'),
        ('no', 'Not Selected'),
        ('dev', 'Development Plan'),
    ]

    name = models.CharField(max_length=50)
    price = models.CharField(max_length=10)
    bots = models.CharField(max_length=50)
    memory = models.CharField(max_length=50)
    messages = models.CharField(max_length=50)
    features = models.TextField()
    selected = models.CharField(max_length=10, choices=PLAN_CHOICES, default='no')

    def get_features_list(self):
        return self.features.split("\n")

    def __str__(self):
        return self.name
