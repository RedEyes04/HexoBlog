---
tags:
  - Twikoo
  - Hexo
top_img: https://bucket.redeyes.top/2024/10/20/9adf5c.webp
categories: Hexo相关
title: Twikoo评论系统部署以及配置
cover: https://bucket.redeyes.top/2024/10/20/9adf5c.webp
date: 2024-10-20T13:10:00
ai: "true"
---
本期教大家如何用Docker安装和配置Twikoo评论系统，根据Twikoo官方的文章有好几种部署方式，里面最简单的莫过于就是用Docker进行安装了！开始吧！
# Docker的安装

首先确保我们服务器上有安装Docker，这里推荐用宝塔进行安装，一键安装即可！
![image.png](https://bucket.redeyes.top/2024/10/20/128b8c.png)
# 拉取镜像进行安装
```
docker run --name twikoo -e TWIKOO_THROTTLE=1000 -p 8080:8080 -v ${PWD}/data:/app/data -d imaegoo/twikoo
```
要开放8080端口！
## Docker容器的配置
默认情况下我们重启服务器，Docker容器不会进行重启 ，所以这里需要我们进行相应的配置
我们进去容器的管理页面
![image.png](https://bucket.redeyes.top/2024/10/20/43c3ba.png)
像下图一样配置即可
![image.png](https://bucket.redeyes.top/2024/10/20/fa5e13.png)

# 反向代理&申请证书
接着要去反向代理Twikoo进程，我们先去域名解析的平台添加相应的解析记录
![image.png](https://bucket.redeyes.top/2024/10/20/c9b665.png)
接着在宝塔面板里添加相应的站点信息，添加完再申请相应的证书
![image.png](https://bucket.redeyes.top/2024/10/20/ec1d81.png)
然后进行反向代理，像下图一样设置即可
![image.png](https://bucket.redeyes.top/2024/10/20/7bf1d0.png)
![image.png](https://bucket.redeyes.top/2024/10/20/e4b73b.png)
接着我们就可以访问反向代理后的网站了，如果看见下面的页面就代表部署成功了！
![image.png](https://bucket.redeyes.top/2024/10/20/55cd09.png)
# anzhiyu主题相应的配置
接着我们用Vscode打开远程连接，进入博客的目录里的_config.anzhiyu.yml
ctrl+F 搜索Comment
![image.png](https://bucket.redeyes.top/2024/10/20/3f48bb.png)
将use改为Twikoo
```
use: Twikoo
```
接着再往下翻找到Twikoo的配置头
![image.png](https://bucket.redeyes.top/2024/10/20/06a69d.png)
```
# Twikoo

# https://github.com/imaegoo/twikoo

twikoo:

  envId: https://twikoo.redeyes.top    ##这里填写你反向代理的网站

  region: ap-shanghai             ##这里填写ap-shanghai即可

  visitor: false

  option:
```
填写完Hexo三连
```
hexo cl
hexo g
hexo s            ##(如果根据我上篇博客来部署的话是不需hexo s的！)
```
# Twikoo配置相关
## 设置密码&暗号
部署完成后随便进一个文章，翻到下面的评论区，点击齿轮
![image.png](https://bucket.redeyes.top/2024/10/20/1345c3.png)
会让你设置相应的密码
![image.png](https://bucket.redeyes.top/2024/10/20/ab9842.png)
填写完成后即可进去！
配置管理里通用的部分根据自己需求进行填写，这里不再过多赘述
![image.png](https://bucket.redeyes.top/2024/10/20/c453fd.png)

重点要说的是最下面的暗号
![image.png](https://bucket.redeyes.top/2024/10/20/7f5517.png)
建议设置下！

## 邮件通知
邮件通知部分
![image.png](https://bucket.redeyes.top/2024/10/20/5f265b.png)
第一项的SENDER_EMAIL要和SMTP一致，下面选择服务商，如果这里选择了服务商，下面的，服务器地址和端口便不要填写
![image.png](https://bucket.redeyes.top/2024/10/20/c9ac62.png)
接着就是授权码
![image.png](https://bucket.redeyes.top/2024/10/20/86d407.png)

这里以QQ邮箱为例，登录进去后，点击设置
![image.png](https://bucket.redeyes.top/2024/10/20/7a98c6.png)
点击账户
![image.png](https://bucket.redeyes.top/2024/10/20/905743.png)
把下面的“POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务” 开启即可，然后会让你发发生验证码，即可得到密码，要注意的是这个验证码只会显示一次！
接着点击下面的测试要是没问题就ok了！
![image.png](https://bucket.redeyes.top/2024/10/20/1752c1.png)
## 邮件回复模板的配置
这里提供我用的一种模板，不过我只配置了发给游客的时候模板，没有配置发给自己(博主)的模板，如果需要可以到网上找自己想要的
![IMG_1853.PNG](https://bucket.redeyes.top/2024/10/20/77bd98.PNG)
我的是这种⬆️
我们在邮件通知的
![image.png](https://bucket.redeyes.top/2024/10/20/3c0210.png)
填上下面的代码即可
```
<div>     <div style="border-radius:5px;font-size:13px;width:680px;margin:30px auto 0;max-width:100%">         <div style="box-shadow:0 0 30px 0 rgb(219 216 214);border-radius:5px;width:630px;margin:auto;max-width:100%;margin-bottom:-30px">             <div style="width:200px;height:40px;margin-top:-20px;margin-left:0;text-align:center;line-height:40px;text-decoration:none;color:#fff;background-color:#94a9b9;border-radius:5px 0">                 Dear: ${PARENT_NICK}             </div>             <div style="line-height:180%;padding:0 15px 12px;margin:30px auto;color:#555;font-size:12px;margin-bottom:0">                 <h2 style="border-bottom:1px solid #ddd;font-size:14px;font-weight:400;padding:13px 0 10px 8px">                     <span style=color:#de6561;font-weight:700>&gt;</span>                     您在<a style=text-decoration:none;color:#12addb href=${SITE_URL} target=_blank>                             ${SITE_NAME}                         </a>                     上的评论有了新的回复呐~                 </h2>                 <div style="padding:0 12px 0 12px;margin-top:18px">                     <div class=Messages_box>                         <p style=display:flex;justify-content:flex-end>您曾评论：</p>                         <div class="ax_post_box-comments-single Messages-author" style=display:flex;justify-content:flex-end;margin-bottom:5px;margin-top:7px>                             <div class=ax_post_box-comment-avatar style=width:auto;flex:none;order:2>                                 <img src=${PARENT_IMG} style=width:40px;height:40px;border-radius:5px>                             </div>                             <div class=ax_post_box-comment-text style=position:relative;margin-right:10px>                                 <span class=ax_post_box-comment-text-before style="width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:8px solid;border-left-color:#f4f4f4;border-right:0;border-right-color:transparent;right:-7px;left:auto;top:12px;position:absolute"></span>                                 <div class=ax_post_box-comment-text-inner style=max-width:506px;background-color:#f1f3fa;padding:10px;border-radius:9px;margin-bottom:3px>                                     ${PARENT_COMMENT}                                 </div>                             </div>                         </div>                         <p>                             <strong>${NICK}</strong>                              回复您：                         </p>                         <div class="ax_post_box-comments-single Messages-user" style=display:flex;margin-bottom:5px;margin-top:7px>                             <div class=ax_post_box-comment-avatar style=width:auto;flex:none>                                 <img src=${IMG} style=width:40px;height:40px;border-radius:5px>                             </div>                             <div class=ax_post_box-comment-text style=position:relative;margin-left:10px>                                 <span class=ax_post_box-comment-text-before style="width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:8px solid;border-right-color:#f4f4f4;left:-7px;right:auto;top:12px;position:absolute"></span>                                 <div class=ax_post_box-comment-text-inner style=max-width:506px;background-color:#f1f3fa;padding:10px;border-radius:9px;margin-bottom:3px>                                     ${COMMENT}                                 </div>                             </div>                         </div>                     </div>                 </div>             </div>             <div style=text-align:center;margin-right:66px>                 <a style="text-decoration:none;color:#fff;background-color:#94a9b9;padding:5px 20px;border-radius:4px;position:absolute;margin-top:10px" href=${POST_URL} target=_blank>查看</a>             </div>         </div>         <div style="width:100%;height:345px;background-repeat:no-repeat;border-radius:5px 5px 0 0;background-image:url(https://s11.ax1x.com/2023/08/27/pPU9Br9.png);background-size:cover;background-position:50% 50%"></div>         <div style=color:#8c8c8c;font-size:10px;width:100%;text-align:center;margin-top:20px>             <p>本邮件为系统自动发送，请勿直接回复~</p>         </div>         <div style=color:#8c8c8c;font-size:10px;width:100%;text-align:center;margin-top:5px>             <p>Copyright © 2021 - 2023 <a href="${SITE_URL}">${SITE_NAME}</a></p>         </div>     </div>     <style>         * {             margin: 0;             padding: 0         }         img {             -webkit-user-drag: none;             border-radius: 3px         }         ul,         ol {             margin-left: 1rem !important         }         .tk-owo-emotion {             width: 35px;             height: auto;             max-width: 300px;             max-height: 300px;             vertical-align: middle         }         .ax_post_box-comment-text-inner p,         .ax_post_box-comment-text-inner img {             max-width: 506px !important         }     </style> </div>
```
到这里我们就完成了相应的Twikoo的配置！