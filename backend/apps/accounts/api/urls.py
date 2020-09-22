from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    AccountVerificationAPIView,
    UserDetailAPIView,
    DeleteUserAPIView,
    LoginAPIView,
    LogoutAPIView,
    PasswordTokenVerificationAPIView,
    RegistrationAPIView,
    RequestPasswordResetEmailAPIView,
    SetNewPasswordAPIView,
    UpdatePasswordAPIView,
    UpdateUserAPIView,
    UpdatePasswordAPIView
)

app_name = 'accounts'

urlpatterns = [

    path('delete-account/', DeleteUserAPIView.as_view(), name='delete'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('me/', UserDetailAPIView.as_view(), name='me'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('update-password/', UpdatePasswordAPIView.as_view(),
         name='update_password'),
    path('update-user-detail/', UpdateUserAPIView.as_view(), name='update-detail'),
    path('verify-account/', AccountVerificationAPIView.as_view(), name='verify'),

    path('password-reset-email/', RequestPasswordResetEmailAPIView.as_view(),
         name='password-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenVerificationAPIView.as_view(),
         name='password-reset-verify'),
    path('password-reset-complete/',
         SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
]
