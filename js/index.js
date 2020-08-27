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
    copyButton: document.querySelector('.copy-buttton'),
    loader: document.querySelector('.loader'),
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

  //utility function for copying to clipboard
  const copyClipboard = (element) => {
    window.navigator.clipboard.writeText(element.innerText);
  };
  return {
    //dom elements
    domElements,
    //public method for reading the value of the input field
    readValue,
    //public method for clearing input field
    clearInputField,
    //public method for copying to clipboard
    copyToClipboard: (ele) => {
      //copy text
      copyClipboard(ele);
    },
    //public method for displaying result
    displayResult: ({ shortlink, longLink }) => {
      const uiSnippet = `
        <li>
          <span class="list-link">
            <a href="${longLink}" target="_blank">${longLink}</a>
          </span>
          <span class="list-link-short">
            <a href="https://${shortlink}" class="hello" target="_blank">${shortlink}</a><button class='copy-buttton'>Copy</button>
          </span>
        </li>
      `;
      domElements.listElement.insertAdjacentHTML('beforeend', uiSnippet);
    },
    //public method for displaying loader
    displayLoader: () => {
      domElements.loader.style.visibility = 'visible';
    },
    //public method for hidding loader
    hideLoader: () => {
      domElements.loader.style.visibility = 'hidden';
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
      try {
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
      } catch (error) {
        alert(
          'an error occurred ..please check that you entered the correct information. thank you'
        );
      }
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
    if (inputValue) {
      // create new link
      const link = data.createNewLink(inputValue);
      //display loader
      ui.displayLoader();
      try {
        //api request
        await link.getShortenedLinks();
        setTimeout(() => {
          //remove loader
          ui.hideLoader();
          //display result in ui
          ui.displayResult(link.result);
        }, 2000);
      } catch (error) {
        alert('an error occured please check that you entered a correct url');
      }
    }
  });
  ui.domElements.listElement.addEventListener('click', function (e) {
    if (e.target.matches('.copy-buttton,.copy-buttton *')) {
      ui.copyToClipboard(e.target.previousSibling);
      e.target.innerText = 'Copied!';
    }
  });
})(UIController, dataContoller);

// --------------------------------------------end of  appContorller------------------------------------------------------------
