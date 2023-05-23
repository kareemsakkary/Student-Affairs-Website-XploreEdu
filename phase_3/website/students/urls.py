from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('xploreedu/',views.index, name='index'),
    path('xploreedu/add_student/',views.add_student, name='add_student'),
    path('xploreedu/profile/',views.profile, name='profile'),
    path('xploreedu/department/',views.department, name='department'),
    path('xploreedu/update/',views.update, name='update'),
    path('xploreedu/view_all/',views.view_all, name='view_all'),
    path('xploreedu/view_active/',views.view_active, name='view_active'),
    path('xploreedu/getStudents/', views.getStudents, name='getStudents'),
    path('xploreedu/setStudent/', views.setStudent, name='setStudent'),
    path('xploreedu/delete/', views.delete, name='delete'),
]