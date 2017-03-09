#coding=utf-8
from py_bing_search import PyBingWebSearch
search_term = "site:cert.org.cn"
bing_web = PyBingWebSearch('6I7UKjtX4bFiCDO0eQr4N4ErGG1+10BSWTmt0/aQ9QE', search_term, web_only=False) 
# web_only is optional, but should be true to use your web only quota instead of your all purpose quota
first_fifty_result= bing_web.search(limit=50, format='json') #1-50
second_fifty_result= bing_web.search(limit=50, format='json') #51-100

# 显示标题 second_fifty_result[0].description)
# 显示url second_fifty_result[0].url)
'''for x in xrange(1,int(len(second_fifty_result))):
	print second_fifty_result[x].url
'''

'''for x in xrange(1,int(len(first_fifty_result))):
	print first_fifty_result[x].url,first_fifty_result[x].title
'''
for y in (first_fifty_result,second_fifty_result):
	for x in xrange(1,int(len(y))):
		print y[x].url
		pass