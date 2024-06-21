from django.db import models

class AHAccessToken(models.Model):
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    expires_in = models.IntegerField()

    def __str__(self):
        return f"Access Token: {self.access_token}"
