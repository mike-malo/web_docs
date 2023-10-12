# MySQL学习笔记

```mysql
show databases;
```

展示已有数据库



```mysql
create database southwind;
```

创建一个数据库名为southwind



```mysql
create database if not exists sounthwind;
```

如果不存在sounthwind数据库则创建



```mysql
drop database if exists sounthwind;
```

如果存在sounthwind数据库



```mysql
use southwind;
```

设置sounthwind为默认数据库, 以便直接引用其表



```mysql
select database();
```

显示当前默认的数据库



```mysql
show tables;
```

显示当前数据库中所有的表



```mysql
create table if not exists products (
	productID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    productCode  CHAR(3)       NOT NULL DEFAULT '',
    name         VARCHAR(30)   NOT NULL DEFAULT '',
    quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
    price        DECIMAL(7, 2) NOT NULL DEFAULT 99999.99,
    PRIMARY KEY (productID)
);
```

创建一个表名为products



```mysql
show tables;
```

显示当前数据库中所有的表, 确认products表被正确地创建



```mysql
describe products
```

描述products表中的字段(列)



```mysql
show create table products \G
```

显示MySQL用于创建此表的完整create tabel语句



## 说明

我们在 products 表中定义了5列 productID, productCode, name, quantity 还有 price.

1. productID 是int unsigned (无符号整型, 非负整数)类型, int类型取值范围是 -2147483648 到 2147483647 之间, 而 unsigned 类型的取值范围是 0 到 4294967295 之间.
2. productCode 是 3 个字符的固定长度字母数字字符串.
3. name 是最多 30 个字符的可变长度字符串.
4. price是decimal(10, 2), 具有2为小数的十进制数

属性not null指定该列不能包含该null值, null值是一个特殊值, 表示无值、未知值或缺失值, 如果在创建记录期间未指定值, 则该列将采用其默认值.

我们将列设置productID为所谓的主键. 主键列的值必须是唯一的. 每个表都应包含一个主键.主键也被其他表用作参考.

我们将该列设置productID为auto_increment, 默认设置值为1, 当插入的列为null时插入该列的最大值加1, 也可以将有效值插入到auto_increment列中, 绕过自动增量.



## 插入数据

```mysql
insert into products values (1001, 'PEN', 'Pen Red', 5000, 1.23);
```

插入包含所有列值的行



```mysql
insert into products values
	(NULL, 'PEN', 'Pen Blue', 8000, 1.25),
	(NULL, 'PEN', 'Pen Black', 2000, 1.25);
```

将NULL值插入到auot_increment列中会导致max_value + 1



## 查询数据库

```mysql
select name, price from products;
```

列出指定列的所有行



```mysql
select * from products;
```

列出所有列的所有行, 通配符 * 表示所有列



### 不带表的select

```mysql
select 1+1;
```

可以 select 在没有表格的情况下发出问题, 例如, 可以 select 计算表达式



```mysql
select now();
select 1+1, now();

```

### 比较运算符

对于数字(int, decimal, float), 可以使用比较运算符: ('=' 等于)、'<>' 或 ’!=' (不等于)、'>'(大于)、'<'(小于)、‘>='(大于或等于)、'<=' (小于或等于), 比较两个数字. 例如, price > 1.0, quantity <= 500.

```mysql
select name, price from products where price < 1.0;
select name, quantity from products where quantity <= 2000;
```



注意: 请勿比较FLOATS(实数)是否相等('='或'<>'), 因为他们不精确, 另一方面, decimal又要精准.

对于字符串, 可以使用'=', '<>', '>', '<', '<=', '>='来比较两个字符串(例如, productCode = 'PEC').

```mysql
select name, price from products where productCode = 'PEN';
```



### 字符串模式匹配 - LIKE 和 NOT LIKE

对于字符串, 除了使用 '=' 和 '<>', 可以使用运算符 LIKE (or NOT LIKE) 加通配符进行模式匹配, 通配符匹配任何单个字符, 匹配任意数量的字符(包括零)

1. 'abc%' 匹配以abc开头的字符

2. '%xyz' 匹配以xyz结束的字符
3. '%aaa%' 匹配包含aaa的字符
4. '___' 匹配包含3个字符的字符
5. 'a_b%' 匹配以a开始, 后面跟着任意单个字符, 接着是b零个或多个字符的字符串.

```mysql
select name, price from products where name like 'PENCIL%';
```

以 PENCIL 开始的 name

```mysql
select name , price from products where name like 'P__%';
```

名字以P开头, 后跟任意两个字符, 后跟空格, 后跟零个或多个字符

MySQL还支持通过REGEXE运算符进行正则表达式匹配.



## 算数运算符

可以通过算数运算符对数字字段进行算数运算

| 操作员 |    描述    |
| :----: | :--------: |
|   +    |    添加    |
|   -    |    减法    |
|   *    |    乘法    |
|   /    |    分配    |
|  DIV   |  整数除法  |
|   %    | 模数(余数) |

### 逻辑运算符 - AND、 OR、 NOT、 XOR

```mysql
select * from products where amount >= 5000 and name like 'Pen %';

select * from products where quantity >= 5000 and price < 1.24 and name like 'Pen %';

select * from products where not (quantity >= 5000 and name like 'Pen %';)
```

### IN, NOT  IN

```mysql
select * from products where name in ('Pen Red', 'Pen Black');
```

### BETWEEN, NOT BETWEEN

```mysql
select * from products
```

null是一个特殊值, 代表"无值"、"缺失值"和"未知值".

### IS NULL, IS NOT NULL

```mysql
select * from products where productCode is null;
```

