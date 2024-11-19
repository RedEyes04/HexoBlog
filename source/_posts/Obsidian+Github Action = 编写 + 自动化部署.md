---
tags:
  - Hexo扩展
top_img: https://bucket.redeyes.top/2024/10/20/8c9a62.webp
categories: Hexo相关
title: Obsidian+Github Action = 编写 + 自动化部署
date: 2024-10-20T14:26:00
cover: https://bucket.redeyes.top/2024/10/20/8c9a62.webp
ai: "true"
---
# <strong>前言</strong>
在我们用我的这篇《最全最流畅 Hexo搭建教程「VPS」+「宝塔nignx」》我们部署完Hexo博客后我们就要开始写文章了，我们有很多种选择像VS CODE Typora Obsidian等等，但里面最舒适功能最全面的还得是我们Obsidian，但我们写完把写完的文章内容复制到Vscode里去跑一下hexo g，很是麻烦，所以我就在想有没有什么办法只要写完点击一下就能自动发布？于是就有了本期，我的方案是借助Github仓库 加上Github Action来实现
## 具体步骤如下
```
##先把VPS上/blog目录下的内容push到仓库
VPS ----> Github  (push)

##再把仓库里的内容pull到本地
Github------>Obsidian(本电脑) (pull)

 ##本地写完再Commit给Github仓库相应的Github Action检测到文件夹下有变动trigger脚本，连接到远程ssh，进行hexo g操作
 
Obsdian(本电脑)----->Github---->Github Action----> VPS（hexo g）
```

