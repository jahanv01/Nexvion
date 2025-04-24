import requests

# Replace this with the actual path to your PDF
file_path = r"C:\Users\49160\Downloads\Project Application Overview.pdf"

# Your API endpoint
url = 'http://localhost:5001/submit'  # Change to your actual API endpoint

# Prepare the file for upload
files = {
    'file': ('sample.pdf', open(file_path, 'rb'), 'application/pdf')
}


# Send the POST request
response = requests.post(url, files=files)

# Print the response
print(f"Status Code: {response.status_code}")
print(f"Response JSON: {response.json()}")
