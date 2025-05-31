import requests

url = 'http://127.0.0.1:5000/predict'

with open('DanLeaf2.jpg', 'rb') as f:
    files = {'file': f}
    r = requests.post(url, files=files)

print(r.json())
