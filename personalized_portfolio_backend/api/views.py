from django.http import JsonResponse
from django.core.paginator import Paginator
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User


portfolio_entries = [
    {
        "id": 1,
        "name": "Adrian",
        "title": "Full Stack Developer",
        "skills": ["React", "TypeScript", "Python", "Django"],
        "experience": 5,
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "title": "Data Scientist",
        "skills": ["Python", "Pandas", "Scikit-learn"],
        "experience": 3,
    },
    {
        "id": 3,
        "name": "John Smith",
        "title": "Backend Engineer",
        "skills": ["Node.js", "Express", "MongoDB"],
        "experience": 4,
    },
]

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def portfolio_data(request):
    user =request.user
    filtered_entries = [entry for entry in portfolio_entries if entry["name"] == user.username]
    try:
       
        search_query = request.GET.get("search", "").lower()
        sort_by = request.GET.get("sort", "id")  
        order = request.GET.get("order", "asc")  
        page = request.GET.get("page", 1)

        filtered_entries = portfolio_entries
        if search_query:
            filtered_entries = [
                entry for entry in portfolio_entries
                if search_query in entry["name"].lower()
                or search_query in entry["title"].lower()
                or any(search_query in skill.lower() for skill in entry["skills"])
            ]

        reverse_order = order == "desc"
        filtered_entries = sorted(
            filtered_entries, key=lambda x: x.get(sort_by, ""), reverse=reverse_order
        )

        paginator = Paginator(filtered_entries, 2) 
        paginated_data = paginator.get_page(page)

        return JsonResponse({"results": list(paginated_data), "total": paginator.count}, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username,password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)

        response = JsonResponse({"message": "Login successful!"})

        response.set_cookie(key="access_token",value=str(refresh.access_token), httponly=True, samesite="Strict", secure=True)

        response.set_cookie(key="refresh_token", value=str(refresh),httponly=True,samesite="Strict",secure=True)

        return response
    else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    
@api_view(["POST"])
def logout_view(request):
    response = JsonResponse({"message": "Logged out successfully!"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response

@api_view(["POST"])
def sign_up(request):
     username = request.data.get("username")
     email = request.data.get("email")
     password = request.data.get("password")

     if not username or not email or not password:
          return JsonResponse({"error":"All fields are required."},status=400)
     
     try:
          validate_password(password)
     except ValidationError as e:
          return JsonResponse({"error":e.message}, status= 400)
          
     if User.objects.filter(username=username).exists():
          return JsonResponse({"error": "Username already taken."},status=400)
     
     if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already in use."},status=400)
     
     user = User.objects.create_user(username=username,email=email,password=password)

     refresh =RefreshToken.for_user(user)

     response = JsonResponse({"message": "User registered successfully!"})
     response.set_cookie(key="access_token",value=str(refresh.access_token),httponly=True,samesite="Strict",secure=True)
     response.set_cookie(key="refresh_token",value=str(refresh),httponly=True, samesite="Strict",secure=True)

     return response