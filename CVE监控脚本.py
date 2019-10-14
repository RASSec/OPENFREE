#-*- coding:utf-8 -*-
__Date__ = "2018/05/26"


import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import *
import time
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import sys


reload(sys)
sys.setdefaultencoding('utf8')

class CVEInfo:
    def __init__(self,url, cveid, keyword, description, company, createdate):
        self.url = url
        self.cveid = cveid
        self.keyword = keyword
        self.description = description
        self.company = company
        self.createdate = createdate

    def show(self):
        return '<p><b>漏洞编号：</b><a href="'+self.url+'">'+self.cveid+'</a></p><b>相关厂商：</b>'\
            +self.company +'<br><b>披露日期：</b>'\
            +self.createdate+'<br><b>关键字：</b><font size="3" color="red">'\
            +self.keyword+'</font><br><b>漏洞描述：</b>'\
            +self.description + '<br><br><hr/>'

    def add(self):
        data = {
            'cveid': self.cveid,
            'keyword': self.keyword,
            'description': self.description,
            'company': self.company,
            'createdate': datetime.strptime(self.createdate, "%Y%m%d"),
            'addDate': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),

        }
        return data
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

def getMiddleStr(content, startStr, endStr): # 获取文本中间内容
    startIndex = content.index(startStr)
    if startIndex >= 0:
        startIndex += len(startStr)
        endIndex = content.index(endStr)
    return content[startIndex:endIndex]


def getCVES():  # 获取最新到CVE列表
    urls = []
    try:
        url = 'https://cassandra.cerias.purdue.edu/CVE_changes/today.html'
        res = requests.get(url, headers=headers, timeout=60)
        CVEList_html = getMiddleStr(res.text, 'New entries:', 'Graduations')
        soup = BeautifulSoup(CVEList_html, 'html.parser')
        for a in soup.find_all('a'):
            urls.append(a['href'])
        return urls
    except Exception as e:
        print(e)


def getCVEDetail(url):  # 获取CVE详情
    keywords = ['linux','centos','thinkphp','oracle','redis','Jboss','Remote Code Execution Vulnerability','Apache','Tomcat','IIS','MongoDB','NGINX','MySQL','Jboss','springboot','memcache','rabbitmq','jdk','jre','openssh','openssl','Struts','Kafka','hadoop','docker','openstack','VM','PHP','Jenkins','spring','maven','svn','git','InfluxDB','hbase','hive','spark','Logstash','Kibana','Elasticsearch','python','storm','flume','flink','ssdb','PostgreSQL','filebeat','lucene','slor','discuz','wordpress','phpcms','thinkphp','django','Flask','nodejs','pigs','go','graphicMagic','fastdfs','nfs','zookeeper','k8s','HAProxy','MySQL Proxy','bind','ntp','snmp','ftp','sftp'] #关注的关键字
    try:
        res = requests.get(url, headers=headers, timeout=60)
        soup = BeautifulSoup(res.text, 'html.parser')
        cveId = soup.find(nowrap='nowrap').find('h2').string
        table = soup.find(id='GeneratedTable').find('table')
        description = table.find_all('tr')[3].find('td').string
        keyword = None
        for k in keywords:
            if k in description:
                keyword = k
                break
        company = table.find_all('tr')[8].find('td').string
        createdate = table.find_all('tr')[10].find('td').string
        cveInfo = CVEInfo(url, cveId, keyword, description, company, createdate)
        if keyword is None:
            return None
        else:
            return cveInfo

    except Exception as e:
        print(e)

def addData(data):
    DBNAME = 'mydb'
    DBUSERNAME = 'tass'
    DBPASSWORD = 'liehu'
    DB = '127.0.0.1'
    PORT = 65521
    db_conn = MongoClient(DB, PORT)
    na_db = getattr(db_conn, DBNAME)
    na_db.authenticate(DBUSERNAME, DBPASSWORD)
    c = na_db.cvedatas
    c.update({"cveid": data['cveid']}, {'$set': data}, True)

def sendEmail(mail_msg):  # 发送邮件
    sender = 'dh@21cn.com' # 发件人
    password = 'dhdhdhdhdhdhoplp' # 发件人密码
    receiver = 'dh1@dh.com' # 收件人
    message = MIMEText(mail_msg, 'html', 'utf-8') #以html发送
    message['From'] = sender
    message['To'] = receiver
    subject = '最新CVE列表'
    message['Subject'] = Header(subject, 'utf-8')
    try:
        smtpObj = smtplib.SMTP('smtp.21cn.com')
        smtpObj.login(sender, password)
        smtpObj.sendmail(sender, receiver, message.as_string())
        print('邮件发送成功')
    except smtplib.SMTPException:
        print('Error: 无法发送邮件')
def main():
    nowTime = '当前时间：<font size="3" color="red">' + time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())) + '</font><br>'
    urls = getCVES()
    msg = ''
    if(len(urls)==0):
        msg = nowTime + '<p>今日风和日丽，无大事发生!!!</p>'
    else:
        msg_header = '<p>今日CVE一共<font size="3" color="red">' + str(len(urls))+'</font>个。'
        i = 0
        for url in urls:
            cveInfo = getCVEDetail(url)
            if cveInfo is not None:
                i = i + 1
                data = cveInfo.add()
                #addData(data)
                msg = msg + cveInfo.show()
        if i == 0:
            msg = nowTime + msg_header +  '根据设置的关键字，未匹配到关注的CVE信息。</p>'
        else:
            msg_key_header = '</p>根据设置的关键字，关注的CVE信息一共<font size="3" color="red">' + str(i)+'</font>个。具体如下：<br><br>'
            msg = nowTime + msg_header + msg_key_header + msg
    sendEmail(msg)
if __name__ == '__main__':
    main()
