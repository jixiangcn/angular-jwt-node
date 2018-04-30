# angular-jwt-node 
JWT(Json Web Token) authentication implementated with Angular and Nodejs.
[中文版](README.zh_CN.md)

Note: Server is works now, angular client coming soon.

##Quick Start

### 1.Install Mongodb:
示例中使用 mongodb 请在你的系统中安装 mongodb。
并建立一个名为 jwt 的数据库。

如果你已经有了正在运行的 mongodb 服务，请修改 server.js 文件中：
```
const config = {
    mongodbConnString: 'mongodb://localhost/jwt',
    ...
};
```
将 mongodbConnString 更改为适合的值。



### 2.下载示例
下载示例，解压到文件夹中，在文件夹中运行：
```
npm install
```

### 3.启动服务器
```
npm run server
```
默认情况下，服务器会监听 http://localhost:8081 
你可以使用 Postman 进行测试：

####1. 将用户注册的 json 数据:
```
{username:'lilei',password:'!123#456'}
``` 
POST 到：
```
http://localhost:8081/register
```
使用返回的 token 可以用来访问数据，注意：为了测试 token 的过期状态，默认生成的 token 一分钟过期。

####2. 将用户登录的 json 数据:
```
{username:'lilei',password:'!123#456'}
``` 
POST 到：
```
http://localhost:8081/login
```
使用返回的 token 可以用来访问数据。

####3. 使用 token 访问数据
在Postman中使用 GET 方法，将 Authorization 中的Bearer Token 设置为得到的 token 值
URL：
```
http://localhost:8081/me
```
使用返回的 token 可以用来访问数据。

