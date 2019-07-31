#coding=utf-8
import os
def file_name(file_dir):
    for root, dirs, files in os.walk(file_dir):
        print('root_dir:', root)  # 当前目录路径
        print('sub_dirs:', dirs)  # 当前路径下所有子目录
        #print('files:', files)  # 当前路径下所有非目录子文件
        for filename in files:
        	print filename.replace("http_","http://").replace("_80_","/").replace("_","/").replace(".png","")
file_name('D:\\URL\\webscreenshot\\screenshots')
