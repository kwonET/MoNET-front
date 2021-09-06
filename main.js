/*---------------------*/
/*메뉴바를 위한 js 코드*/
/*---------------------*/
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    /*burger를 누르면 nav-active가 작동*/
    burger.addEventListener('click',() => {
        //Toggle Nav
        nav.classList.toggle('nav-active');
        
        //Animate Links
        navLinks.forEach((link,index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation=`navLinkFade 0.5s ease forwards ${index/7+0.7}s`;
            }
        });

        //Burger Animation
        burger.classList.toggle('toggle');
    });
    
}
navSlide();


//import { draw3d } from "./mviz";


math.import({ ndsolve,sigmoid,convolve,randseed,randn,randnm,hx_bold,gx_bold,hx_ca,gx_CaI,gx_fmri,fx_WC, splot,if_,save2csv,strcmpid})
math.config({randomSeed:0})
const sim = math.parser()

function print(value,mode=nodemode) {
  var precision = 14;var str=math.format(value, precision) ;
  if(!mode) document.write(str + '<br>');
  console.log(str);
}
function print2(cmd,value,mode=nodemode) {
  var precision = 14; var str=cmd + ' = ' + math.format(value, precision) ;
  if(!mode) document.write(str+ '<br>');
  console.log(str);
}
function eprint(value) {
  print2(value,sim.evaluate(value),true)
}

function isNumeric(str) {
  if (typeof str != "string") return false  
  return !isNaN(str) && !isNaN(parseFloat(str)) 
}

function array2text(ar) {
 let sz=ar.size(); ar=ar.toArray();
 let str='[';
 if(sz.length==1) {
  for(let i=0;i<sz[0];i++) {   
      str=str + ar[i]
      str=str + ','   
  }  
 } else {
  for(let i=0;i<sz[0];i++) {
    for(let j=0;j<sz[1];j++) {
      str=str + ar[i][j]
      if(j==sz[1]-1) str=str+';'
      else str=str + ','   
    }
  }  
}
  str=str.slice(0,str.length-1)+']';
  return str;
}

