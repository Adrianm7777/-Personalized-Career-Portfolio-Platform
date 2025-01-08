from django.urls import path
from .views import portfolio_data
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("portfolio/", portfolio_data, name="portfolio-data"),
    path("token/",TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/",TokenRefreshView.as_view(),name="token_refresh")
]