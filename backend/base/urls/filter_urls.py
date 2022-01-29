from django.urls import path
from base.views import filter_views as views

urlpatterns = [
    path('categories/', views.getCategories, name="categories"),
    path('collections/', views.getCollections, name="collections"),
]
