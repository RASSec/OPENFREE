import requests
import re
import time


headers={
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36",
	"Referer":"http://www.wooyun.org"
}
def scan(ids):
	reObj3 = re.compile('a rel="nofollow" href="(.*)?" target="_blank">(.*?)</a')
	url="http://www.wooyun.org/corps/page/"+str(ids)
	u1=requests.get(url,headers=headers)
	uu=u1.content
	print uu
	for x in reObj3.findall(uu):
		pass
		print x[0]
		with open('wooyun_url.txt','a') as ff:
			ff.write(x[0]+'\n')
	pass

for x in xrange(1,44):
	pass
	scan(x)
	time.sleep(2)
