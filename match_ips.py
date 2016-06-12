#!/usr/bin/env python2

import argparse
import re
import socket
import struct

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", help="Filename to extract IPs from")
    return parser.parse_args()

def ip2int(addr):
    try:
        return struct.unpack('!I', socket.inet_aton(addr))[0]
    except socket.error:
        return False

def int2ip(addr):
    return socket.inet_ntoa(struct.pack('!I', addr))

def main(args):
    ips = []
    with open(args.f, 'r') as f:
        for line in f.readlines():
            matches = re.findall(r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b", line)
            ips += matches

    ips = list(set(ips))
    valid_ips = [ ip2int(ip) for ip in ips if ip2int(ip) ]
    valid_ips.sort()
    for ip in valid_ips:
        print(int2ip(ip))

main(parse_args())