from django.contrib import admin
from .models import *


admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Image)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(ShippingAddress)
admin.site.register(BillingAddress)