function save2csv(filename,rows0=null,titles=null) {
  if(rows0==null) { rows0 = [
    ['111', '222', '333'],
    ['aaa', 'bbb', 'ccc'],
    ['AAA', 'BBB', 'CCC']
  ];
}
  let rows=math.matrix(rows0.clone()).toArray();
  const ncol=rows[0].length;
  let data = "";
  const tableData = [];   //
  //title
  const titleData=[];
  if(titles!==null) for (const t of titles) titleData.push(t);
  else for(let i=0;i<ncol;i++) titleData.push(`X${i+1}`); 
  tableData.push(titleData.join(","));


  for (const row of rows) {
    const rowData = [];
    for (const column of row) {
      rowData.push(column);
    }
    tableData.push(rowData.join(","));
  }
  data += tableData.join("\n");
  
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function array2tex(ar,name=null) {
  let sz=ar.size(); ar=ar.toArray();
  let sch1,sch2;
  if (sz.length==1 || sz[1]==1) {sch1='['; sch2=']';
    //if(sz[0]>1) sch2=sch2+"^t";
  }
  else {
    sch1='('; sch2=')';
  }
  let str='$ ' ; if(name!==null) str=str+ name + ' = ';
  str=str + `\\left ${sch1} \\begin{matrix} `
  if (sz.length==1) {
    for(let i=0;i<ar.length;i++) {
      str=str + ar[i]
      str=str + ' & '   
    }
  } else {
   for(let i=0;i<sz[0];i++) {
     for(let j=0;j<sz[1];j++) {
       str=str + ar[i][j]
       if(j==sz[1]-1) str=str+'\\\\'
       else str=str + ' & '   
     }
   }
  }
  str=str.slice(0,str.length-2);
  let v=` \\end{matrix} \\right ${sch2} $`;
  str=str + v;
  return str;
}

function greek2tex(sname) 
{ let sname1=sname;
  let s=sname.split('_');
  if(s.length<=1){
    let gid=greek_dicts.indexOf(sname1.toLowerCase());
    if(gid>=0) sname1='\\'+sname1;
  } else {
    sname1='';
    for (let i=0;i<s.length;i++) {
      let gid=greek_dicts.indexOf(s[i].toLowerCase());
      if(gid>=0) sname1=sname1+'\\'+s[i];
      else sname1=sname1+s[i];
      if(i<s.length-1) sname1=sname1+'_';
    }
  }
  return sname1;
}

function text2array(pr)
{
  let v=Array();
  pr=pr.trim();
  pr=pr.slice(1, pr.length-1).trim();
  let rs=pr.split(';');
  if(rs.length==1) { //single vector
    let cs=pr.split(',');
    for (let k=0;k<cs.length;k++) {
      v[k]=parseFloat(cs[k].trim());
    }
  }else {           // array         
    let cs=rs[0].trim().split(',');
    v=Array(rs.length).fill(0).map(x => Array(cs.length).fill(0))
    for (let j=0;j<rs.length;j++)
    {
      let cs=rs[j].trim().split(',');
      for (let k=0;k<cs.length;k++) v[j][k]=parseFloat(cs[k].trim());
    }
  }
  return v;
}

function array2link(v){
  let ls=[]; let nnode=v.length;
  for(let i=0;i<nnode;i++) 
    for(let j=0;j<nnode;j++) {
      let l={source:"N"+j,target:"N"+i, value:v[i][j]}
    }
  return ls;
}
const mathjax = function (tex) {
  return MathJax.tex2svg(tex, {em: 16, ex: 6, display: false});
}

//var csv is the CSV file with headers
function csv_to_matrix(csvText) {
  let lines = []; let result = [];
  if(csvText==undefined || csvText==null) return []
  const linesArray = csvText.split('\n');
  // for trimming and deleting extra space 
  linesArray.forEach((e) => {
      const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
      if (row.length>0) lines.push(row);
  });
  const headers = lines[0].split(",");  
  for (let i = 1; i < lines.length; i++) {  
      const obj = [];
      const currentline = lines[i].split(",");  
      for (let j = 0; j < headers.length; j++) obj[j] = parseFloat(currentline[j]);
      result.push(obj);
  }
  result=math.transpose(math.matrix(result));
  return result;
}
///////////////////////
//////////////////////


function getSliderValue(id) {
    return parseFloat(document.getElementById(id).value)
}

function  linkgraph(A=null){
  var width = 400,
  height = 400;

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var nodes = [],
  links = [];
  var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().distance(200).strength(.6))
  .force("charge", d3.forceManyBody())
  // use forceX and forceY instead to change the relative positioning
  // .force("centering", d3.forceCenter(width/2, height/2))
  .force("x", d3.forceX(width/2))
  .force("y", d3.forceY(height/2))
  .on("tick", tick);

  var svg = d3.select("Link").append("svg")
  .attr("width", width)
  .attr("height", height);

  var a = createNode("a");
  var b = createNode("b");
  var c = createNode("c");
  var d = createNode("d");
  nodes= [a,b,c,d];
  links.push({source: a, target: b}, {source: a, target: c}, {source: b, target: c},{source: b, target: d});
  start();
  
  function createNode(id) {
    return {id: id, x: width/2, y:height/2}
  }

  function start() {        
    var nodeElements = svg.selectAll(".node").data(nodes, function(d){return d.id});
    var linkElements = svg.selectAll(".link").data(links);

    nodeElements.enter().append("circle").attr("class", function(d) {return "node " + d.id; }).attr("r", 8);
    linkElements.enter().insert("line", ".node").attr("class", "link");

    nodeElements.exit().remove();
    linkElements.exit().remove();

    simulation.nodes(nodes)
    simulation.force("link").links(links)
    simulation.restart();
  }

  function tick() {
    var nodeElements = svg.selectAll(".node");
    var linkElements = svg.selectAll(".link");

    nodeElements.attr("cx", function(d,i) {return d.x; })
    .attr("cy", function(d) { return d.y; })

    linkElements.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
  }
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files; // FileList object.
  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
  
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        console.log(e.target.result)
        document.getElementById('onlineedit').value=e.target.result;
        load_parse_model(e.target.result);       
      };
    })(f);
    reader.readAsText(files[0]);
  }
}

