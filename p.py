from requests import get
from repertoire import effter

effter()

url = 'http://localhost:8080/server/index.php'
r = get(url,params={"get-color-all" : "rgba(100,30,100,1.00)"})
print(r.json())