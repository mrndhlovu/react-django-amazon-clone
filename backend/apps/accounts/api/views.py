from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils.encoding import smart_str, force_str, DjangoUnicodeDecodeError, smart_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.http import JsonResponse
import json

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import (
    UpdateAPIView,
    GenericAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from ..backends import Util
from .serializers import(
    ChangePasswordSerializer,
    RegistrationSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UpdateUserSerializer,
    BlacklistTokenSerializer,
    LoginSerializer,
    UserDetailSerializer,
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


def send_otp_email(user, request, data):
    """
    Send One Time Password.
    data dictionary
    data = {
        'body': Email body, is not provided with use default,
        'reverse': Reverse string,
        'subject': Email subject,
    }
    """
    uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
    token = PasswordResetTokenGenerator().make_token(user)
    current_site = get_current_site(request=request).domain
    otp_link = reverse(data['reverse'], kwargs={
                       'uidb64': uidb64, 'token': token})
    body = data['body']
    if body:
        email_body = f'{body} \n {otp_link}'
    else:
        email_body = f'To authenticate, please use the following One Time Password (OTP):\n {otp_link}'
    print("email_body", email_body)
    email = {'email_body': email_body, 'to_email': user.email,
             'email_subject': data['subject']}
    return Util.send_email(email)


class UserDetailAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    model = User

    def get_object(self, queryset=None):
        user = self.request.user
        return user

    def get(self, request):
        try:
            serializer = UserDetailSerializer(request.user)
            return Response(data=serializer.data)
        except:
            data = {'message': 'Invalid Credentials'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


class AccountVerificationAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):

        try:
            email = request.data['email']
            user = User.objects.get(email=email)
            return Response(status=status.HTTP_200_OK)
        except:
            data = {'message': 'Account not found', }
            return Response(status=status.HTTP_404_NOT_FOUND, data=data)


class LoginAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            user = authenticate(
                email=request.data['email'].lower(),
                password=request.data['password']
            )
            serialized_user = UserDetailSerializer(user)
            context = {}
            if serialized_user:
                tokens = user.auth_tokens()
                context = {
                    'tokens': tokens,
                    'user': serialized_user.data
                }
            return Response(data=context,)
        except:
            data = {'message': 'Invalid credentials'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


class RegistrationAPIView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            email = request.data['email']
            if validate_email(email) != None:
                raise ValueError(
                    f'Account with email {email} already exists.')

            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                email_body = {
                    'body': 'To authenticate your email, please the One Time Password below',
                    'reverse': 'accounts:password-reset-verify',
                    'subject': 'Welcome to Amazon Clone'
                }
                # send_otp_email(user, request, email_body)
                serialized_user = UserDetailSerializer(user)
                data = {
                    'tokens': user.auth_tokens(),
                    'user': serialized_user.data,
                    'message': f'For your security, we need to authenticate account.\
                                We ve sent a One Time Password (OTP) to the {email}.\
                                Please enter it below to complete verification.'
                }

                return Response(data)
            else:
                data = serializer.errors
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
        except ValueError as arr:
            return Response({'message': str(arr)}, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView (GenericAPIView):
    serializer_class = BlacklistTokenSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdateUserAPIView(UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, queryset=None):
        user = self.request.user
        return user

    def put(self, request):
        user = self.get_object()
        data = request.data

        try:
            user = request.user
            serializer = self.serializer_class(data=data)
        except:
            data = {'message': 'Account not found.'}
            return Response(status=status.HTTP_404_NOT_FOUND, data=data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            full_name = serializer.data.get('full_name')
            user.email = email
            user.full_name = full_name

            user.save()
            data = {'success': True, 'user': serializer.data}
            return Response(data=data)
        else:
            context = serializer.errors
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


class DeleteUserAPIView(DestroyAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        try:
            existing_user = User.objects.get(id=request.user.id)
            existing_user.delete()
            data = {'message': 'Account deleted.'}
            return Response(status=status.HTTP_200_OK, data=data)

        except:
            data = {
                'message': 'Failed to delete account, Token might have expired.',
            }
            return Response(status=status.HTTP_404_NOT_FOUND, data=data)


class UpdatePasswordAPIView(UpdateAPIView):

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        user = self.request.user
        return user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("password")):
                return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Wrong password'})

            new_password = serializer.data.get('new_password')
            confirm_password = serializer.data.get('confirm_password')

            if new_password != confirm_password:
                data = {'message': 'New passwords must match.'}
                return Response(status=status.HTTP_404_NOT_FOUND, data=data)

            self.object.set_password(
                serializer.data.get('confirm_password'))
            self.object.save()
            return Response(status=status.HTTP_200_OK, data={'message': 'Password updated.'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmailAPIView(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        serializer = self.serializer_class(data=request.data)

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            email_body = {
                'body': 'To authenticate',
                'reverse': 'accounts:password-reset-verify',
                'subject': 'Amazon Clone Password Assistance'
            }
            send_otp_email(user, request, email_body)

            data = {
                'message': f'For your security, we need to authenticate your request.\
                     We ve sent a One Time Password (OTP) to the {email}.\
                         Please enter it below to complete verification.'}
            return Response(status=status.HTTP_200_OK, data=data)
        else:
            data = {'message': f'Account with email {email} was not found.'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)


class PasswordTokenVerificationAPIView(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            has_not_used_token_before = PasswordResetTokenGenerator().check_token(user, token)

            if has_not_used_token_before:
                if not user.confirmed:
                    user.confirmed = True
                user.save()
                data = {'message': 'Credentials Valid',
                        'uidb64': uidb64, 'token': token}
                return Response(status=status.HTTP_200_OK, data=data)
            else:
                data = {'message': 'Token is not valid, you can request a new one.'}
                return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

        except DjangoUnicodeDecodeError as identifier:
            data = {'message': 'Token is not valid, you can request a new one.'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_200_OK, data={'message': 'Password reset successfully.'})
