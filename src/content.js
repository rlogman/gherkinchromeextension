const style = document.createElement("style");
style.innerHTML = `
.keyword {
  display: inline-block;
  padding: 0.2em 0.5em;
  border-radius: 0.5em;
  border: 2px solid green;
  background-color: lightgreen;
  color: darkgreen;
  text-transform: capitalize;
  font-weight: bold;
}
`;
document.head.appendChild(style);

// Define the keywords to be highlighted
const keywords = ['feature', 'given', 'when', 'then', 'but', 'and', 'rule', 'scenario', '\\*'];

// Function to highlight keywords in the text between markers
const highlightKeywords = text => {
  let highlightedText = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`^(\\s*)(${keyword})\\b`, 'igm');
    highlightedText = highlightedText.replace(regex, `$1<span class="keyword">${keyword}</span>`);
  });
  return highlightedText;
};

// Function to process the divs with class "description" or "markdown-formatted"
const processDivs = () => {
  const divs = document.querySelectorAll('.description-container .description, .description-container .markdown-formatted');
  divs.forEach((div) => {
    let text = div.innerHTML;
    const startIndex = text.indexOf('^~');
    const endIndex = text.indexOf('~^');
    if (startIndex !== -1 && endIndex !== -1) {
      const textBetweenMarkers = encodeLineBreaks(text.substring(startIndex + 2, endIndex));
      const highlightedText = decodeLineBreaks(highlightKeywords(textBetweenMarkers));
      const newContainer = document.createElement('pre');
      newContainer.innerHTML = highlightedText;
      text = text.substring(0, startIndex) + newContainer.outerHTML + text.substring(endIndex + 2);
      div.innerHTML = text;
    }
  });
};

const ENCODED_LINE_BREAK = '\n\n\n\n\n\t\n\t\n\n\n';
const ENCODED_RETURN = '\r\r\r\r\r\t\r\t\r\r\r';
const ENCODED_P = '\r\r\n\r\r\t\r\t\r\n\r';
const ENCODED_BR = '\n\n\r\n\n\t\n\t\n\r\n';
const encodeLineBreaks = text => {
  return text
    .replaceAll('\n', ENCODED_LINE_BREAK)
    .replaceAll('\r', ENCODED_RETURN)
    .replaceAll('<br>', ENCODED_BR)
    .replaceAll('<p>', ENCODED_P);
};
const decodeLineBreaks = text => {
  return text
    .replaceAll(ENCODED_LINE_BREAK, '\n')
    .replaceAll(ENCODED_RETURN, '\r')
    .replaceAll(ENCODED_BR, '<br>')
    .replaceAll(ENCODED_P, '<p>')
};

const observer = new MutationObserver(processDivs);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run the processDivs function for the first time
processDivs();
