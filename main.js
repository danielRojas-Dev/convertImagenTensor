import * as tf from "@tensorflow/tfjs";

const archivo = document.getElementById("imagen");
const img = document.getElementById("img");
const btn = document.getElementById("btn");
const canvass = document.getElementById("canvas");
const datosTensor = document.getElementById("datosTensor");

//convertir imagen a tensor
function convertirImagenTensor(imagen) {
  const tensor = tf.browser.fromPixels(imagen, 3);
  console.log(tensor.rank);
  return tensor;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  canvass.hidden = false;

  const imgAtensor = convertirImagenTensor(img);

  console.log(imgAtensor);

  const imgInvertida = convertirImagenTensor(img).reverse(-2);

  canvass.className = "mt-4 form-control";

  tf.browser.toPixels(imgInvertida, canvass).then(() => {});

  console.log(imgInvertida);

  datosTensor.className = "alert alert-success mt-3 mb-5";
  datosTensor.innerHTML = `La cantidad de tensores que se generaron a partir de la imagen son: ${
    tf.memory().numTensors
  }
  <br>
La cantidad de memoria usada es: ${tf.memory().numBytes} bytes
`;
});

archivo.addEventListener("change", (e) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if (img.src != "") {
      formulario.reset();
    }
    img.src = reader.result;
    img.hidden = false;

    img.className = "form-control";
    img.style.height = "auto";
  };
});
