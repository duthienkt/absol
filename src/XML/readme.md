# XML 

## class XMLTextNode

### property

| Thuộc tính | Kiểu       | Tùy chọn | Chú thích                                                 |
|------------|------------|----------|-----------------------------------------------------------|
| parentNode | XMLElement |          | Node cha, chỉ nên đọc, thay đổi nhờ các hàm thêm, loại bỏ |
| data       | String     |          | Chuỗi dữ liệu                                             |


### method

| Phương thức | Trả về    | Tùy chọn | Chú thích                                              |
|-------------|-----------|----------|--------------------------------------------------------|
| remove()    |           |          | Xóa khỏi node cha, lúc này parentNode trở về undefined |

<!-- ### static property -->

<!-- ### static method -->


## class XMLDeclaretionNode

### property

| Thuộc tính | Kiểu       | Tùy chọn | Chú thích                                                 |
|------------|------------|----------|-----------------------------------------------------------|
| parentNode | XMLElement |          | Node cha, chỉ nên đọc, thay đổi nhờ các hàm thêm, loại bỏ |
| tagName    | String     |          | Kiểu tag                                                  |
| attributes | Object     |          | Các thuộc tính trong thẻ, dữ liệu thô chỉ nên đọc         |

### method

| Phương thức                             | Trả về  | Tùy chọn | Chú thích                                                           |
|-----------------------------------------|---------|----------|---------------------------------------------------------------------|
| getAttribute(name:String)               | Strinng |          | Lấy thuộc tính trong thẻ, (TODO:unscape)                            |
| setAttribute(name:String, value:String) |         |          | Thay đổi thuộc tính trong thẻ, name: chỉ có kí tự, số, dấu "_", "-" |
| removeAttribute(name:String)            |         |          | Xóa thuộc tính trong thẻ                                            |
| remove()                                |         |          | Xóa khỏi node cha, lúc này parentNode trở về undefined              |

## class XMLElement

### property

| Thuộc tính | Kiểu       | Tùy chọn | Chú thích                                                 |
|------------|------------|----------|-----------------------------------------------------------|
| parentNode | XMLElement |          | Node cha, chỉ nên đọc, thay đổi nhờ các hàm thêm, loại bỏ |
| tagName    | String     |          | Kiểu tag                                                  |
| attributes | Object     |          | Các thuộc tính trong thẻ, dữ liệu thô chỉ nên đọc         |
| childNodes | Array      |          | Danh sách các node con                                    |


### method

| Phương thức                              | Trả về  | Tùy chọn | Chú thích                                                                                                                                   |
|------------------------------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| getAttribute(name:String)                | Strinng |          | Lấy thuộc tính trong thẻ, (TODO:unscape)                                                                                                    |
| setAttribute(name:String, value:String)  |         |          | Thay đổi thuộc tính trong thẻ, name: chỉ có kí tự, số, dấu "_", "-"                                                                         |
| removeAttribute(name:String)             |         |          | Xóa thuộc tính trong thẻ                                                                                                                    |
| appendChild(node:XMLNode)                | XMLNode |          | Thêm node con vào cuối cùng, trả về chính node con đó                                                                                       |
| removeChild(child:XMLNode)               | XMLNode |          | Xóa node con, trả về node con nếu có node được bỏ ra, ngược lại trả undefined                                                               |
| inserBefore(node:XMLNode, child:XMLNode) | XMLNode |          | Thêm node vào trước vị trí child, nếu được thêm trả về node, ngược lại trả về undefined, không chạy nếu node==child hoặc child không là con |
| remove()                                 |         |          | Xóa khỏi node cha, lúc này parentNode trở về undefined                                                                                      |

