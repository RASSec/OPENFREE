#coding=utf-8
import requests
import threading
import time
import os

def check(i,total):
	global eu
	#os.system("title Spider,Current threads: %d,URLs left: %d,URLs exists:%d" %(threading.active_count(),total,eu)) 
	try:
		#payload = {'username': 'admin', 'passwd': '123456'}
		r=requests.get(i+'/invoker/JMXInvokerServlet',timeout=5)
		status=r.status_code
		c=r.content.count('jboss')
		r_l=len(r.text)
	except:
		print i,'Timeout'
		status = 0
	if  status == 200 and c !=0:
		r = 0
		print i,'Exists!!!!!'
		eu+=1
		f = open("good_jboss.txt", 'a')
		f.write(i+'\n')
		f.close()
		
def main():
	global eu
	eu = 0
	total=len(open('8080.txt','rU').readlines())
	print 'Total URLs:%d' %total
	for i in open("8080.txt").readlines():
		i=i.strip('\n')
		t=threading.Thread(target=check, args=(i,total))
		t.setDaemon(True)
		total-=1
		while True:
			if(threading.active_count() == 1 and total == 0 ):
				print 'All Done at %s' %time.strftime("%Y-%m-%d[%H.%M.%S]")
				break
			elif (threading.active_count() < 200):
				if (total == 0):
					time.sleep(10)
				else:
					os.system("title Spider,Current threads: %d,URLs left: %d,URLs exists:%d" %(threading.active_count(),total,eu))
					t.start()
					break


if __name__ == '__main__':
	main()
