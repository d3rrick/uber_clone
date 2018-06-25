
from django.conf.urls import url
from django.contrib import admin
from uber import main_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$',main_views.home, name='home'),
    url(r'^test_data$', main_views.test_data, name='test_data'),
    url(r'^all_data$', main_views.all_data, name='all_data'),
    url(r'^admin/', admin.site.urls),

    
]
if settings.DEBUG:urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)