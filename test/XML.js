export default {
    testcase: [
        {
            code: '<!-- this is comment --><div readonly type="text" placeholder="Search..." onchange="foo(this)\\r\\n">inner text </div>'
        },
        {
            code: '<div id="test"><input readonly type="text" placeholder="Search..." onchange="foo(this)\\r\\n" /><script scr="./FOO.js"></script></div>'
        },
        {
            code:'<div style="display:none;" contenteditable>  <![CDATA[some stuff]]></div>'
        },
        {
            code:`
            <?xml
             version="version_number"
             encoding="encoding_declaration"
             standalone="standalone_status" ?><div style="display:none;" conte - nteditable>  <![CDATA[some stuff ]]></div>`
        },
        {
            code: `
<breakfast_menu>
<food>
<name>Belgian Waffles</name>
<price>$5.95</price>
<description>
Two of our famous Belgian Waffles with plenty of real maple syrup
</description>
<calories>650</calories>
</food>
<food>
<name>Strawberry Belgian Waffles</name>
<price>$7.95</price>
<description>
Light Belgian waffles covered with strawberries and whipped cream
</description>
<calories>900</calories>
</food>
<food>
<name>Berry-Berry Belgian Waffles</name>
<price>$8.95</price>
<description>
Light Belgian waffles covered with an assortment of fresh berries and whipped cream
</description>
<calories>900</calories>
</food>
<food>
<name>French Toast</name>
<price>$4.50</price>
<description>
Thick slices made from our homemade sourdough bread
</description>
<calories>600</calories>
</food>
<food>
<name>Homestyle Breakfast</name>
<price>$6.95</price>
<description>
Two eggs, bacon or sausage, toast, and our ever-popular hash browns
</description>
<calories>950</calories>
</food>
</breakfast_menu>
`
        },
        {
            code:`

            <?xml version="1.0" encoding="UTF-8" standalone="no" ?>

            <body>
            <div id="myLockModal" class="DOMElement_class_8" style="z-index: 101002; display: none;">This is first text node</div>
            <div id="myModal" class="DOMElement_class_7" style="z-index: 101001; display: none;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal0" class="DOMElement_class_7" style="z-index: 101000;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title0"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content0"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal1" class="DOMElement_class_7" style="z-index: 100001;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title1"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content1"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal2" class="DOMElement_class_7" style="z-index: 100002;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title2"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content2"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal3" class="DOMElement_class_7" style="z-index: 100003;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title3"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content3"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal4" class="DOMElement_class_7" style="z-index: 100004;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title4"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content4"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal5" class="DOMElement_class_7" style="z-index: 100005;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title5"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content5"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal6" class="DOMElement_class_7" style="z-index: 100006;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title6"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content6"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal7" class="DOMElement_class_7" style="z-index: 100007;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title7"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content7"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal8" class="DOMElement_class_7" style="z-index: 100008;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title8"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content8"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal9" class="DOMElement_class_7" style="z-index: 100009;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title9"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content9"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal10" class="DOMElement_class_7" style="z-index: 100010;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title10"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content10"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal11" class="DOMElement_class_7" style="z-index: 100011;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title11"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content11"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal12" class="DOMElement_class_7" style="z-index: 100012;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title12"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content12"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal13" class="DOMElement_class_7" style="z-index: 100013;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title13"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content13"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal14" class="DOMElement_class_7" style="z-index: 100014;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title14"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content14"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal15" class="DOMElement_class_7" style="z-index: 100015;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title15"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content15"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal16" class="DOMElement_class_7" style="z-index: 100016;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title16"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content16"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal17" class="DOMElement_class_7" style="z-index: 100017;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title17"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content17"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal18" class="DOMElement_class_7" style="z-index: 100018;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title18"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content18"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal19" class="DOMElement_class_7" style="z-index: 100019;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title19"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content19"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal20" class="DOMElement_class_7" style="z-index: 100020;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title20"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content20"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal21" class="DOMElement_class_7" style="z-index: 100021;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title21"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content21"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal22" class="DOMElement_class_7" style="z-index: 100022;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title22"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content22"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal23" class="DOMElement_class_7" style="z-index: 100023;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title23"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content23"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal24" class="DOMElement_class_7" style="z-index: 100024; display: none;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title24"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9" style="overflow: auto;">
                                                    <div id="modal-body-content24"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal25" class="DOMElement_class_7" style="z-index: 100025;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title25"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content25"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal26" class="DOMElement_class_7" style="z-index: 100026;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title26"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content26"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal27" class="DOMElement_class_7" style="z-index: 100027;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title27"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content27"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal28" class="DOMElement_class_7" style="z-index: 100028;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title28"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content28"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal29" class="DOMElement_class_7" style="z-index: 100029;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title29"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content29"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal30" class="DOMElement_class_7" style="z-index: 100030;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title30"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content30"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal31" class="DOMElement_class_7" style="z-index: 100031;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title31"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content31"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal32" class="DOMElement_class_7" style="z-index: 100032;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title32"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content32"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal33" class="DOMElement_class_7" style="z-index: 100033;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title33"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content33"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal34" class="DOMElement_class_7" style="z-index: 100034;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title34"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content34"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal35" class="DOMElement_class_7" style="z-index: 100035;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title35"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content35"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal36" class="DOMElement_class_7" style="z-index: 100036;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title36"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content36"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal37" class="DOMElement_class_7" style="z-index: 100037;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title37"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content37"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal38" class="DOMElement_class_7" style="z-index: 100038;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title38"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content38"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal39" class="DOMElement_class_7" style="z-index: 100039;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title39"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content39"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal40" class="DOMElement_class_7" style="z-index: 100040;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title40"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content40"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal41" class="DOMElement_class_7" style="z-index: 100041;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title41"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content41"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal42" class="DOMElement_class_7" style="z-index: 100042;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title42"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content42"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal43" class="DOMElement_class_7" style="z-index: 100043;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title43"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content43"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal44" class="DOMElement_class_7" style="z-index: 100044;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title44"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content44"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal45" class="DOMElement_class_7" style="z-index: 100045;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title45"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content45"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal46" class="DOMElement_class_7" style="z-index: 100046;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title46"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content46"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal47" class="DOMElement_class_7" style="z-index: 100047;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title47"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content47"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal48" class="DOMElement_class_7" style="z-index: 100048;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title48"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content48"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal49" class="DOMElement_class_7" style="z-index: 100049;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title49"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content49"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal50" class="DOMElement_class_7" style="z-index: 100050;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title50"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content50"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal51" class="DOMElement_class_7" style="z-index: 100051;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title51"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content51"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal52" class="DOMElement_class_7" style="z-index: 100052;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title52"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content52"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal53" class="DOMElement_class_7" style="z-index: 100053;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title53"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content53"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal54" class="DOMElement_class_7" style="z-index: 100054;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title54"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content54"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal55" class="DOMElement_class_7" style="z-index: 100055;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title55"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content55"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal56" class="DOMElement_class_7" style="z-index: 100056;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title56"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content56"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal57" class="DOMElement_class_7" style="z-index: 100057;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title57"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content57"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal58" class="DOMElement_class_7" style="z-index: 100058;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title58"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content58"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal59" class="DOMElement_class_7" style="z-index: 100059;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title59"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content59"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal60" class="DOMElement_class_7" style="z-index: 100060;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title60"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content60"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal61" class="DOMElement_class_7" style="z-index: 100061;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title61"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content61"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal62" class="DOMElement_class_7" style="z-index: 100062;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title62"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content62"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="myModal63" class="DOMElement_class_7" style="z-index: 100063;">
                <table border="0" align="center" style="margin: 0px auto;">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="modal-title63"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="DOMElement_class_9">
                                                    <div id="modal-body-content63"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
            <div id="DOMClass_invisible_div" style="visibility: hidden; position: fixed;"><img /></div>
            <div class="vchart-tooltip-higne">
                <div class="vchart-tooltip-anchor-container">
                    <div class="vchart-tooltip-anchor">
                        <div class="vchart-tooltip-container"></div>
                    </div>
                </div>
            </div>
            <div class="mainFrm" style="font: 16px Arial;">
                <div class="bodyFrm">
                    <div style="width: 100%; border: 1px solid rgb(170, 170, 170);">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td style="width: 50px; text-align: center; height: 10px;"><i class="material-icons"
                                            style="height: 30px; cursor: pointer; padding-right: 5px; color: black;">reorder</i>
                                    </td>
                                    <td>
                                        <div style="position: relative; max-height: 200px;">
                                            <div id="box_menutab"
                                                style="position: absolute; z-index: 1001; left: 0px; top: 25px; background-color: rgb(255, 255, 255); border: 1px solid rgb(214, 214, 214); border-radius: 3px; box-shadow: rgb(7, 7, 7) 2.8px 2.8px 12px 0px; visibility: hidden;">
                                                <table style="width: 100%; cursor: pointer;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; text-align: center; padding: 10px;">
                                                                <div style="display: inline-block;"><a target="_blank"
                                                                        href="http://lab.daithangminh.vn/home_co/bsc">
                                                                        <div align="center"
                                                                            style="height: 80px; background-color: rgb(255, 255, 255); width: 80px; border: 1px solid rgb(192, 192, 192); display: table-cell; vertical-align: middle;">
                                                                            <img src="../logo-bsc-1511.png" alt="Mục tiêu"
                                                                                style="max-height: 60px; max-width: 60px; margin-left: 10px; margin-right: 10px; cursor: pointer;" />
                                                                        </div>
                                                                    </a></div>
                                                            </td>
                                                            <td
                                                                style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">
                                                                <div style="display: inline-block;"><a target="_blank"
                                                                        href="http://lab.daithangminh.vn/home_co/salary">
                                                                        <div align="center"
                                                                            style="height: 80px; background-color: rgb(255, 255, 255); width: 80px; border: 1px solid rgb(192, 192, 192); display: table-cell; vertical-align: middle;">
                                                                            <img src="../logo-salarytek-1511.png" alt="Lương"
                                                                                style="max-height: 60px; max-width: 60px; margin-left: 10px; margin-right: 10px; cursor: pointer;" />
                                                                        </div>
                                                                    </a></div>
                                                            </td>
                                                            <td
                                                                style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">
                                                                <div style="display: inline-block;"><a target="_blank"
                                                                        href="http://lab.daithangminh.vn/home_co/jd">
                                                                        <div align="center"
                                                                            style="height: 80px; background-color: rgb(255, 255, 255); width: 80px; border: 1px solid rgb(192, 192, 192); display: table-cell; vertical-align: middle;">
                                                                            <img src="../Logo-QuickJD.png" alt="Mô tả CV"
                                                                                style="max-height: 60px; max-width: 60px; margin-left: 10px; margin-right: 10px; cursor: pointer;" />
                                                                        </div>
                                                                    </a></div>
                                                            </td>
                                                            <td
                                                                style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 10px; padding-right: 10px;">
                                                                <div style="display: inline-block;"><a>
                                                                        <div align="center"
                                                                            style="vertical-align: middle; height: 80px; width: 80px; border: 1px solid rgb(192, 192, 192); background-color: rgba(0, 0, 0, 0.3); display: table-cell;">
                                                                            <img src="../logo-card-15-11.png" alt="Giao việc"
                                                                                style="max-height: 60px; max-width: 60px; margin-left: 10px; margin-right: 10px; cursor: pointer;" />
                                                                        </div>
                                                                    </a></div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center"
                                                                style="text-align: center; cursor: pointer; text-decoration: underline; white-space: nowrap; padding-bottom: 20px;">
                                                                <a target="_blank" href="http://lab.daithangminh.vn/home_co/bsc"
                                                                    style="color: black;">Mục tiêu</a></td>
                                                            <td align="center"
                                                                style="text-align: center; cursor: pointer; text-decoration: underline; white-space: nowrap; padding-bottom: 20px;">
                                                                <a target="_blank"
                                                                    href="http://lab.daithangminh.vn/home_co/salary"
                                                                    style="color: black;">Lương</a></td>
                                                            <td align="center"
                                                                style="text-align: center; cursor: pointer; text-decoration: underline; white-space: nowrap; padding-bottom: 20px;">
                                                                <a target="_blank" href="http://lab.daithangminh.vn/home_co/jd"
                                                                    style="color: black;">Mô tả CV</a></td>
                                                            <td
                                                                style="cursor: pointer; text-decoration: underline; color: rgb(122, 122, 122); white-space: nowrap; padding-bottom: 20px; text-align: center;">
                                                                <span>Giao việc</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="border-left: 1px solid rgb(170, 170, 170); height: 50px; width: 20px;"></td>
                                    <td
                                        style="text-align: center; padding-top: 10px; padding-bottom: 10px; height: 50px; width: 30px;">
                                        <img id="company_logo_img" src="logo-bsc2kpi.png" style="max-height: 30px;"></td>
                                    <td style="border-right: 1px solid rgb(170, 170, 170); height: 50px; width: 20px;"></td>
                                    <td id="title_page_init"
                                        style="display: none; color: black; font: bold 16px Helvetica, Arial, sans-serif; white-space: nowrap; text-align: left; height: 40px; vertical-align: middle; padding-left: 10px;">
                                        undefined</td>
                                    <td style="height: 40px; padding-left: 10px;">
                                        <div class="absol-hmenu">
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu"></div>
                                                </div><button class="absol-hmenu-button">Tổng quan</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 3.83817em;">Scorecard</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 0.232143em;">Bản đồ chiến lược</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    Ma
                                                                    trận chức năng</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">BSC</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    Đề
                                                                    xuất mục tiêu</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 0.5em;">Đề
                                                                    xuất kết quả</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">Đề xuất</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 4.72879em;">Duyệt mục tiêu</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    Duyệt kế hoạch thực hiện</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 5.22768em;">Duyệt kết quả</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 0.612723em;">Duyệt kế hoạch báo cáo
                                                                </div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">Duyệt</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 17.1239em;">KPI</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 10.8962em;">Bộ phận, cá nhân</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    So
                                                                    sánh mục tiêu theo bộ phận, nhân viên</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 6.89621em;">So sánh mục tiêu theo KPI
                                                                </div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 13.7344em;">Chi tiết KPI</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 14.5112em;">Hiệu suất</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 4.39063em;">Hiệu suất và năng lực nhân
                                                                    viên
                                                                </div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 10.5179em;">Định vị tăng lương</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 12.7991em;">Ánh xạ hồ sơ</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 12.7879em;">Cập nhật KPI</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">Báo cáo</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 3.16853em;">Hồ sơ BSC</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 5.38058em;">Chỉ số</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 1.5971em;">Công thức tính</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 3.78571em;">Viễn cảnh</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    Sơ
                                                                    đồ trách nhiệm</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">Danh mục</button>
                                            </div>
                                            <div class="absol-drop-hidden absol-dropdown">
                                                <div class="absol-dropdown-content">
                                                    <div class="absol-vmenu">
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 7.39397em;">Người dùng</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-vmenu-line">
                                                            <div></div>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 8.60826em;">Tùy chọn</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text" style="margin-right: 0em;">
                                                                    Mở
                                                                    khóa kế hoạch thực hiện</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                        <div class="absol-drop-hidden absol-dropright">
                                                            <div class="absol-dropright-content">
                                                                <div class="absol-vmenu"></div>
                                                            </div><button class="absol-vmenu-button">
                                                                <div class="absol-vmenu-button-text"
                                                                    style="margin-right: 3.82366em;">Sao lưu và phục hồi</div>
                                                                <div class="absol-vmenu-button-key"></div><i
                                                                    class="absol-vmenu-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><button class="absol-hmenu-button">Hệ thống</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td align="right" style="width: 208px; padding-right: 220px;">
                                        <table align="left">
                                            <tbody>
                                                <tr>
                                                    <td><i class="material-icons"
                                                            style="font-size: 30px; color: rgb(146, 146, 146); cursor: pointer;">comment</i>
                                                    </td>
                                                    <td>
                                                        <div style="position: relative; max-height: 200px;">
                                                            <div id="box_message"
                                                                style="position: absolute; right: 5px; top: 10px; background-color: rgb(255, 255, 255); border: 1px solid rgb(214, 214, 214); z-index: 1001; border-radius: 3px; box-shadow: rgb(0, 2, 80) 0px 6px 12px; visibility: hidden;">
                                                                <div class="absol-scroller bsc-theme limited-height disabled"
                                                                    style="max-height: 300px;">
                                                                    <div class="absol-vscroller-viewport">
                                                                        <table style="width: 100%; cursor: pointer;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style="white-space: nowrap; padding-left: 10px; padding-right: 10px; font-size: 12px; height: 30px; vertical-align: middle;">
                                                                                        Không có thông báo nào!</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div class="absol-scrollbar-container vertical">
                                                                        <div class="absol-scrollbar absol-hidden">
                                                                            <div class="absol-scrollbar-button"
                                                                                style="height: 100%; top: 0%;"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="width: 10px;"></td>
                                                    <td><i class="material-icons"
                                                            style="font-size: 30px; color: rgb(122, 122, 122);">help</i></td>
                                                    <td style="width: 10px;"></td>
                                                    <td>
                                                        <div>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><i class="material-icons DOMElement_class_0"
                                                                                style="font-size: 40px; cursor: pointer;">account_circle</i>
                                                                        </td>
                                                                        <td><span class="DOMElement_class_0"
                                                                                style="margin-left: 10px;">thien</span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="DOMElement_class_1" style="z-index: 10000;">
                                                            <div class="DOMElement_class_2"
                                                                style="position: absolute; right: 100%;">
                                                                <table style="border: 0px;">
                                                                    <tr
                                                                        style="background-color: white; border: 0px; cursor: pointer; color: rgb(122, 122, 122);">
                                                                        <td class="DOMElement_class_4 DOMElement_class_6"
                                                                            style="border: 0px;"><i class="material-icons"
                                                                                style="font-size: 20px;">person</i></td>
                                                                        <td class="DOMElement_class_4 DOMElement_class_6"
                                                                            style="border: 0px; text-align: left; white-space: nowrap;">
                                                                            Hồ sơ cá nhân</td>
                                                                    </tr>
                                                                    <tr
                                                                        style="background-color: white; border: 0px; cursor: pointer; color: rgb(122, 122, 122);">
                                                                        <td class="DOMElement_class_4 DOMElement_class_6"
                                                                            style="border: 0px;"><i class="material-icons"
                                                                                style="font-size: 20px;">arrow_forward</i></td>
                                                                        <td class="DOMElement_class_4 DOMElement_class_6"
                                                                            style="border: 0px; text-align: left; white-space: nowrap;">
                                                                            Đăng xuất</td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="height: 10px; background-color: rgb(247, 246, 246);"></div>
                    <div style="background-color: rgb(247, 246, 246);">
                        <div class="resetClass" style="width: 1px; height: 891px;">
                            <div style="position: absolute;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td valign="top" style="width: 1px; height: 34px;">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="btn-group DOMElement_class_6"
                                                                    style="white-space: nowrap; display: inline-block; border-radius: 4px 4px 0px 0px;">
                                                                    <button type="button"
                                                                        class="btn btn-info DOMElement_class_6"
                                                                        style="border-radius: 4px 0px 0px;">Tổng
                                                                        quan</button><button type="button"
                                                                        class="btn btn-info DOMElement_class_6"
                                                                        style="border-radius: 0px 4px 0px 0px; width: 16px; padding: 6px 0px;"><span
                                                                            style="color: rgb(170, 170, 170); font-weight: bold;">x</span></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" style="width: 1px; height: 853px;">
                                                <div
                                                    style="border: 1px solid rgb(221, 221, 221); border-radius: 0px 4px 0px 0px; width: 1px; height: 853px;">
                                                    <div class="resetClass"
                                                        style="display: block; overflow: auto; height: 853px;">
                                                        <div
                                                            style="width: calc(100vw - 20px); padding-left: 20px; padding-right: 10px; background-color: white;">
                                                            <table style="width: 100%; height: 100%;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            style="height: calc(100vh - 150px); vertical-align: top;">
                                                                            <div class="absol-context-hinge"><textarea
                                                                                    class="absol-context-menu-hook"></textarea>
                                                                                <div class="absol-vmenu absol-context-menu">
                                                                                </div>
                                                                            </div>
                                                                            <div class="dashboard">
                                                                                <div class="dashboard-header">
                                                                                    <div class="dashboard-header-button"
                                                                                        style="min-width: 110px; height: 30px; border: 1px solid rgb(192, 192, 192); color: rgb(0, 0, 0); border-radius: 3px; display: inline-block; cursor: pointer;">
                                                                                        <table
                                                                                            style="width: 100%; height: 28px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="width: 30px; height: 28px; text-align: center; border-right: 1px solid rgb(192, 192, 192); background-color: rgb(214, 214, 214); padding-top: 3px;">
                                                                                                        <i class="material-icons DOMElement_class_0"
                                                                                                            style="font-size: 16px; color: rgb(146, 146, 146); width: 30px; text-align: center;">clear</i>
                                                                                                    </td>
                                                                                                    <td align="center"
                                                                                                        style="background-color: rgb(235, 235, 235); padding-right: 10px; height: 28px; padding-left: 5px; white-space: nowrap;">
                                                                                                        Đóng</td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                    <div class="dashboard-header-button"
                                                                                        style="min-width: 110px; height: 30px; border: 1px solid rgb(192, 192, 192); color: rgb(0, 0, 0); border-radius: 3px; display: inline-block; cursor: pointer;">
                                                                                        <table
                                                                                            style="width: 100%; height: 28px;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="width: 30px; height: 28px; text-align: center; border-right: 1px solid rgb(192, 192, 192); background-color: rgb(214, 214, 214); padding-top: 3px;">
                                                                                                        <i class="material-icons DOMElement_class_0"
                                                                                                            style="font-size: 16px; color: rgb(146, 146, 146); width: 30px; text-align: center;">add</i>
                                                                                                    </td>
                                                                                                    <td align="center"
                                                                                                        style="background-color: rgb(235, 235, 235); padding-right: 10px; height: 28px; padding-left: 5px; white-space: nowrap;">
                                                                                                        Thêm</td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="dashboard-grid-chart-blocks">
                                                                                    <div class="dashboard-block x1">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2019/01/01 -
                                                                                                        2019/03/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <table
                                                                                                    class="dashboard-chart-metter"
                                                                                                    style="">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                style="height: 40px;">
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style="vertical-align: top; padding-top: 35px; padding-left: 5px;">
                                                                                                                                70
                                                                                                                            </td>
                                                                                                                            <td>
                                                                                                                                <div
                                                                                                                                    style="position: relative; width: 222px; height: 130px; overflow: hidden;">
                                                                                                                                    <div
                                                                                                                                        style="position: absolute; z-index: 1;">
                                                                                                                                        <img width="222"
                                                                                                                                            height="222"
                                                                                                                                            src="data:image/png;base64,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J8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCeA4FmPIP5DAAIQgICIAIInwoQRBCAAAQhYJ4DgWY8g/kMAAhCAgIgAgifChBEEIAABCFgngOBZjyD+QwACEICAiACCJ8KEEQQgAAEIWCfw/wHiDgkpaC6gLQAAAABJRU5ErkJggg==">
                                                                                                                                    </div>
                                                                                                                                    <div
                                                                                                                                        style="position: absolute; z-index: 2; transform: rotate(-33.3409deg); width: 222px; height: 222px;">
                                                                                                                                        <table
                                                                                                                                            style="border: 0px; padding: 0px;">
                                                                                                                                            <tbody>
                                                                                                                                                <tr
                                                                                                                                                    style="border: 0px; padding: 0px;">
                                                                                                                                                    <td align="center"
                                                                                                                                                        valign="center"
                                                                                                                                                        style="border: 0px; padding: 0px; width: 222px; height: 222px;">
                                                                                                                                                        <img src="../images/needle.png"
                                                                                                                                                            width="200"
                                                                                                                                                            height="200">
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                            </tbody>
                                                                                                                                        </table>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style="vertical-align: top; padding-top: 35px; padding-right: 5px;">
                                                                                                                                90
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                style="font-weight: bold;">
                                                                                                                74.44%</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Thực
                                                                                                                                hiện
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Mục
                                                                                                                                tiêu
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Tối
                                                                                                                                thiểu
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Tối
                                                                                                                                đa
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                8,878.44
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                8,055.00
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                8,055.00
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                9,666.00
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td colspan="4"
                                                                                                                                style="font-size: 4px; height: 5px;">
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block x2">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2018/01/01 -
                                                                                                        2018/12/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <svg version="1.1"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    class="range-chart base-chart o-stick-chart"
                                                                                                    width="600" height="320"
                                                                                                    viewBox="0 0 600 320">
                                                                                                    <g class="vchart-axis"
                                                                                                        id="axis"
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path id="oy-arrow"
                                                                                                            d="m-5 0h10l-5-6.8z"
                                                                                                            transform="translate(0, -149)">
                                                                                                        </path>
                                                                                                        <path id="ox-arrow"
                                                                                                            d="m0 -5v10l6.8 -5z"
                                                                                                            transform="translate(479.65625, 0)">
                                                                                                        </path>
                                                                                                        <path id="oxy"
                                                                                                            d="m0 -149v149 h479.65625"
                                                                                                            style="fill:none">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                    <mask
                                                                                                        id="contentMask08704205119737114">
                                                                                                        <rect id="maskRect"
                                                                                                            x="110.34375" y="10"
                                                                                                            width="489.65625"
                                                                                                            height="310"
                                                                                                            fill="white"></rect>
                                                                                                    </mask>
                                                                                                    <g id="contentBox"
                                                                                                        mask="url(#contentMask08704205119737114)">
                                                                                                        <g id="content"
                                                                                                            transform="translate(110.34375,205)">
                                                                                                            <g
                                                                                                                transform="translate(44.5234375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">1-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,932.84</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">2-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,477.48</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">3-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,939.24</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">4-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,021.96</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">5-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,123.78</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">6-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,776.49</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">7-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,857.88</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">8-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.1875"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,652.01</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">9-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,752.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">10-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,248.54</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">11-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,690.37</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">12-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,278.89</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(44.5234375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-79.84164656616758"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-49.10465616170488"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-80.27383852669153"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-85.85700167728935"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-25.23041018524445"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-69.28820182714077"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-74.78157052650641"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-128.38558437297294"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-67.63470504864418"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-101.15119525530967"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-63.475201355578044"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-103.20035181710746"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g class="range-chart-note"
                                                                                                        transform="translate(0, 227)">
                                                                                                        <path d="m0 12h20"
                                                                                                            class="range-chart-limit-line max">
                                                                                                        </path><text x="50"
                                                                                                            y="17">Tối đa</text>
                                                                                                        <path d="m0 34h20"
                                                                                                            class="range-chart-limit-line mid">
                                                                                                        </path><text x="50"
                                                                                                            y="39">Mục
                                                                                                            tiêu</text>
                                                                                                        <path d="m0 56h20"
                                                                                                            class="range-chart-limit-line min">
                                                                                                        </path><text x="50"
                                                                                                            y="61">Tối
                                                                                                            thiểu</text>
                                                                                                        <circle cx="10" cy="78"
                                                                                                            r="6"
                                                                                                            class="range-chart-value-plot">
                                                                                                        </circle><text x="50"
                                                                                                            y="83">Kết
                                                                                                            quả</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <text x="-33.671875"
                                                                                                            y="5">0.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-11.875">8,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-28.75">8,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-45.625">8,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-62.5">8,750.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-79.375">9,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-96.25">9,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-113.125">9,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-130">9,750.00</text>
                                                                                                    </g><text x="110.34375"
                                                                                                        y="40"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="597" y="196"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="300" y="19"
                                                                                                        class="base-chart-title"
                                                                                                        text-anchor="middle"></text>
                                                                                                    <g class="vchart-scroll-arrow"
                                                                                                        transform="translate(117.34375, 137.5)">
                                                                                                        <g
                                                                                                            style="display: none;">
                                                                                                            <g class="vchart-scroll-arrow-left"
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(-.26164 0 0 .26164 20.762 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                        <g
                                                                                                            transform="translate(450.65625, 0)">
                                                                                                            <g
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(.26164 0 0 .26164 .23843 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -16.875h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -33.75h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -50.625h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -67.5h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -84.375h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -101.25h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -118.125h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -135h4">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                </svg></div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>Ban hành CĐVH cho các
                                                                                                        quy
                                                                                                        cách sản phẩm</span></p>
                                                                                                <p><span>2018/01/01 -
                                                                                                        2018/12/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <span>Không có quyền xem</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block x2">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2019/10/01 -
                                                                                                        2019/12/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <svg version="1.1"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    class="range-chart base-chart o-stick-chart"
                                                                                                    width="600" height="320"
                                                                                                    viewBox="0 0 600 320">
                                                                                                    <g class="vchart-axis"
                                                                                                        id="axis"
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path id="oy-arrow"
                                                                                                            d="m-5 0h10l-5-6.8z"
                                                                                                            transform="translate(0, -149)">
                                                                                                        </path>
                                                                                                        <path id="ox-arrow"
                                                                                                            d="m0 -5v10l6.8 -5z"
                                                                                                            transform="translate(479.65625, 0)">
                                                                                                        </path>
                                                                                                        <path id="oxy"
                                                                                                            d="m0 -149v149 h479.65625"
                                                                                                            style="fill:none">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                    <mask
                                                                                                        id="contentMask007494116020907549">
                                                                                                        <rect id="maskRect"
                                                                                                            x="110.34375" y="10"
                                                                                                            width="489.65625"
                                                                                                            height="310"
                                                                                                            fill="white"></rect>
                                                                                                    </mask>
                                                                                                    <g id="contentBox"
                                                                                                        mask="url(#contentMask007494116020907549)">
                                                                                                        <g id="content"
                                                                                                            transform="translate(110.34375,205)">
                                                                                                            <g
                                                                                                                transform="translate(44.5234375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">1-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,406.28</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">2-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,613.95</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">3-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,639.40</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">4-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,581.18</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">5-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,221.63</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">6-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.1875"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,754.21</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">7-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,368.25</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">8-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,271.10</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">9-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,128.44</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">10-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,122.56</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">11-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,099.97</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">12-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,170.40</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(44.5234375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-44.2986157500223"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-125.8169183767103"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-60.03427043755982"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-123.60435169710506"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-99.33498371388654"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-67.78397818810673"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-41.73187089102581"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-102.67422454350942"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-93.04446647474155"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-92.6481374076114"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-91.12316792608149"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-95.87721058179704"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g class="range-chart-note"
                                                                                                        transform="translate(0, 227)">
                                                                                                        <path d="m0 12h20"
                                                                                                            class="range-chart-limit-line max">
                                                                                                        </path><text x="50"
                                                                                                            y="17">Tối đa</text>
                                                                                                        <path d="m0 34h20"
                                                                                                            class="range-chart-limit-line mid">
                                                                                                        </path><text x="50"
                                                                                                            y="39">Mục
                                                                                                            tiêu</text>
                                                                                                        <path d="m0 56h20"
                                                                                                            class="range-chart-limit-line min">
                                                                                                        </path><text x="50"
                                                                                                            y="61">Tối
                                                                                                            thiểu</text>
                                                                                                        <circle cx="10" cy="78"
                                                                                                            r="6"
                                                                                                            class="range-chart-value-plot">
                                                                                                        </circle><text x="50"
                                                                                                            y="83">Kết
                                                                                                            quả</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <text x="-33.671875"
                                                                                                            y="5">0.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-11.875">8,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-28.75">8,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-45.625">8,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-62.5">8,750.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-79.375">9,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-96.25">9,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-113.125">9,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-130">9,750.00</text>
                                                                                                    </g><text x="110.34375"
                                                                                                        y="40"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="597" y="196"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="300" y="19"
                                                                                                        class="base-chart-title"
                                                                                                        text-anchor="middle"></text>
                                                                                                    <g class="vchart-scroll-arrow"
                                                                                                        transform="translate(117.34375, 137.5)">
                                                                                                        <g
                                                                                                            style="display: none;">
                                                                                                            <g class="vchart-scroll-arrow-left"
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(-.26164 0 0 .26164 20.762 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                        <g
                                                                                                            transform="translate(450.65625, 0)">
                                                                                                            <g
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(.26164 0 0 .26164 .23843 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -16.875h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -33.75h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -50.625h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -67.5h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -84.375h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -101.25h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -118.125h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -135h4">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                </svg></div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block x2">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2019/01/01 -
                                                                                                        2019/12/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <svg version="1.1"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    class="range-chart base-chart o-stick-chart"
                                                                                                    width="600" height="320"
                                                                                                    viewBox="0 0 600 320">
                                                                                                    <g class="vchart-axis"
                                                                                                        id="axis"
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path id="oy-arrow"
                                                                                                            d="m-5 0h10l-5-6.8z"
                                                                                                            transform="translate(0, -149)">
                                                                                                        </path>
                                                                                                        <path id="ox-arrow"
                                                                                                            d="m0 -5v10l6.8 -5z"
                                                                                                            transform="translate(479.65625, 0)">
                                                                                                        </path>
                                                                                                        <path id="oxy"
                                                                                                            d="m0 -149v149 h479.65625"
                                                                                                            style="fill:none">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                    <mask
                                                                                                        id="contentMask09138536612963186">
                                                                                                        <rect id="maskRect"
                                                                                                            x="110.34375" y="10"
                                                                                                            width="489.65625"
                                                                                                            height="310"
                                                                                                            fill="white"></rect>
                                                                                                    </mask>
                                                                                                    <g id="contentBox"
                                                                                                        mask="url(#contentMask09138536612963186)">
                                                                                                        <g id="content"
                                                                                                            transform="translate(110.34375,205)">
                                                                                                            <g
                                                                                                                transform="translate(44.5234375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">1-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,951.20</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">2-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,442.70</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">3-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,273.97</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">4-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,599.76</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">5-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,316.96</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">6-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,027.19</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">7-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,467.36</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">8-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,452.97</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">9-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,721.98</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">10-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,174.45</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">11-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">8,357.23</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625, 17)">
                                                                                                                <text x="0"
                                                                                                                    y="0"
                                                                                                                    style="text-anchor: middle;">12-2019</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="22"
                                                                                                                    class="range-char-note-value">9,666.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="44"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="66"
                                                                                                                    class="range-char-note-value">8,055.00</text><text
                                                                                                                    x="-23.515625"
                                                                                                                    y="88"
                                                                                                                    class="range-char-note-value">9,639.07</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(44.5234375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-81.08126946082564"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(133.5703125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-114.25718649664917"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(222.6171875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-102.86811323714468"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(311.6640625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-57.35886063820554"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(400.7109375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-38.26952417977715"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(489.7578125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-86.21020199506934"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(578.8046875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-48.42181160513567"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(667.8515625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-114.9507155388214"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(756.8984375,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-65.60868715528574"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(845.9453125,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-28.650424024670933"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(934.9921875,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-40.98793564353342"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                            <g
                                                                                                                transform="translate(1024.0390625,0)">
                                                                                                                <path
                                                                                                                    d="m0 -20.5875v-108.7425"
                                                                                                                    class="range-chart-range-line">
                                                                                                                </path>
                                                                                                                <path d="m0 0v0"
                                                                                                                    class="range-chart-range-line"
                                                                                                                    stroke-dasharray="2">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -129.32999999999998h20"
                                                                                                                    class="range-chart-limit-line max">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line mid">
                                                                                                                </path>
                                                                                                                <path
                                                                                                                    d="m-10 -20.5875h20"
                                                                                                                    class="range-chart-limit-line min">
                                                                                                                </path>
                                                                                                                <circle cx="0"
                                                                                                                    cy="-127.51233581583185"
                                                                                                                    r="6"
                                                                                                                    class="range-chart-value-plot">
                                                                                                                </circle><text
                                                                                                                    x="0"
                                                                                                                    y="-134.32999999999998"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">9,666.00</text><text
                                                                                                                    x="0"
                                                                                                                    y="-5.587499999999999"
                                                                                                                    class="range-chart-inline-value"
                                                                                                                    text-anchor="middle">8,055.00</text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g class="range-chart-note"
                                                                                                        transform="translate(0, 227)">
                                                                                                        <path d="m0 12h20"
                                                                                                            class="range-chart-limit-line max">
                                                                                                        </path><text x="50"
                                                                                                            y="17">Tối đa</text>
                                                                                                        <path d="m0 34h20"
                                                                                                            class="range-chart-limit-line mid">
                                                                                                        </path><text x="50"
                                                                                                            y="39">Mục
                                                                                                            tiêu</text>
                                                                                                        <path d="m0 56h20"
                                                                                                            class="range-chart-limit-line min">
                                                                                                        </path><text x="50"
                                                                                                            y="61">Tối
                                                                                                            thiểu</text>
                                                                                                        <circle cx="10" cy="78"
                                                                                                            r="6"
                                                                                                            class="range-chart-value-plot">
                                                                                                        </circle><text x="50"
                                                                                                            y="83">Kết
                                                                                                            quả</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <text x="-33.671875"
                                                                                                            y="5">0.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-11.875">8,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-28.75">8,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-45.625">8,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-62.5">8,750.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-79.375">9,000.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-96.25">9,250.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-113.125">9,500.00</text><text
                                                                                                            x="-57.03125"
                                                                                                            y="-130">9,750.00</text>
                                                                                                    </g><text x="110.34375"
                                                                                                        y="40"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="597" y="196"
                                                                                                        class="base-chart-oxy-text"></text><text
                                                                                                        x="300" y="19"
                                                                                                        class="base-chart-title"
                                                                                                        text-anchor="middle"></text>
                                                                                                    <g class="vchart-scroll-arrow"
                                                                                                        transform="translate(117.34375, 137.5)">
                                                                                                        <g
                                                                                                            style="display: none;">
                                                                                                            <g class="vchart-scroll-arrow-left"
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(-.26164 0 0 .26164 20.762 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                        <g
                                                                                                            transform="translate(450.65625, 0)">
                                                                                                            <g
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(.26164 0 0 .26164 .23843 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(110.34375,205)">
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -16.875h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -33.75h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -50.625h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -67.5h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -84.375h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -101.25h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -118.125h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -135h4">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                </svg></div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block x2">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2019/01/01 -
                                                                                                        2019/12/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <svg version="1.1"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    class="base-chart column-chart colunm-area-chart"
                                                                                                    width="600" height="320"
                                                                                                    viewBox="0 0 600 320">
                                                                                                    <g class="vchart-axis"
                                                                                                        id="axis"
                                                                                                        transform="translate(61.03125, 267)">
                                                                                                        <path id="oy-arrow"
                                                                                                            d="m-5 0h10l-5-6.8z"
                                                                                                            transform="translate(0, -217)">
                                                                                                        </path>
                                                                                                        <path id="ox-arrow"
                                                                                                            d="m0 -5v10l6.8 -5z"
                                                                                                            transform="translate(528.96875, 0)">
                                                                                                        </path>
                                                                                                        <path id="oxy"
                                                                                                            d="m0 -217v217 h528.96875"
                                                                                                            style="fill:none">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                    <mask
                                                                                                        id="contentMask06913237722405376">
                                                                                                        <rect id="maskRect"
                                                                                                            x="61.03125" y="10"
                                                                                                            width="528.96875"
                                                                                                            height="310"
                                                                                                            fill="white"></rect>
                                                                                                    </mask>
                                                                                                    <g id="contentBox"
                                                                                                        mask="url(#contentMask06913237722405376)">
                                                                                                        <g id="content"
                                                                                                            transform="translate(61.03125,267)">
                                                                                                            <text x="27.1796875"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">1-2019</text><text
                                                                                                                x="81.5390625"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">2-2019</text><text
                                                                                                                x="135.8984375"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">3-2019</text><text
                                                                                                                x="190.2578125"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">4-2019</text><text
                                                                                                                x="244.6171875"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">5-2019</text><text
                                                                                                                x="298.9765625"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">6-2019</text><text
                                                                                                                x="353.3359375"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">7-2019</text><text
                                                                                                                x="407.6953125"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">8-2019</text><text
                                                                                                                x="462.0546875"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">9-2019</text><text
                                                                                                                x="516.4140625"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">10-2019</text><text
                                                                                                                x="570.7734375"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">11-2019</text><text
                                                                                                                x="625.1328125"
                                                                                                                y="20"
                                                                                                                text-anchor="middle">12-2019</text>
                                                                                                            <path
                                                                                                                class="dualchart-area"
                                                                                                                d="M625.1328125 -1L27.1796875 -1L27.1796875 -183.80100000000002L81.5390625 -183.80100000000002L135.8984375 -183.80100000000002L190.2578125 -183.80100000000002L244.6171875 -183.80100000000002L298.9765625 -183.80100000000002L353.3359375 -183.80100000000002L407.6953125 -183.80100000000002L462.0546875 -183.80100000000002L516.4140625 -183.80100000000002L570.7734375 -183.80100000000002L625.1328125 -183.80100000000002z"
                                                                                                                style="fill: rgb(255, 204, 127); stroke: rgb(255, 204, 127);">
                                                                                                            </path>
                                                                                                            <path
                                                                                                                class="dualchart-area"
                                                                                                                d="M625.1328125 -1L27.1796875 -1L27.1796875 -25.1175L81.5390625 -25.1175L135.8984375 -25.1175L190.2578125 -25.1175L244.6171875 -25.1175L298.9765625 -25.1175L353.3359375 -25.1175L407.6953125 -25.1175L462.0546875 -25.1175L516.4140625 -25.1175L570.7734375 -25.1175L625.1328125 -25.1175z"
                                                                                                                style="fill: rgb(204, 204, 127); stroke: rgb(204, 204, 127);">
                                                                                                            </path>
                                                                                                            <path
                                                                                                                class="dualchart-area"
                                                                                                                d="M625.1328125 -1L27.1796875 -1L27.1796875 -25.1175L81.5390625 -25.1175L135.8984375 -25.1175L190.2578125 -25.1175L244.6171875 -25.1175L298.9765625 -25.1175L353.3359375 -25.1175L407.6953125 -25.1175L462.0546875 -25.1175L516.4140625 -25.1175L570.7734375 -25.1175L625.1328125 -25.1175z"
                                                                                                                style="fill: rgb(231, 228, 227); stroke: rgb(231, 228, 227);">
                                                                                                            </path>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(27.1796875, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-83.75437888424686"
                                                                                                                    width="25"
                                                                                                                    height="83.75437888424686">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-87.75437888424686"
                                                                                                                    text-anchor="middle">8,650.30</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(81.5390625, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-163.2815434079531"
                                                                                                                    width="25"
                                                                                                                    height="163.2815434079531">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-167.2815434079531"
                                                                                                                    text-anchor="middle">9,457.68</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(135.8984375, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-66.61404427216314"
                                                                                                                    width="25"
                                                                                                                    height="66.61404427216314">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-70.61404427216314"
                                                                                                                    text-anchor="middle">8,476.28</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(190.2578125, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-101.74523440230418"
                                                                                                                    width="25"
                                                                                                                    height="101.74523440230418">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-105.74523440230418"
                                                                                                                    text-anchor="middle">8,832.95</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(244.6171875, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-103.75005502412264"
                                                                                                                    width="25"
                                                                                                                    height="103.75005502412264">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-107.75005502412264"
                                                                                                                    text-anchor="middle">8,853.30</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(298.9765625, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-159.20178689698207"
                                                                                                                    width="25"
                                                                                                                    height="159.20178689698207">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-163.20178689698207"
                                                                                                                    text-anchor="middle">9,416.26</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(353.3359375, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-82.5485533317689"
                                                                                                                    width="25"
                                                                                                                    height="82.5485533317689">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-86.5485533317689"
                                                                                                                    text-anchor="middle">8,638.06</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(407.6953125, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-119.83047900617403"
                                                                                                                    width="25"
                                                                                                                    height="119.83047900617403">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-123.83047900617403"
                                                                                                                    text-anchor="middle">9,016.55</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(462.0546875, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-136.51081343774808"
                                                                                                                    width="25"
                                                                                                                    height="136.51081343774808">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-140.51081343774808"
                                                                                                                    text-anchor="middle">9,185.90</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(516.4140625, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-46.074840878702965"
                                                                                                                    width="25"
                                                                                                                    height="46.074840878702965">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-50.074840878702965"
                                                                                                                    text-anchor="middle">8,267.76</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(570.7734375, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-56.87718417215558"
                                                                                                                    width="25"
                                                                                                                    height="56.87718417215558">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-60.87718417215558"
                                                                                                                    text-anchor="middle">8,377.43</text>
                                                                                                            </g>
                                                                                                            <g class="column-chart-column"
                                                                                                                transform="translate(625.1328125, 0)">
                                                                                                                <rect x="-12.5"
                                                                                                                    y="-126.52798818358835"
                                                                                                                    width="25"
                                                                                                                    height="126.52798818358835">
                                                                                                                </rect><text
                                                                                                                    x="0"
                                                                                                                    y="-130.52798818358835"
                                                                                                                    text-anchor="middle">9,084.55</text>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(61.03125,267)">
                                                                                                        <text x="-10" y="5"
                                                                                                            text-anchor="end">0.00</text><text
                                                                                                            x="-10" y="-14.7"
                                                                                                            text-anchor="end">8,000.00</text><text
                                                                                                            x="-10" y="-34.4"
                                                                                                            text-anchor="end">8,200.00</text><text
                                                                                                            x="-10"
                                                                                                            y="-54.099999999999994"
                                                                                                            text-anchor="end">8,400.00</text><text
                                                                                                            x="-10" y="-73.8"
                                                                                                            text-anchor="end">8,600.00</text><text
                                                                                                            x="-10" y="-93.5"
                                                                                                            text-anchor="end">8,800.00</text><text
                                                                                                            x="-10"
                                                                                                            y="-113.19999999999999"
                                                                                                            text-anchor="end">9,000.00</text><text
                                                                                                            x="-10" y="-132.9"
                                                                                                            text-anchor="end">9,200.00</text><text
                                                                                                            x="-10" y="-152.6"
                                                                                                            text-anchor="end">9,400.00</text><text
                                                                                                            x="-10"
                                                                                                            y="-172.29999999999998"
                                                                                                            text-anchor="end">9,600.00</text><text
                                                                                                            x="-10" y="-192"
                                                                                                            text-anchor="end">9,800.00</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(61.03125,267)">
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 0h4"></path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -19.7h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -39.4h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -59.099999999999994h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -78.8h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -98.5h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -118.19999999999999h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -137.9h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -157.6h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -177.29999999999998h4">
                                                                                                        </path>
                                                                                                        <path
                                                                                                            class="vchart-segment-line"
                                                                                                            d="m-2 -197h4">
                                                                                                        </path>
                                                                                                    </g><text x="300" y="19"
                                                                                                        class="base-chart-title"
                                                                                                        text-anchor="middle"></text><text
                                                                                                        x="61.03125" y="30"
                                                                                                        class="base-chart-oxy-text"
                                                                                                        text-anchor="end"></text><text
                                                                                                        x="597" y="258"
                                                                                                        class="base-chart-oxy-text"></text>
                                                                                                    <g
                                                                                                        transform="translate(197, 317)">
                                                                                                        <rect x="0" y="-14"
                                                                                                            width="14"
                                                                                                            height="14"
                                                                                                            class="dualchart-note-rect"
                                                                                                            style="fill: rgb(255, 204, 127);">
                                                                                                        </rect><text x="17"
                                                                                                            y="0"
                                                                                                            class="dualchart-note-text">Tối
                                                                                                            đa</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(263.671875, 317)">
                                                                                                        <rect x="0" y="-14"
                                                                                                            width="14"
                                                                                                            height="14"
                                                                                                            class="dualchart-note-rect"
                                                                                                            style="fill: rgb(204, 204, 127);">
                                                                                                        </rect><text x="17"
                                                                                                            y="0"
                                                                                                            class="dualchart-note-text">Mục
                                                                                                            tiêu</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(342.34375, 317)">
                                                                                                        <rect x="0" y="-14"
                                                                                                            width="14"
                                                                                                            height="14"
                                                                                                            class="dualchart-note-rect"
                                                                                                            style="fill: rgb(231, 228, 227);">
                                                                                                        </rect><text x="17"
                                                                                                            y="0"
                                                                                                            class="dualchart-note-text">Tối
                                                                                                            thiểu</text>
                                                                                                    </g>
                                                                                                    <g
                                                                                                        transform="translate(122.3125, 317)">
                                                                                                        <rect x="0" y="-14"
                                                                                                            width="14"
                                                                                                            height="14"
                                                                                                            class="dualchart-note-rect"
                                                                                                            style="fill: rgb(123, 192, 247);">
                                                                                                        </rect><text x="17"
                                                                                                            y="0"
                                                                                                            class="dualchart-note-text">Kết
                                                                                                            quả</text>
                                                                                                    </g>
                                                                                                    <g class="vchart-scroll-arrow"
                                                                                                        transform="translate(68.03125, 168.5)">
                                                                                                        <g
                                                                                                            style="display: none;">
                                                                                                            <g class="vchart-scroll-arrow-left"
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(-.26164 0 0 .26164 20.762 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                        <g
                                                                                                            transform="translate(499.96875, 0)">
                                                                                                            <g
                                                                                                                transform="translate(0,-270)">
                                                                                                                <g transform="matrix(.26164 0 0 .26164 .23843 218.56)"
                                                                                                                    style="fill:#00a5d6">
                                                                                                                    <path
                                                                                                                        d="m0.99976 198 49.214 48.519-49.213 49.481v-14.201l35.215-35.079-35.164-34.611z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                    <path
                                                                                                                        d="m28.531 198.44v13.96l35.057 34.608-35.057 34.963v13.555l48.91-48.844z"
                                                                                                                        style="fill:#00a5d6">
                                                                                                                    </path>
                                                                                                                </g>
                                                                                                            </g>
                                                                                                            <rect x="-5" y="-5"
                                                                                                                width="30"
                                                                                                                height="37"
                                                                                                                rx="5" ry="5"
                                                                                                                style="fill: rgba(0, 0, 255, 0.1);">
                                                                                                            </rect>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </svg></div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dashboard-block x1">
                                                                                        <div class="dashboard-block-title">
                                                                                            <div
                                                                                                class="dashboard-block-title-text">
                                                                                                <p><span>KPI</span></p>
                                                                                                <p><span>Công ty</span></p>
                                                                                                <p><span>abc test
                                                                                                        22021117</span>
                                                                                                </p>
                                                                                                <p><span>2019/03/01 -
                                                                                                        2019/03/31</span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="dashboard-block-body">
                                                                                            <div
                                                                                                class="dashboard-chart-container">
                                                                                                <table
                                                                                                    class="dashboard-chart-metter"
                                                                                                    style="">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                style="height: 40px;">
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style="vertical-align: top; padding-top: 35px; padding-left: 5px;">
                                                                                                                                70
                                                                                                                            </td>
                                                                                                                            <td>
                                                                                                                                <div
                                                                                                                                    style="position: relative; width: 222px; height: 130px; overflow: hidden;">
                                                                                                                                    <div
                                                                                                                                        style="position: absolute; z-index: 1;">
                                                                                                                                        <img width="222"
                                                                                                                                            height="222"
                                                                                                                                            src="data:image/png;base64,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eCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcCCJ73COI/BCAAAQioCCB4KkwYQQACEICAdwIInvcI4j8EIAABCKgIIHgqTBhBAAIQgIB3Agie9wjiPwQgAAEIqAggeCpMGEEAAhCAgHcC/w9l+50LafbDswAAAABJRU5ErkJggg==">
                                                                                                                                    </div>
                                                                                                                                    <div
                                                                                                                                        style="position: absolute; z-index: 2; transform: rotate(-90deg); width: 222px; height: 222px;">
                                                                                                                                        <table
                                                                                                                                            style="border: 0px; padding: 0px;">
                                                                                                                                            <tbody>
                                                                                                                                                <tr
                                                                                                                                                    style="border: 0px; padding: 0px;">
                                                                                                                                                    <td align="center"
                                                                                                                                                        valign="center"
                                                                                                                                                        style="border: 0px; padding: 0px; width: 222px; height: 222px;">
                                                                                                                                                        <img src="../images/needle.png"
                                                                                                                                                            width="200"
                                                                                                                                                            height="200">
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                            </tbody>
                                                                                                                                        </table>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style="vertical-align: top; padding-top: 35px; padding-right: 5px;">
                                                                                                                                90
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                style="font-weight: bold;">
                                                                                                                58.20%</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td align="center">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Thực
                                                                                                                                hiện
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Mục
                                                                                                                                tiêu
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Tối
                                                                                                                                thiểu
                                                                                                                            </td>
                                                                                                                            <td align="center"
                                                                                                                                style="height: 40px; padding: 5px;">
                                                                                                                                Tối
                                                                                                                                đa
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                9,401.76
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                8,055.00
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                8,055.00
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                align="center">
                                                                                                                                9,666.00
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td colspan="4"
                                                                                                                                style="font-size: 4px; height: 5px;">
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            class="dashboard-block-setting-button-container absol-select-none">
                                                                                            <div class="DOMElement_class_1 dashboard-chart-block-choicelist"
                                                                                                style="z-index: 10000;">
                                                                                                <div class="DOMElement_class_2"
                                                                                                    style="position: absolute; right: 100%;">
                                                                                                    <table style="border: 0px;">
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">settings</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Thiết lập</td>
                                                                                                        </tr>
                                                                                                        <tr
                                                                                                            style="background-color: white; border: 0px; cursor: pointer; color: rgb(146, 146, 146);">
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px;">
                                                                                                                <i class="material-icons"
                                                                                                                    style="font-size: 20px;">delete</i>
                                                                                                            </td>
                                                                                                            <td class="DOMElement_class_4 DOMElement_class_6"
                                                                                                                style="border: 0px; text-align: left; white-space: nowrap;">
                                                                                                                Xóa</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div><i
                                                                                                    class="material-icons DOMElement_class_0"
                                                                                                    style="font-size: 20px; cursor: pointer;">more_vert</i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div><img src="" class="absol-attachhook"
                                                                                style="display: none;">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div style="background-color: rgb(247, 246, 246);">
                                                                                <table style="height: 30px; width: 100%;">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 20px;"></td>
                                                                                            <td>
                                                                                                <table style="width: 100%;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>Copyright ©
                                                                                                                2018,
                                                                                                                SoftAView
                                                                                                                Company,
                                                                                                                All rights
                                                                                                                reserved
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td style="width: 10px;"></td>
                                                                                            <td align="right"
                                                                                                style="width: 150px;">
                                                                                                <table>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="white-space: nowrap;">
                                                                                                                <a
                                                                                                                    style="cursor: pointer;">Giới
                                                                                                                    thiệu</a>
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style="white-space: nowrap; padding-left: 10px;">
                                                                                                                <a
                                                                                                                    style="cursor: pointer;">Liên
                                                                                                                    hệ</a></td>
                                                                                                            <td
                                                                                                                style="white-space: nowrap; padding-left: 10px;">
                                                                                                                <a
                                                                                                                    style="cursor: pointer;">Điều
                                                                                                                    khoản dịch
                                                                                                                    vụ</a></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td style="width: 20px;"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="width: 100vw; height: calc(100vh - 70px);"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="EYKypYZ-1554890401086" class="" style="display: block !important;"><iframe id="nRLCJJc-1554890401087"
                    src="about:blank" frameborder="0" scrolling="no" title="chat widget" class="open"
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: auto !important; right: auto !important; bottom: auto !important; left: auto !important; position: static !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 350px !important; z-index: 999999 !important; cursor: auto !important; float: none !important; border-radius: unset !important; height: 444px !important; display: none !important;"></iframe><iframe
                    id="pZ5YRAn-1554890401087" src="about:blank" frameborder="0" scrolling="no" title="chat widget" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; position: fixed !important; border: 0px !important; padding: 0px !important; transition-property: none !important; z-index: 1000001 !important; cursor: auto !important; float: none !important; height: 52px !important; min-height: 52px !important; max-height: 52px !important; width: 200px !important; min-width: 200px !important; max-width: 200px !important; border-radius: 0px !important; transform: rotate(0deg) translateZ(0px) !important; transform-origin: 0px center !important; margin: 0px !important; top: 0px !important; bottom: auto !important; right: 10px !important; left: auto !important; display: block !important;"></iframe><iframe
                    id="KMIaMlU-1554890401087" src="about:blank" frameborder="0" scrolling="no" title="chat widget" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; position: fixed !important; border: 0px !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; display: none !important; z-index: 1000003 !important; cursor: auto !important; float: none !important; border-radius: unset !important; top: 0px !important; bottom: auto !important; right: 1px !important; left: auto !important; width: 21px !important; max-width: 21px !important; min-width: 21px !important; height: 21px !important; max-height: 21px !important; min-height: 21px !important;"></iframe>
                <div class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: auto !important; bottom: auto !important; left: 0px !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 100% !important; height: 100% !important; display: none !important; z-index: 1000001 !important; cursor: move !important; float: left !important; border-radius: unset !important;">
                </div>
                <div id="kDKCppK-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: auto !important; bottom: auto !important; left: 0px !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 6px !important; height: 100% !important; display: block !important; z-index: 999998 !important; cursor: w-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="D9AHjEq-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: 0px !important; bottom: auto !important; left: auto !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 6px !important; height: 100% !important; display: block !important; z-index: 999998 !important; cursor: e-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="vThNMjO-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: 0px !important; bottom: auto !important; left: auto !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 100% !important; height: 6px !important; display: block !important; z-index: 999998 !important; cursor: n-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="oGENV8U-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: auto !important; right: 0px !important; bottom: 0px !important; left: auto !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 100% !important; height: 6px !important; display: block !important; z-index: 999998 !important; cursor: s-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="Ek67Flh-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: auto !important; bottom: auto !important; left: 0px !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 12px !important; height: 12px !important; display: block !important; z-index: 999998 !important; cursor: nw-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="eaGq6xp-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: 0px !important; right: 0px !important; bottom: auto !important; left: auto !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 12px !important; height: 12px !important; display: block !important; z-index: 999998 !important; cursor: ne-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="v2n92LZ-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: auto !important; right: auto !important; bottom: 0px !important; left: 0px !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 12px !important; height: 12px !important; display: block !important; z-index: 999998 !important; cursor: sw-resize !important; float: none !important; border-radius: unset !important;">
                </div>
                <div id="cmftHyA-1554890401086" class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: auto !important; right: 0px !important; bottom: 0px !important; left: auto !important; position: absolute !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 12px !important; height: 12px !important; display: block !important; z-index: 999999 !important; cursor: se-resize !important; float: none !important; border-radius: unset !important;">
                </div><iframe id="FSS7swC-1554890401184" src="about:blank" frameborder="0" scrolling="no" title="chat widget"
                    class=""
                    style="outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; top: auto !important; right: 10px !important; bottom: 62px !important; left: auto !important; position: fixed !important; border: 0px !important; min-height: auto !important; min-width: auto !important; max-height: none !important; max-width: none !important; padding: 0px !important; margin: 0px !important; transition-property: none !important; transform: none !important; width: 378px !important; height: 886px !important; z-index: 999999 !important; cursor: auto !important; float: none !important; border-radius: unset !important; display: none !important;"></iframe>
            </div>
        </body>
            
            `
        }

    ]


}