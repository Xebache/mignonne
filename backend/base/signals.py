from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Product, Image


@receiver(pre_save, sender=User)
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

@receiver(post_save, sender=Product)
def createdProduct(sender, instance, created, **kwargs):
    product = instance
    print("instance",product.id, product.images)
    if product.images == '':
        Image.objects.create(
            product=product.id,
            path="/default.wepb",
            isMain=True
        )

