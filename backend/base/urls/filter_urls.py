from django.urls import path
from base.views import filter_views as views

urlpatterns = [
    path('categories/', views.getCategories, name="categories"),
    path('categories/create/', views.createCategory, name="category-create"),
    path('categories/update/<str:pk>/', views.updateCategory, name="category-update"),

    path('collections/', views.getCollections, name="collections"),
    path('collections/create/', views.createCollection, name="collection-create"),
    path('collections/update/<str:pk>/', views.updateCollection, name="collection-update"),
]
