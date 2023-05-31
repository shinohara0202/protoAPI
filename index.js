

//規約セット呼び出し
function dispTermset(corpoId, scrId) {
  const setUrl = `https://termhub.jp/term-sets/${corpoId}/${scrId}.json`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", setUrl);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    callSet = xhr.response;
    writeSet(callSet);
  }

  function writeSet(callSet) {
    const result = callSet.result.term_list;
    const termArea = document.querySelector("#js-set");

    for (let i = 0; i < result.length; i++) {
      const a = document.createElement("a");

      if (result[i].term_url === null) {
        a.href = `terms.html?term_id=${result[i].term_id}`;
        a.textContent = result[i].title;
        a.style.color = "#0066CC";
        a.style.borderBottom = "solid 1px"

      } 

      termArea.append(a);


    }

  }

}

//規約呼び出し

function dispTerm(corpoId) {
  function getTermid() {
    return window.location.search.replace("?term_id=","");
  }

  const termUrl = `https://termhub.jp/terms/CRP0000013/${getTermid()}.json`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", termUrl);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    callTerm = xhr.response;
    writeTerm(callTerm);
  }

  function writeTerm(callTerm) {
    const term = document.querySelector("#js-term");

    term.innerHTML = callTerm.result.body;
  }



}





//返り値
// {
//   "result" : {
//     "term_set_id" : "TMS0000023",
//     "version" : "6",
//     "term_list" : [ {
//       "title" : "サービス共通プライバシーポリシー",
//       "version" : "4",
//       "term_id" : "TRM0000011",
//       "term_url" : null
//     }, {
//       "title" : "全社共通利用規約",
//       "version" : "1",
//       "term_id" : "TRM0000032",
//       "term_url" : null
//     } ]
//   }
// }