使用比较运算符(例如=或<>)来检查是否null是一个错误，这是一个非常常见的错误

### ORDER BY Clause

```mysql
select * from products where name like 'Pen %' order by price desc;

select * from products where name like 'Pen %' order by price desc, quantity;

select * from product order by rand();
```

### LIMIT Clause

```mysql
select * from products order by price limit 2;

select * from products order by price limit 2, 1;
```

### AS - Alias

```MYSQL
select productID AS ID, productCode AS Code, name AS Description, price AS `Unit Price` from products order by ID;
```

可以使用关键字AS来定义标识符的别名(例如列名、表名), 别名用于显示名称

### 函数CONCAT

```mysql
select concat(productCode, ' - ', name) AS `Product Description`, price from products;
```

可以使用 CONCAT() 函数将几列连接为一列(例如, 连接姓氏和名字)

## 生成总结报告

一列可能有重复的值, 可以使用关键字DISTINCT来仅选择不同的值. 

例如: 没有唯一的

```mysql
select price from products;
```

唯一的

```mysql
select distinct price as `Distinct Price` from products;
```

唯一的价格和名字

```mysql
select distinct price, name from products;
```

### 

GROUP BY 子句

```mysql
select * from products order by productCode, productID;

select * from products group by productCode;
-- 每一组只有一条记录显示
```

group by 其本身是没有意义的, group by与聚合函数(例如 count()、 avg() )一起使用 sum() 以生成组摘要.

### GROUP BY 聚合函数: COUNT、 MAX 、 MIN、 AVG、SUM 、STD 、GROUP_CONCAT

可以将GROUP BY函数应用于每个组以生成组摘要报告

该函数count(*) 返回选定的行; 仅计算给定列的非值.

```mysql
select count(*) as `Count` from products;

select productCode, count(*) from product group by productCode;

select productCode, count(*) as count from products group by productCode order by count desc;
```

还有AVG()、MAX()、MIN()、SUM(), 例如:

```mysql
select max(price), min(price), avg(price), std(price), sum(quantity)
from products;
-- 没有使用group by - 所有行
+------------+------------+------------+------------+---------------+
| MAX(price) | MIN(price) | AVG(price) | STD(price) | SUM(quantity) |
+------------+------------+------------+------------+---------------+
|       1.25 |       0.48 |   0.940000 |   0.371591 |         33000 |
+------------+------------+------------+------------+---------------+


select productCode, max(price) as `Highest Price`, min(price) as `Lowest Price`
from products
group by productCode;
+-------------+---------------+--------------+
| productCode | Highest Price | Lowest Price |
+-------------+---------------+--------------+
| PEC         |          0.49 |         0.48 |
| PEN         |          1.25 |         1.23 |
+-------------+---------------+--------------+


select productCode, max(price), min(price), 
       cast(avg(price) as decimal(7, 2)) as `Average`, 
       cast(std(price) as decimal(7, 2)) as `Std Dev`,
       sum(quantity)
from products
group by productCode;
-- 使用 CAST( ... AS ... ) 函数格式化浮点数
+-------------+------------+------------+---------+---------+---------------+
| productCode | MAX(price) | MIN(price) | Average | Std Dev | SUM(quantity) |
+-------------+------------+------------+---------+---------+---------------+
| PEC         |       0.49 |       0.48 |    0.49 |    0.01 |         18000 |
| PEN         |       1.25 |       1.23 |    1.24 |    0.01 |         15000 |
+-------------+------------+------------+---------+---------+---------------+

```

### HAVING 子句

```mysql
select 
    productCode as `Product Code`,
    count(*) as `Count`,
    cast(avg(price) as decimal(7, 2)) as `Average`
from products
group by productCode
having count >= 3;
-- 不能使用where count >= 3
+--------------+-------+---------+
| Product Code | Count | Average |
+--------------+-------+---------+
| PEN          |     3 |    1.24 |
+--------------+-------+---------+

```

### WITH ROLLUP

```mysql
select 
    productCode,
    max(price),
    min(price),
    cast(avg(price) as decimal(7, 2)) as `Average`,
    sum(quantity)
from products
group by productCode
with rollup;
-- 对所有组应用聚合函数
+-------------+------------+------------+---------+---------------+
| productCode | MAX(price) | MIN(price) | Average | SUM(quantity) |
+-------------+------------+------------+---------+---------------+
| PEC         |       0.49 |       0.48 |    0.49 |         18000 |
| PEN         |       1.25 |       1.23 |    1.24 |         15000 |
| NULL        |       1.25 |       0.48 |    0.94 |         33000 |
+-------------+------------+------------+---------+---------------+

```

## 修改数据 - 更新

要修改现有数据， 使用UPDATE ... SET 命令， 语法如下：

```mysql
UPDATE 表名 SET 列名 = { 值 | NULL | DEFAULT }, ... WHERE 条件
```

```mysql
update products set price = price * 1.1;
-- 所有产品的价格提高10%

update products set quantity = quantity - 100 where name = 'Pen Red';
-- 修改被选择的行

update products set quantity = quantity + 50, price = 1.23 where name = 'Pen Red';
-- 可以修改超过一个值
```

如果命令where中省略该子句update， 则所有行都将被更新。 

## 删除行 -- delete from

使用delete from命令从表中删除行

```mysql
-- 删除表中的所有行， 使用时要格外小心! 记录不可恢复!!!
delete from tableName

-- 仅删除满足条件的行
delete from tableName where 条件
```

例如:

```mysql
delete from products where name like 'Pencil%';
-- 从products中删除名字类似Pencil的行

-- 使用此
delete from products;
-- 删除所有行
```

