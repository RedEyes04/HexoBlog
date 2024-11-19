---
title: 最全最流畅 Hexo搭建教程「VPS」+「宝塔nignx」
tags:
  - Hexo
top_img: https://bucket.redeyes.top/2024/10/20/b6eead.webp
categories: Hexo相关
cover: https://bucket.redeyes.top/2024/10/20/b6eead.webp
id: hexo01
date: 2024-10-19T19:00:00
ai: "true"
---
## 前言
本篇文章将会教你从头开始教你一种，目前网络上最流畅、最快、最全面的hexo部署在vps服务器的方案！[anzhiyu 主题]

# 服务器相关
## 服务器选择
~~这里推荐大家去用阿里云的飞天计划给的服务器~~，（飞天计划貌似已经被取消了，之后[天工开物](https://university.aliyun.com/)计划还在）~~有七个月~~，最后如果符合在校或者在教育机构工作的话，天工开物还能获得300元的无门槛券，能续上三个月，一共加起来就是十个月，这里给大家 飞天计划的链接大家，完成一些相应的操作就行了，很简单，这里不过多赘述
## 服务器的配置
在有了服务器之后，我们需要重新安装一次系统，这里推荐用debian12的系统。
![image.png](https://bucket.redeyes.top/2024/10/19/a08767.png)


然后我们需要一款shell工具，我用的多的是[xshell](https://www.xshell.com/zh/xshell-download/)，可以去官下到然后免费使用，填写外网ip地址和密码即可连接使用
![image.png](https://bucket.redeyes.top/2024/10/19/baaf3c.png)

## 宝塔面板安装
这里为了方便大家使用，可以选择一款面板来辅助我们操作服务器，进入官网然后复制debian的安装连接，直接复制到xhell里安装就好了
![image.png](https://bucket.redeyes.top/2024/10/19/8af6ad.png)

记住外网的访问连接，输入 bt 6 / bt 5分别修改用户名，然后进去面板安装环境
![](https://bucket.redeyes.top/2024/10/19/1c50b9.png)
![image.png](https://bucket.redeyes.top/2024/10/19/7bfbbd.png)

# 域名相关
## 顶级域名购买
域名购买的渠道很多，我这里用的[阿里云](https://dc.console.aliyun.com/next/index?spm=a2c1d.8251892.console-base_product-drawer-right.ddomain.57525b76mZdIzv#/overview)，第一年好像就9元，之后都是三十几一年，还是很便宜的，不过我们用的国内服务器，是需要进行备案的，这里只有一个地方要说一下，阿里云里备案是要一个备案码的，你可以去官方买一个99元/个，如果觉得贵的话也可以到一些小程序去买，像 备案狗十块左右就能买到了！

![image.png](https://bucket.redeyes.top/2024/10/19/cb8f00.png)

![](https://bucket.redeyes.top/2024/10/19/688084.png)
域名备案时间大概是两周左右，首先是注册商我这里是阿里云会给你进一步核对消息，有错的地方他会让你进一步更改，接着会送去管局审核，管局审核时间大概是一周左右，没问题会送去工信部最终审核，没问题很快就会给你发下备案号了！然后在一周内根据短信提，去申请联网号，这个很快一两天就下来了，到这里备案就完成了，如果你想早点看见自己的网站上线，可以选择网上一些二级域名，这类域名
## 二级域名
这类域名网上一招一大堆，就能获得，但一般长得不好看，这里不做推荐，有需要的可以自行百度和B站就能找到，而且是免备案的

## 域名解析
首先来了解一下什么是DNS域名解析，我们的域名会对应一个IP，因为这样我们才能通过输入域名也就是网址来访问网站，大概的DNS可以理解为电话簿，里面记录着每个域名对应的IP地址
有了域名之后我们可以去相应的域名解析页面常用的记录类型有三种
- A记录
	A记录一般直接指向服务器的外网IP地址
- CNAME
	一般用于验证域名所有权以及进行相应的CDN加速服务
- TXT
	也是一种多用语验证域名所有权的常见方法
这里我们现先加A记录的解析，到自己的服务器外网IP地，在添加自己想要的主机记录，博客的话一般是www或者blog，这里用test.redeyes.top做演示
![image.png](https://bucket.redeyes.top/2024/10/19/0b9d65.png)

## 添加网站
到宝塔面板里添加网站，因为hexo是静态网站，所以下面我们不要勾选PHP版本，也不要建立相应的数据库，然后输入刚刚添加的网站记录
![image.png](https://bucket.redeyes.top/2024/10/19/538d26.png)

## SSL证书申请
接着我们要申请相应网站的SSL证书，直接选择上面的 「Let's Encrypt」 只要前面一步正确进行了DNS解析就会成功获得相应的证书，点击保存，开启强制https。接着就可以访问页面了！
![image.png](https://bucket.redeyes.top/2024/10/19/df2626.png)

![image.png](https://bucket.redeyes.top/2024/10/19/3cd020.png)

# HEXO安装
## nodejs安装
首先根据官网给的文章，安装hexo之前要先安装nodejs，现进入[nodejs的官网](https://nodejs.cn/download/)，点击[Linux 二进制文件 (x64)]下载。
![image.png](https://bucket.redeyes.top/2024/10/19/1fe6af.png)

然后我们使用xshell里的xftp工具传上去![image.png](https://bucket.redeyes.top/2024/10/19/312632.png)
接着我们输入
[这里的node-v20.18.0-linux-x64.tar.xz根据各位的文件夹而定，打一个node 然后tab补全就好了]

```
tar -vxf node-v20.18.0-linux-x64.tar.xz   
```
进行解压，接着我们给解压完的文件夹换个名字
```
mv node-v20.18.0-linux-x64 nodejs
```
然后我们也还可以把原压缩包删除
```
rm -f node-v20.18.0-linux-x64.tar.xz 
```
接着设置软链接，注意这里的地址根据你的实际地址来定，我的是放在root目录，也就是（~）/「nodejs」 这样的root目录在整个目录的位置是这样的/root/「nodejs」或者~/nodejs
```
ln -s ~/nodejs/bin/node /usr/local/bin/
```
```
ln -s ~/nodejs/bin/npm /usr/local/bin/
```
接着我们来验证一下是否安装成功
分别输入
```
node -v
```

```
npm -v
```
![image.png](https://bucket.redeyes.top/2024/10/19/d3f684.png)

如果能出现版本号那就是安装成功了
## 更换npm源
官方的源下载速度很慢我们这里可以去更换国内更快的源，比如说淘宝源，直接在命令行输入以下代码就行了
```
npm config set registry https://registry.npmmirror.com
```
## 安装Git
安装前可以先看下自己有没有Git ，如果没有再进行以下步骤
```
git --version
```
首先更新一下软件包(适用于debian和unbantu)
```
apt-get update
```
安装Git
```
apt-get install git
```
## 安装hexo脚手架
```
npm install hexo-cli -g
```

安装完为了方便使用，我们给hexo也做个软链接，方法和上面一样
```
ln -s ~/nodejs/bin/hexo /usr/local/bin/
```


同样的，我们软链接完可以用这个命令看一下是否正确进行了软链接
```
hexo -v
```

## 初始化hexo内容

接着我们到根目录（不是root目录），root的上一层目录，我们新建新的文件夹
```
mkdir blog
```
进入文件夹
```
cd blog
```
初始化内容
```
hexo init
```
稍等片刻后我们便能得到初始化的内容

# VS Code 软件的安装和使用（如果已经会使用的可以跳过哦！）
接下来我们会进行配置主题文件，如果我们使用xshell和xftp会不太方便，所以我们这里可以使用一款超级好用的软件！Vscode 我们直接进入[官网](https://code.visualstudio.com/)进行下载和安装！
安装完进去后，我们点击右边的插件选项，搜索Chinese ，进行安装汉化
安装完右下角会让你重启软件，重启完就汉化好了！
## ssh🔗连接服务器
我们点击左下角的，打开远程窗口，进行然后在上面输入相应的内容
```
ssh root@[你的IP地址]
```
输入完密码后会让你写入文件里，然后我们就成功连接上服务器了，但是你发现每次打开文件夹的时候都会让我们再次输入密码，很不方便，所以我们这里还要再配置以下免密ssh链接
## ssh免密🔗服务器
首先我们要获取本机的ssh公钥和密钥
win+r 输入cmd 打开命令行，输入，一路回车
```
ssh-keygen -t rsa
```

接着我们到C盘的这个目录下
![image.png](https://bucket.redeyes.top/2024/10/19/1b993a.png)
会发现生成了两个文件
![image.png](https://bucket.redeyes.top/2024/10/19/b3c86a.png)
有后缀的pub是公钥，没的是私钥
接着我们到xshell终端一样输入上面生成公钥私钥的命令，一样一路回车就好了
这里的.ssh文件夹在/root/.ssh  不过要注意⚠️的是，.ssh文件夹是隐藏的文件夹，我们可以直接打开xftp，在上面直接输入/root/.ssh就可以进去了！
![image.png](https://bucket.redeyes.top/2024/10/19/33bd62.png)
我们会看见这个文件,如果没有我们就右键新建一个，在里面复制粘贴刚刚在我们电脑上生成的.pub后缀的文件的内容，然后保存即可
```
authorized_keys
```

接着我们打开vscode，点击右下角，别着急连接我们选择配置主机，选我们一开始写入的文件，然后我们在下面新建一行输入
```
IdentityFile '[刚刚生成的私钥地址(没有pub后缀的那个)]'    ##格式像下面这样写
```
![image.png](https://bucket.redeyes.top/2024/10/19/922de2.png)
接着我们重启软件，在链接发现就不要输入密码了！

# 主题相关
## 安装应用主题
### 安装主题
```
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```
### 安装主题依赖
安装渲染插件
```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
### 优化覆盖配置
优化覆盖配置
```
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```
我们安装完可以在theme文件夹里找到anzhiyu的主题文件，里面有个_config.yml，但是我们每次用命令更新完的时候，原有的配置文件会被覆盖掉，所以每次更新的时候要先复制一份，会有点麻烦，上面的代码是把_config.yml这个文件复制到/blog根目录，复制到根目录的配置文件优先级会比里面的优先级高，所有我们之后改一些配置直接改_config.anzhiyu.yml，就行了！
### 应用主题
接着我们在根目录找到文件_config.yml,往下翻,把theme改成anzhiyu
```
theme: anzhiyu
```
## 简单Hexo命令学习
```Hexo
hexo g   ##根据_config.anzhiyu.yml的内容生成静态文件在根目录的public文件夹下
hexo cl  ##清除public下所有文件夹
hexo d   ##推送到远程仓库（我们这种方法用不到）
hexo s   ##在服务器的4000端口开启服务器进程，可以进行访问
ctrl + c  ##结束hexo博客进程
```

## Hexo命令的简单尝试
### 修改主题文件
我们到根目录下的_config.yml 文件里面，简单的根据自己的需求修改一下文件，***记得保存！（ctrl + s）！***

| ![image.png](https://bucket.redeyes.top/2024/10/19/c79e1c.png)<br> | ![image.png](https://bucket.redeyes.top/2024/10/19/854490.png)<br> |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |



### 接着我们hexo三连
```
hexo cl
hexo g
hexo s
```
![image.png](https://bucket.redeyes.top/2024/10/19/928ccd.png)
ctrl + 左键打开网站，看看刚刚的有没有生效


# 主题配置相关
## 主题配置修改
主题配置主要在我们复制在根目录下的_config.anzhiyu.yml这个里面进行，主要的一些办法就是把安知鱼给的一些注释删除，然后该一些false为true就可以了，这些根据[anzhiyu给的主题文档](https://docs.anheyu.com/initall.html)就可以进行配置了，具体如果有什么问题可以在评论下留言，下面我会教一些anzhiyu那边没有写全的教程
## 字体修改
首先我们要去字体网站找到自己合适的字体，这里可以去[字体天下](https://www.fonts.net.cn/)这个网站，找到合适的字体，我们可以先放到/blog/source的下面，然后我们在source下新建一个文件夹，再在文件夹里新建一个font.css，整体如下图所示
![](https://bucket.redeyes.top/2024/10/19/0f0921.png)

然后我们在font.css里输入以下内容，你可以把字体命名为我的字体名，建议使用woff2的格式，如果不是可以进入[这个网站](https://fontconverter.com/zh/)进行字体的格式转换
```
@font-face {

    font-family: 'webfont';

    font-display: swap;

    src: url('../webfont.woff2') format('woff2');

    font-weight: normal;

    font-style: normal;    

  }
```
保存，然后再进入_config.anzhiyu.yml，ctrl+F 搜索font-family，
![image.png](https://bucket.redeyes.top/2024/10/19/755d5c.png)
像这样填写，保存
然后再ctrl+F 搜索 inject，在head部分插入以下内容，注意要对齐!
```
- <link rel="stylesheet" href="/css/font.css" />
```
![image.png](https://bucket.redeyes.top/2024/10/19/658e43.png)

最后再Hexo三连，就可以看到效果了！
![image.png](https://bucket.redeyes.top/2024/10/19/102270.png)
字体发生了变化
## 字体速度优化[待更新]
但是我们发现这样的访问速度很慢，那就到了我们对象存储出现的时候了，这个我会在下一章单独出一个文章   《对象存储以及图床教程》
## Twikoo评论系统的部署「[已更新点击进入](https://www.redeyes.top/2024/10/20/dc0df2ca5edc/)」
Twikoo是个非常好用的博客评论系统，部署简单，功能强大，我也会在后面文章写一期教程
# nignx大法好呀！
在上面我们发现这个博客在我们关闭终端 或者 ctrl + c 关闭会话的时候会结束，而且访问很慢！网上也有不少的教程说的是可以用pm2进行一个进程的常驻，不过这样的方法有弊端
1. 难以管理
2. 进程占用大
3. 访问速度慢
4. 不直观
所以我们这边可以用nignx来进行一个静态网站的访问，我们找到hexo是个静态网站，那么他的工作流程是怎么样的？如下面所示
```
hexo g  --->  生成静态文件
```
当我们进行了hexo cl 以及hexo g 的时候，我们会发现根目录下有哪个文件夹发生了变化？
没错正是public文件夹
![](https://bucket.redeyes.top/2024/10/19/088544.png)
我们看文件夹里的文件，不难发现这就是通过hexo生成的一些网站文件，以及资源
所以我们就可以在宝塔上面进行网站目录的更改，以及运行目录的更改，从而来实现hexo用nignx来访问的目的
## 修改网站目和运行目录
我们点击网站来修改相应的目录
![image.png](https://bucket.redeyes.top/2024/10/19/d71ace.png)
保存后我们再次访问，发现我们这样就可以成功访问网站了！
![image.png](https://bucket.redeyes.top/2024/10/19/0d650e.png)
## 注意事项⚠️
在我们进行网站配置后我们要先进行
```
hexo cl
```
再进行
```
hexo g
```
前往不要图省事！
在一些特定情况下，比如修改字体我们不能及时看见变化，是因为我们的浏览器缓存所致
有如下方法办法，
1. 第一个就是清除缓存和慢慢等，不过这样很影响我们浏览器的正常使用
2. 第二个就是先开无痕模式进行网站配置修改查看
3. 第三个，在终端里输入
```
hexo s
```
通过本地端口进行访问查看配置的修改
5. 必要时在cmd终端里输入
```
ipconfig/flushdns
```
清除dns缓存
# 大功告成！
接下来我会出一些anzhiyu主题的优化美化功能
以及博客撰写的一些方案[obsidian+github action]进行单软件撰写hexo文章，还能进行hexo博客的同步(hexo g)操作！[待更新]