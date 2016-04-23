#coding=utf-8
import re
import httplib
import urllib
import socket

headers={"Content-type":"application/x-www-form-urlencoded",
"Accept":"text/plain"
}

post_data=urllib.urlencode({"username":"admin","password":"123456"})



'''HTTP GET'''
cc=httplib.HTTPConnection('www.baidu.com')
cc.request('GET','/')
r=cc.getresponse()
rr=r.read()
print r.getheader('Server')
print r.status
print r.reason
print r.msg
rec=re.search('<title>(.*?)</title>',rr,re.IGNORECASE)
if rec is None:
	print 1
else:
	print rec.group(1)

'''HTTP POST'''

dd=httplib.HTTPConnection('www.baidu.com')
dd.request('POST','/',post_data,headers)
_dd=dd.getresponse()
print _dd.status
print _dd.getheader('Server')
print _dd.reason
print _dd.msg

''' socket 判断端口是否存在'''
__s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
__s.settimeout(2)
try:
	__s.connect(('www.baidu.com',80))
	print 'ok'
except:
	pass











