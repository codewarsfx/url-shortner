/*
ui controller
*/

const UIController = (() => {
  //dom elements  unified object for easy access
  const domElements = {
    inputElement: document.querySelector('.form-group-input'),
    formButton: document.querySelector('.form-group-button'),
    searchResult: document.querySelector('.hero-form-result'),
    listElement: document.querySelector('.form-result-list'),
  };
  // utility function for reading input value
  const readValue = (element) => element.value;

  // utility function for clearing input field
  const clearInputField = (element) => {
    element.value = '';
  };

  // utility function for clearing result field
  const clearResult = (element) => {
    element.innerHTML = '';
  };

  return {
    domElements,
    readValue,
    clearInputField,
    displayResult: ({ shortlink, longLink }) => {
      const uiSnippet = `
        <li>
          <span class="list-link">
            <a href="${longLink}" target="_blank">${longLink}</a>
          </span>
          <span class="list-link-short">
            <a href="https://${shortlink}" target="_blank">${shortlink}</a>
            <button>Copy</button>
          </span>
        </li>
      `;
      domElements.listElement.insertAdjacentHTML('beforeend', uiSnippet);
    },
  };
})();
// -----------------------------------------------UI controller end----------------------------------------------------------------------------

/* 
 data and state contoller
*/
const dataContoller = (() => {
  class List {
    constructor(link) {
      this.link = link;
    }
    //setup method to make async request to the api
    async getShortenedLinks() {
      const key = 'a869fe0d92824384aa94bed2dfd5c203'; // api key for rebrandly api
      let linkRequest = {
        destination: this.link,
        domain: { fullName: 'rebrand.ly' },
      };

      let requestHeaders = {
        'Content-Type': 'application/json',
        apikey: key,
      };
      await $.ajax({
        url: 'https://api.rebrandly.com/v1/links',
        type: 'post',
        data: JSON.stringify(linkRequest),
        headers: requestHeaders,
        dataType: 'json',
        success: (link) => {
          this.result = {
            shortlink: link.shortUrl,
            longLink: link.destination,
          };
        },
      });
    }
  }

  return {
    createNewLink: (data) => new List(data),
  };
})();
// ----------------------------------------------end of dataContoller-------------------------------------------------

/*
APP CONTROLLER
*/
const appContorller = ((ui, data) => {
  ui.domElements.formButton.addEventListener('click', async (e) => {
    e.preventDefault();
    //read input field
    let inputValue = ui.readValue(ui.domElements.inputElement);
    //clear input field
    ui.clearInputField(ui.domElements.inputElement);
    // create new link
    const link = data.createNewLink(inputValue);
    //api request
    await link.getShortenedLinks();
    //display result in ui
    ui.displayResult(link.result);
  });
})(UIController, dataContoller);

// --------------------------------------------end of  appContorller------------------------------------------------------------
