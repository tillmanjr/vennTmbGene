const rootRelativePath = 'src/utils/venn/'
const scriptAnchorId = 'vennScriptAnchor'

function include(file, defer)
{

  var script  = document.createElement('script');
  script.src  = `${rootRelativePath}${file}`;
  script.type = 'text/javascript';
  script.defer = defer;

  document.getElementById(scriptAnchorId).appendChild(script);

}

function scriptsNotPresent(elementId) {

    return document.getElementById(elementId).childElementCount === 0
}


if (scriptsNotPresent(scriptAnchorId)) {
/* include any js files here */
    include('vennDataFromModel.js', false);
    include('uiDataFromVennData.js', false);
    include('vennDisplayUtils.js', false);
    include('insightsVenn.js', true);
}