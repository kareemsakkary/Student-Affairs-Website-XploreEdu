from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('index.html',views.index, name='index'),
    path('add_student.html',views.add_student, name='add_student'),
    path('profile.html',views.profile, name='profile'),
    path('department.html',views.department, name='department'),
    path('update.html',views.update, name='update'),
    path('view_all.html',views.view_all, name='view_all'),
    path('view_active.html',views.view_active, name='view_active'),
    path('getStudents', views.getStudents, name='getStudents'),
    path('setStudent', views.setStudent, name='setStudent'),
    path('delete', views.delete, name='delete'),
]