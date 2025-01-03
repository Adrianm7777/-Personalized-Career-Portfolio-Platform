from django.http import JsonResponse

def portfolio_data(request):
    data = {
        "name":"John Doe",
        "title":"Full Stack Developer",
        "skills":["React", "TypeScript", "Python", "Django"],
    }

    return JsonResponse(data)