var SJSON = {};

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * 
 */
SJSON.compress = function (obj) {
    console.log(obj);

    obj.__sjson__ = obj.__sjson__ || [];

    var count = {};
    var result = {};

    function visit(o) {
        for (var key in o) {
            if (key == '__sjson__') continue;

            count[key] = (count[key] || 0) + 1;
            var value = o[key];

            if (typeof value == 'string') {
                count[value] = (count[value] || 0) + 1;
            }
            else if (value instanceof Array) {
                value.forEach(visit);
            }
            else if (typeof value == 'object') {
                visit(value);
            }
        }
    }

    visit(obj);
    console.log(count);
    
    return result;

};


SJSON.decompress = function (obj) {
    if (!obj.__sjson__) return obj;
    var dict = obj.__sjson__.reduce(function (ac, cr) {

    }, {});
};



var ip = {
    "tag": "LinearLayout",
    "attributes": {
        "name": "LinearLayout_1",
        "target": ""
    },
    "style": {
        "height": 1230,
        "width": 1406,
        "overflowY": "auto",
        "hAlign": "left",
        "vAlign": "top",
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0,
        "backgroundImage": ""
    },
    "children": [
        {
            "tag": "Label",
            "attributes": {
                "name": "Label_11",
                "text": "HỒ SƠ NHÂN VIÊN",
                "target": ""
            },
            "style": {
                "height": 39.09375,
                "width": "100%",
                "boxAlign": "centercenter",
                "font": "'Open Sans', sans-serif",
                "fontStyle": "Bold",
                "textSize": 30,
                "textColor": "black",
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 0
            }
        },
        {
            "tag": "ChainLayout",
            "attributes": {
                "name": "ChainLayout_36",
                "target": ""
            },
            "style": {
                "height": "auto",
                "width": "auto",
                "overflowY": "visible",
                "left": 0,
                "right": 0,
                "top": 30,
                "bottom": 20
            },
            "children": [
                {
                    "tag": "LinearLayout",
                    "attributes": {
                        "name": "LinearLayout_14",
                        "target": ""
                    },
                    "style": {
                        "height": "100%",
                        "width": 454,
                        "overflowY": "visible",
                        "left": 20,
                        "right": 0,
                        "top": 0,
                        "bottom": 0,
                        "vAlign": "top"
                    },
                    "children": [
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_43",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_45",
                                        "text": "Họ",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "fontStyle": "Regular",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_42",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_44",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_46",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_43",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_45",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_47",
                                        "text": "Mã số nhân viên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_44",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_46",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_48",
                                        "text": "Giới tính",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "ComboBox",
                                    "attributes": {
                                        "name": "ComboBox_0",
                                        "list": [
                                            {
                                                "text": "Nam",
                                                "value": "1"
                                            },
                                            {
                                                "text": "Nữ",
                                                "value": "2"
                                            }
                                        ],
                                        "value": "0",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 221,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_47",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_49",
                                        "text": "Ngày sinh",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_0",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 220,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_48",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_50",
                                        "text": "Mã số thuế cá nhân",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_47",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "LinearLayout",
                    "attributes": {
                        "name": "LinearLayout_13",
                        "target": ""
                    },
                    "style": {
                        "height": "100%",
                        "width": 454,
                        "overflowY": "visible",
                        "left": 20,
                        "right": 0,
                        "top": 0,
                        "bottom": 0,
                        "vAlign": "top"
                    },
                    "children": [
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_37",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_39",
                                        "text": "Bộ phận",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_36",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_38",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_40",
                                        "text": "Chức danh",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "ComboBox",
                                    "attributes": {
                                        "name": "ComboBox_7",
                                        "list": [
                                            {
                                                "text": "Giám đốc",
                                                "value": "0"
                                            },
                                            {
                                                "text": "Phó giám đốc",
                                                "value": "1"
                                            },
                                            {
                                                "text": "Trưởng phòng",
                                                "value": "2"
                                            },
                                            {
                                                "text": "Thư kí",
                                                "value": "3"
                                            },
                                            {
                                                "text": "Kế toán",
                                                "value": "4"
                                            },
                                            {
                                                "text": "Lính quèn",
                                                "value": "5"
                                            }
                                        ],
                                        "value": "0",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 292,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_39",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_41",
                                        "text": "Dân tộc",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "ComboBox",
                                    "attributes": {
                                        "name": "ComboBox_8",
                                        "list": [
                                            {
                                                "text": "Kinh",
                                                "value": "0"
                                            },
                                            {
                                                "text": "Ê-đê",
                                                "value": "1"
                                            },
                                            {
                                                "text": "Xê-đăng",
                                                "value": "2"
                                            },
                                            {
                                                "text": "H'Mông",
                                                "value": "3"
                                            },
                                            {
                                                "text": "Chăm",
                                                "value": "4"
                                            },
                                            {
                                                "text": "Ba-na",
                                                "value": "5"
                                            }
                                        ],
                                        "value": "0",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 292,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_40",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_42",
                                        "text": "Tôn giáo",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "ComboBox",
                                    "attributes": {
                                        "name": "ComboBox_9",
                                        "list": [
                                            {
                                                "text": "Không",
                                                "value": "0"
                                            },
                                            {
                                                "text": "Phật giáo",
                                                "value": "1"
                                            },
                                            {
                                                "text": "Công giáo",
                                                "value": "2"
                                            },
                                            {
                                                "text": "Hồi giáo",
                                                "value": "3"
                                            },
                                            {
                                                "text": "Kitô giáo",
                                                "value": "4"
                                            },
                                            {
                                                "text": "Tinh lành",
                                                "value": "5"
                                            }
                                        ],
                                        "value": "0",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 292,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_41",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": "100%",
                                "overflowY": "visible",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 15
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_43",
                                        "text": "Quốc tịch",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 162,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_40",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": "100%",
                                        "width": 291,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "RelativeLayout",
                    "attributes": {
                        "name": "RelativeLayout_1",
                        "target": ""
                    },
                    "style": {
                        "height": 235,
                        "width": 240,
                        "left": 0,
                        "right": 0,
                        "top": 0,
                        "bottom": 0,
                        "vAlign": "top"
                    },
                    "children": [
                        {
                            "tag": "Image",
                            "attributes": {
                                "name": "Image_0",
                                "src": "https://www.w3schools.com/howto/img_avatar.png",
                                "target": ""
                            },
                            "style": {
                                "height": 164,
                                "width": 135,
                                "left": 52.5,
                                "right": 52.5,
                                "top": 33,
                                "bottom": 38,
                                "vAlign": "center",
                                "hAlign": "center"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "tag": "LinearLayout",
            "attributes": {
                "name": "LinearLayout_3",
                "target": ""
            },
            "style": {
                "height": "auto",
                "width": "auto",
                "overflowY": "visible",
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 30
            },
            "children": [
                {
                    "tag": "Label",
                    "attributes": {
                        "name": "Label_25",
                        "text": "Giấy tờ tùy thân",
                        "target": ""
                    },
                    "style": {
                        "height": 15,
                        "width": 217,
                        "boxAlign": "lefttop",
                        "font": "'Open Sans', sans-serif",
                        "fontStyle": "Bold",
                        "textSize": 0,
                        "textColor": "black",
                        "left": 10,
                        "right": 0,
                        "top": 0,
                        "bottom": 0
                    }
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_24",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "100%",
                        "overflowY": "visible",
                        "left": 0,
                        "right": 0,
                        "top": 13,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_9",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_26",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_12",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_10",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_27",
                                        "text": "Số",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 104,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_13",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 160,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_11",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_28",
                                        "text": "Ngày cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 68,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_1",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 158,
                                        "left": 0,
                                        "right": 2,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_12",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_29",
                                        "text": "Nơi cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_15",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_13",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_30",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 47,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_2",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 154,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_14",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": 250,
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_31",
                                        "text": "Ghi chú",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_17",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tag": "LinearLayout",
            "attributes": {
                "name": "LinearLayout_30",
                "target": ""
            },
            "style": {
                "height": "auto",
                "width": "auto",
                "overflowY": "visible",
                "left": 20,
                "right": 0,
                "top": 0,
                "bottom": 30
            },
            "children": [
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_53",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "auto",
                        "overflowY": "visible",
                        "left": 1,
                        "right": 0,
                        "top": 0,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "Label",
                            "attributes": {
                                "name": "Label_76",
                                "text": "Điện thoại",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 126,
                                "boxAlign": "leftcenter",
                                "textSize": 0,
                                "textColor": "black",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "ComboBox",
                            "attributes": {
                                "name": "ComboBox_16",
                                "list": [
                                    {
                                        "text": "Home",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Công ty",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Thường trú",
                                        "value": "2"
                                    }
                                ],
                                "value": "0",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 137.703125,
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "TextInput",
                            "attributes": {
                                "name": "TextInput_40",
                                "value": "",
                                "placeHolder": "",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 180,
                                "textType": "normal",
                                "textColor": "black",
                                "textSize": 0,
                                "textAlign": "left",
                                "font": "None",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "Button",
                            "attributes": {
                                "name": "Button_0",
                                "text": "",
                                "icon": "span.mdi.mdi-delete",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 30,
                                "colorTheme": "default",
                                "font": "none",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        }
                    ]
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_96",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "auto",
                        "overflowY": "visible",
                        "left": 1,
                        "right": 0,
                        "top": 0,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "Label",
                            "attributes": {
                                "name": "Label_132",
                                "text": "Điện thoại",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 126,
                                "boxAlign": "leftcenter",
                                "textSize": 0,
                                "textColor": "black",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "ComboBox",
                            "attributes": {
                                "name": "ComboBox_42",
                                "list": [
                                    {
                                        "text": "Home",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Công ty",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Thường trú",
                                        "value": "2"
                                    }
                                ],
                                "value": "0",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 137.703125,
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "TextInput",
                            "attributes": {
                                "name": "TextInput_78",
                                "value": "",
                                "placeHolder": "",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 180,
                                "textType": "normal",
                                "textColor": "black",
                                "textSize": 0,
                                "textAlign": "left",
                                "font": "None",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "Button",
                            "attributes": {
                                "name": "Button_18",
                                "text": "",
                                "icon": "span.mdi.mdi-delete",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 30,
                                "colorTheme": "default",
                                "font": "none",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        }
                    ]
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_97",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "auto",
                        "overflowY": "visible",
                        "left": 1,
                        "right": 0,
                        "top": 0,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "Label",
                            "attributes": {
                                "name": "Label_133",
                                "text": "Điện thoại",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 126,
                                "boxAlign": "leftcenter",
                                "textSize": 0,
                                "textColor": "black",
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "ComboBox",
                            "attributes": {
                                "name": "ComboBox_43",
                                "list": [
                                    {
                                        "text": "Home",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Công ty",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Thường trú",
                                        "value": "2"
                                    }
                                ],
                                "value": "0",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 137.703125,
                                "left": 0,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "TextInput",
                            "attributes": {
                                "name": "TextInput_79",
                                "value": "",
                                "placeHolder": "",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 180,
                                "textType": "normal",
                                "textColor": "black",
                                "textSize": 0,
                                "textAlign": "left",
                                "font": "None",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        },
                        {
                            "tag": "Button",
                            "attributes": {
                                "name": "Button_19",
                                "text": "",
                                "icon": "span.mdi.mdi-delete",
                                "target": ""
                            },
                            "style": {
                                "height": 30,
                                "width": 30,
                                "colorTheme": "default",
                                "font": "none",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 20,
                                "vAlign": "top"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "tag": "LinearLayout",
            "attributes": {
                "name": "LinearLayout_16",
                "target": ""
            },
            "style": {
                "height": "auto",
                "width": "auto",
                "overflowY": "visible",
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 30
            },
            "children": [
                {
                    "tag": "Label",
                    "attributes": {
                        "name": "Label_206",
                        "text": "Thông tin gia đình",
                        "target": ""
                    },
                    "style": {
                        "height": 15,
                        "width": 217,
                        "boxAlign": "lefttop",
                        "font": "'Open Sans', sans-serif",
                        "fontStyle": "Bold",
                        "textSize": 0,
                        "textColor": "black",
                        "left": 10,
                        "right": 0,
                        "top": 0,
                        "bottom": 0
                    }
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_18",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "100%",
                        "overflowY": "visible",
                        "left": 0,
                        "right": 0,
                        "top": 13,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_17",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_207",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_137",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_19",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_209",
                                        "text": "Ngày sinh",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 68,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_7",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 158,
                                        "left": 0,
                                        "right": 2,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_64"
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_265",
                                        "text": "Giới tính",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 68,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "ComboBox",
                                    "attributes": {
                                        "name": "ComboBox_18",
                                        "list": [
                                            {
                                                "text": "Nam",
                                                "value": "1"
                                            },
                                            {
                                                "text": "Nữ",
                                                "value": "2"
                                            }
                                        ],
                                        "value": "0",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 96.5625,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_20",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_210",
                                        "text": "Địa chỉ",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_139",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_22",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_212",
                                        "text": "Thành phố",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": "auto",
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_140",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 165,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_30",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_80",
                                        "text": "Quốc gia",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": "auto",
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_51",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 165,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_31",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_81",
                                        "text": "Quốc tịch",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": "auto",
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_52",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 165,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_32",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 19,
                                "right": 1,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_82",
                                        "text": "MST  cá nhân",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": "auto",
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_53",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 165,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "ChainLayout",
                            "attributes": {
                                "name": "ChainLayout_19"
                            },
                            "style": {
                                "height": 60,
                                "width": 204,
                                "overflowY": "visible",
                                "left": 1,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "CheckBox",
                                    "attributes": {
                                        "name": "CheckBox_3",
                                        "checked": false
                                    },
                                    "style": {
                                        "height": "match_parent",
                                        "width": "auto",
                                        "boxAlign": "leftcenter",
                                        "vAlign": "top",
                                        "hAlign": "left",
                                        "textHAlign": "center",
                                        "textVAlign": "center",
                                        "left": 0,
                                        "right": 11,
                                        "top": 1,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_128",
                                        "text": "Đã chết"
                                    },
                                    "style": {
                                        "height": 51,
                                        "width": 69,
                                        "boxAlign": "leftcenter",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 9,
                                        "bottom": 0,
                                        "vAlign": "top"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_19",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "100%",
                        "overflowY": "visible",
                        "left": 0,
                        "right": 0,
                        "top": 13,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_23",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_213",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_141",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_24",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_214",
                                        "text": "Số",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 104,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_142",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 160,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_25",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_215",
                                        "text": "Ngày cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 68,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_9",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 158,
                                        "left": 0,
                                        "right": 2,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_26",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_216",
                                        "text": "Nơi cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_143",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_27",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_217",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 47,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_10",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 154,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_28",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": 250,
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_218",
                                        "text": "Ghi chú",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_144",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "ChainLayout",
                    "attributes": {
                        "name": "ChainLayout_20",
                        "target": ""
                    },
                    "style": {
                        "height": "auto",
                        "width": "100%",
                        "overflowY": "visible",
                        "left": 0,
                        "right": 0,
                        "top": 13,
                        "bottom": 0
                    },
                    "children": [
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_29",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_219",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_145",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_30",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_220",
                                        "text": "Số",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 104,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_146",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 160,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_31",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_221",
                                        "text": "Ngày cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 68,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_11",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 158,
                                        "left": 0,
                                        "right": 2,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_32",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_222",
                                        "text": "Nơi cấp",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_147",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_33",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": "auto",
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_223",
                                        "text": "Tên",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 47,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "DateInput",
                                    "attributes": {
                                        "name": "DateInput_12",
                                        "value": null,
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 154,
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "LinearLayout",
                            "attributes": {
                                "name": "LinearLayout_34",
                                "target": ""
                            },
                            "style": {
                                "height": 60,
                                "width": 250,
                                "overflowY": "visible",
                                "left": 20,
                                "right": 0,
                                "top": 0,
                                "bottom": 0,
                                "vAlign": "top"
                            },
                            "children": [
                                {
                                    "tag": "Label",
                                    "attributes": {
                                        "name": "Label_224",
                                        "text": "Ghi chú",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 21,
                                        "width": 191,
                                        "boxAlign": "lefttop",
                                        "textSize": 0,
                                        "textColor": "black",
                                        "left": 0,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                },
                                {
                                    "tag": "TextInput",
                                    "attributes": {
                                        "name": "TextInput_148",
                                        "value": "",
                                        "placeHolder": "",
                                        "target": ""
                                    },
                                    "style": {
                                        "height": 30,
                                        "width": 224,
                                        "textType": "normal",
                                        "textColor": "black",
                                        "textSize": 0,
                                        "textAlign": "left",
                                        "font": "None",
                                        "left": 25,
                                        "right": 0,
                                        "top": 0,
                                        "bottom": 0
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "app": "ABSOL_FORM_EDITOR",
    "version": "0.5.1"
};

SJSON.compress(ip);


export default SJSON;