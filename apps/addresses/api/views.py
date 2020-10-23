
from rest_framework.generics import GenericAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Address
from .serializers import (AddressSerializer)


class GetAddressAPIView(RetrieveAPIView):
    serializer_class = AddressSerializer
    permission_classes = (IsAuthenticated,)
    model = Address

    def get(self, request):
        owner = request.user
        address = Address.objects.get(owner=owner)
        serializer = self.serializer_class(address)

        if serializer:
            return Response(serializer.data)
        else:
            data = {'message': 'Address does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)


class RemoveAddressAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    model = Address

    def post(self, request):
        try:
            owner = request.user
            address_id = request.data['addressId']
            address = Address.objects.get(id=address_id, owner=owner)
            if address:
                address.delete()

            data = {'message': 'Address deleted.'}

        except:
            data = {'message': 'Address address not found.'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response(data=data, status=status.HTTP_200_OK)


class UpdateAddressAPIView(UpdateAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            print(request.data)
            owner = request.user
            address, created = Address.objects.get_or_create(
                owner=owner)
            serializer = self.serializer_class(address, data=request.data)
        except Address.DoesNotExist:
            data = {'message': 'Address not found.'}
            return Response(status=status.HTTP_404_NOT_FOUND, data=data)

        if serializer.is_valid():
            serializer.save()
            data = {"address": serializer.data}
            return Response(data=data)
        else:
            context = serializer.errors
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
