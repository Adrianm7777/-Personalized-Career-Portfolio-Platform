from django.urls import path
from .views import portfolio_data ,login_view ,logout_view, sign_up
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("portfolio/", portfolio_data, name="portfolio-data"),
    path("login/",login_view, name="login"),
    path("logout/", logout_view, name ="logout"),
    path("token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
    path("signup/",sign_up, name="sign-up")
]