---
tags:
  - dev-log
top_img: https://bucket.redeyes.top/2025/02/22/08de3d.jpeg
categories: dev-log
title: ReBLOG开发日志02
cover: https://bucket.redeyes.top/2025/02/22/08de3d.jpeg
date: "{{date}}"
ai: "false"
---
# api接口的编写
基于上次的数据库设计完善，今天我们来做正式开发项目之前的最后一步，编写相应的接口，有了相应的数据库设计，编写接口也变得相当简单，不过可能比较繁琐
大体是接口信息如下所示
```typescript
export [接口名]={
	[要请求的相应数据类型]
}
res={
    [返回的数据]
}
```
这里我们暂时没有考虑相应的请求方法，等到后期设置路由的时候再去考虑这方面的需求是什么

## 功能的展示
有了功能我们才能更好的去做我们的接口信息
大题的功能如下
* 用户登陆
* 数据总览
* 访问量
* 数据监测
* 显示评论
* 文章/文章搜索
* 文章删除
* 文章发布/文章撤回
* 文章状态
* 显示分组
* 新建分组
* 删除分组
* 查看标签
* 新建标签
* 显示文件
* 文件上传
* 文件删除
* 文件移动
* 图库/图库搜索
* 图库删除
* 日记/日记搜索
* 日记删除
* 文章/图库新建
* 获取文章/图库用于修改
* 文章/图库修改
* 新建日记
* 获取天气
功能大概先写这么多，后续开发过程中在修改或进行添加相应的功能
根据上述功能来写API无非就要考虑两种情况
### 第一种
可有可无
```
subsetId?:number
```
有的文章或者图片没有进行相应的分类，我们则加?来表示可有可无
### 第二种
取出来的数据不知一个，可以形成相应的数组，完美可以在数据类型的后面加上[]
比如
```
tagsName:string[]
```
有的时候一篇文章取出来的标签可能不止一个所有可以形成一个数组来表示，就可以用数组类型。
## 编写接口

根据以上的方法，变可以把接口给写出来大体如下
### 用户登陆
#### 地址：/login
```typescript
export type login={
	name:string;
	pwd:string;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	id:number;
	name:string;
	avater_url:string; //头像
	token:string;
	
	}
}
```

### 数据总览
#### 地址：/overview
```typescript
export overview ={
	token:string;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	file:string;
	article:number;
	gallery:number;
	diary:number;
	
	}
}
```
### 访问量
#### 地址：/visits
```typescript
export type visits={
	token:string; //每个请求都会验证toekn
	length:number;
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
		count:number;
	}
}
```

### 数据监测
#### 地址：/survey
```typescript
export type survey={
	token:string;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	device:{
	key:'mobile'|'pc';
	value:number;
	}
	
	}[];
	website:{
	key:'file'|'article'|'gallery'|'diary'
	}[];
	
}
```

### 评论
#### 地址：/comment
```typescript
export type comment={
	token:string;
	pageSize:number;
	nowPage:number;  //当前页
	count?:boolean;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	count?:number;
	list:{
		id:number;
		article?:{
			title:string;
			
		};
		user:{
			id:string|number;
			name:string;
			avater_url:string
		};

		comment:string;
		moment:string;
		complaint:number;
		
	}[];
	
	
	}
}
```




### 文章/文章搜索
#### 地址：/article
```typescript
export type login={
	token:string;
	pageSize:number;
	nowPage:number;  //当前页
	state?:number;
	subsetId:number;
	serchTerm?string|number;
	count?;boolean
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	count?:number;
	list:{
		id:number;
		title:string;
		subsetId:number;
		moment:string;
		label?:string[];
		introduce?:string;
		cover?:string;
		views:number;
		state:number;
		comment:number;
		praise:number;
		
	}[];
	
	
	}
}
```

### 文章发布/文章撤回
#### 地址：/changeArticleState
```typescript
export type changeArticleState={
	token:string;
	articleId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```

### 文章删除
#### 地址：/deleteArticle
```typescript
export type changeArticleState={
	token:string;
	articleId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```


### 文章状态
## 地址：/articleState
```typescript
export type changeArticleState={
	token:string;
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
	id:number;
	name:'已发布'|'未发布';
	value:number;
	}[];
	

}


```

### 分组
#### 地址：/subset
```typescript
export type changeArticleState={
	token:string;
	classify:number;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
	count?:number;
	list:{
		id:number;
		name:string;
		value:number; //数据总数
		moment:string;
	}[]
	
	}

}

```

