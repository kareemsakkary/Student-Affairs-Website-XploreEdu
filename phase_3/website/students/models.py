from django.db import models

# Create your models here.

class Student(models.Model):
    deps = [
        ('General','General'),
        ('Computer Science', 'Computer Science'),
        ('Artificial Intelligence','Artificial Intelligence'),
        ('Information Technology','Information Technology'),
        ('Cyber Security', 'Cyber Security'),
        ('Data Science', 'Data Science'),
    ]
    name = models.CharField(null=False, max_length=50)
    bdate = models.DateField(null=False)
    gpa = models.FloatField(null=False)
    gender = models.CharField(max_length=50, null=False, default='Male')
    phone = models.CharField(max_length= 11, null= False)
    email = models.EmailField(max_length=50, null= False)
    level = models.IntegerField(null=False, choices= [(1,1),(2,2),(3,3),(4,4)], default=1)
    status = models.CharField(max_length=10,null=False,choices= [('Active','Active'),('Inactive','Inactive')],default='Active')
    department = models.CharField(max_length=50, null=False, choices= deps,default='General')
    picture = models.ImageField(null= True,upload_to='photos/%y/%m/%d', default = 'static/img/default pp.png')

    def __str__(self):
        return str(self.id)
    
    #fe default attribute esmo  id  
    #ana kont 3amlo set be default = 20230000
    #b3dha shelto wa sebto el byt3ml autogenerate fel awl da l2eto by3ed men 20230000 mazbot