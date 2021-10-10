//用户的行为路径记录
// xpath: /html/body/ul[1]/li[1]  xpath 的下标没有0 ，从1开始的 

//
let getIndex = (ele) => {
  let children = [].slice.call(ele.parentNode.children);
  let myIndex = null
  let len = children.length;

  //只获取种类相同的元素
  children = children.filter(node => node.tagName === ele.tagName)

  for (let i = 0; i < len; i++) {
    if (ele === children[i]) {
      myIndex = i;
    }
  }
  // xpath 的下标没有0 ，从1开始的  返回结果 [1]
  myIndex = `[${myIndex + 1}]`;
  let tagName = ele.tagName.toLowerCase();
  let myLabel = tagName + myIndex
  return myLabel

}
let getXpath = (ele) => {

  //边界条件，不需要获取
  //点击的是不是元素
  if (!(ele instanceof Element)) {
    return void 0;
  }

  //点击是不是文本
  if (ele.nodeType !== 1) {
    return void 0;
  }

  //是不是点击了body
  let rootElement = document.body;
  if (ele === rootElement) {
    return void 0;
  }


  let xpath = ''
  let currentEle = ele
  while (currentEle !== document.body) {
    xpath = getIndex(currentEle) + '/' + xpath;
    debugger
    currentEle = currentEle.parentNode
  }
  debugger
}

export default {
  init: (cb) => {
    document.addEventListener('click', (e) => {
      let target = e.target
      let xpath = getXpath(target)

    }, false)

    cb()
  }
}