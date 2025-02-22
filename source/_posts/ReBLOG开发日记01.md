---
tags:
  - Develop
top_img: https://bucket.redeyes.top/2025/02/22/f7bbb3.jpeg
categories: Develop
title: ReBLOG开发日记01
cover: https://bucket.redeyes.top/2025/02/22/f7bbb3.jpeg
date: "{{date}}"
ai: "false"
---
# 数据库设计 
我认为开发一个网页项目第一步应该是要进行相应的数据库设计，根据大概的功能，我们可以设计出一个大概的数据库出来
大体如下## users 表

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  moment VARCHAR(100) NOT NULL,
  avater_url VARCHAR(100)
  
);
```

## subset 表

```sql
CREATE TABLE subset (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subset_name VARCHAR(100) NOT NULL,
  moment VARCHAR(100) NOT NULL,
  classify INT NOT NULL,
);
```

## file 表

```sql
CREATE TABLE file (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(100) NOT NULL,
  url VARCHAR(100) NOT NULL
  format VARCHAR(32) NOT NULL
  subset_id INT NOT NULL,
  create_time VARCHAR(255) NOT NULL
);
```

## article 表

```sql
CREATE TABLE article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subset_id INT ,
  classify INT NOT NULL,
  label VARCHAR(200) NOT NULL,
  introduce VARCHAR(1000) NOT NULL,
  content VARCHAR(5000)  NOT NULL,
  cover VARCHAR(100) NOT NULL,
  views INT DEFAULT 0,
  article_state INT DEFAULT 0
  moment VARCHAR(100) NOT NULL
);
```


## praise 表

```sql
CREATE TABLE praise (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id INT NOT NULL,
  user_id VARCHAR(100) NOT NULL,
  user_type INT NOT NULL,
  moment VARCHAR(100) NOT NULL
);
```

## comment 表

```sql
CREATE TABLE comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id INT NOT NULL,
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_type INT NOT NULL,
  moment VARCHAR(100) NOT NULL,
  create_time VARCHAR(255) NOT NULL,
  complaint INT DEFAULT 0,
  isread INT DEFAULT 0,
  content VARCHAR(1000) NOT NULL
);
```

## label 表

```sql
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label_name VARCHAR(100) NOT NULL,
  moment VARCHAR(100) NOT NULL
);
```

## diary 表

```sql
CREATE TABLE diary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content VARCHAR(5000) NOT NULL,
  mood VARCHAR(255) NOT NULL,
  picture VARCHAR(500) NOT NULL ,
  weather_id INT,
  moment VARCHAR(100) NOT NULL
);
```

## weather 表

```sql
CREATE TABLE weather (
  id INT AUTO_INCREMENT PRIMARY KEY,
  weather_name VARCHAR(32) NOT NULL,
  icon VARCHAR(100)
);
```

## message 表

```sql
CREATE TABLE message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_type BOOL NOT NULL NOT NULL,
  moment VARCHAR(100) NOT NULL
  content VARCHAR(1000) NOT NULL,
  is_read BOOL DEFAULT 0
);
```

## record 表

```sql
CREATE TABLE record (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  user_type BOOL NOT NULL NOT NULL,
  create_time VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  device INT DEFAULT O
);
```

在我们设计完数据库之后我们就可以根据我们所写的数据库去进行相应的接口文档的书写