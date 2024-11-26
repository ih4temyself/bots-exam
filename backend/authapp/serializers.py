from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all()), EmailValidator()],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password_check = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "password_check",
        ]

    def validate(self, data):
        if data["password"] != data["password_check"]:
            raise serializers.ValidationError(
                {"password_check": "Passwords do not match."}
            )
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        user.set_password(validated_data["password"])
        user.save()

        Profile.objects.create(user=user, balance=0.00)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'date_joined']
