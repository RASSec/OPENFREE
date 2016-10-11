import requests
import re
import time


def scan(ids):
	reObj3 = re.compile('align="left" style="padding-left:20px;">(.*?)</td>')
	url="http://loudong.360.cn/company/lists/page/"+str(ids)
	u1=requests.get(url)
	uu=u1.content
	for x in reObj3.findall(uu):
		pass
		print x
		with open('360_url.txt','a') as ff:
			ff.write(x+'\n')
	pass

for x in xrange(1,105):
	pass
	scan(x)
	time.sleep(2)
