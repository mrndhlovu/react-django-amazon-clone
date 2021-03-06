from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path('v1/api/', include([
        path('auth/', include('apps.accounts.api.urls',  namespace='accounts')),
        path('products/', include('apps.store.api.urls',  namespace='store')),
        path('orders/', include('apps.orders.api.urls',  namespace='orders')),
        path('address/', include('apps.addresses.api.urls',  namespace='addresses')),

    ])),
    path('api/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),

] 
