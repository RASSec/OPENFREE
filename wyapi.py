#coding=utf-8
import httplib
import json

cc=httplib.HTTPConnection('api.wooyun.org')
cc.request('GET','/bugs/submit')
r=cc.getresponse()
rr=r.read()
ddata=json.loads(rr)
for x in xrange(1,10):
	print ddata[x].values()[8],ddata[x].values()[2],ddata[x].values()[7],ddata[x].values()[5]

‘’‘
2016-01-19 百度联盟系统某系统漏洞导致配置错误 http://www.wooyun.org/bugs/wooyun-2016-0171122 奶嘴
2016-01-19 国金证券某系统漏洞（涉及海量交易个人工作信息/大量代理商信息/全部工作人员信息） http://www.wooyun.org/bugs/wooyun-2016-0171121 路人甲
2016-01-19 百度游戏Zookeeper服务器未授权访问 http://www.wooyun.org/bugs/wooyun-2016-0171119 荒废的腰子
2016-01-19 中国移动某客户端无需密码可看任意人的资料和余额和套餐和姓名 http://www.wooyun.org/bugs/wooyun-2016-0171116 爱捣蛋的鬼
2016-01-19 乐视网某分站存在svn信息泄露 http://www.wooyun.org/bugs/wooyun-2016-0171105 Mayter
2016-01-19 支付安全之银盈通多站漏洞导致各种用户数据可泄露&amp;SQL注入等 http://www.wooyun.org/bugs/wooyun-2016-0171103 路淫甲
2016-01-19 TCL某处存在越权漏洞可查看订单信息 http://www.wooyun.org/bugs/wooyun-2016-0171082 路人甲
2016-01-19 亨氏中国多处SQL注入直指近690W用户数据含邮箱\手机号\密码等详细信息 http://www.wooyun.org/bugs/wooyun-2016-0171080 路淫甲
2016-01-19 联金所某处缺陷危害用户账户安全 http://www.wooyun.org/bugs/wooyun-2016-0171076 路人甲
’‘’
