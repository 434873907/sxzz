import { HTML_REG } from "../data/RegRule";
export default function html2Escape(sHtml){
  return sHtml.replace(HTML_REG, function(str){
    return { '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;' }[str];
  })
}