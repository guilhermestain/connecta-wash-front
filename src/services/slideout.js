import Slideout from '../../node_modules/slideout/dist/slideout'

const slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});

export default slideout