function loadModel(){
  var model = document.getElementById("model").value;
  load_model(model)
  function load_model(modelfile){
      var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
      reader.open('get', modelfile, true); 
      reader.onreadystatechange = parseContents;
      reader.send(null);
      function parseContents() {
          if(reader.readyState==4) {
            console.log(reader.responseText)
            document.getElementById('onlineedit').value=reader.responseText;
            load_parse_model(reader.responseText)
          }
      }
  }
} 

function runCode(modelstr){
  if(typeof sim==='undefined') return;
  load_parse_model(modelstr);
}
function runCommand(modelstr){
  if(typeof sim==='undefined') return;
  let result=sim.evaluate(modelstr);
  document.getElementById('commandresult').value=result;
}

function load_parse_model(modelstr) {
  sPlots=Array();
  resetDiv();
  model_parser(modelstr);
  setup_model()
  simulate()
  //Array matrix
  //let link=array2link(sim.evaluate('A').toArray())             
  //display_link(link)
}


function simPlot(mPlot,mdata=null){
  if(mPlot.plt===undefined) mPlot.plt = new uPlot(mPlot.opts, mdata, mPlot.id)  
  if(mdata!=null) mPlot.data=mdata;
  if(mPlot.data.length==0) return;
  if(mPlot.plt.series.length!==mPlot.data.length){
    deleteChild(mPlot.id);
    let chnx=mPlot.plt.series[0].label;
    let chny=mPlot.plt.series[1].label[0];
    let series=[];series.push({label: chnx})      
    for(let i=1;i<mPlot.data.length;i++){
      series.push({label: chny+i,stroke: colormap[i]})      
    }
    mPlot.opts.series=series;    
    mPlot.plt=new uPlot(mPlot.opts, mPlot.data, mPlot.id)
  }
  else mPlot.plt.setData(mPlot.data);
}

function addHeaderList(list) {
  let vdoc=document.getElementById('Headers');
  let h='';
  for(var i=0;i<list.length;i++) {
    h=h + list[i]+'<br>';  
  }
  var html = document.createElement("div");
  html.innerHTML=h;    
  vdoc.appendChild(html);
  MathJax.typeset()
}



