#-*- coding:utf-8 -*-
#author:yds
import sys
import re
if len(sys.argv)==3:
	f=open (sys.argv[1])
	f1=f.read()
	f.close()
	r=re.compile(r'[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}',re.I).findall(f1,re.M)
	for mail in r:
		f1=open(sys.argv[2],'a')
		f1.write(mail+'\r\n')
		f1.close()
	sys.exit()
else:
	print sys.argv[0]+"  log.txt"+"   mail.txt"
