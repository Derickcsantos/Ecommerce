const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['esportivo', 'tecnologia', 'feminino', 'masculino'] },
  stock: { type: Number, required: true },
  image: { type: String }, // Armazena o caminho/URL da imagem
});

module.exports = mongoose.model('Product', productSchema);
