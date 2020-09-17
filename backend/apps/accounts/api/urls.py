from django.urls import path, include


from .views import (
    api_overview,
    registration_api_view,
    verify_account_api_view,
    delete_user_api_view, update_api_view, log_api_view,
    UpdatePasswordAPIView, user_api_view, logout_api_view,
    authenticate,
    recovery_verify_otp_api_view,
    PasswordTokenVerificationAPI,
    RequestPasswordResetEmail,
    SetNewPasswordSerializer
)

app_name = 'accounts'

urlpatterns = [

    path('delete-account/', delete_user_api_view, name='delete'),
    path('login/', log_api_view, name='login'),
    path('logout/', logout_api_view, name='login'),
    path('me/', user_api_view, name='me'),
    path('overview/', api_overview, name='overview'),

    path('register/', registration_api_view, name='register'),
    path('update-password/', UpdatePasswordAPIView.as_view(),
         name='update_password'),
    path('verify-account/', verify_account_api_view, name='verify'),
    path('update-user-detail/', update_api_view, name='update-detail'),

    path('password-reset-email/', RequestPasswordResetEmail.as_view(),
         name='password-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenVerificationAPI.as_view(),
         name='password-reset-verify'),
    path('password-reset-complete/',
         SetNewPasswordSerializer.as_view(), name='password-reset-complete')

]
