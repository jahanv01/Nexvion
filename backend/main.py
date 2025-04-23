import requests

url = "http://localhost:5001/submit"

data = {
    "name": "AutoTech Innovations GmbH",
    "industry": "Automotive",
    "projectName": "Smart Vehicle Connectivity Platform",
    "projectDescription": "AutoTech Innovations GmbH aims to be a pioneer in the automotive sector, focusing on developing a cutting-edge smart vehicle connectivity platform. The project intends to revolutionize the way vehicles communicate by incorporating advanced IoT integration. The platform will facilitate real-time monitoring and predictive maintenance using large-scale data analytics. Furthermore, cybersecurity is a paramount focus, as automakers increasingly face threats that could compromise vehicle functionality and integrity. To enhance driver interaction, the project also plans to deploy user-centric interfaces powered by intuitive design principles. These innovations are expected to elevate both vehicle intelligence and driver engagement.",
    "budget": "90000",
    "startDate": "2025-04-23",
    "endDate": "2025-05-30",
    "requirements": [
        {
            "skill": "IoT Development",
            "amount": "3",
            "recommendedSeniority": "Mid-Level"
        },
        {
            "skill": "Cybersecurity Analysis",
            "amount": "2",
            "recommendedSeniority": "Senior"
        }
    ]
}

response = requests.post(url, json=data)
print(response.json())