function addVariableList(list) {
  document.getElementById('Variablesmsg').style.visibility="visible";
  let vdoc=document.getElementById('Variables1');
  let ct=0;let ncount=3; let width;
  for(var i=0;i<list.length;i++) {
    let sname=list[i].name;
    if(list[i].tex!==undefined) sname=list[i].tex;
    else sname=greek2tex(sname);

    let svalue=list[i].value;
    svalue=math.evaluate(svalue); //for equations.

    if(list[i].value_type==4) { //category name
      let label = document.createElement("label");
      label.innerHTML='<h5>'+list[i].name + '</h5>';
      vdoc.appendChild(label);
      continue; 
    } //control signal

    let label = document.createElement("LABEL");    
    if(list[i].prior!==undefined) {
      label.innerHTML="$" + sname + "$ :="; 
      label.style.cssText="color:#0000aa;"
    }
    else {
      label.innerHTML="$" + sname + "$ =" ;
    }
    vdoc.appendChild(label);
    let svalue1=svalue;
    if(list[i].type=="text"){         
      if(list[i].value_type===3) { //array
        svalue1=array2text(svalue);
        ct=ncount-1;
        width=svalue1.length;
      } else {
        let a='a'+svalue;
        width=a.length;
      }
      var textfield = document.createElement("input");
      textfield.type = list[i].type;
      textfield.value =svalue1;
      textfield.id=list[i].name;
      textfield.onchange=updateVariable;    
      textfield.style.cssText=`width:${width}ch;border:1px solid #ddd;color:#aa0000`;
      vdoc.appendChild(textfield);      
 
    } else if(list[i].type=="select") {
      var select = document.createElement("select");
      select.value =svalue;
      select.id=list[i].name;
      select.onchange=updateVariable;
      width=5+svalue.length;
      select.style.cssText=`width:${width}ch;border:1px  solid #ddd;`;
      vdoc.appendChild(select);
      //Create and append the options
      for (var j = 0; j< list[i].options.length; j++) {
          var option = document.createElement("option");
          option.value = list[i].options[j];
          option.text = list[i].options[j];
          select.appendChild(option);
      }
      document.getElementById(list[i].name).value=svalue;

    } else if (list[i].type=="range") { 
      let step=100;width=10;
      if(list[i].step!==undefined) step=list[i].step;
      if(step>list[i].max) { step=(list[i].max-list[i].min)/step;}
      let style=`width:${width}ch;border:1px  solid #ddd;`;
      /*
      var range = document.createElement("input");
      range.type="range";
      range.min=list[i].min;
      range.max=list[i].max;
      if(list[i].step!==undefined) range.step=step;
      range.value =svalue;
      range.id=list[i].name;
      range.onchange=updateVariable;  
      range.style.cssText=style;
      vdoc.appendChild(range);
      */
      let label = document.createElement("label");
      let slide=list[i].name+"_value"; let valuelength=6;
      let html=` <input type="text" id="${slide}" value="${svalue}" onchange="document.getElementById('${list[i].name}').value=document.getElementById('${slide}').value;updateVariable();" style="width:${valuelength}ch;"> \
      [${list[i].min}<input id="${list[i].name}" type="range" value="${svalue}" \
      onchange="document.getElementById('${slide}').value=document.getElementById('${list[i].name}').value;updateVariable();" \
      min="${list[i].min}" max="${list[i].max}" step="${step}" style="${style}" />${list[i].max}]`;
      label.innerHTML=html;
      vdoc.appendChild(label);
    }
    else if (list[i].type=="checkbox") {
      var range = document.createElement("input");
      range.type="checkbox";
      range.value =svalue;
      range.id=list[i].name;
      range.onchange=updateVariable;    
      width=3;
      range.style.cssText=`width:${width}ch;border:1px  solid #ddd;`;
      vdoc.appendChild(range);
    }

    if(list[i].value_type===3) { //array
      let elabel = document.createElement("LABEL");
      elabel.id=list[i].name+'_array';
      elabel.innerHTML= '=' + array2tex(svalue) +'<br>';  // array2tex(svalue,sname) +'<br>';   
      vdoc.appendChild(elabel);
    } //Array

    var unit = document.createElement("LABEL");
    let ustr='';
    if(list[i].unit.length>0) ustr= "$"+list[i].unit + "$";
    let sflag=false; if(i<list.length-2 && list[i+1].value.length>3) sflag=true;
    if(ct>=ncount-1 || i==list.length-1 || sflag) { ct=0; unit.innerHTML=" "+ustr + "<br>";}
    else unit.innerHTML=" "+ustr + "&nbsp&nbsp&nbsp";
    if(i==list.length-1) { unit.innerHTML=unit.innerHTML+"<br>";}     
    vdoc.appendChild(unit);
    MathJax.typeset()

    ct=ct+1;
  }
  
}
function addConstantList(list) {
  document.getElementById('Constantsmsg').style.visibility="visible";
  let vdoc=document.getElementById('Constants1');
  let tct=0; let texmode=true;  let html='';let ncount=3;
  for(var i=0;i<list.length;i++) {
    let sname=list[i].name;
    if(list[i].tex!==undefined) sname=list[i].tex;
    else {
      sname=greek2tex(sname);
    }

    let svalue=list[i].value;
    if(list[i].value_type==4) { //Control options
      html = html + '<h5>' + sname + '</h5>'
      continue;
    }
    let v=math.evaluate(svalue);
    let expr='$'+sname+"$ = " + v ;   
    if(list[i].value_type===3) {
      expr=array2tex(v,sname);
      html = html + expr + ' <br>'; 
    } else {
      html = html + expr;
      if(tct==ncount-1) {html =html + ' <br>'; tct=0;}
      else {html =html + ' &nbsp&nbsp&nbsp'; tct++; }
    }    
   }

  if(texmode) {
    var htmldiv = document.createElement("div");
    htmldiv.innerHTML=html;   
    vdoc.appendChild(htmldiv);
    MathJax.typeset()
  }
}

