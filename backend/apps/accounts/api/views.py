from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils.encoding import smart_str, force_str, DjangoUnicodeDecodeError, smart_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import UpdateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from ..backends import Util


from .serializers import(
    ChangePasswordSerializer,
    RegistrationSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UpdateUserSerializer,
)

User = get_user_model()


def validate_email(email):
    user = None
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None
    if user != None:
        return email


@api_view(['GET', ])
@permission_classes(())
@authentication_classes([])
def api_overview(request):
    auth_urls = {
        "Login": '/v1/auth/login',
        "Logout": '/v1/auth/logout',
        "Update Name & Email": '/v1/auth/update',
        "Update Password": '/v1/auth/update-password',
        "Delete": '/v1/auth/delete-account',
        "Register": '/v1/auth/register',
        "UserInfo": '/v1/auth/me',
    }
    return Response(auth_urls)


@ api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def user_api_view(request):
    try:
        user = request.user
    except:
        data = {'message': f'User not found'}
        return Response(status=status.HTTP_404_NOT_FOUND, data=data)
    serializer = UpdateUserSerializer(user)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['POST', ])
@permission_classes(())
def registration_api_view(request):

    email = request.data['email']
    if validate_email(email) != None:
        data = {}
        data['message'] = 'That email is already in use.'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    serializer = RegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        data = user.with_auth_tokens()
        return Response(data)
    else:
        data = serializer.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes(())
def log_api_view(request):

    user = authenticate(
        email=request.data['email'].lower(),
        password=request.data['password']
    )
    if user:
        data = user.with_auth_tokens()
        return Response(data=data,)
    else:
        data = {'message': 'Invalid credentials'}
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', ])
def logout_api_view(request):

    if True:
        return Response(status=status.HTTP_200_OK)
    else:
        data = {'message': 'Logout failed'}
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
@permission_classes(())
def recovery_verify_otp_api_view(request):
    one_time_pin = request.data['otp']
    if str(one_time_pin) == '123456':
        return Response(status=status.HTTP_200_OK, data={'message': 'Now set new password'})
    else:
        data = {'message': 'Wrong OTP provided.'}
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['PUT', ])
@ permission_classes((IsAuthenticated,))
def update_api_view(request):
    data = request.data
    context = {}
    try:
        user = request.user
        serializer = UpdateUserSerializer(user, data=data)
    except:
        data = {'message': 'Account not found.'}
        return Response(status=status.HTTP_404_NOT_FOUND, data=data)

    if serializer.is_valid():
        serializer.save()
        context['message'] = 'Update successful'
        return Response(data=context)
    else:
        context = serializer.errors
        return Response(context, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST', ])
@permission_classes(())
def verify_account_api_view(request):
    email = request.data['email']
    try:
        user = User.objects.get(email=email)
        return Response(status=status.HTTP_200_OK)
    except:
        data = {'message': f'User with email: {email} not found', }
        return Response(status=status.HTTP_404_NOT_FOUND, data=data)


@ api_view(['DELETE', ])
@ permission_classes((IsAuthenticated,))
def delete_user_api_view(request):
    try:
        existing_user = request.user
    except:
        data = {
            'message': f'Failed to delete account, Token might have expired.',
        }
        return Response(status=status.HTTP_404_NOT_FOUND, data=data)
    if existing_user:
        existing_user.delete()
        return Response(status=status.HTTP_200_OK, data={'message': 'Account deleted.'})


class UpdatePasswordAPIView(UpdateAPIView):

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        print("obj", obj)
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Wrong password'})

            new_password = serializer.data.get('new_password')
            confirm_new_password = serializer.data.get('confirm_new_password')

            if new_password != confirm_new_password:
                data = {'message': 'New passwords must match.'}
                return Response(status=status.HTTP_404_NOT_FOUND, data=data)

            self.object.set_password(
                serializer.data.get('confirm_new_password'))
            self.object.save()
            return Response(status=status.HTTP_200_OK, data={'message': 'Password updated.'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        serializer = self.serializer_class(data=request.data)

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            otp_link = reverse(
                'accounts:password-reset-verify', kwargs={'uidb64': uidb64, 'token': token})

            email_body = f'To authenticate, please use the following One Time Password (OTP):\n {otp_link}'
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Amazon Clone Password Assistance'}
            Util.send_email(data)
            data = {
                'message': f'For your security, we need to authenticate your request.+\
                     We ve sent a One Time Password (OTP) to the {email}. +\
                         Please enter it below to complete verification.'}
            return Response(status=status.HTTP_200_OK, data=data)
        else:
            data = {'message': f'Account with email {email} was not found.'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


class PasswordTokenVerificationAPI(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            has_not_used_token_before = PasswordResetTokenGenerator().check_token(user, token)

            if has_not_used_token_before:
                data = {'message': 'Credentials Valid',
                        'uidb64': uidb64, 'token': token}
                return Response(status=status.HTTP_200_OK, data=data)
            else:
                data = {'message': 'Token is not valid, you can request a new one.'}
                return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

        except DjangoUnicodeDecodeError as identifier:
            data = {'message': 'Token is not valid, you can request a new one.'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordSerializer(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_200_OK, data={'message': 'Password reset successfully.'})
