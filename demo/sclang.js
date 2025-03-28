
var code = `function foo(x){
        var i;
        var arr = [];
        var y, xz = 3, tm = fetch("https://absol.cf");

        var z = 1> 2? 3: 4;
        for i from 0 to 100 {
            arr.push(i);
        }
        console.log(arr);


        for x of fa(arr)
        {
        print(x %2 == 0? 1:0);
        }
        print(tm.text());
        for (var i = 0; i < 10; i++) {
        print(i);
        }
    }
foo(1,2 ,3);`;


var code1 = `function convert_checkins_to_logs(employeesIdList: linktype -48, timestart: Date, timeend: Date) {
    var worktime_checkinsCall;
    var shiftsCall;
    var assign_employee_shiftsCall;
    var loadDataSync;
    var shifts;
    var worktime_checkins;
    var assign_employee_shifts;
    var m;
    shiftsCall = sys.data.shifts.read();
    worktime_checkinsCall = sys.data.worktime_checkins.read(employeesIdList, timestart, timeend);
    assign_employee_shiftsCall = sys.data.assign_employee_shifts.read(employeesIdList, timestart, timeend);
    loadDataSync = new Array();
    loadDataSync.push(shiftsCall, worktime_checkinsCall, assign_employee_shiftsCall);
    libs.waitForResults(loadDataSync);
    shifts = shiftsCall.content;
    worktime_checkins = worktime_checkinsCall.content;
    assign_employee_shifts = assign_employee_shiftsCall.content;
    print(shifts, worktime_checkins, assign_employee_shifts);
    m =  a+1 ==5 && b+2==6;
       m =  a+1 ||5 && b+2==6;

}`;
code1 += `return (paysheetConfig.payroll_date.getTime() - start_date.getTime())/86400000/365*12;`;
/*for x of fa(arr) {
print(x);
}*/


var code2 = `
var a = 3, b = 4;
var x = a<3?1:2;
b = b+ 5;
print(b);
`
var code4 = `
for (x = 1; x < 10; ++x) {
print(x);
}



var xx =1, yx = 2
var z = 1;
var x3 = xx+ xy
print(x3);`;
function test(){
    var startTime = Date.now();
    var ins = absol.sclang.SCParser.parse(code2, 'program');
    var parseTime = Date.now() - startTime;
    console.log('parse time =', parseTime);
    // console.log(ins)
    if (ins.error) {
        console.log(ins);
        return;
    }
    console.log(ins.ast)

    var previewCode = absol.sclang.generateSCHighlightPreviewCode(ins.ast);

    absol._({
        props: {
            innerHTML: previewCode
        }
    }).addTo(document.body);
    var program = new absol.sclang.SCProgramInstance(ins.ast, {
        fa: Promise.resolve.bind(Promise),
        console: console,
        print: console.log.bind(console), fetch: fetch.bind(window),
        this: this
    });
    program.exec();
}
setTimeout(test,500);