### 新建分组
#### 地址：/addSubset
```typescript
export type addSubset={
	token:string;
	classify:number;
	subsetName:string|string
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```

### 修改分组名称
#### 地址：/updateSubset
```typescript
export type updateSubset={
	token:string;
	classify:number;
	subsetName:string｜number
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```


### 删除分组
#### 地址：/deleteSubset
```typescript
export type deleteSubset={
	token:string;
	substId:number
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```

### 查看标签
#### 地址：/label
```typescript
export type deleteSubset={
	token:string;
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
	id:number;
	name:string;
	moment:string
	}[];
	
	

}
```

### 新建标签
#### 地址：/addLabel
```typescript
export type addLabel={
	token:string;
	lableName:string;
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
	id:number;
	name:string;
	moment:string
	}[];
	
	

}
```

### 删除标签
#### 地址：/deleteLabel
```typescript
export type deleteLabel={
	token:string;
	lableId:string;
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访 
	
	
	

}
```

### 文件
#### 地址：/file
```typescript
export type file={
	token:string;
	pageSize:number;
	nowPage:number;  //当前页
	subsetId?:number
	count:bloolean
	
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访 
	data?:{
		count?:number;
		list:{
			id:number;
			url:string  //文件地址
			fileName:string   //文件名
			format:string  //格式
			subsetId?:string  //所属类型
			
		}
	}
}
```


### 文件上传
#### 地址：/uploadFile
```typescript
export type uploadFile={
	token:string;
	formData = new FormData();
	subsetId?:string  //所属类型
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访 
	data?:{
		id:number;
		url:string  //文件地址
		fileName:string   //文件名
		format:string  //格式
		subsetId?:string  //所属类型
	}
}
```

### 文件删除
#### 地址：/deleteFile
```typescript
export type deleteFile={
	token:string;
	file:number ｜ number[]
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访 
	
}
```


### 文件移动
#### 地址：/removeFile
```typescript
export type removeFile={
	token:string;
	file:number ｜ number[]
	subsetId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访 
	
}
```

### 图库/图库搜索
#### 地址：/gallery
```typescript
export type removeFile={
	token:string;
	pageSize:number;
	nowPage:number;  //当前页
	subsetId?:number
	count:bloolean
	serchTerm?string|number;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	count?:number;
	list:{
		id:number;
		title:string;
		subsetId?:number;
		moment:string;

		introduce?:string;
		cover?:string;
		views:number;

		comment:number;
		praise:number;
		
	}[];
	
	
	}
}
```

### 图库删除
#### 地址：/deleteGallery
```typescript
export type deleteGallery={
	token:string;
	galleryId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```


### 日记/日记搜索
#### 地址：/diary
```typescript
export type diary={
	token:string;
	pageSize:number;
	nowPage:number;  //当前页
	count:bloolean
	serchTerm?string|number;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访问
	data?:{
	count?:number;
	list:{
		id:number;
		title:string;
		moment:string;
		weatherId:number;
		comment:number;
		content:string;
		picture?:string[];
	}[];
	
	
	}
}
```

### 日记删除
#### 地址：/deleteDiary
```typescript
export type deleteDiary={
	token:string;
	diaryId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	

}
```


### 文章/图库新建
#### 地址：/createArticle
```typescript
export type deleteDiary={
  token:string;
  title:string;
  subsetId?:number;
  classify:number;
  label?:string[];
  introduce?:string;
  content?:string;
  cover?:string;
  state?:number;
  moment:string;

}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  

  
}
```


### 获取文章/图库用于修改
#### 地址：/gainArticle
```typescript
export type gainArticle={
	token:string;
	articleId:number
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
		id:number;
		title:string;
		subsetId?:number;
        label?:string[];
		introduce?:string;
	    content?:string;
	    cover?:string;
	    state?:number;

	
	}

  

}
```

### 文章/图库修改
#### 地址：/updateArticle
```typescript
export type updateArticle={
  token:string;
  title:string;
  subsetId?:number;
  label?:string[];
  introduce?:string;
  content?:string;
  cover?:string;
  state?:number;
}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  

  
}
```


### 新建日记
#### 地址：/createDirary
```typescript
export type createDirary={
  token:string;
  title:string;
  content:string;
  picture?:string[];
  weatherId:string[]

}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  

  
}
```

### 天气
#### 地址：/weather
```typescript
export type createDirary={
  token:string;
  

}
```
```typescript
res={
	code:number //200正常 300未通过验证的返回500 错误 400拒绝访  
	data?:{
		id:number;
		name:string;
		icon:string;
	}[];
  
}