# <strong>服务器内容同步到Github仓库</strong>
## Github上新建仓库
首先进入Github首页新建一个仓库
![image.png](https://bucket.redeyes.top/2024/10/21/15a947.png)
## /blog下新建Git仓库
```
git init
```
![](https://bucket.redeyes.top/2024/10/21/3c7840.png)
## 创建SSH密钥
```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  ##换成你的邮箱
```
## 将公钥添加到Github
进入首页点击头像进入 “settings”
![image.png](https://bucket.redeyes.top/2024/10/21/22a197.png)
再进入SSH and GPG Keys
![image.png](https://bucket.redeyes.top/2024/10/21/97e95e.png)
把生成的公钥的内容粘贴进去保存
![image.png](https://bucket.redeyes.top/2024/10/21/ba962b.png)
## 推送目录到仓库
### 添加远程仓库
我们进入vs code 输入
```
git remote add origin git@github.com:yourusername/yourrepository.git
```
后面的   git@github.com:yourusername/yourrepository.git输入
![image.png](https://bucket.redeyes.top/2024/10/21/90f478.png)
SSH的地址
### 移除嵌套的 Git 仓库

```
rm -rf themes/anzhiyu/.git
```
### 添加到暂存区

```
git add .
```
### 新建仓库用户
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### 设置上游分区master并推送
```
git push --set-upstream origin master
```

我们再打开Github相应的仓库界面，就能发现已经全部同步过去了
![image.png](https://bucket.redeyes.top/2024/10/21/58185c.png)
# <strong>仓库Pull到本地</strong>
## 添加本地的ssh公钥到Github
![image.png](https://bucket.redeyes.top/2024/10/21/753ea1.png)
![image.png](https://bucket.redeyes.top/2024/10/21/efd6b1.png)

## 安装Obsidian
[点我安装](https://obsidian.md/)
## 安装Git
[点我安装](https://git-scm.com/downloads/win)

## 新建Obsidian仓库
安装完进去我们新建一个文件夹和仓库
![image.png](https://bucket.redeyes.top/2024/10/21/edbda2.png)

在然后我们在刚刚创建的Obsidian里右键打开Git的bash
![image.png](https://bucket.redeyes.top/2024/10/21/ebda8b.png)
流程和服务器的上push大差不差
## 初始化仓库
```
git init
```
## 添加远程仓库
```
git remote add origin git@github.com:yourusername/yourrepository.git
```
## 新建仓库用户
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```
## pull到本地
```
git pull origin master
```
## 
这时候你到文件夹里去看会现有了Github仓库的内容，恭喜你🎉快成功了！

# <strong>安装Obsidian Git插件</strong>
直接在设置--第三方插件--关闭安全模式--社区插件市场--搜索Git---安装--启用
![image.png](https://bucket.redeyes.top/2024/10/21/272388.png)

## 设置本地到Github上游分支master
这时候我们在设置一下本地到Github的上游分支
```
git push --set-upstream origin master
```
## 写文章push到Github仓库
这时候启用插件会在左边看到
![image.png](https://bucket.redeyes.top/2024/10/21/384a92.png)

如果没问题那就会同步到我们的GitHub上
![image.png](https://bucket.redeyes.top/2024/10/21/a48c36.png)
那这一步就完成了！🎉
# <strong>Github Action的配置</strong>
接着就是配置Github Action了，让Github Action可以连接到我们的服务器进行相关的Hexo操作
## workflows文件夹创建
我们进入我们的Github首页，进入到.github的文件夹下
![image.png](https://bucket.redeyes.top/2024/10/21/f48c57.png)
点击左上角的Add Files
因为Github仓库不能直接新建一个空的文件夹，所以我们这样建立
![image.png](https://bucket.redeyes.top/2024/10/21/2e7846.png)

接着在新建一个文件夹叫deploy.yml
里面写
```
name: Deploy Hexo Blog

on:
  push:
    branches:
      - master  # 监听推送到 master 分支的操作
    paths:
      - 'source/_posts/**'  # 只在 source/_posts 下的文件变化时触发

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    # 检出仓库的最新版本
    - name: Checkout repository
      uses: actions/checkout@v3

    # 使用 rsync 连接到你的服务器
    - name: Copy files to server using rsync
      run: |
        if [ "$(ls -A ./source/_posts/)" ]; then
          sshpass -p "${{ secrets.SERVER_PASSWORD }}" rsync -avz --ignore-errors --delete --progress -e "ssh -o StrictHostKeyChecking=no" ./source/_posts/ root@${{ secrets.SERVER_HOST }}:/blog/source/_posts/
        else
          echo "No files to sync in ./source/_posts/, deploying keep.md instead."
          echo "Deleting existing posts on server..."
          sshpass -p "${{ secrets.SERVER_PASSWORD }}" ssh -o StrictHostKeyChecking=no root@${{ secrets.SERVER_HOST }} "rm -rf /blog/source/_posts/*"
          echo "Copying keep.md to server..."
          sshpass -p "${{ secrets.SERVER_PASSWORD }}" rsync -avz --progress -e "ssh -o StrictHostKeyChecking=no" ./source/_posts/keep.md root@${{ secrets.SERVER_HOST }}:/blog/source/_posts/
        fi

    # 在服务器上执行 Hexo 相关命令
    - name: Run hexo commands on server
      run: |
        sshpass -p "${{ secrets.SERVER_PASSWORD }}" ssh -o StrictHostKeyChecking=no root@${{ secrets.SERVER_HOST }} << 'EOF'
          cd /blog  # 进入服务器上的 Hexo 目录
          hexo g  # 生成静态文件
          
        EOF
```

## 添加仓库Secrets

```
SERVER_HOST    ##你服务器的连接IP地址
SERVER_PASSWORD    ##你服务器的SSH连接密码
```
![image.png](https://bucket.redeyes.top/2024/10/21/76287f.png)

## 设置.gitignore
我们每次推送其实只要推送_post目录下的内容就行了，所以其他的目录我们应该忽略进行推送，提高commit的效率！
我们打开刚刚的新建的Obsidian仓库的文件夹，找到文件夹下的.gitignore，如果没有就新建一个，然后输入一下内容
```
# 忽略所有文件
/*

# 排除 source/_posts 目录下的文件
!source/
!source/_posts/
!source/_posts/*

```
![image.png](https://bucket.redeyes.top/2024/10/21/70219a.png)
## 测试Github Action
我们在Obsdian的刚刚新建的文件里，添加几个字然后提交
![image.png](https://bucket.redeyes.top/2024/10/21/b5cd02.png)
接着打开Github Action页面
![image.png](https://bucket.redeyes.top/2024/10/21/3242c9.png)
会发现在运行了
如果没问题就已经成功Action部署到服务器上了！
![image.png](https://bucket.redeyes.top/2024/10/21/103dcb.png)
如下图
![image.png](https://bucket.redeyes.top/2024/10/21/7068c9.png)
到这里我们就已经成功实现了，Obsidian + Github Action 进行单软件撰写博客及部署的所有工作了！

# <strong>不足之处（还在找原因）</strong>
有一个不足的地方就是 我们添加密钥添加的是ssh连接的密码，然后用 rsync 连接到服务器，进行的操作，这个操作可能会不太安全，最安全的是使用密钥，不过我之前已经试了好多次了，都失败了，也问了ChatGPT，也给ChatGPT整无语了😂，如果大家有兴趣也可以自己试试那个方法，我之后会把ssh连接的工作流的代码放到下！

# <strong>注意事项⚠️！</strong>
Hexo的_post目录下不能没有文件然后进行hexo g的操作，不然会访问不了！本次的Github Action脚本没有避免这一点，希望大家注意！