function updateVariable() {
  for(let i=0;i<variableList.length;i++) {
    if(variableList[i].value_type==4) continue; //controls
    let obj=document.getElementById(variableList[i].name);
    if(variableList[i].type=='checkbox'){
      if(variableList[i].value==obj.checked) continue;
      else variableList[i].value=obj.checked;
    }
    else {
      if(variableList[i].value==obj.value) continue;
      variableList[i].value=obj.value;
    }
    let width=obj.value.length;
    let exp=variableList[i].name + '='+ obj.value;// + variableList[i].unit;
    if(variableList[i].type=="text" && variableList[i].value_type===3) { //array
      let obj1=document.getElementById(variableList[i].name+'_array');
      obj.style.width=`${width}ch`;
      let sname=variableList[i].name;
      if(variableList[i].tex!==undefined) sname=variableList[i].tex;
      else {
        sname=greek2tex(sname);
      }
      let svalue=obj.value;
      svalue=math.evaluate(svalue); //for equations.
      obj1.innerHTML='=' + array2tex(svalue) +'<br>';  //array2tex(svalue,sname) +'<br>';  
      MathJax.typeset()
    } else if(variableList[i].type==='select') {
      exp=variableList[i].name + '='+ `'${obj.value}'`;
    } else if(variableList[i].type==='checkbox'){
      let value=obj.checked ? 1:0;
      exp=variableList[i].name + '='+ obj.checked;
    } else if(variableList[i].type==='range') {
      //let obj1=document.getElementById(variableList[i].name+'_value');
      //obj1.style.width=`${width}ch`;
    }
    sim.evaluate(exp);
  }
  simulate()
}

function draw(){
  for(let i=0;i<sPlots.legnth;i++) simPlot(sPlots[i]);
}

function resetDiv() {
  deleteChild("Headers");
  deleteChild("Equation");
  deleteChild("Constants1");
  deleteChild("Variables1");
  deleteChild("Link");
  deleteChild("plotviz");
}

function deleteChild(id) {
  let e;
  if (typeof id === 'string' || id instanceof String) e = document.getElementById(id);      
  else e=id; 
  var child = e.lastElementChild; 
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

function addEquationList(expr=null) {
    // initialize with an example expression
  if(expr===null || expr.length==0) return; //expr = 'sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2'
  const pretty = document.getElementById('Equation')
  pretty.innerHTML = '';
  for(let i=0;i<expr.length;i++) pretty.appendChild(mathjax(math.parse(expr[i]).toTex({parenthesis: 'keep'})));
}

function set_header(){
  for(let i=0;i<headtexts.length;i++) {
    //sim.evaluate(headtexts[i])
    console.log(headtexts[i])    
  }    
  addHeaderList(headtexts)
}

function set_equation(){
  for(let i=0;i<equations.length;i++) {
    //sim.evaluate(equations[i])
    //console.log(equations[i])    
  }    
  addEquationList(equations)
}

function set_constants(){
  for(let i=0;i<constants.length;i++) {
    console.log(constants[i])
    sim.evaluate(constants[i])    
  }    
  addConstantList(constantList)
}

function set_variables(){
  for(let i=0;i<variables.length;i++) {
    console.log(variables[i])
    sim.evaluate(variables[i])    
  }    
  addVariableList(variableList)
}

function setup_model(){
  set_header()
  set_equation()
  set_constants()
  set_variables()    
  linkgraph();
}

function simulate(){
  let ready=false;
  for(let i=0;i<expressions.length;i++) {
    console.log(i+":" + expressions[i])
    sim.evaluate(expressions[i])    
    if(i==expressions.length-1) ready=true;
  }    
}

function saveToCSV()
{
  let x=sim.evaluate("x'");
  if(x!==undefined && x!==null) save2csv('X.csv',x);
  let y=sim.evaluate("y'");
  if(y!==undefined && y!==null) save2csv('Y.csv',y);
}

function estimate(){
  let data=sim.evaluate('data');
  if(typeof data !=="undefined" && data!==null) {

  }
}

if(nodemode) simulate()
