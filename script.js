document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario');
  const resultado = document.querySelector('#resultado');

  const inputs = {
    nombre: document.querySelector('#nombre'),
    correo: document.querySelector('#correo'),
    curso: document.querySelector('#curso')
  };

  function setError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorSpan = document.getElementById(errorId);
    if (group) {
      group.classList.remove('success');
      group.classList.add('error');
    }
    if (errorSpan) errorSpan.innerText = message;
  }

  function setSuccess(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorSpan = document.getElementById(errorId);
    if (group) {
      group.classList.remove('error');
      group.classList.add('success');
    }
    if (errorSpan) errorSpan.innerText = '';
  }

  // Validaciones individuales
  function validarNombre() {
    const val = inputs.nombre.value.trim();
    if (!val || val.length < 3) {
      setError('group-nombre', 'error-nombre', 'Escribe un nombre de al menos 3 caracteres.');
      return false;
    }
    setSuccess('group-nombre', 'error-nombre');
    return true;
  }

  function validarCorreo() {
    const val = inputs.correo.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val || !regexEmail.test(val)) {
      setError('group-correo', 'error-correo', 'Ingresa un correo electrónico válido (ej. usuario@dominio.com).');
      return false;
    }
    setSuccess('group-correo', 'error-correo');
    return true;
  }

  function validarCurso() {
    if (!inputs.curso.value) {
      setError('group-curso', 'error-curso', 'Selecciona un curso de interés.');
      return false;
    }
    setSuccess('group-curso', 'error-curso');
    return true;
  }

  // Eventos en tiempo real
  inputs.nombre.addEventListener('input', validarNombre);
  inputs.correo.addEventListener('input', validarCorreo);
  inputs.curso.addEventListener('change', validarCurso);

  // Envío del formulario
  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const vNombre = validarNombre();
    const vCorreo = validarCorreo();
    const vCurso = validarCurso();

    if (!vNombre || !vCorreo || !vCurso) {
      resultado.className = 'mensaje-box error-summary';
      resultado.innerHTML = '<strong>Corrige los campos marcados en rojo para enviar la solicitud.</strong>';
      return;
    }

    const nombreVal = inputs.nombre.value.trim();
    const cursoVal = inputs.curso.options[inputs.curso.selectedIndex].text;

    resultado.className = 'mensaje-box exito';
    resultado.innerHTML = `Gracias, <strong>${nombreVal}</strong>. Tu solicitud para el curso de <strong>${cursoVal}</strong> se ha validado correctamente.`;
  });

  // Limpiar formulario
  formulario.addEventListener('reset', function() {
    resultado.className = 'mensaje-box hidden';
    resultado.innerHTML = '';
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-text').forEach(span => {
      span.innerText = '';
    });
  });
});