from django.http import JsonResponse
from django.core.paginator import Paginator
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


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
