import './styles.scss';
import 'bootstrap';

function component() {
  const element = document.createElement('div');

  element.innerHTML = '<i class="bi-alarm"></i>';
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
