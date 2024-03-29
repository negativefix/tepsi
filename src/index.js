// TODO - document default options using js doc
// TODO - add examples
import './tepsi.css';

function tepsi(options) {
  const defaultOptions = {
    width: '300px',
    autoDismiss: false, // automatically dismisses the popup within provided displayDuration
    displayDuration: 1000, // duration the popup will stay on screen if autoDismiss is set to true
    animateIdleClass: 'tepsi-animated', // default animation class
    animateInClass: 'tepsi-animated-fadein', // class to add when popup is toggled on
    animateOutClass: 'tepsi-animated-fadeout', // class to add when popup is toggled off
    location: 'bottom-left', // location where popup will be shown
    tepsiId: null, // id of the element to be used as container
    xOffset: '10px', // offset from the left/right edge of the screen
    yOffset: '10px', // offset from the top/bottom of the screen
    containerElement: 'div', // default container element
    content: 'Hello Tepsi!', // default content of the popup
    customClass: null, // custom class to add to the container element
    dismissButton: false, // toggles dismiss button
    dismissButtonIcon: 'x', // icon to display within dismiss button
    dismissButtonCustomClass: '', // custom class to the dismiss button
    beforeInitialize: null, // callback to run before popup is initialized
    afterInitialized: null, // callback to run after popup is initialized
    onToggle: null, // callback to run when popup is toggled
  };

  const selectors = {
    tepsi: 'tepsi',
    tepsiActive: 'tepsi-active',
  };

  const state = {
    isActive: false,
  };

  const opts = { ...defaultOptions, ...options };

  // create tepsi container
  const containerSelector = opts.tepsiId || selectors.tepsi;
  let container = document.getElementById(containerSelector);

  // fallback to default container when none is found
  const containerElement = opts.containerElement || 'div';
  container = container || document.createElement(containerElement);

  container.classList.add(selectors.tepsi);
  container.style.width = opts.width;
  container.style.inset = locationToPosition(opts.location);

  // add custom class if provided
  if (opts.customClass) {
    container.classList.add(opts.customClass);
  }

  // add default animation class
  if (opts.animateIdleClass) {
    container.classList.add(opts.animateIdleClass);
  }

  // setup the timer for auto hide whenever popup is displayed
  container.addEventListener('animationend', () => {
    if (state.isActive && opts.autoDismiss) {
      setTimeout(() => toggle(), opts.displayDuration);
    }

    // hide tepsi if its no longer active at the time animation ends
    if (!state.isActive) {
      container.classList.toggle(selectors.tepsiActive);
      container.classList.remove(opts.animateIdleClass, opts.animateOutClass);
    }
  });

  // append given content only if the container is empty
  if (!container.childNodes.length) {
    container.insertAdjacentHTML('beforeend', opts.content);
  }

  if (opts.dismissButton) {
    container.appendChild(createDismissButton());
  }

  if (isFn(opts.beforeInitialize)) opts.beforeInitialize();

  // insert tepsi container into DOM
  document.body.appendChild(container);

  // toggle tepsi on
  toggle();

  if (isFn(opts.afterInitialized)) opts.afterInitialized();

  /**
   * creates an returns HTMLButtonElement for dismiss button
   * @returns {HTMLButtonElement}
   */
  function createDismissButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = opts.dismissButtonIcon;
    button.classList.add('popsy-dismiss');
    if (opts.dismissButtonCustomClass) button.classList.add(opts.dismissButtonCustomClass);
    button.addEventListener('click', () => toggle());
    return button;
  }

  /** translates the given string location to a style position
   * @param {string} location - string
   */
  function locationToPosition(location) {
    let position = '';

    switch (location) {
      case 'top-left':
        position = `${opts.yOffset} auto auto ${opts.xOffset}`;
        break;
      case 'top-right':
        position = `${opts.yOffset} ${opts.xOffset} auto auto`;
        break;
      case 'bottom-left':
        position = `auto auto ${opts.yOffset} ${opts.xOffset}`;
        break;
      default:
        position = `auto ${opts.xOffset} ${opts.yOffset} auto`;
        break;
    }

    return position;
  }

  /**
   * updates the popsy content on runtime
   * @param {string} content new content
   */
  function content(c) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', c);
  }

  /**
   * checks if given argument is a function
   * @param {any} f - patameter to test
   */
  function isFn(f) {
    return typeof f === 'function';
  }

  /**
   * toggles popsy on or off
   */
  function toggle() {
    if (isFn(opts.onToggle)) opts.onToggle();

    state.isActive = !state.isActive;

    if (!state.isActive) {
      container.classList.add(opts.animateOutClass);
      container.classList.remove(opts.animateInClass);
    } else {
      container.classList.add(opts.animateInClass);
      container.classList.remove(opts.animateOutClass);
      // do not wait for animation to end when toggle on
      // wait for animation to end when toggle off
      container.classList.toggle(selectors.tepsiActive);
    }
  }

  return {
    content,
    toggle,
  };
}

export default tepsi;
