from django.shortcuts import render
from django.http import JsonResponse
import logging
import json
from . models import Student
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def homepage(request):
    return render(request, 'students/homepage.html')

def index(request):
    return render(request, 'students/index.html')

def add_student(request): 
    if (request.method == 'POST'):
        # name = request.POST.get('studentName')
        # bdate = request.POST.get('Bdate')
        # gpa = request.POST.get('studentGPA')
        # gender = request.POST.get('gender')
        # phone = request.POST.get('StudentPhone')
        # email =request.POST.get('studentEmail')
        # level = request.POST.get('level')
        depart = request.POST.get('Department')
        img = request.FILES.get('pimg')
        if img == None:
            img = 'default pp.png'
        if depart == None:  
            depart = 'General'
        data = Student(
            name = request.POST.get('studentName'),
            gender = request.POST.get('gender'),
            bdate = request.POST.get('Bdate'),
            gpa = request.POST.get('studentGPA'),
            phone = request.POST.get('StudentPhone'),
            email = request.POST.get('studentEmail'),
            level = request.POST.get('level'),
            department = depart,
            picture = img
        )
        data.save()
    return render(request, 'students/add_student.html')

def profile(request):
    try:
        acc_id = request.POST.get('id')
        student = Student.objects.get(id=acc_id)
    except Student.DoesNotExist:
        student = None
    return render(request, 'students/profile.html', {'student' : student})

def department(request):
    try:
        acc_id = request.POST.get('id')
        student = Student.objects.get(id=acc_id)
    except Student.DoesNotExist:
        student = None
    return render(request, 'students/department.html', {'student' : student})

def update(request):
    try:
        acc_id = request.POST.get('id')   
        student = Student.objects.get(id=acc_id)
    except Student.DoesNotExist:
        student = None
    return render(request, 'students/update.html', {'student' : student})

def view_all(request):
    students = Student.objects.all()
    return render(request, 'students/view_all.html', {'students' : students})

def view_active(request):
    students = Student.objects.all()
    return render(request, 'students/view_active.html', {'students' : students})

def getStudents(request):
    try:
        students = Student.objects.values()  # Get all student instances and their values
        return JsonResponse({'students': list(students)})  # Convert queryset to a list of dictionaries and return as JSON
    except Exception as e:
        logger = logging.getLogger(__name__)
        logger.error('Error occurred in getStudents view: %s', str(e))
        return JsonResponse({'error': 'An error occurred'}, status=500)

@csrf_exempt
def setStudent(request):
    if request.method == 'POST':
        print(request.POST.get("name"))
        try:
            updated_data = {
                'id': request.POST.get('id'),
                'name': request.POST.get('name'),
                'bdate': request.POST.get('bdate'),
                'gpa': request.POST.get('gpa'),
                'gender': request.POST.get('gender'),
                'phone': request.POST.get('phone'),
                'email': request.POST.get('email'),
                'level': request.POST.get('level'),
                'status': request.POST.get('status'),
                'department': request.POST.get('department'),
                'picture': request.FILES.get('picture')
            }
            try:
                student_obj = Student.objects.get(id=updated_data['id'])
                for key, value in updated_data.items():
                    if(value!= None):
                        setattr(student_obj, key, value)
                student_obj.save()
                response = {'message': 'Student updated successfully'}
                return JsonResponse(response, status=200)
            except Student.DoesNotExist:
                response = {'error': 'Student not found'}
                return JsonResponse(response, status=404)
        except Exception as e:
            response = {'error': 'An error occurred while updating the student'}
            return JsonResponse(response, status=500)
    else:
        response = {'error': 'Invalid request method'}
        return JsonResponse(response, status=405)

@csrf_exempt
def delete(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            object = get_object_or_404(Student, id= data['id'])
            object.delete()
            response = {'message': 'Student deleted successfully'}
            return JsonResponse(response, status=200)
        except Exception as e:
            response = {'error': 'An error occurred while deleting the student'}
            return JsonResponse(response, status=500)
    else:
        response = {'error': 'Invalid request method'}
        return JsonResponse(response, status=405)