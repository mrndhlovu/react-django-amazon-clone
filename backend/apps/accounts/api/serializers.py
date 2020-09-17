from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    def save(self):
        print("self>>>>>>>>>", self.validated_data['email'])
        user = User(
            email=self.validated_data['email'].lower(),
            full_name=self.validated_data['full_name']
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError(
                {'password': 'Password must match'})

        user.set_password(password)
        user.save()
        return user


class RegistrationSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'full_name', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data['email'].lower(),
            full_name=self.validated_data['full_name']
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError(
                {'message': 'Password must match'})
        if len(confirm_password) < 6:
            raise serializers.ValidationError(
                {'message': 'Password must must be at least 6 characters'})

        user.set_password(password)
        user.save()
        return user


class RecoveryNewPasswordSerializer(serializers.Serializer):

    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def save(self):
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError(
                {'password': 'Password must match'})

        self.instance.set_password(password)
        self.instance.save()
        return self.instance


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'full_name']
